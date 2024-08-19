import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function Summary() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [updateItem, setUpdateItem] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  // Fetch income and expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/v1/users/readExpense');
        const expenseData = response.data.data || [];
        setTotalExpenses(expenseData.reduce((total, entry) => total + (entry.price || 0), 0));
        setFilteredExpenses(expenseData); // Initialize filtered expenses with all expenses
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    const fetchIncome = async () => {
      try {
        const response = await axios.get('/api/v1/users/readIncome');
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
      const response = await axios.get('/api/v1/users/readExpense');
      const expenses = response.data.data || [];
      const filtered = expenses.filter(expense =>
        expense.item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExpenses(filtered);
    } catch (error) {
      console.error('Error fetching filtered expenses:', error);
    }
  };

  // Handle expense update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedExpense = { item: updateItem, price: parseFloat(updatePrice) };

    try {
      await axios.put(`/api/v1/users/updateExpense/${selectedExpenseId}`, updatedExpense);
      setUpdateItem('');
      setUpdatePrice('');
      setSelectedExpenseId(null);
      // Refresh expenses list
      const response = await axios.get('/api/v1/users/readExpense');
      setFilteredExpenses(response.data.data || []);
    } catch (error) {
      console.error('Error updating expense:', error);
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

      <div className="search-update">
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
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <p>Item: {expense.item}</p>
                <p>Price: {formatCurrency(expense.price)}</p>
                <button onClick={() => {
                  setUpdateItem(expense.item);
                  setUpdatePrice(expense.price);
                  setSelectedExpenseId(expense.id);
                }}>Edit</button>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>

        {selectedExpenseId && (
          <form onSubmit={handleUpdate} className="form">
            <h3>Update Expense</h3>
            <label>
              <span>Update Item</span>
              <input
                type="text"
                value={updateItem}
                onChange={(e) => setUpdateItem(e.target.value)}
                className="input-box"
              />
            </label>
            <label>
              <span>Update Price</span>
              <input
                type="number"
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
                className="input-box"
              />
            </label>
            <button type="submit" className="btn">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Summary;
