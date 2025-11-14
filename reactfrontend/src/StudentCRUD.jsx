import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentCRUD() {
  const API = import.meta.env.VITE_API_URL + "/students";


  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  // Load all students
  const loadData = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Input Handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update Student
  const handleSubmit = async () => {
    if (editingId === null) {
      await axios.post(API, form); // ADD
    } else {
      await axios.put(`${API}/${editingId}`, form); // UPDATE
      setEditingId(null);
    }
    setForm({ name: "", email: "" });
    loadData();
  };

  // Delete Student
  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadData();
  };

  // Load data into form for edit
  const editStudent = (s) => {
    setForm({ name: s.name, email: s.email });
    setEditingId(s.id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Student CRUD</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {editingId === null ? "Add Student" : "Update Student"}
      </button>

      <hr />

      <h3>All Students</h3>
      {students.map((s) => (
        <div key={s.id} style={{ marginBottom: 10 }}>
          <b>{s.name}</b> — {s.email}
          <button style={{ marginLeft: 10 }} onClick={() => editStudent(s)}>
            Edit
          </button>
          <button style={{ marginLeft: 10 }} onClick={() => deleteStudent(s.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
