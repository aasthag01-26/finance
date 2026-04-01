import { TrendingUp, TrendingDown, Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const SummaryCard = ({ title, value, type }) => {
  // Logic to pick icon and color based on type
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case "total balance": return <Wallet className="text-blue-400" size={20} />;
      case "total income": return <ArrowUpCircle className="text-green-400" size={20} />;
      case "total expenses": return <ArrowDownCircle className="text-red-400" size={20} />;
      default: return <Wallet size={20} />;
    }
  };

  return (
    <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-sm hover:border-gray-700 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-white">{value}</h3>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-xl">
          {getIcon()}
        </div>
      </div>
      
      {/* Optional: Add a small trend indicator like the left image */}
      <div className="mt-4 flex items-center gap-1">
        <span className="flex items-center text-xs font-medium text-green-400">
          <TrendingUp size={14} className="mr-1" /> +12.5%
        </span>
        <span className="text-gray-500 text-xs font-medium">from last month</span>
      </div>
    </div>
  );
};

export default SummaryCard;