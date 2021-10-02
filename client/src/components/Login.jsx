import React, { useState } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'


const Login = () => {

  const [ details, setDetails ] = useState({
    email: '',
    password: ''

  })
  const onChange = e => {
    e.preventDefault();
    setDetails({ ...details, [ e.target.name ]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try
    {
      const res = await axios.post('http://localhost:5000/api/user/login', details);

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      return <Redirect to={"/"} />

    } catch (err) 
    {
      console.log('------', err.response)
      alert(err.response.data.err.message);
    }

  }


  const { email, password, } = details;

  return (

    <div className='form-group'>
      <h2>Enter your credentials</h2>
      <form onSubmit={handleSubmit} className='form'>

        <label>Email</label>
        <input
          type="text"
          name='email'
          value={email}
          placeholder="Please enter your Email"
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

        <input type="submit" />
      </form>
      <p>already have an account? <Link to='register'>Register</Link></p>
    </div>
  )
}
export default Login;