import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function Summary({ income, expenses }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [updateItem, setUpdateItem] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://backend-node-2-beryl.vercel.app/api/v1/users/readExpense');
        const expenseData = response.data.data;
        setTotalExpenses(expenseData.reduce((total, entry) => total + entry.price, 0));
        setFilteredExpenses(expenseData); // Initialize filtered expenses with all expenses
      } catch (error) {
        res.status(500).json({"data":"","msg":"","err":err.message})
      }
    };

    const fetchIncome = async () => {
      try {
        const response = await axios.get('https://backend-node-2-beryl.vercel.app/api/v1/users/readIncome');
        setTotalIncome(response.data.data.reduce((total, entry) => total + entry.amount, 0));
      } catch (error) {
        res.status(500).json({"data":"","msg":"","err":err.message})
      }
    };

    fetchExpenses();
    fetchIncome();
  }, []);

  useEffect(() => {
    // Filter expenses based on search query
    const fetchFilteredExpenses = async () => {
      try {
        const response = await axios.get('/api/v1/users/readExpense');
        const expenses = response.data.data;
        const filtered = expenses.filter(expense =>
          expense.item.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredExpenses(filtered);
      } catch (error) {
        res.status(500).json({"data":"","msg":"","err":err.message});
      }
    };

    fetchFilteredExpenses();
  }, [searchQuery]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedExpense = { item: updateItem, price: parseFloat(updatePrice) };

    try {
      await axios.put(`https://backend-node-beryl.vercel.app/api/v1/users/updateExpense/${selectedExpenseId}`, updatedExpense);
      setUpdateItem('');
      setUpdatePrice('');
      setSelectedExpenseId(null);
      // Refresh expenses list
      const response = await axios.get('https://backend-node-beryl.vercel.app/api/v1/users/readExpense');
      setFilteredExpenses(response.data.data);
    } catch (error) {
      res.status(500).json({"data":"","msg":"","err":err.message});
    }
  };

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <p>Total Income: ${totalIncome.toFixed(2)}</p>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p>Balance: ${balance.toFixed(2)}</p>

      <div className="search-update">
        <h3>Search Expenses</h3>
        <input
          type="text"
          placeholder="Search by item"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-box"
        />

        <div className="results">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <p>Item: {expense.item}</p>
              <p>Price: ${expense.price.toFixed(2)}</p>
              <button onClick={() => {
                setUpdateItem(expense.item);
                setUpdatePrice(expense.price);
                setSelectedExpenseId(expense.id);
              }}>Edit</button>
            </div>
          ))}
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
