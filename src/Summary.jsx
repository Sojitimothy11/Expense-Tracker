function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const fmt = (n) =>
    n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Total Income</h3>
        <p className="card-amount income-amount">£{fmt(totalIncome)}</p>
      </div>
      <div className="summary-card">
        <h3>Total Expenses</h3>
        <p className="card-amount expense-amount">£{fmt(totalExpenses)}</p>
      </div>
      <div className="summary-card">
        <h3>Balance</h3>
        <p className={`card-amount ${balance >= 0 ? 'balance-positive' : 'balance-negative'}`}>
          {balance < 0 ? '-' : ''}£{fmt(Math.abs(balance))}
        </p>
      </div>
    </div>
  );
}

export default Summary
