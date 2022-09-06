import "../Styles/login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/result.svg"
import { Link } from 'react-router-dom';

function Login({logado=false}) {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {

      const page = response.data;

      if (page === true) {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        window.location.reload();
      } else {
        alert(response.data.msg);
      }

    });
  };

  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/Register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .min(5,"invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "The password must be at least 8 characters long")
      .required("The password is required"),
  });

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .min(8,"invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "The password must be at least 8 characters long")
      .required("The password is required"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords are different")
      .required("Password confirmation is mandatory"),
  });

  return (
    
    <div className="body">


      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-home">
              {!logado && <Link to="/">Home</Link>}
            </div>

            <div className="user-link-cad">
              {!logado && <Link to="/Register">Register</Link>}
            </div>
          </div>
          <h1>LOGIN</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="login-form">
              <div className="form-group">
                <label form="email">Email/username</label>

                <Field name="email" type='username' className="form-field" placeholder="username or email" autocomplete="username" />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>
              <div className="form-group">
                <label form="email">password</label>
                <Field name="password" type='password' className="form-field" placeholder="password" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              <button className="button" type="submit">
                Sing in
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;


