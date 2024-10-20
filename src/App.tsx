// src/App.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import './index.css';
import './components/SocketIo/Messages.css';
import './components/AudioRecorder/recorder-controls/styles.css';
import { getRateLimited, setIsMobile } from './store/ui';
import { useAuthCheck } from './hooks/useAuthCheck';
import useAppAlert from './hooks/useAppAlert';
import Onboarding from './pages/Onboarding';
import { HelmetProvider } from 'react-helmet-async';
import Noon from './pages/noon';
import ProtectedRoute from './components/ProjectedRoute'; // Import HelmetProvider

const App: React.FC = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const rateLimitedPayload = useSelector(getRateLimited);
  const showAppAlert = useAppAlert();

  useEffect(() => {
    if (rateLimitedPayload.isRateLimited) {
      showAppAlert({
        id: 'rate-limit',
        title: rateLimitedPayload.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        customRender: true,
      });
    }
  }, [rateLimitedPayload.refresh, showAppAlert]);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    dispatch(setIsMobile(window.innerWidth <= 1000));
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      dispatch(setIsMobile(window.innerWidth <= 1000));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return (
    <React.StrictMode>
      <HelmetProvider>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider options={{ useSystemColorMode: true }}>
            <Router>
              <Routes>
                <Route path="/" element={<Onboarding />} />
                <Route
                  path="/noon"
                  element={
                    <ProtectedRoute>
                      <Noon />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </ColorModeProvider>
        </ChakraProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

export default App;
