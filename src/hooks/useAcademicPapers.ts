import { useCallback } from 'react';
import { useSupabase } from './useSupabase';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthProvider';
import type { Database } from '@/types/supabase';

type AcademicPaper = Database['public']['Tables']['academic_papers']['Row'];
type AcademicPaperInsert = Database['public']['Tables']['academic_papers']['Insert'];
type AcademicPaperUpdate = Database['public']['Tables']['academic_papers']['Update'];

export const useAcademicPapers = () => {
  const { supabase, query, mutate } = useSupabase();
  const { subscribe, unsubscribe } = useData() ?? {};
  const { user, hasPermission } = useAuth() ?? {};

  // Fetch all papers
  const fetchPapers = useCallback(async () => {
    return await query<AcademicPaper[]>(
      async () => await supabase
        .from('academic_papers')
        .select('*')
        .order('created_at', { ascending: false }),
      'fetchPapers'
    );
  }, [query, supabase]);

  // Fetch paper by ID
  const fetchPaperById = useCallback(async (id: string) => {
    return await query<AcademicPaper>(
      async () => await supabase
        .from('academic_papers')
        .select('*')
        .eq('id', id)
        .single(),
      `paper_${id}`
    );
  }, [query, supabase]);

  // Fetch papers by user
  const fetchPapersByUser = useCallback(async (userId: string) => {
    return await query<AcademicPaper[]>(
      async () => await supabase
        .from('academic_papers')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }),
      `papers_user_${userId}`
    );
  }, [query, supabase]);

  // Create new paper
  const createPaper = useCallback(async (paper: AcademicPaperInsert) => {
    if (!user) {
      throw new Error('User must be authenticated to create papers');
    }

    if (!hasPermission || !hasPermission('write_own')) {
      throw new Error('Insufficient permissions to create papers');
    }

    return await mutate<AcademicPaper>(
      async () => await supabase
        .from('academic_papers')
        .insert([{ ...paper, user_id: user.id }])
        .select()
        .single(),
      'createPaper',
      'Paper created successfully'
    );
  }, [user, hasPermission, mutate, supabase]);

  // Update paper
  const updatePaper = useCallback(async (id: string, updates: AcademicPaperUpdate) => {
    if (!user) {
      throw new Error('User must be authenticated to update papers');
    }

    // Check if user can update this paper
    const { data: paper } = await fetchPaperById(id);
    if (!paper) {
      throw new Error('Paper not found');
    }

    if (paper.user_id !== user.id && (!hasPermission || !hasPermission('write'))) {
      throw new Error('Insufficient permissions to update this paper');
    }

    return await mutate<AcademicPaper>(
      async () => await supabase
        .from('academic_papers')
        .update(updates)
        .eq('id', id)
        .select()
        .single(),
      'updatePaper',
      'Paper updated successfully'
    );
  }, [user, hasPermission, mutate, fetchPaperById, supabase]);

  // Delete paper
  const deletePaper = useCallback(async (id: string) => {
    if (!user) {
      throw new Error('User must be authenticated to delete papers');
    }

    // Check if user can delete this paper
    const { data: paper } = await fetchPaperById(id);
    if (!paper) {
      throw new Error('Paper not found');
    }

    if (paper.user_id !== user.id && (!hasPermission || !hasPermission('delete'))) {
      throw new Error('Insufficient permissions to delete this paper');
    }

    return await mutate<AcademicPaper>(
      async () => await supabase
        .from('academic_papers')
        .delete()
        .eq('id', id)
        .select()
        .single(),
      'deletePaper',
      'Paper deleted successfully'
    );
  }, [user, hasPermission, mutate, fetchPaperById, supabase]);

  // Search papers
  const searchPapers = useCallback(async (searchQuery: string, filters?: {
    authors?: string[];
    keywords?: string[];
    journal?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    return await query<AcademicPaper[]>(
      async () => {
        let supabaseQuery = supabase
          .from('academic_papers')
          .select('*');

        // Text search
        if (searchQuery) {
          supabaseQuery = supabaseQuery.or(
            `title.ilike.%${searchQuery}%,abstract.ilike.%${searchQuery}%`
          );
        }

        // Apply filters
        if (filters?.authors?.length) {
          supabaseQuery = supabaseQuery.overlaps('authors', filters.authors);
        }

        if (filters?.keywords?.length) {
          supabaseQuery = supabaseQuery.overlaps('keywords', filters.keywords);
        }

        if (filters?.journal) {
          supabaseQuery = supabaseQuery.eq('journal', filters.journal);
        }

        if (filters?.dateFrom) {
          supabaseQuery = supabaseQuery.gte('published_date', filters.dateFrom);
        }

        if (filters?.dateTo) {
          supabaseQuery = supabaseQuery.lte('published_date', filters.dateTo);
        }

        return await supabaseQuery.order('created_at', { ascending: false });
      },
      'searchPapers'
    );
  }, [query, supabase]);

  // Subscribe to real-time updates
  const subscribeToPapers = useCallback((callback: (payload: any) => void) => {
    if (!subscribe) return undefined;
    const subscriptionId = subscribe(
      'academic_papers',
      '*',
      (payload) => {
        // Invalidate cache when papers are updated
        // This is a simple approach - in a more sophisticated system,
        // you might want to update the cache optimistically
        callback(payload);
      }
    );

    return subscriptionId;
  }, [subscribe]);

  // Subscribe to user's papers
  const subscribeToUserPapers = useCallback((userId: string, callback: (payload: any) => void) => {
    if (!subscribe) return undefined;
    const subscriptionId = subscribe(
      'academic_papers',
      '*',
      (payload) => {
        // Only trigger callback if the paper belongs to the user
        if (payload.new?.user_id === userId || payload.old?.user_id === userId) {
          callback(payload);
        }
      },
      `user_id=eq.${userId}`
    );

    return subscriptionId;
  }, [subscribe]);

  // Get papers with pagination
  const fetchPapersPaginated = useCallback(async (page: number = 1, limit: number = 10) => {
    const offset = (page - 1) * limit;
    
    return await query<AcademicPaper[]>(
      async () => await supabase
        .from('academic_papers')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1),
      `papers_page_${page}_limit_${limit}`
    );
  }, [query, supabase]);

  // Get papers by journal
  const fetchPapersByJournal = useCallback(async (journal: string) => {
    return await query<AcademicPaper[]>(
      async () => await supabase
        .from('academic_papers')
        .select('*')
        .eq('journal', journal)
        .order('created_at', { ascending: false }),
      `papers_journal_${journal}`
    );
  }, [query, supabase]);

  // Get papers by author
  const fetchPapersByAuthor = useCallback(async (author: string) => {
    return await query<AcademicPaper[]>(
      async () => await supabase
        .from('academic_papers')
        .select('*')
        .contains('authors', [author])
        .order('created_at', { ascending: false }),
      `papers_author_${author}`
    );
  }, [query, supabase]);

  return {
    // Query operations
    fetchPapers,
    fetchPaperById,
    fetchPapersByUser,
    fetchPapersPaginated,
    fetchPapersByJournal,
    fetchPapersByAuthor,
    searchPapers,
    
    // Mutation operations
    createPaper,
    updatePaper,
    deletePaper,
    
    // Real-time subscriptions
    subscribeToPapers,
    subscribeToUserPapers,
    unsubscribe,
  };
}; 