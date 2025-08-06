import React, {useState} from "react";

function StudentForm({student, onDone, onCancel}) {
  const isEdit = !!student;
  const [form, setForm] = useState({
    name: student?.name || "",
    rollNo: student?.rollNo || "",
    department: student?.department || "",
    year: student?.year || 1,
    courses: student?.courses || "",
    username: student?.username || "",
    password: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({...form, [e.target.name]:e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Processing...");
    try {
      const url = !isEdit ? "http://localhost:8080/api/students" : `http://localhost:8080/api/students/${student.id}`;
      const method = !isEdit ? "POST" : "PUT";
      let payload = {...form};
      // Don't overwrite password if not changed on edit
      if (isEdit && !payload.password) delete payload.password;

      let res = await fetch(url, {
        method,
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setMsg(isEdit?'Updated!':'Student Added!');
        onDone();
      } else setMsg("Error, check input");
    } catch {
      setMsg("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{background:"#f0f6ff",padding:16, borderRadius:8}}>
      <h3>{isEdit ? "Edit Student" : "Add Student"}</h3>
      <input name="name" required placeholder="Full Name" value={form.name} onChange={handleChange} />
      <input name="rollNo" required placeholder="Roll Number" value={form.rollNo} onChange={handleChange} />
      <input name="department" required placeholder="Department" value={form.department} onChange={handleChange} />
      <input name="year" type="number" min="1" max="5" placeholder="Year" required value={form.year} onChange={handleChange} />
      <input name="courses" placeholder="Courses (comma separated)" value={form.courses} onChange={handleChange} />
      <input name="username" required placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="password" type="password" placeholder={isEdit?"New Password (leave empty to keep)": "Password"} value={form.password} onChange={handleChange} />
      <button>{isEdit?'Update':'Add Student'}</button>
      <button type="button" style={{background:'#9ca3af', marginLeft:6}} onClick={onCancel}>Cancel</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
export default StudentForm;
