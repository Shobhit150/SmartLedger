"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Group {
  id: string;
  name: string;
  members: string[];
}

export default function GroupsPage() {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");

  // ================= LOAD GROUPS =================
  const loadGroups = async () => {
    try {
      const res = await fetch("http://localhost:8080/groups");
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.error("Error loading groups:", err);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  // ================= CREATE GROUP =================
  const createGroup = async () => {
    try {
      await fetch("http://localhost:8080/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
          members: members.split(",").map((m) => m.trim()),
        }),
      });

      setGroupName("");
      setMembers("");
      loadGroups();
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  // ================= DELETE GROUP =================
  const deleteGroup = async (groupId: string) => {
    if (!confirm("Are you sure you want to delete this group?")) return;

    try {
      await fetch(`http://localhost:8080/groups/${groupId}`, {
        method: "DELETE",
      });

      loadGroups();
    } catch (err) {
      console.error("Error deleting group:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Groups</h1>

        {/* CREATE GROUP */}
        <div className="bg-gray-800 p-4 rounded-xl mb-6">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full mb-3 p-2 bg-gray-700 rounded"
          />

          <input
            type="text"
            placeholder="Members (comma separated)"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            className="w-full mb-3 p-2 bg-gray-700 rounded"
          />

          <button
            onClick={createGroup}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded"
          >
            Create Group
          </button>
        </div>

        {/* GROUP LIST */}
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-gray-800 p-4 rounded-xl mb-4"
          >
            <h2
              className="text-xl font-semibold cursor-pointer"
              onClick={() => router.push(`/groups/${group.id}`)}
            >
              {group.name}
            </h2>

            <p className="text-gray-400 text-sm">
              Members: {group.members.join(", ")}
            </p>

            <button
              onClick={() => deleteGroup(group.id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete Group
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}