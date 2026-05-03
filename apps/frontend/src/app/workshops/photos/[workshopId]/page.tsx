'use client';

import { useParams } from 'next/navigation';
import { WorkshopGrid } from '../../../../components/WorkshopGrid';
import { useState, useEffect } from 'react';

const workshopDetails: Record<string, { title: string; dataPath: string }> = {
  mnh: {
    title: 'Marpole Neighbourhood House',
    dataPath: 'mnh/mhn.json',
  },
  kits: {
    title: 'VPL Kitsilano',
    dataPath: 'kits/kits.json',
  },
};

export default function PhotosPage() {
  const params = useParams();
  const workshopId = params.workshopId as string;
  const workshop = workshopDetails[workshopId];

  if (!workshop) {
    return (
      <div className="min-h-screen bg-embroidery-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-embroidery-neutral mb-4">
            Workshop not found
          </h1>
          <p className="text-embroidery-secondary">
            The workshop you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-embroidery-surface">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-embroidery-primary to-embroidery-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {workshop.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Workshops Grid */}
      <WorkshopGrid dataPath={workshop.dataPath} />
    </div>
  );
}
