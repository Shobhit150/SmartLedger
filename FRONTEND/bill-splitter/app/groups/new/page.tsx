"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGroupPage() {
  const router = useRouter();

  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<string[]>(["", ""]);

  const addMember = () => {
    setMembers([...members, ""]);
  };

  const updateMember = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      alert("Group name required");
      return;
    }

    const filteredMembers = members.filter((m) => m.trim() !== "");

    if (filteredMembers.length === 0) {
      alert("At least one member required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
          members: filteredMembers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      router.push("/groups");
    } catch (error) {
      console.error(error);
      alert("Error creating group");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Create New Group</h1>
        <p className="text-gray-400 mb-6">Add group name and members</p>

        {/* Group Name */}
        <label className="text-sm text-gray-400">Group Name</label>
        <input
          type="text"
          placeholder="e.g. Goa Trip"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full mt-1 mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Members */}
        <label className="text-sm text-gray-400">Members</label>
        <div className="space-y-3 mt-2 mb-4">
          {members.map((member, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Member ${index + 1} name`}
              value={member}
              onChange={(e) => updateMember(index, e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}
        </div>

        <button
          onClick={addMember}
          className="text-green-400 text-sm mb-6"
        >
          + Add another member
        </button>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg"
        >
          Create Group
        </button>
      </div>
    </main>
  );
}