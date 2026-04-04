import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Insights = ({ isDark }) => { // 👈 Destructure prop here
  const { transactions } = useContext(AppContext);

  const expenses = transactions.filter(t => t.type === "expense");
  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
  const avgExpense = expenses.length ? (totalExpense / expenses.length).toFixed(2) : 0;
  const income = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const savings = income - totalExpense;

  // Dynamic Class for cards
  const cardClass = isDark 
    ? "bg-gray-900/50 border-gray-800 text-white" 
    : "bg-gray-100/50 border-gray-200 text-black shadow-sm";

  return (
    <div className="grid grid-cols-1 gap-4"> {/* Side-panel ke liye grid-cols-1 hi rakhein */}
      <div className={`${cardClass} p-4 rounded-xl border-l-4 border-red-500`}>
        <p className="text-gray-500 text-[10px] font-bold uppercase">Total Expense</p>
        <h3 className="text-lg font-extrabold">${totalExpense.toLocaleString()}</h3>
      </div>

      <div className={`${cardClass} p-4 rounded-xl border-l-4 border-blue-500`}>
        <p className="text-gray-500 text-[10px] font-bold uppercase">Average Expense</p>
        <h3 className="text-lg font-extrabold">${avgExpense.toLocaleString()}</h3>
      </div>

      <div className={`${cardClass} p-4 rounded-xl border-l-4 border-green-500`}>
        <p className="text-gray-500 text-[10px] font-bold uppercase">Potential Savings</p>
        <h3 className="text-lg font-extrabold">${savings.toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default Insights;