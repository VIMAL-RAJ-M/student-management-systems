import React, { useEffect, useState } from "react";
import StudentForm from "./StudentForm";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null); // student object
  const [showForm, setShowForm] = useState(false);

  const fetchStudents = async () => {
    let res = await fetch("http://localhost:8080/api/students");
    setStudents(await res.json());
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`http://localhost:8080/api/students/${id}`, {method:'DELETE'});
    fetchStudents();
  };

  // For add/edit:
  const handleDone = () => {
    setShowForm(false);
    setEditing(null);
    fetchStudents();
  };

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <button onClick={()=> {setEditing(null); setShowForm(true);}} style={{margin:'10px 0'}}>+ Add Student</button>
      {showForm && (
        <StudentForm student={editing} onDone={handleDone} onCancel={()=>setShowForm(false)} />
      )}
      <table className="table">
        <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Roll No</th><th>Department</th><th>Year</th><th>Courses</th><th>User</th><th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {students.length === 0 && <tr><td colSpan={8}>No students yet.</td></tr>}
        {students.map(st=>(
          <tr key={st.id}>
            <td>{st.id}</td>
            <td>{st.name}</td>
            <td>{st.rollNo}</td>
            <td>{st.department}</td>
            <td>{st.year}</td>
            <td>{st.courses}</td>
            <td>{st.username}</td>
            <td>
              <button onClick={()=>{setEditing(st); setShowForm(true);}}>Edit</button>
              <button onClick={()=>handleDelete(st.id)} style={{background:'#e11d48', marginLeft:2}}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </section>
  );
}
export default AdminDashboard;
