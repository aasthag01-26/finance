import { createContext, useState, useEffect } from "react";
import { transactions as initialData } from "../data/mockData"; // Import your mockData

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Check if data exists in local storage, otherwise use initialData
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialData;
  });
  
  const [role, setRole] = useState("viewer");

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AppContext.Provider value={{ transactions, setTransactions, role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};