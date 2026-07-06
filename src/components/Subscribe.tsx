'use client';
import React, { useState } from 'react';

export default function SubscribeComponent() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setStatus(null);
    }
  };

  return (
    <div
      className="bg-embroidery-surface"
      style={{ minHeight: 'calc(100vh - 150px)' }}
    >
      {status && (
        <p className="text-embroidery-primary font-medium mb-4 text-center">
          {status}
        </p>
      )}
      {error && (
        <p className="text-red-500 font-medium mb-4 text-center">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="min-w-2xl sm:w-auto px-4 py-2 border-2 border-embroidery-primary rounded-md focus:outline-none focus:ring-2 focus:ring-embroidery-primary focus:border-embroidery-primary"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-embroidery-primary text-white rounded-md hover:bg-embroidery-primary-dark transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
