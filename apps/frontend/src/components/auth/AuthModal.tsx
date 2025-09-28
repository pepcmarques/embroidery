'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@repo/ui';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal = ({
  isOpen,
  onClose,
  initialMode = 'login',
}: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Sync mode with initialMode when it changes or when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  const handleSuccess = () => {
    onClose();
  };

  const switchToLogin = () => setMode('login');
  const switchToRegister = () => setMode('register');

  return (
    <div className="flex justify-center items-center bg-embroidery-primary/50">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={mode === 'login' ? 'Sign In' : 'Create Account'}
      >
        {mode === 'login' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </Modal>
    </div>
  );
};
