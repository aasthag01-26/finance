import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react"; // Icon for close button

const AddTransactionModal = ({ setOpen }) => {
  const { transactions, setTransactions } = useContext(AppContext);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split('T')[0] // Default to today
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Form refresh prevent karega
    if (!form.description || !form.amount || !form.date) {
      alert("Please fill all required fields");
      return;
    }

    const newTxn = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount)
    };

    setTransactions([newTxn, ...transactions]); // Naya transaction top par dikhega
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-[#111827] border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
        
        {/* Close Icon */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-white">Add New Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Description</label>
            <input
              type="text"
              placeholder="e.g. Monthly Rent"
              value={form.description}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all text-white"
              onChange={(e) => setForm({...form, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Amount ($)</label>
              <input
                type="number"
                placeholder="0.00"
                value={form.amount}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all text-white"
                onChange={(e) => setForm({...form, amount: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Date</label>
              <input
                type="date"
                value={form.date}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all text-white"
                onChange={(e) => setForm({...form, date: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Category</label>
              <select
                value={form.category}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all text-white cursor-pointer"
                onChange={(e) => setForm({...form, category: e.target.value})}
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Salary</option>
                <option>Bills</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Type</label>
              <select
                value={form.type}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all text-white cursor-pointer"
                onChange={(e) => setForm({...form, type: e.target.value})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button 
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-900/20 transition-all"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;