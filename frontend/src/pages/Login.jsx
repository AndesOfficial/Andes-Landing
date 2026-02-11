import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showReset, setShowReset] = useState(false);

    const { login, resetPassword, googleSignIn, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to sign in with Google');
        }
    };


    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            return setError('Please enter your email address');
        }

        if (!showReset && !password) {
            return setError('Please enter your password');
        }

        setLoading(true);
        try {
            if (showReset) {

                await resetPassword(email);
                setMessage('Check your email for a password reset link');
            } else {
                // Handle Login
                await login(email, password);

            }
        } catch (err) {
            if (showReset) {
                setError('Failed to reset password. Check if the email is correct.');
            } else {
                setError('Failed to log in. Please check your credentials.');
            }
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>{showReset ? 'Reset Password' : 'Log In'} - Andes Laundry</title>
                <meta name="description" content="Log in to your Andes Laundry account to schedule pickups, track orders, and manage your profile." />
            </Helmet>
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900">
                        {showReset ? 'Reset Password' : 'Welcome Back'}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        {showReset ? 'Enter your email to receive instructions' : 'Sign in to manage your laundry orders'}
                    </p>
                </div>

                {!showReset && (
                    <div className="mt-8">
                        <Button
                            variant="secondary"
                            className="w-full flex items-center justify-center gap-3 py-3"
                            onClick={handleGoogleSignIn}
                            type="button"
                        >
                            <FcGoogle className="text-xl" />
                            Continue with Google
                        </Button>

                        <div className="relative flex items-center justify-center text-sm mt-6 mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <span className="relative bg-white px-4 text-slate-500">Or continue with email</span>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-50 text-green-500 p-3 rounded-lg text-sm text-center">
                            {message}
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {!showReset && (
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        {!showReset && (
                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowReset(true);
                                        setError('');
                                        setMessage('');
                                    }}
                                    className="font-medium text-brand hover:text-brand-dark"
                                >
                                    Forgot your password?
                                </button>
                            </div>
                        )}
                        {showReset && (
                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowReset(false);
                                        setError('');
                                        setMessage('');
                                    }}
                                    className="font-medium text-slate-600 hover:text-slate-500"
                                >
                                    Back to Login
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={loading}
                            variant="primary"
                        >
                            {showReset ? 'Send Reset Link' : 'Sign In'}
                        </Button>
                    </div>

                    {!showReset && (
                        <div className="text-center">
                            <p className="text-sm text-slate-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-brand hover:text-brand-dark transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
