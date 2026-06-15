import { useState } from 'react'
import { CATEGORIES } from './constants.js'

const fmt = (n) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function TransactionList({ transactions, onDelete }) {
  const [filterType,     setFilterType]     = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [confirmId,      setConfirmId]      = useState(null);

  let filtered = transactions;
  if (filterType     !== 'all') filtered = filtered.filter(t => t.type     === filterType);
  if (filterCategory !== 'all') filtered = filtered.filter(t => t.category === filterCategory);

  const handleDelete = (id) => {
    onDelete(id);
    setConfirmId(null);
  };

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No transactions match your filters.</p>
      ) : (
        <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="col-date">Date</th>
              <th>Description</th>
              <th className="col-cat">Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="col-date">{t.date}</td>
                <td>
                  <span className="tx-desc">{t.description}</span>
                  <span className={`category-badge cat-${t.category} col-cat-inline`}>
                    {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                  </span>
                </td>
                <td className="col-cat">
                  <span className={`category-badge cat-${t.category}`}>
                    {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                  </span>
                </td>
                <td className={t.type === 'income' ? 'income-amount' : 'expense-amount'}>
                  {t.type === 'income' ? '+' : '−'}£{fmt(t.amount)}
                </td>
                <td>
                  {confirmId === t.id ? (
                    <div className="confirm-actions">
                      <span className="confirm-label">Delete?</span>
                      <button className="confirm-yes" onClick={() => handleDelete(t.id)}>Yes</button>
                      <button className="confirm-no"  onClick={() => setConfirmId(null)}>No</button>
                    </div>
                  ) : (
                    <button className="delete-btn" onClick={() => setConfirmId(t.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList
