// import React, { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { useNotification } from '@/contexts/NotificationContext';
// import { useUI } from '@/contexts/UIContext';
// import { LoadingSpinner } from '@/components/LoadingSpinner';
// import { AuthStatus } from '@/components/AuthStatus';

// export const AuthWorkflowExample: React.FC = () => {
//   const {
//     user,
//     profile,
//     isAuthenticated,
//     isInitialized,
//     isLoading,
//     signUp,
//     signIn,
//     signOut,
//     resetPassword,
//     updateProfile,
//     refreshSession,
//     hasRole,
//     hasPermission
//   } = useAuth();
  
//   const { success, error: showError, warning, info } = useNotification();
//   const { setLoading } = useUI();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     role: 'user' as 'user' | 'admin' | 'moderator'
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setLoading(true);

//     try {
//       await signUp(formData.email, formData.password);
//       success('Account created successfully! Please check your email to verify your account.');
      
//       // Update profile with additional information
//       if (user) {
//         await updateProfile({
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           role: formData.role,
//           username: `@${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`
//         });
//         success('Profile updated successfully!');
//       }
      
//       setFormData({ email: '', password: '', firstName: '', lastName: '', role: 'user' });
//     } catch (error) {
//       if (error instanceof Error) {
//         showError(error.message);
//       } else {
//         showError('An error occurred during sign up.');
//       }
//     } finally {
//       setIsSubmitting(false);
//       setLoading(false);
//     }
//   };

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setLoading(true);

//     try {
//       await signIn(formData.email, formData.password);
//       success('Welcome back! You have been signed in successfully.');
//       setFormData({ email: '', password: '', firstName: '', lastName: '', role: 'user' });
//     } catch (error) {
//       if (error instanceof Error) {
//         showError(error.message);
//       } else {
//         showError('An error occurred during sign in.');
//       }
//     } finally {
//       setIsSubmitting(false);
//       setLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     setIsSubmitting(true);
//     setLoading(true);

//     try {
//       await signOut();
//       success('You have been successfully logged out.');
//     } catch (error) {
//       if (error instanceof Error) {
//         showError(error.message);
//       } else {
//         showError('An error occurred during sign out.');
//       }
//     } finally {
//       setIsSubmitting(false);
//       setLoading(false);
//     }
//   };

//   const handlePasswordReset = async () => {
//     if (!formData.email) {
//       showError('Please provide an email address.');
//       return;
//     }

//     setIsSubmitting(true);
//     setLoading(true);

//     try {
//       await resetPassword(formData.email);
//       success('Password reset email sent! Please check your inbox.');
//     } catch (error) {
//       if (error instanceof Error) {
//         showError(error.message);
//       } else {
//         showError('An error occurred while sending password reset email.');
//       }
//     } finally {
//       setIsSubmitting(false);
//       setLoading(false);
//     }
//   };

//   const handleRefreshSession = async () => {
//     setIsSubmitting(true);
//     setLoading(true);

//     try {
//       await refreshSession();
//       success('Session refreshed successfully!');
//     } catch (error) {
//       if (error instanceof Error) {
//         showError(error.message);
//       } else {
//         showError('An error occurred while refreshing session.');
//       }
//     } finally {
//       setIsSubmitting(false);
//       setLoading(false);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     if (!user) return;

//     setIsSubmitting(true);
//     setLoading(true);

//     try {
//       await updateProfile({
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         role: formData.role,
//         username: `@${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`
//       });
//       success('Profile updated successfully!');
//     } catch (error) {
//       if (error instanceof Error) {
//         showError(error.message);
//       } else {
//         showError('An error occurred while updating profile.');
//       }
//     } finally {
//       setIsSubmitting(false);
//       setLoading(false);
//     }
//   };

//   const testRolePermissions = () => {
//     info('Testing role-based permissions...');
    
//     const roles = ['user', 'moderator', 'admin'] as const;
//     const permissions = ['read:articles', 'write:articles', 'delete:articles', 'manage:users'] as const;
    
//     roles.forEach(role => {
//       permissions.forEach(permission => {
//         const hasRoleResult = hasRole(role);
//         const hasPermissionResult = hasPermission(permission);
//         console.log(`Role: ${role}, Permission: ${permission}`);
//         console.log(`  Has Role: ${hasRoleResult}, Has Permission: ${hasPermissionResult}`);
//       });
//     });
    
//     success('Role and permission tests completed. Check console for details.');
//   };

