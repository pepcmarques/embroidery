'use client';
import React, { useRef, useState } from 'react';

export default function SubscribePage() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData.entries())),
        }
      );
      if (!res.ok) {
        const errText = await res.text();
        throw new Error('Error subscribing');
      }
      const data = await res.json();
      setStatus(`${data.email} was subscribed!`);
      setError(null);
      form.reset();
    } catch (err: any) {
      setError(`Error subscribing ${formData.get('email')}`);
      emailRef.current?.focus();
      setStatus(null);
    }
  };

  return (
    <div
      className="bg-embroidery-surface"
      style={{ minHeight: 'calc(100vh - 150px)' }}
    >
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-embroidery-primary mb-6">
          Subscribe to the Newsletter
        </h1>
        <div className="flex flex-col">
          <span className="text-lg text-embroidery-secondary mb-2">
            Stay updated with the latest news and updates from Embroidering
            Words.
          </span>
          <span className="text-lg text-embroidery-secondary mb-6">
            Enter your email below to subscribe to our newsletter.
          </span>
        </div>
        {status && (
          <p className="text-embroidery-primary font-medium mb-4">{status}</p>
        )}
        {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4"
        >
          <input
            ref={emailRef}
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="min-w-2xl sm:w-auto px-4 py-2 border border-embroidery-border rounded-md focus:outline-none focus:ring-2 focus:ring-embroidery-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-embroidery-primary text-white rounded-md hover:bg-embroidery-primary-dark transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
