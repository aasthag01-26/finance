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

  // ❌ Delete logic
  const handleDelete = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
  };

  // 📤 Export logic
  const handleExport = () => {
    alert("Exporting data to CSV...");
  };

  return (
    <div className="bg-[#111827] p-4 md:p-6 rounded-2xl border border-gray-800 shadow-xl">

      {/* 🔝 Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-4 pr-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm text-white"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={handleExport}
          className="w-full md:w-auto bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2 rounded-xl border border-gray-700 transition-all text-sm font-medium flex items-center justify-center gap-2"
        >
          <span>Export CSV</span>
        </button>
      </div>

      {/* 📊 Table Wrapper - FIXED FOR MOBILE */}
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse min-w-[700px]"> 
          <thead>
            <tr className="bg-gray-800/50 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Description</th>
              <th className="px-4 py-4">Amount</th>
              <th className="px-4 py-4">Category</th>
              {role === "admin" && <th className="px-4 py-4 text-center">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {filtered.map((t) => (
              <tr 
                key={t.id} 
                className="hover:bg-gray-800/30 cursor-pointer transition-colors group"
                onClick={() => setSelected(t)}
              >
                <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">{t.date}</td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-200">{t.description}</td>
                <td className={`px-4 py-4 text-sm font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                   {t.type === 'income' ? `+ $${t.amount.toLocaleString()}` : `- $${t.amount.toLocaleString()}`}
                </td>
                <td className="px-4 py-4">
                   <span className="bg-gray-800/80 px-3 py-1 rounded-full text-[10px] text-gray-400 font-bold border border-gray-700 uppercase">
                     {t.category}
                   </span>
                </td>

                {/* 🔐 Admin Actions */}
                {role === "admin" && (
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors">
                        Edit
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }}
                        className="text-xs text-gray-500 hover:text-red-400 font-bold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ❌ Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-sm">No transactions found matching "{search}"</p>
        </div>
      )}

      {/* ✅ Modal (Details View) */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#111827] border border-gray-800 p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-4">Transaction Details</h2>
            
            <div className="space-y-4">
              <DetailRow label="Description" value={selected.description} />
              <DetailRow label="Amount" value={`$${selected.amount}`} isAmount type={selected.type} />
              <DetailRow label="Category" value={selected.category} isTag />
              <DetailRow label="Type" value={selected.type} />
              <DetailRow label="Date" value={selected.date} />
            </div>

            <button
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Component for Modal Rows
const DetailRow = ({ label, value, isAmount, type, isTag }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className={`text-sm font-semibold ${isAmount ? (type === 'income' ? 'text-green-400' : 'text-red-400') : 'text-gray-200'} ${isTag ? 'bg-gray-800 px-2 py-1 rounded text-xs border border-gray-700' : ''}`}>
      {value}
    </span>
  </div>
);

export default TransactionTable;