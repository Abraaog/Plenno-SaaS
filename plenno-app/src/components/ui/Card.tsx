// src/components/ui/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Card({ title, children, actions }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        <div>{actions}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
