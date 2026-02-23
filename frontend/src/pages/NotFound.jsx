import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>404 - Page Not Found | Andes Laundry</title>
                <meta name="description" content="Sorry, the page you are looking for does not exist on Andes Laundry." />
            </Helmet>
            <div className="max-w-md w-full text-center">
                <h1 className="text-9xl font-extrabold text-brand">404</h1>
                <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
                <p className="mt-2 text-lg text-gray-600">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link to="/">
                        <Button>Go Home</Button>
                    </Link>
                    <Link to="/dashboard">
                        <Button variant="secondary">Dashboard</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
