import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function Summary() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');

  // Fetch income and expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://backend-node-beryl.vercel.app/api/v1/users/readExpense');
        const expenseData = response.data.data || [];
        setTotalExpenses(expenseData.reduce((total, entry) => total + (entry.price || 0), 0));
        setFilteredExpenses(expenseData); // Initialize filtered expenses with all expenses
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    const fetchIncome = async () => {
      try {
        const response = await axios.get('https://backend-node-beryl.vercel.app/api/v1/users/readIncome');
        const incomeData = response.data.data || [];
        setTotalIncome(incomeData.reduce((total, entry) => total + (entry.amount || 0), 0));
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };

    fetchExpenses();
    fetchIncome();
  }, []);

  // Function to format numbers as currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value || 0);
  };

  // Handle search button click
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://backend-node-beryl.vercel.app/api/v1/users/readSpecificExpense/?item=${searchQuery}`);
      const expenses = response.data.data || [];
      const filtered = expenses.filter(expense =>
        expense.item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExpenses(filtered);
      if (filtered.length === 0) {
        setNoResultsMessage('No results found.');
      } else {
        setNoResultsMessage('');
      }
    } catch (error) {
      console.error('Error fetching filtered expenses:', error);
    }
  };

  // Calculate balance
  const balance = (totalIncome || 0) - (totalExpenses || 0);

  return (
    <div className="summary">
      <h2>Summary</h2>
      <p>Total Income: {formatCurrency(totalIncome)}</p>
      <p>Total Expenses: {formatCurrency(totalExpenses)}</p>
      <p>Balance: {formatCurrency(balance)}</p>

      <div className="search">
        <h3>Search Expenses</h3>
        <input
          type="text"
          placeholder="Search by item"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-box"
        />
        <button onClick={handleSearch} className="btn">Search</button>
        <div className="results">
          {noResultsMessage ? (
            <p>{noResultsMessage}</p>
          ) : (
            filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, i) => (
                <div key={i} className="expense-item">
                  <p>Item: {expense.item}</p>
                  <p>Price: {formatCurrency(expense.price)}</p>
                </div>
              ))
            ) : (
              <p>Loading...</p> // Display while waiting for the search result
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Summary;
