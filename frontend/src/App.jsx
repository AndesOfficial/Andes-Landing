import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Working from "./pages/Working";
import AndesAssured from "./pages/AndesAssured";
import "./locomotive-scroll.css";
import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Other from "./pages/Other";
import './App.css';
import IntercomComponent from './intercom';
import DownloadPage from './pages/DownloadPage';
import NewServicePage from './pages/NewServicePage';
import data from './data';
import ServiceFooter from './components/ServiceFooter';

// Pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OrderPlacement from "./pages/OrderPlacement";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  const scrollRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      resetNativeScroll: true,
      smartphone: { smooth: true },
      tablet: { smooth: true }
    });

    const resizeObserver = new ResizeObserver(() => {
      scroll.update();
    });

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    return () => {
      if (scroll) scroll.destroy();
      resizeObserver.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div ref={scrollRef} className="flex flex-col min-h-screen scroll-container" data-scroll-container>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/working" element={<Working />} />
            <Route path="/andes-assured" element={<AndesAssured />} />
            <Route path="/other" element={<Other />} />
            <Route path="/privacypolicy" element={<Other />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/services" element={<NewServicePage data={data} />} />

            {/* New Routes */}
            <Route path="/signup" element={<div data-scroll-section><SignUp /></div>} />
            <Route path="/login" element={<div data-scroll-section><Login /></div>} />
            <Route path="/order" element={<div data-scroll-section><OrderPlacement /></div>} />
            <Route path="/order-confirmation" element={<div data-scroll-section><OrderConfirmation /></div>} />

            <Route path="*" element={
              <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-2xl font-bold">404 Not Found</h1>
              </div>
            } />
          </Routes>
        </div>
        <ServiceFooter />
      </div>

      <IntercomComponent />
    </>
  );
}

export default App;