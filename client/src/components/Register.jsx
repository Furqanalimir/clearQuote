import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const Register = () => {

  const [ details, setDetails ] = useState({
    name: '',
    email: '',
    phone: 0,
    password: '',
    confirmPassword: '',
    age: 0,
    gender: '',
    description: ''

  })
  const onChange = e => {
    e.preventDefault();
    setDetails({ ...details, [ e.target.name ]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (details.password !== details.confirmPassword)
    {
      return alert('passwords do not match')
    }

    try
    {
      const res = await axios.post('http://localhost:5000/api/user/register', details);
      console.log(res.status)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', res.data.user)
      Redirect('/')
    } catch (err) 
    {
      alert(err.response.data.err);
    }

  }


  const { name, email, phone, password, confirmPassword, age, gender, description } = details;

  return (

    <div className='form-group'>
      <h2>Enter your credentials for registration</h2>
      <form onSubmit={handleSubmit} className='form'>

        <label>Name</label>
        <input
          type="text"
          name='name'
          value={name}
          placeholder="Please enter your name"
          onChange={(e) => onChange(e)}
          required
        />
        <label>Email</label>
        <input
          type="text"
          name='email'
          value={email}
          placeholder="Please enter your Email"
          onChange={(e) => onChange(e)}
          required
        />
        <label>Phone Number</label>
        <input
          type="text"
          name='phone'
          value={phone}
          placeholder="Please enter your phone number"
          onChange={(e) => onChange(e)}
          minLength={10}
          required
        />
        <label>Age</label>
        <input
          type="text"
          name='age'
          value={age}
          placeholder="Please enter your age"
          onChange={(e) => onChange(e)}
          required
        />
        <label>Gender</label>
        <input
          type="text"
          name='gender'
          value={gender}
          placeholder="Please enter your gender"
          onChange={(e) => onChange(e)}
          required
        />
        <label>Description</label>
        <textarea
          type='textarea'
          name='description'
          value={description}
          placeholder="Description"
          onChange={(e) => onChange(e)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name='password'
          value={password}
          placeholder="Please enter your password"
          onChange={(e) => onChange(e)}
          minLength={6}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name='confirmPassword'
          value={confirmPassword}
          placeholder="Please confirm password"
          onChange={(e) => onChange(e)}
          minLength={6}
          required
        />
        <input type="submit" />
      </form>
    </div>
  )
}
export default Register;