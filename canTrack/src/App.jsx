import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from './db'; // Import the db instance
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch Users collection
    const fetchUsers = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'user'));
        const usersData = usersCollection.docs.map((doc) => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    // Fetch Accounts collection
    const fetchAccounts = async () => {
      try {
        const accountsCollection = await getDocs(collection(db, 'account'));
        const accountsData = accountsCollection.docs.map((doc) => doc.data());
        setAccounts(accountsData);
      } catch (error) {
        console.error('Error fetching accounts', error);
      }
    };

    fetchUsers();
    fetchAccounts();
  }, []);

  return (
    <>  
      <div>
        <h1>DB test</h1>
        <h2>Users:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.firstName} {user.lastName}</li>
          ))}
        </ul>
        <h2>Accounts:</h2>
        <ul>
          {accounts.map((account, index) => (
            <li key={index}>{account.username}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
