import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const COLORS = ['#e05252', '#e08c52', '#e0d052', '#52a3e0', '#9b52e0', '#52e09b', '#e052a3'];

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <div className="chart-wrapper">
        <BarChart width={500} height={300} data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 13 }} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}

export default SpendingChart;
