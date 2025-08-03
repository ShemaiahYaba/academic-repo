// import { useState, useEffect } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { useUI } from '@/contexts/UIContext';
// import { useNotification } from '@/contexts/NotificationContext';
// import { useError } from '@/contexts/ErrorContext';
// import { useData } from '@/contexts/DataContext';
// import { useAcademicPapers } from '@/hooks/useAcademicPapers';
// import { ProtectedRoute } from '@/components/ProtectedRoute';
// import { LoadingSpinner } from '@/components/LoadingSpinner';
// import { validateForm, validationSchemas } from '@/utils/validation';
// import type { Database } from '@/types/supabase';

// type AcademicPaper = Database['public']['Tables']['academic_papers']['Row'];

// export const CompleteExample = () => {
//   // All context hooks
//   const { user, profile, isAuthenticated, hasRole, hasPermission, signOut } = useAuth();
//   const { theme, setTheme, language, setLanguage, sidebarOpen, toggleSidebar } = useUI();
//   const { success, error, warning, info } = useNotification();
//   const { errors, clearErrors } = useError();
//   const { cache, getCacheStats } = useData();
//   const { fetchPapers, createPaper, subscribeToPapers } = useAcademicPapers();

//   // Local state
//   const [papers, setPapers] = useState<AcademicPaper[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showUploadForm, setShowUploadForm] = useState(false);

//   // Form state
//   const [formData, setFormData] = useState({
//     title: '',
//     abstract: '',
//     authors: '',
//     keywords: '',
//     journal: '',
//     doi: '',
//   });

//   // Load papers on mount
//   useEffect(() => {
//     if (isAuthenticated) {
//       loadPapers();
//       setupRealtimeSubscription();
//     }
//   }, [isAuthenticated]);

//   const loadPapers = async () => {
//     setIsLoading(true);
//     try {
//       const { data, error: fetchError } = await fetchPapers();
      
//       if (fetchError) {
//         error('Failed to load papers', fetchError.message);
//         return;
//       }

//       if (data) {
//         setPapers(data);
//         success('Papers loaded', `Successfully loaded ${data.length} papers`);
//       }
//     } catch (err) {
//       error('Unexpected error', 'Failed to load papers');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const setupRealtimeSubscription = () => {
//     const subscriptionId = subscribeToPapers((payload) => {
//       if (payload.eventType === 'INSERT') {
//         info('New paper added', 'A new paper has been added to the repository');
//         // Refresh the papers list
//         loadPapers();
//       }
//     });

//     return () => {
//       // Cleanup subscription when component unmounts
//       // This would be handled by the useData hook
//     };
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form
//     const validation = validateForm(formData, validationSchemas.academicPaper);
//     if (!validation.isValid) {
//       error('Validation Error', validation.errors.join(', '));
//       return;
//     }

//     // Prepare paper data
//     const paperData = {
//       ...formData,
//       authors: formData.authors.split(',').map(author => author.trim()).filter(Boolean),
//       keywords: formData.keywords.split(',').map(keyword => keyword.trim()).filter(Boolean),
//     };

//     setIsLoading(true);
//     try {
//       const { data, error: createError } = await createPaper(paperData);
      
//       if (createError) {
//         error('Failed to create paper', createError.message);
//         return;
//       }

//       if (data) {
//         success('Paper created', 'Your paper has been successfully uploaded');
//         setPapers(prev => [data, ...prev]);
//         setShowUploadForm(false);
//         setFormData({
//           title: '',
//           abstract: '',
//           authors: '',
//           keywords: '',
//           journal: '',
//           doi: '',
//         });
//       }
//     } catch (err) {
//       error('Unexpected error', 'Failed to create paper');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     warning('Signing out', 'You are about to sign out');
    
//     const { error: signOutError } = await signOut();
//     if (signOutError) {
//       error('Sign out failed', signOutError.message);
//     } else {
//       success('Signed out', 'You have been successfully signed out');
//     }
//   };

//   const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
//     setTheme(newTheme);
//     info('Theme changed', `Theme changed to ${newTheme} mode`);
//   };

//   const handleLanguageChange = (newLanguage: 'en' | 'es' | 'fr' | 'de') => {
//     setLanguage(newLanguage);
//     info('Language changed', `Language changed to ${newLanguage}`);
//   };

//   const clearAllErrors = () => {
//     clearErrors();
//     success('Errors cleared', 'All errors have been cleared');
//   };

//   const showCacheStats = () => {
//     const stats = getCacheStats();
//     info('Cache Statistics', `Cache contains ${stats.size} items: ${stats.keys.join(', ')}`);
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
//             Please sign in to access the repository
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             This example demonstrates the complete global context system
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute requiredPermission="read">
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         {/* Header */}
//         <header className="bg-white dark:bg-gray-800 shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center py-4">
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={toggleSidebar}
//                   className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 </button>
//                 <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                   Academic Repository
//                 </h1>
//               </div>

