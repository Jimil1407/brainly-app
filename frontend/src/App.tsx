import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './components/ui/Dashboard';
import { LoginForm } from './components/ui/LoginForm';
import { SignupForm } from './components/ui/SignupForm';
import { Footer } from './components/ui/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (_token: string) => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            {isSignup ? (
              <SignupForm
                onSuccess={() => setIsSignup(false)}
                onSwitchToLogin={() => setIsSignup(false)}
              />
            ) : (
              <LoginForm
                onSuccess={handleLoginSuccess}
                onSwitchToSignup={() => setIsSignup(true)}
              />
            )}
          </div>
          <Footer />
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Dashboard />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
