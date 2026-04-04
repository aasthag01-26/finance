import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";
import SummaryCard from "../components/SummaryCard";
import Charts from "../components/Charts";
import Insights from "../components/Insights";

const Dashboard = () => {
  const { role, setRole, transactions } = useContext(AppContext);
  const [dark, setDark] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // --- Dynamic Logic ---
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // 1. Logic for Category Breakdown - Filtered to only show expenses
  const categories = ["Food", "Transport", "Shopping", "Entertainment"];
  const categorySummary = categories.map(cat => ({
    name: cat,
    amount: transactions
      .filter(t => t.category === cat && t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0)
  })).filter(c => c.amount > 0);

  // 2. Saving Goal Logic
  const targetGoal = 10000;
  const progressPercent = Math.max(0, Math.min((balance / targetGoal) * 100, 100));

  // 3. Greeting Logic
  const getTimeGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className={dark ? "bg-black text-white min-h-screen p-6 transition-colors" : "bg-gray-50 text-black min-h-screen p-6 transition-colors"}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 🔝 Topbar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            {/* FIXED: Dynamic Greeting integrated inside the UI */}
            <h1 className="text-3xl font-extrabold tracking-tight">
              {getTimeGreeting()}, Aastha!
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your wealth with precision</p>
          </div>

          <div className="flex gap-4 items-center">
            <button onClick={() => setDark(!dark)} className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all border border-gray-700 text-lg">
              {dark ? "☀️" : "🌙"}
            </button>
            <div className="bg-gray-800 p-1 rounded-xl border border-gray-700">
              <select
                className="bg-transparent px-3 py-1 outline-none text-sm font-medium cursor-pointer text-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="viewer" className="bg-gray-900">Viewer Mode</option>
                <option value="admin" className="bg-gray-900">Admin Mode</option>
              </select>
            </div>
          </div>
        </div>

        {/* 🚀 Main Grid Layout (Everything else stays same) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (8 Units) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SummaryCard title="Total Balance" value={`$${balance.toLocaleString()}`} />
              <SummaryCard title="Total Income" value={`$${totalIncome.toLocaleString()}`} />
              <SummaryCard title="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} />
            </div>

            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Revenue Analytics</h3>
              <Charts />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold px-1 text-gray-400">Transactions History</h2>
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
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xs font-bold mb-4 text-gray-400 uppercase tracking-widest">Savings Goal: $10k</h3>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-400">Current Progress</span>
                <span className="text-xs font-bold text-blue-500">{progressPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.6)]" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 min-h-[250px]">
              <h3 className="text-xs font-bold mb-6 uppercase tracking-widest text-gray-400">Spending Breakdown</h3>
              <div className="space-y-5">
                {categorySummary.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-300 font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold">${item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-2xl border border-blue-800/50">
              <h3 className="text-xs font-bold mb-3 text-blue-400 uppercase">Smart AI Tip</h3>
              <Insights /> 
              <button className="w-full mt-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-[10px] uppercase font-bold hover:bg-blue-600 transition-all">
                Generate Full Audit
              </button>
            </div>
          </div>
        </div>

        {openModal && <AddTransactionModal setOpen={setOpenModal} />}
      </div>
    </div>
  );
};

export default Dashboard;