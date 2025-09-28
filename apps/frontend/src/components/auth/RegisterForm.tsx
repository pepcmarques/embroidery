'use client';

import { useState } from 'react';
import { Button, Input } from '@repo/ui';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm = ({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(email, password, name || undefined);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <p className="text-embroidery-secondary text-sm mb-1">
          Join our community and start your embroidery journey today!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="text"
            label="Name (Optional)"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Enter your name"
          />
        </div>

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
            placeholder="Enter your password (min 6 characters)"
          />
        </div>

        <div>
          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            required
            placeholder="Confirm your password"
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
          disabled={!email || !password || !confirmPassword}
        >
          Sign Up
        </Button>

        {onSwitchToLogin && (
          <div className="text-center pt-3 border-t border-embroidery-border">
            <span className="text-embroidery-secondary">
              Already have an account?{' '}
            </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-embroidery-primary hover:text-embroidery-primary-hover font-medium hover:underline transition-colors"
            >
              Sign in
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
