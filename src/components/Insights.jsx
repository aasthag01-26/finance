import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Insights = () => {
  const { transactions } = useContext(AppContext);

  const expenses = transactions.filter(t => t.type === "expense");

  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

  const avgExpense = expenses.length
    ? (totalExpense / expenses.length).toFixed(2)
    : 0;

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const savings = income - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  <div className="bg-gray-800 p-4 rounded border-l-4 border-red-500">
    <p className="text-gray-400 text-sm">Total Expense</p>
    <h3 className="text-xl font-bold">${totalExpense}</h3>
  </div>
  <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-500">
    <p className="text-gray-400 text-sm">Average Expense</p>
    <h3 className="text-xl font-bold">${avgExpense}</h3>
  </div>
  <div className="bg-gray-800 p-4 rounded border-l-4 border-green-500">
    <p className="text-gray-400 text-sm">Potential Savings</p>
    <h3 className="text-xl font-bold">${savings}</h3>
  </div>
</div>
  );
};

export default Insights;