//               <div className="flex items-center space-x-4">
//                 {/* Theme Toggle */}
//                 <select
//                   value={theme}
//                   onChange={(e) => handleThemeChange(e.target.value as any)}
//                   className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                 >
//                   <option value="light">Light</option>
//                   <option value="dark">Dark</option>
//                   <option value="system">System</option>
//                 </select>

//                 {/* Language Toggle */}
//                 <select
//                   value={language}
//                   onChange={(e) => handleLanguageChange(e.target.value as any)}
//                   className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                 >
//                   <option value="en">English</option>
//                   <option value="es">Español</option>
//                   <option value="fr">Français</option>
//                   <option value="de">Deutsch</option>
//                 </select>

//                 {/* User Menu */}
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-700 dark:text-gray-300">
//                     {profile?.full_name || user?.email}
//                   </span>
//                   {hasRole('admin') && (
//                     <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
//                       Admin
//                     </span>
//                   )}
//                   <button
//                     onClick={handleSignOut}
//                     className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
//                   >
//                     Sign Out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Sidebar */}
//             <div className={`lg:col-span-1 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
//               <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                 <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                   Controls
//                 </h2>
                
//                 <div className="space-y-4">
//                   <button
//                     onClick={() => setShowUploadForm(!showUploadForm)}
//                     className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                   >
//                     {showUploadForm ? 'Hide Upload Form' : 'Show Upload Form'}
//                   </button>

//                   <button
//                     onClick={loadPapers}
//                     disabled={isLoading}
//                     className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
//                   >
//                     {isLoading ? 'Loading...' : 'Refresh Papers'}
//                   </button>

//                   <button
//                     onClick={clearAllErrors}
//                     className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
//                   >
//                     Clear Errors ({errors.length})
//                   </button>

//                   <button
//                     onClick={showCacheStats}
//                     className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//                   >
//                     Show Cache Stats
//                   </button>

//                   {hasPermission('write') && (
//                     <div className="p-3 bg-green-50 dark:bg-green-900 rounded-md">
//                       <p className="text-sm text-green-800 dark:text-green-200">
//                         You have write permissions
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Main Content Area */}
//             <div className="lg:col-span-3">
//               {/* Upload Form */}
//               {showUploadForm && (
//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
//                   <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                     Upload New Paper
//                   </h2>
                  
//                   <form onSubmit={handleFormSubmit} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Title *
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.title}
//                         onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                         placeholder="Enter paper title"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Abstract *
//                       </label>
//                       <textarea
//                         value={formData.abstract}
//                         onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
//                         rows={3}
//                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                         placeholder="Enter paper abstract"
//                         required
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Authors * (comma-separated)
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.authors}
//                           onChange={(e) => setFormData(prev => ({ ...prev, authors: e.target.value }))}
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                           placeholder="e.g., John Doe, Jane Smith"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Keywords * (comma-separated)
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.keywords}
//                           onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                           placeholder="e.g., machine learning, AI"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Journal
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.journal}
//                           onChange={(e) => setFormData(prev => ({ ...prev, journal: e.target.value }))}
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                           placeholder="Enter journal name"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           DOI
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.doi}
//                           onChange={(e) => setFormData(prev => ({ ...prev, doi: e.target.value }))}
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                           placeholder="e.g., 10.1000/182"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex justify-end space-x-3">
//                       <button
//                         type="button"
//                         onClick={() => setShowUploadForm(false)}
//                         className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//                       >
//                         {isLoading ? <LoadingSpinner size="sm" /> : 'Upload Paper'}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               )}

//               {/* Papers List */}
//               <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
//                 <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                   <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                     Academic Papers ({papers.length})
//                   </h2>
//                 </div>

//                 <div className="divide-y divide-gray-200 dark:divide-gray-700">
//                   {isLoading ? (
//                     <div className="p-8 text-center">
//                       <LoadingSpinner size="lg" text="Loading papers..." />
//                     </div>
//                   ) : papers.length === 0 ? (
//                     <div className="p-8 text-center text-gray-500 dark:text-gray-400">
//                       No papers found. Upload your first paper to get started!
//                     </div>
//                   ) : (
//                     papers.map((paper) => (
//                       <div key={paper.id} className="p-6">
//                         <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
//                           {paper.title}
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400 mb-3">
//                           {paper.abstract}
//                         </p>
//                         <div className="flex flex-wrap gap-2 mb-3">
//                           <span className="text-sm text-gray-500 dark:text-gray-400">
//                             Authors: {paper.authors.join(', ')}
//                           </span>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                           {paper.keywords.map((keyword, index) => (
//                             <span
//                               key={index}
//                               className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
//                             >
//                               {keyword}
//                             </span>
//                           ))}
//                         </div>
//                         {paper.journal && (
//                           <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                             Journal: {paper.journal}
//                           </p>
//                         )}
//                         {paper.doi && (
//                           <p className="text-sm text-gray-500 dark:text-gray-400">
//                             DOI: {paper.doi}
//                           </p>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }; 