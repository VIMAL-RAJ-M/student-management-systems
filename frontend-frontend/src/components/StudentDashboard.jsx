import React, {useEffect, useState} from "react";

function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('studentUsername');
    fetch(`http://localhost:8080/api/students/me?username=${username}`)
      .then(res=>res.ok?res.json():null)
      .then(setStudent);
  }, []);

  if (!student) return <div>Loading...</div>;

  return (
    <section>
      <h2>Welcome, {student.name || student.username}</h2>
      <div style={{background:"#f1f5f9", padding:24, borderRadius:10}}>
        <p><b>Roll No:</b> {student.rollNo}</p>
        <p><b>Department:</b> {student.department}</p>
        <p><b>Year:</b> {student.year}</p>
        <p><b>Courses:</b> {student.courses}</p>
        <p><b>Username:</b> {student.username}</p>
      </div>
    </section>
  );
}
export default StudentDashboard;
