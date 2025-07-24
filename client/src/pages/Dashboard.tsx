import React from "react";

export default function Dashboard() {
  const org = JSON.parse(localStorage.getItem('organization') || '{}');
  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-6">Welcome to your dashboard!</p>
      {org && org.id ? (
        <div className="text-left">
          <h2 className="text-xl font-semibold mb-2">Organization Info</h2>
          <p><strong>ID:</strong> {org.id}</p>
          <p><strong>Name:</strong> {org.name}</p>
          <p><strong>Type:</strong> {org.org_type}</p>
          <p><strong>Industry:</strong> {org.industry}</p>
          <p><strong>Size:</strong> {org.org_size}</p>
          <p><strong>Description:</strong> {org.description}</p>
        </div>
      ) : (
        <p>No organization data found.</p>
      )}
    </div>
  );
}
