import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useRef, Suspense, lazy, useState } from "react";
import './App.css';
// import IntercomComponent from './intercom';
import data from './data';
import MyFooter from './components/MyFooter';
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy Load Pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Working = lazy(() => import("./pages/Working"));
const AndesAssured = lazy(() => import("./pages/AndesAssured"));
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

// Loading Component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
  </div>
);

function App() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* <IntercomComponent /> */}
      </>
    );
  }

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/working" element={<Working />} />
              <Route path="/andes-assured" element={<AndesAssured />} />
              <Route path="/other" element={<Other />} />
              <Route path="/privacypolicy" element={<Other />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/services" element={<NewServicePage data={data} />} />

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

      {/* <IntercomComponent /> */}
    </>
  );
}

export default App;