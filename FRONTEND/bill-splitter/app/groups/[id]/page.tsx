"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
  splitAmount: number;
}

interface Group {
  id: string;
  name: string;
  members: string[];
}

export default function GroupDetail() {
  const params = useParams();
  const groupId = params?.id as string;

  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  // ================= LOAD GROUP =================
  const loadGroup = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/groups/${groupId}`
      );
      const data = await res.json();
      setGroup(data);
    } catch (err) {
      console.error("Error loading group:", err);
    }
  };

  // ================= LOAD EXPENSES =================
  const loadExpenses = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/expenses/group/${groupId}`
      );
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Error loading expenses:", err);
    }
  };

  useEffect(() => {
    if (groupId) {
      loadGroup();
      loadExpenses();
    }
  }, [groupId]);

  // ================= ADD EXPENSE =================
  const addExpense = async () => {
    if (!group) return;

    try {
      await fetch("http://localhost:8080/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId,
          description,
          amount: parseFloat(amount),
          paidBy,
          participants: group.members,
        }),
      });

      setDescription("");
      setAmount("");
      setPaidBy("");

      loadExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // ================= DELETE EXPENSE =================
  const deleteExpense = async (expenseId: string) => {
    if (!confirm("Delete this expense?")) return;

    try {
      await fetch(`http://localhost:8080/expenses/${expenseId}`, {
        method: "DELETE",
      });

      loadExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const totalAmount = expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          {group?.name}
        </h1>

        {group && (
          <p className="text-gray-400 mb-6">
            Members: {group.members.join(", ")}
          </p>
        )}

        {/* ADD EXPENSE */}
        <div className="bg-gray-800 p-4 rounded-xl mb-6">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-3 p-2 bg-gray-700 rounded"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-3 p-2 bg-gray-700 rounded"
          />

          <input
            type="text"
            placeholder="Paid By"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full mb-3 p-2 bg-gray-700 rounded"
          />

          <button
            onClick={addExpense}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded"
          >
            Add Expense
          </button>
        </div>

        <div className="mb-4 font-semibold">
          Total: ₹{totalAmount}
        </div>

        {/* EXPENSE LIST */}
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="bg-gray-800 p-4 rounded-xl mb-4"
          >
            <h2 className="text-lg font-semibold">
              {exp.description}
            </h2>
            <p>Amount: ₹{exp.amount}</p>
            <p>Split per person: ₹{exp.splitAmount}</p>
            <p>Paid by: {exp.paidBy}</p>

            <button
              onClick={() => deleteExpense(exp.id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete Expense
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}