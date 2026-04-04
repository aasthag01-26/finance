import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Papa from "papaparse";

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
    const csv = Papa.unparse(transactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.click();
  };

  // 📥 Import logic
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const newData = results.data.map((row, index) => ({
            id: Date.now() + index,
            date: row.Date || new Date().toISOString().split('T')[0],
            description: row.Description || "Imported Data",
            amount: parseFloat(row.Amount) || 0,
            category: row.Category || "Other",
            type: row.Type?.toLowerCase() === "income" ? "income" : "expense"
          }));
          
          setTransactions([...transactions, ...newData]);
          alert(`${newData.length} transactions imported successfully!`);
        },
      });
    }
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

        <div className="flex gap-3 w-full md:w-auto">
          {/* 📥 Import Label (acts as button) */}
          <label className="flex-1 md:flex-none cursor-pointer bg-blue-600/10 border border-blue-500/30 text-blue-400 px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
            <span>Import CSV</span>
            <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
          </label>

          {/* 📤 Export Button */}
          <button
            onClick={handleExport}
            className="flex-1 md:flex-none bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2 rounded-xl border border-gray-700 transition-all text-sm font-medium flex items-center justify-center gap-2"
          >
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 📊 Table Wrapper */}
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
                {role === "admin" && (
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors">Edit</button>
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

      {/* Modal logic stays here... */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#111827] border border-gray-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-4">Transaction Details</h2>
            <div className="space-y-4 text-gray-300">
               <p><span className="text-gray-500">Desc:</span> {selected.description}</p>
               <p><span className="text-gray-500">Amount:</span> ${selected.amount}</p>
               <p><span className="text-gray-500">Type:</span> {selected.type}</p>
            </div>
            <button className="mt-8 w-full bg-blue-600 py-3 rounded-xl font-bold" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;