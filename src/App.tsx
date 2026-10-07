import './App.css'
import React, { useState } from "react";

type Student = {
  rollno: number;
  name: string;
  age: number;
};

function App() {

  const [rollno, setRollno] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchStudent = () => {

    if (rollno === "") {
      setError("Please enter roll number");
      setStudent(null);
      return;
    }

    setLoading(true);
    setError("");
    setStudent(null);

    fetch(`http://localhost:5000/students/${rollno}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Student not found");
        }

        return response.json();
      })
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>

      <h1>Student Details</h1>

      <label>Enter Roll No: </label>

      <input
        type="text"
        value={rollno}
        onChange={(e) => setRollno(e.target.value)}
      />

      <button onClick={searchStudent}>
        Search
      </button>

      <br />
      <br />

      {loading && (
        <p>Loading...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {student && (
        <div>

          <h2>Student Details</h2>

          <p>
            Roll No: {student.rollno}
          </p>

          <p>
            Name: {student.name}
          </p>

          <p>
            Age: {student.age}
          </p>

         </div>
      )}

    </div>
  );
}



export default App
