import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './components/ui/Dashboard';
import { LoginForm } from './components/ui/LoginForm';
import { SignupForm } from './components/ui/SignupForm';
import './App.css';

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

  const handleLoginSuccess = (token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
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
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
