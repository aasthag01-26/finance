import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Lazy Initialization: Initial state define karne ka best tarika
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) return JSON.parse(saved);
    
    // Default data agar LocalStorage khali ho
    return [
      { id: 1, description: "Salary", amount: 5000, category: "Salary", type: "income", date: "2026-03-01" },
      { id: 2, description: "Grocery", amount: 200, category: "Food", type: "expense", date: "2026-03-02" },
      { id: 3, description: "Uber", amount: 150, category: "Transport", type: "expense", date: "2026-03-03" }
    ];
  });

  const [role, setRole] = useState("viewer");

  // 2. Persistent Storage: Jab bhi transactions badle, save karein
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;