import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useRef, Suspense, lazy, useState } from "react";
import './App.css';
import data from './data';
import MyFooter from './components/MyFooter';
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Intercom } from '@intercom/messenger-js-sdk';
import MobileStickyBtn from "./components/MobileStickyBtn";
import { useAuth } from "./context/AuthContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";


// Lazy Load Pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Working = lazy(() => import("./pages/Working"));
const AndesAssured = lazy(() => import("./pages/AndesAssured"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/privacypolicy"));
const Other = lazy(() => import("./pages/Other"));
const DownloadPage = lazy(() => import("./pages/DownloadPage"));
const NewServicePage = lazy(() => import("./pages/NewServicePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Profile = lazy(() => import("./pages/Profile"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const OrderPlacement = lazy(() => import("./pages/OrderPlacement"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const NotFound = lazy(() => import("./pages/NotFound")); // Planned for next step
const ContactUs = lazy(() => import("./pages/ContactUs"));

import PageLoader from './components/common/PageLoader';


function App() {
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    let isMounted = true;
    
    if (currentUser) {
      const bootIntercomSecurely = async () => {
        try {
          // Fetch secure JWT from Firebase Functions
          const generateIntercomHash = httpsCallable(functions, 'generateIntercomHash');
          const result = await generateIntercomHash();
          
          if (isMounted) {
            Intercom({
              app_id: 'p0z99uur',
              name: currentUser.displayName || currentUser.fullName || currentUser.name || "Andes User", 
              email: currentUser.email,
              user_id: currentUser.uid || currentUser.id,
              intercom_user_jwt: result.data.intercom_user_jwt,
            });
          }
        } catch (err) {
          console.error("Failed to generate Intercom Identity Verification Hash:", err);
          // Fallback to anonymous boot if it fails (optional, depending on strictness)
          if (isMounted) {
             Intercom({ app_id: 'p0z99uur' });
          }
        }
      };
      
      bootIntercomSecurely();
    } else {
      Intercom({
        app_id: 'p0z99uur',
      });
    }
    
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  if (location.pathname.startsWith('/dashboard')) {
    return (
      <>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/working" element={<Working />} />
              <Route path="/andes-assured" element={<AndesAssured />} />
              <Route path="/other" element={<TermsAndConditions />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/services" element={<NewServicePage />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Public Auth Routes */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/order" element={<OrderPlacement />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <MyFooter />
      </div>

      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

      <MobileStickyBtn />
    </>
  );
}

export default App;