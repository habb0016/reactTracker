import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from './db';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Header from './components/Header';
import { useParams } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Add this state
  const { userId } = useParams(); // Get the userId from the URL

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'user'));
        const usersData = usersCollection.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    const fetchCurrentUser = async () => {
      const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(currentUserData);

      // Fetch the associated user's data based on the userID
      try {
        const userDocRef = doc(db, 'user', currentUserData.userID);
        const userDocSnapshot = await getDoc(userDocRef);
        const userDocData = userDocSnapshot.data();
        if (userDocData) {
          // Update the currentUser object with user data
          setCurrentUser(prevUser => ({ ...prevUser, ...userDocData }));
        }
      } catch (error) {
        console.error('Error fetching current user data', error);
      }
    };

    fetchUsers();
    fetchCurrentUser(); // Fetch the current user from local storage

  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h1 className="mb-4">Dashboard</h1>
        {/* Display greeting after fetching user data */}
        {currentUser && (
          <h2>Hi {currentUser.firstName},</h2>
        )}
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">Users</div>
              <ul className="list-group list-group-flush">
                {users.map((user, index) => (
                  <li className="list-group-item" key={index}>
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">Current User</div>
              <div className="card-body">
                {currentUser && (
                  <div>
                    <h3>{currentUser.firstName} {currentUser.lastName}</h3>
                    {/* ... Other user details */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default App;
