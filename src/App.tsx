/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Deals from './pages/Deals';
import Perks from './pages/Perks';
import Locator from './pages/Locator';
import AppPage from './pages/AppPage';
import Nutrition from './pages/Nutrition';

// Error Boundary Component
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bk-cream flex items-center justify-center p-4">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center border-4 border-bk-red/10">
            <div className="w-20 h-20 bg-bk-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-bk-red text-4xl font-black italic">!</span>
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Something went wrong</h1>
            <p className="text-bk-brown/60 font-bold mb-8">
              We encountered an error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-bk-red text-white py-4 rounded-2xl font-black uppercase hover:brightness-110 transition-all shadow-xl"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-8 p-4 bg-bk-cream rounded-xl text-left text-xs overflow-auto max-h-40 font-mono text-bk-brown/40">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/perks" element={<Perks />} />
              <Route path="/locator" element={<Locator />} />
              <Route path="/app" element={<AppPage />} />
              <Route path="/nutrition" element={<Nutrition />} />
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
