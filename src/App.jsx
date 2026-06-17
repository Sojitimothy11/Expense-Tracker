import { useEffect, useState, Suspense, lazy } from 'react'
import {
  collection, onSnapshot, addDoc, deleteDoc,
  doc, query, orderBy
} from 'firebase/firestore'
import './App.css'
import { db } from './firebase.js'
import { useAuth } from './AuthContext.jsx'
import Login from './Login.jsx'
import Summary from './Summary.jsx'
import TransactionForm from './TransactionForm.jsx'
import TransactionList from './TransactionList.jsx'

const SpendingChart = lazy(() => import('./SpendingChart.jsx'))

function App() {
  const { user, authLoading, signOut } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [dataLoading, setDataLoading]   = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'transactions'),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTransactions(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setDataLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAdd = (tx) => {
    const { id: _id, ...data } = tx;
    addDoc(collection(db, 'users', user.uid, 'transactions'), data);
  };

  const handleDelete = (id) => {
    deleteDoc(doc(db, 'users', user.uid, 'transactions', id));
  };

  if (authLoading) return <div className="app-loading"><div className="spinner" /></div>;
  if (!user)       return <Login />;

  const firstName = user.displayName?.split(' ')[0] ?? 'there';

  return (
    <>
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-top">
            <div className="hero-text">
              <h1>Finance Tracker</h1>
              <p className="subtitle">Welcome back, {firstName}</p>
            </div>
            <div className="user-menu">
              {user.photoURL && (
                <img src={user.photoURL} alt={user.displayName} className="avatar" referrerPolicy="no-referrer" />
              )}
              <button className="signout-btn" onClick={signOut}>Sign out</button>
            </div>
          </div>
          <Summary transactions={transactions} />
        </div>
      </header>

      <main className="main-content">
        {dataLoading ? (
          <div className="data-loading"><div className="spinner" /></div>
        ) : (
          <>
            <div className="two-col">
              <Suspense fallback={<div className="data-loading"><div className="spinner" /></div>}>
                <SpendingChart transactions={transactions} />
              </Suspense>
              <TransactionForm onAdd={handleAdd} />
            </div>
            <TransactionList transactions={transactions} onDelete={handleDelete} />
          </>
        )}
      </main>
    </>
  );
}

export default App
