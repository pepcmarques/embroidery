'use client';

import { useState } from 'react';
import { Button, Input } from '@repo/ui';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginForm = ({
  onSuccess,
  onSwitchToRegister,
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <p className="text-embroidery-secondary text-sm mb-1">
          Welcome back! Please sign in to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full py-2"
          isLoading={isLoading}
          disabled={!email || !password}
        >
          Sign In
        </Button>

        {onSwitchToRegister && (
          <div className="text-center pt-3 border-t border-embroidery-border">
            <span className="text-embroidery-secondary">
              Don't have an account?{' '}
            </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-embroidery-primary hover:text-embroidery-primary-hover font-medium hover:underline transition-colors"
            >
              Sign up
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
