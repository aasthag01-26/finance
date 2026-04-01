import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";
import SummaryCard from "../components/SummaryCard";
import Charts from "../components/Charts";
import Insights from "../components/Insights";

const Dashboard = () => {
  const { role, setRole, transactions } = useContext(AppContext);

  // Calculate dynamic totals
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const [dark, setDark] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={dark ? "bg-black text-white min-h-screen p-6" : "bg-gray-50 text-black min-h-screen p-6"}>
        <div className="max-w-7xl mx-auto px-4">
        
        {/* 🔝 Topbar */}
        <div className="flex justify-between items-center mb-8">
            <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Finance Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Track your income, expenses and spending patterns</p>
            </div>

            <div className="flex gap-4 items-center">
            <button onClick={() => setDark(!dark)} className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all border border-gray-700">
                {dark ? "☀️" : "🌙"}
            </button>
            <div className="bg-gray-800 p-1 rounded-xl border border-gray-700">
                <select
                className="bg-transparent px-3 py-1 outline-none text-sm font-medium cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                >
                <option value="viewer" className="bg-gray-900">Viewer Mode</option>
                <option value="admin" className="bg-gray-900">Admin Mode</option>
                </select>
            </div>
            </div>
        </div>

        {/* 🚀 Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN (8 Units) */}
            <div className="lg:col-span-8 space-y-8">
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard title="Total Balance" value={`$${balance.toLocaleString()}`} />
                <SummaryCard title="Total Income" value={`$${totalIncome.toLocaleString()}`} />
                <SummaryCard title="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} />
            </div>

            {/* Charts Section */}
            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
                <Charts />
            </div>

            {/* Table Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold px-1">Recent Transactions</h2>
                {role === "admin" && (
                    <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 text-sm"
                    onClick={() => setOpenModal(true)}
                    >
                    + Add Transaction
                    </button>
                )}
                </div>
                <TransactionTable />
            </div>
            </div>

            {/* RIGHT COLUMN (4 Units) */}
            <div className="lg:col-span-4 space-y-8">
            
            {/* Spending Breakdown (Requirement #1: Categorical Visualization) */}
            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl min-h-[300px]">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-gray-400 text-xs">
                    Spending Breakdown
                    </h3>
                {/* Yahan aap Donut chart component daal sakti hain */}
                <Charts />
            </div>

            {/* Insights Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold px-1">Smart Insights</h3>
                <Insights />
            </div>
            
            </div>
        </div>

        {/* ✅ Modal */}
        {openModal && <AddTransactionModal setOpen={setOpenModal} />}
        </div>
    </div>
    );
};

export default Dashboard;