//   if (!isInitialized) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="large" text="Initializing authentication system..." />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-8">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Workflow Example</h1>
//         <p className="text-gray-600">Complete authentication system with Supabase integration</p>
//       </div>

//       {/* Authentication Status */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
//         <AuthStatus />
//       </div>

//       {/* Authentication Forms */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Sign Up Form */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
//           <form onSubmit={handleSignUp} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="user">User</option>
//                 <option value="moderator">Moderator</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isSubmitting ? (
//                 <>
//                   <LoadingSpinner size="small" className="mr-2" />
//                   Creating Account...
//                 </>
//               ) : (
//                 'Sign Up'
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Sign In Form */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Sign In</h2>
//           <form onSubmit={handleSignIn} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isSubmitting ? (
//                 <>
//                   <LoadingSpinner size="small" className="mr-2" />
//                   Signing In...
//                 </>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Authenticated User Actions */}
//       {isAuthenticated && user && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Authenticated User Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <button
//               onClick={handleSignOut}
//               disabled={isSubmitting}
//               className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Signing Out...' : 'Sign Out'}
//             </button>
            
//             <button
//               onClick={handleRefreshSession}
//               disabled={isSubmitting}
//               className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Refreshing...' : 'Refresh Session'}
//             </button>
            
//             <button
//               onClick={handleUpdateProfile}
//               disabled={isSubmitting}
//               className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Updating...' : 'Update Profile'}
//             </button>
            
//             <button
//               onClick={testRolePermissions}
//               className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
//             >
//               Test Role Permissions
//             </button>
            
//             <button
//               onClick={handlePasswordReset}
//               disabled={isSubmitting}
//               className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Sending...' : 'Reset Password'}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* User Information Display */}
//       {isAuthenticated && user && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">User Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="font-medium text-gray-900 mb-2">User Details</h3>
//               <div className="space-y-2 text-sm">
//                 <div><span className="font-medium">ID:</span> {user.id}</div>
//                 <div><span className="font-medium">Email:</span> {user.email}</div>
//                 <div><span className="font-medium">Email Verified:</span> {user.email_confirmed_at ? 'Yes' : 'No'}</div>
//                 <div><span className="font-medium">Created:</span> {new Date(user.created_at).toLocaleString()}</div>
//                 <div><span className="font-medium">Last Sign In:</span> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}</div>
//               </div>
//             </div>
            
//             {profile && (
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-2">Profile Details</h3>
//                 <div className="space-y-2 text-sm">
//                   <div><span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}</div>
//                   <div><span className="font-medium">Username:</span> {profile.username || 'Not set'}</div>
//                   <div><span className="font-medium">Role:</span> {profile.role || 'user'}</div>
//                   <div><span className="font-medium">Bio:</span> {profile.bio || 'Not set'}</div>
//                   <div><span className="font-medium">School:</span> {profile.school || 'Not set'}</div>
//                   <div><span className="font-medium">Updated:</span> {profile.updated_at ? new Date(profile.updated_at).toLocaleString() : 'Never'}</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Role and Permission Testing */}
//       {isAuthenticated && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Role & Permission Testing</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="font-medium text-gray-900 mb-2">Role Checks</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center space-x-2">
//                   <span>User Role:</span>
//                   <span className={`px-2 py-1 rounded text-xs ${hasRole('user') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {hasRole('user') ? '✓' : '✗'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span>Moderator Role:</span>
//                   <span className={`px-2 py-1 rounded text-xs ${hasRole('moderator') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {hasRole('moderator') ? '✓' : '✗'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span>Admin Role:</span>
//                   <span className={`px-2 py-1 rounded text-xs ${hasRole('admin') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {hasRole('admin') ? '✓' : '✗'}
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="font-medium text-gray-900 mb-2">Permission Checks</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center space-x-2">
//                   <span>Read Articles:</span>
//                   <span className={`px-2 py-1 rounded text-xs ${hasPermission('read:articles') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {hasPermission('read:articles') ? '✓' : '✗'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span>Write Articles:</span>
//                   <span className={`px-2 py-1 rounded text-xs ${hasPermission('write:articles') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {hasPermission('write:articles') ? '✓' : '✗'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span>Delete Articles:</span>
//                   <span className={`px-2 py-1 rounded text-xs ${hasPermission('delete:articles') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {hasPermission('delete:articles') ? '✓' : '✗'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span>Manage Users:</span>
//                   <span className={`px-2 py-1 rounded text-xs ${hasPermission('manage:users') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {hasPermission('manage:users') ? '✓' : '✗'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }; 