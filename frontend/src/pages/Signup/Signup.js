import React, { useState } from 'react';
import styles from './Signup.module.css';

const Signup = () => {
  // State to hold form data
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log('Form submitted:', formData);
  };

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.container}>

      <h2>Signup for an Account</h2>
      <form className={styles['signup-form']} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;