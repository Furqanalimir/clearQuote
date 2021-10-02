import React, { useState } from 'react'
import axios from 'axios';


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
    try
    {
      const config = {
        headers: {
          'Accept': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      }

      const res = await axios.post('http://localhost:5000/api/user/updateuser', details, config);

      localStorage.setItem('token', res.data.token)

    } catch (err) 
    {
      alert(err.response.data);
    }

  }


  const { name, phone, age, gender, description } = details;

  return (

    <div className='form-group'>
      <h2>Update user details</h2>
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

        <input type="submit" />
      </form>
    </div>
  )
}
export default Register;