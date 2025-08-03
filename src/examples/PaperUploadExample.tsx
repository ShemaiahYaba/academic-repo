import { useState } from 'react';
import { useAcademicPapers } from '@/hooks/useAcademicPapers';
import { useAuth } from '@/contexts/AuthContext';
import { useUI } from '@/contexts/UIContext';
import { useNotification } from '@/contexts/NotificationContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { Database } from '@/types/supabase';

type AcademicPaperInsert = Database['public']['Tables']['academic_papers']['Insert'];

export const PaperUploadExample = () => {
  const { createPaper } = useAcademicPapers();
  const { user } = useAuth();
  const { setLoading } = useUI();
  const { success, error, warning } = useNotification();

  const [formData, setFormData] = useState<Partial<AcademicPaperInsert>>({
    title: '',
    abstract: '',
    authors: [],
    keywords: [],
    journal: '',
    doi: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof AcademicPaperInsert, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAuthorsChange = (value: string) => {
    const authors = value.split(',').map(author => author.trim()).filter(Boolean);
    handleInputChange('authors', authors);
  };

  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(keyword => keyword.trim()).filter(Boolean);
    handleInputChange('keywords', keywords);
  };

  const validateForm = (): string | null => {
    if (!formData.title?.trim()) {
      return 'Title is required';
    }
    if (!formData.abstract?.trim()) {
      return 'Abstract is required';
    }
    if (!formData.authors?.length) {
      return 'At least one author is required';
    }
    if (!formData.keywords?.length) {
      return 'At least one keyword is required';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      error('Validation Error', validationError);
      return;
    }

    if (!user) {
      error('Authentication Error', 'You must be logged in to upload papers');
      return;
    }

    setIsSubmitting(true);
    setLoading(true, 'Uploading paper...');

    try {
      const { data, error: uploadError } = await createPaper(formData as AcademicPaperInsert);

      if (uploadError) {
        error('Upload Failed', uploadError.message);
        return;
      }

      if (data) {
        success('Paper Uploaded', 'Your paper has been successfully uploaded to the repository');
        
        // Reset form
        setFormData({
          title: '',
          abstract: '',
          authors: [],
          keywords: [],
          journal: '',
          doi: '',
        });
      }
    } catch (err) {
      error('Unexpected Error', 'An unexpected error occurred while uploading the paper');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Upload Academic Paper
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Paper Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter paper title"
            required
          />
        </div>

        {/* Abstract */}
        <div>
          <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Abstract *
          </label>
          <textarea
            id="abstract"
            value={formData.abstract || ''}
            onChange={(e) => handleInputChange('abstract', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter paper abstract"
            required
          />
        </div>

        {/* Authors */}
        <div>
          <label htmlFor="authors" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Authors * (comma-separated)
          </label>
          <input
            type="text"
            id="authors"
            value={formData.authors?.join(', ') || ''}
            onChange={(e) => handleAuthorsChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="e.g., John Doe, Jane Smith"
            required
          />
        </div>

        {/* Keywords */}
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Keywords * (comma-separated)
          </label>
          <input
            type="text"
            id="keywords"
            value={formData.keywords?.join(', ') || ''}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="e.g., machine learning, artificial intelligence"
            required
          />
        </div>

        {/* Journal */}
        <div>
          <label htmlFor="journal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Journal
          </label>
          <input
            type="text"
            id="journal"
            value={formData.journal || ''}
            onChange={(e) => handleInputChange('journal', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter journal name"
          />
        </div>

        {/* DOI */}
        <div>
          <label htmlFor="doi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            DOI
          </label>
          <input
            type="text"
            id="doi"
            value={formData.doi || ''}
            onChange={(e) => handleInputChange('doi', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="e.g., 10.1000/182"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Uploading...</span>
              </>
            ) : (
              <span>Upload Paper</span>
            )}
          </button>
        </div>
      </form>

      {/* User Info */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Uploading as:</strong> {user?.email}
        </p>
      </div>
    </div>
  );
}; 