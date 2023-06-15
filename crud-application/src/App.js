import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null);
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (name.trim() === "") {
      alert("Please enter a name");
      return;
    }

    if (email.trim() === "") {
      alert("Please enter an email address");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (phone.trim() === "") {
      alert("Please enter a phone number");
      return;
    }

    if (!validatePhone(phone)) {
      alert("Please enter a valid phone number");
      return;
    }

   
    if (gender === "") {
      alert("Please select a gender");
      return;
    }
    if (!dob) {
      alert("Please enter a date of birth");
      return;
    }


    // Create a new user
    const user = {
      name,
      email,
      phone,
      dob: dob.toISOString().split("T")[0], // Format the date as YYYY-MM-DD
      state,
      gender,
      city,
    };

    if (editMode) {
      // Update existing user
      const updatedData = [...data];
      updatedData[editIndex] = user;
      setData(updatedData);
      setEditMode(false);
      setEditIndex(null);
    } else {
      // Add new user
      setData([...data, user]);
    }

    // Clear the form
    setName("");
    setEmail("");
    setPhone("");
    setDob(null);
    setState("");
    setGender("");
    setCity("");
  };

  const validateEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Phone number validation regex pattern
    const phoneRegex = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleEdit = (index) => {
    const user = data[index];
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setDob(new Date(user.dob));
    setState(user.state);
    setGender(user.gender);
    setCity(user.city);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  useEffect(() => {
    // Get the user data from local storage
    const storedData = JSON.parse(localStorage.getItem("user"));

    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    // Update local storage when data changes
    localStorage.setItem("user", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <h1>CRUD Operation in React</h1>
      <h3>
        <u>Add Profile</u>
      </h3>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field input-field-small"
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="input-field input-field-small"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field input-field-small"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input-field input-field-small"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <div className="input-field">
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Date of Birth"
          />
        </div>
        <br />

        <button className="submit-button" type="submit">
          {editMode ? "Update" : "Add Profile"}
        </button>
      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>State</th>
            <th>City</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dob}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td>{user.gender}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
