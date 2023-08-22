import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../db';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Clear local storage when navigating to the sign-in page
  localStorage.clear();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const q = query(collection(db, 'account'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('User not found');
        return;
      }

      const userDoc = querySnapshot.docs[0];

      if (userDoc.data().password === password) {
        // Save user information to local storage
        const userData = {
          id: userDoc.id,
          email: userDoc.data().email,
          userID: userDoc.data().userID
          // Add any other relevant fields you want to store
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));

        // Navigate to the dashboard
        navigate(`/dashboard/${userDoc.id}`);
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <Container>
      <div className="form-signin">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src="src/assets/react.svg" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating my-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {error && <div className="text-danger">{error}</div>}

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">HABB0016 © 2023</p>
        </form>
      </div>
    </Container>
  );
}

export default Login;
