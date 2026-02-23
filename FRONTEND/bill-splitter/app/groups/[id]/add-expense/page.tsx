"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function AddExpensePage() {
  const params = useParams();
  const groupId = params.id as string;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    alert(`Expense Added to Group ${groupId}`);
    console.log({ groupId, amount, description });
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6">
          Add Expense (Group {groupId})
        </h1>

        <label className="text-sm text-gray-400">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-1 mb-4 px-4 py-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label className="text-sm text-gray-400">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 mb-6 px-4 py-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-xl transition"
        >
          Add Expense
        </button>
      </div>
    </main>
  );
}