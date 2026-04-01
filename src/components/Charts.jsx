import { useContext } from "react";
import { AppContext } from "../context/AppContext"; // Import context
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from "recharts";

const Charts = () => {
  const { transactions } = useContext(AppContext); // Get real transactions

  // 📈 1. Trend Data (Income vs Expense per month)
  // Tip: Abhi ke liye ye hardcoded rehne de sakti hain ya transactions se map kar sakti hain
  const trendData = [
    { month: "Jan", income: 5000, expense: 2000 },
    { month: "Feb", income: 6000, expense: 2500 },
    { month: "Mar", income: 7200, expense: 2800 },
  ];

  // 🍕 2. DYNAMIC Category Data Logic (Spending Breakdown)
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-10">
      
      {/* Balance Trend (Line Chart) */}
      <div className="h-64 w-full">
        <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">Balance Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "12px", color: "#fff" }}
            />
            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Spending Breakdown (Pie Chart) */}
      <div className="h-64 w-full pt-4">
        <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">Spending Breakdown</h3>
        {expenseData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData} // Use dynamic expenseData here
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "12px" }}
              />
              <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 italic">
            No expenses to show breakdown
          </div>
        )}
      </div>

    </div>
  );
};

export default Charts;