import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from '../../context/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password should contain 6 characters").required("Password is required"),
});

function Login() {
  const { login, error, setError } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <div className='d-flex justify-content-center align-items-center vh-100 w-100'>
        <div className='col-sm-10 col-md-4 col-lg-3'>
          <h4>Login</h4>
          <form onSubmit={handleSubmit(login)} autoComplete="off">
            <div className="form-group mt-4">
              <input type="email" className="form-control" name="email" placeholder="Email" {...register("email")} 
              onChange={()=>{setError(null)}}/>
            </div>
            <label className="text-danger">
              {errors.email && errors.email.message}
            </label>
            <div className="form-group mt-2">
              <input type="password" className="form-control" name="password" placeholder="Password" {...register("password")}
              onChange={()=>{setError(null)}} />
            </div>
            <label className="text-danger">
              {error}
              {errors.password && errors.password.message}
            </label>
            <div className="form-group mt-2 mb-4">
              <button className="btn w-100 py-2" type="submit">
                Login
              </button>
            </div>
          </form>
          <Link to='/register'>
            New? Create account
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
