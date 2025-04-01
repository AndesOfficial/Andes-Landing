import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

function App() {
  const scrollRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      resetNativeScroll: true // Add this
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
  }, [location.pathname]);// Re-initialize on route change

  return (
    <>
      <Navbar />
      <div ref={scrollRef} className="flex flex-col min-h-screen scroll-container">
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
            <Route path="*" element={
              <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-2xl font-bold">404 Not Found</h1>
              </div>
            } />
          </Routes>
        </div>
        <ServiceFooter />

      </div>

      {/* Intercom Component */}
      <IntercomComponent />
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}