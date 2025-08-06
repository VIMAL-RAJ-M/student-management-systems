import React, { useState } from "react";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("Logging in...");
    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {'Content-Type':"application/json"},
        body: JSON.stringify({username, password}),
      });
      if (res.ok) {
        localStorage.setItem('role', 'admin');
        alert('Welcome Admin!');
        window.location.href='/admin/dashboard';
      } else {
        setMsg("Invalid credentials");
      }
    } catch {
      setMsg("Network error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input placeholder="Username" required value={username} onChange={e=>setUsername(e.target.value)} />
      <input type="password" placeholder="Password" required value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
      {msg && <div style={{color:'crimson'}}>{msg}</div>}
    </form>
  );
}
export default AdminLogin;
