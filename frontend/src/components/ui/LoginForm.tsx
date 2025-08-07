import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { Brain } from 'lucide-react';

interface LoginFormProps {
  onSuccess: (token: string) => void;
  onSwitchToSignup: () => void;
}

export const LoginForm = ({ onSuccess, onSwitchToSignup }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const loginMutation = useMutation({
    mutationFn: authAPI.signin,
    onSuccess: (response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      onSuccess(token);
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#5244df] rounded-lg flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Second Brain</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5244df] focus:border-transparent"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5244df] focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-[#5244df] text-white py-2 px-4 rounded-lg hover:bg-[#5244df]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-[#5244df] hover:text-[#5244df]/80 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}; 