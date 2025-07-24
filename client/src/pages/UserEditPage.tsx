
import React, { useState } from "react";
import { UserRoleManager } from "@/components/UserRoleManager";
import { useAuth } from "@/context/AuthContext";

export default function UserEditPage({ selectedUserId }: { selectedUserId: string }) {
  const [activeTab, setActiveTab] = useState("roles");
  const { user: currentUser } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit User</h1>
      <div className="mb-4 flex gap-4">
        <button className={activeTab === "roles" ? "font-bold" : ""} onClick={() => setActiveTab("roles")}>Roles</button>
        {/* Add more tabs here if needed */}
      </div>
      {activeTab === "roles" && (currentUser?.role === "admin" || currentUser?.role === "hr_manager") ? (
        <UserRoleManager userId={selectedUserId} />
      ) : null}
      {/* Add more tab content here if needed */}
    </div>
  );
}
