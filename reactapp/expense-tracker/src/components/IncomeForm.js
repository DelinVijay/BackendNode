import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

function IncomeForm({ setIncome }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const income = { amount: parseFloat(amount), date };

    try {
      await axios.post('https://backend-node-2-beryl.vercel.app/api/v1/users/createIncome', income); // Ensure this matches your backend route
      setIncome((prevIncome) => [...prevIncome, income]);
      setAmount('');
      setDate('');
    } catch (error) {
      res.status(500).json({"data":"","msg":"","err":err.message})
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        <span>ENTER INCOME</span>
        <input
          className="input-box"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        <span>ENTER DATE</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="input-box"
        />
      </label>
      <button type="submit" className="btn">ADD</button>
    </form>
  );
}

export default IncomeForm;
