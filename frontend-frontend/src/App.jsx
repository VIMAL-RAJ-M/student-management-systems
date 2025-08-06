import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import './style.css';

function App() {
  // Auth state is stored in localStorage for simplicity
  const isAdmin = localStorage.getItem('role') === 'admin';
  const isStudent = localStorage.getItem('role') === 'student';

  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>Student Management System</h1>
          <nav>
            <Link to="/" style={{color:'#bae6fd', marginRight:10}}>Home</Link>
            <Link to="/admin/login" style={{color:'#bae6fd', marginRight:10}}>Admin Login</Link>
            <Link to="/student/login" style={{color:'#bae6fd'}}>Student Login</Link>
            {(isAdmin || isStudent) && (
              <button style={{float:'right'}} onClick={() => {localStorage.clear(); window.location.href='/'}}>Logout</button>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={!isAdmin ? <AdminLogin /> : <Navigate to="/admin/dashboard"/>} />
            <Route path="/student/login" element={!isStudent ? <StudentLogin /> : <Navigate to="/student/dashboard"/>} />
            <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login"/>} />
            <Route path="/student/dashboard" element={isStudent ? <StudentDashboard /> : <Navigate to="/student/login"/>} />
            <Route path="*" element={<h3>404 Not Found</h3>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
const Home = () => (
  <section style={{textAlign:'center'}}>
    <h2>Welcome!</h2>
    <p>Please login as Admin or Student to continue.</p>
  </section>
);

export default App;
