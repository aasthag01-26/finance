import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const TransactionTable = () => {
  const { transactions, setTransactions, role } = useContext(AppContext);
const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  // 🔍 Filter logic
  const filtered = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  // ❌ Delete
  const handleDelete = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
  };

  // 📤 Export
  const handleExport = () => {
    alert("Exporting data to CSV...");
  };

  return (
    <div className="bg-gray-900 p-4 rounded">

      {/* 🔝 Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-72">
            <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-4 pr-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <button
            onClick={handleExport}
            className="w-full md:w-auto bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl border border-gray-700 transition-all text-sm flex items-center justify-center gap-2"
        >
            <span>Export</span>
        </button>
        </div>

      {/* 📊 Table */}
      <table className="w-full text-left border-collapse overflow-hidden rounded-lg">
        <thead>
          <tr className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
            <th className="px-4 py-3 text-left font-medium">Date</th>
            <th className="px-4 py-3 text-left font-medium">Description</th>
            <th className="px-4 py-3 text-left font-medium">Amount</th>
            <th className="px-4 py-3 text-left font-medium">Category</th>
            <th className="px-4 py-3 text-left font-medium">Type</th>
            {role === "admin" && <th className="px-4 py-3 text-left font-medium">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} 
            className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors"
            onClick={() => setSelected(t)}
            >
            <td className="px-4 py-4 text-sm text-gray-400">{t.date}</td>
            <td className="px-4 py-4 text-sm font-medium text-white">{t.description}</td>
            <td className={`px-4 py-4 text-sm font-bold ${t.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                {t.type === 'income' ? `+ $${t.amount}` : `- $${t.amount}`}
            </td>
            <td className="px-4 py-4 text-sm text-gray-400">
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">{t.category}</span>
            </td>

              {/* 🔐 Admin Actions */}
              {role === "admin" && (
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 transition-colors">
                    {/* Pencil Icon */}
                    Edit
                    </button>
                    <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                    >
                    {/* Trash Icon */}
                    Delete
                    </button>
                </div>

                </td>

                
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded w-96">

      <h2 className="text-lg mb-4">Transaction Details</h2>

      <p><b>Description:</b> {selected.description}</p>
      <p><b>Amount:</b> {selected.amount}</p>
      <p><b>Category:</b> {selected.category}</p>
      <p><b>Type:</b> {selected.type}</p>
      <p><b>Date:</b> {selected.date}</p>

      <button
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
        onClick={() => setSelected(null)}
      >
        Close
      </button>

    </div>
  </div>
)}

      {/* ❌ Empty State */}
      {filtered.length === 0 && (
        <p className="text-center mt-4">No transactions found</p>
      )}
    </div>

    
  );
};

export default TransactionTable;