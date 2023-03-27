import React, { useState, useEffect } from "react";
import "../Styles/RegisterForm.css";
import { MdWavingHand } from "react-icons/md";

export const RegisterForm = () => {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  //Create a React useEffect hook that utilizes the fetch API to retrieve a list of all users from a database and executes the side effect when the component mounts to the screen.
  useEffect(() => {
    fetch("https://crudmoduleserver.onrender.com/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  //Define a handleSubmit function in React that triggers a PUT request to update existing data in a database if the user edits data, or a POST request to store new data in the database if no existing data is being edited, upon submission of a form.
  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
    };

    //Implement a conditional statement in JavaScript that checks if all fields in a form are filled. If any fields are empty, throw an alert message to prompt the user to fill in all required fields.
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      alert("Please fill all the fields");
      return;
    }

    // Checks if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Checks if password meets requirements
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      alert(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }

    // Checks if confirm password matches password
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    //Implement a conditional statement in React that checks if the editUserId stored in state is not null. If editUserId is not null, a PUT request will be sent to the server to allow the user to edit and update existing data in the database.
    //If editUserId is null, a POST request will be sent to the server to allow the user to store new data in the database.
    if (editUserId) {
      fetch(`https://crudmoduleserver.onrender.com/users/${editUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u))
          );
          setEditUserId(null);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setGender("");
        })
        .catch((error) => console.log(error));
    } else {
      fetch("https://crudmoduleserver.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((newUser) => {
          setUsers((prevUsers) => [...prevUsers, newUser]);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setGender("");
        })
        .catch((error) => console.log(error));
    }
  };

  //Define a handleDelete function in React that is triggered when a user clicks on a delete button. The function should utilize the DELETE request method to delete the corresponding user from the database.
  const handleDelete = (id) => {
    fetch(`https://crudmoduleserver.onrender.com/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Create a handleEdit function in React that updates the editUserId state with the corresponding user_id when the user clicks on an edit button.
  //This function should utilize the setEditUserId update function and, when the editUserId state changes to a user_id value instead of null, it should send a PUT request to the server to update the data.
  const handleEdit = (user) => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
    setConfirmPassword(user.confirmPassword);
    setGender(user.gender);
    setEditUserId(user._id);
  };

  return (
    <div>
      <h1 className="from_heading">Registration Form</h1>
      <div className="register_form">
        <form onSubmit={handleSubmit} className="form_control">
          <h2 className="from_heading">
            Welcome <MdWavingHand className="icon" />
          </h2>
          <label className="label_name">
            First Name :
            <br />
            <input
              className="input_field"
              type="text"
              placeholder="Enter your first name here"
              style={{ width: "400px", height: "30px" }}
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </label>
          <br />
          <label className="label_name">
            Last Name :
            <br />
            <input
              className="input_field"
              type="text"
              placeholder="Enter your last name here"
              style={{ width: "400px", height: "30px" }}
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </label>
          <br />
          <label className="label_name">
            Email ID :
            <br />
            <input
              className="input_field"
              type="email"
              placeholder="Enter Valid Email"
              style={{ width: "400px", height: "30px" }}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>
          <br />
          <label className="label_name">
            Password :
            <br />
            <input
              className="input_field"
              placeholder="Characters: uppercase, lowercase, number & Length 6"
              type="password"
              style={{ width: "400px", height: "30px" }}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <br />
          <label className="label_name">
            Confirm Password :
            <br />
            <input
              className="input_field"
              type="password"
              placeholder="Enter here"
              style={{ width: "400px", height: "30px" }}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </label>
          <br />
          <label className="label_name">
            Gender :
            <select
              className="input_field"
              style={{ width: "400px", height: "30px" }}
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <button type="submit" className="register_btn">
            {editUserId ? "Update" : "Register"}
          </button>
        </form>
      </div>
      <div>
        <h2 className="from_heading">User Details :</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button
                      className="action_btn"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <button
                      className="action_btn"
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
