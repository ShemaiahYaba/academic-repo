import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useUI } from "@/contexts/UIContext";
import { loginbackground } from "@/constants/images";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import React from "react";

const AuthForm = () => {
  const navigate = useNavigate();
  const { signUp, signIn, resetPassword, isLoading } = useAuth();
  const { success, error: showError } = useNotification();
  const { setLoading } = useUI();

  const [form, setForm] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(form.email, form.password, { email: form.email });
        success("Account Created", "Account created successfully! Please check your email to verify your account.");
        setIsSignUp(false);
        setForm({ email: "", password: "" });
      } else {
        await signIn(form.email, form.password);
        success("Welcome Back", "You have been signed in successfully.");
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError("Authentication Error", err.message);
      } else {
        showError("Authentication Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!form.email) {
      showError("Email Required", "Please provide your email address to reset your password.");
      return;
    }
    
    setIsSubmitting(true);
    setLoading(true);
    
    try {
      await resetPassword(form.email);
      success("Password Reset Sent", "Password reset email sent! Please check your inbox.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError("Password Reset Error", err.message);
      } else {
        showError("Password Reset Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={loginbackground}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Login Background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />

      <div className="absolute inset-0 flex items-center justify-end p-5 py-16">
        <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-4xl shadow-lg p-8 py-21">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isSignUp ? "Create an Account" : "Sign In"}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-black font-medium"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-black font-medium"
                >
                  Sign up
                </button>
              </>
            )}
          </p>



          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {!isSignUp && (
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  disabled={isSubmitting || isLoading}
                  onClick={handlePasswordReset}
                  className="text-black font-light hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Forgot Password?"}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting || isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                <>{isSignUp ? "Sign up" : "Sign in"}</>
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">
              {isSignUp ? "or sign up with" : "or sign in with"}
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex justify-center gap-4">
            {/* Social auth buttons — you can wire these up with Supabase OAuth */}
            <button className="p-3 bg-gray-100 rounded-full">
              <img
                src="https://img.icons8.com/color/48/google-logo.png"
                className="w-6 h-6"
                alt="Google"
              />
            </button>
            <button className="p-3 bg-gray-100 rounded-full">
              <img
                src="https://img.icons8.com/ios-filled/50/apple-logo.png"
                className="w-6 h-6"
                alt="Apple"
              />
            </button>
            <button className="p-3 bg-gray-100 rounded-full">
              <img
                src="https://img.icons8.com/color/48/facebook-new.png"
                className="w-6 h-6"
                alt="Facebook"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
