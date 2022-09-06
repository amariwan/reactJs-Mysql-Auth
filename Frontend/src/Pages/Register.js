import "../Styles/Register.css"
import Img from "../Assets/result.svg"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from 'react-router-dom';


function Register({ logado = false }) {

    const handleRegister = (values) => {
        Axios.post("http://localhost:3001/Register", {
            username: values.username,
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response.data.msg);
            console.log(response);
            //window.location.reload();
        });
    };

    const validationsRegister = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        username: yup
            .string()
            .min(8, "Invalid username")
            .required("username is required"),
        password: yup
            .string()
            .min(8, "The password must be at least 8 characters long")
            .required("The password is mandatory"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords are different")
            .required("Password confirmation is required"),
    });


    return (
        <div className="body">
            <div className="left-Register">
                <img src={Img} alt="People looking at graphics" className="chart" />
            </div>
            <div className="right-Register">
                <div className="card-Register">
                    <div className="user-links">
                        <div className="user-link-home">
                            {!logado && <Link to="/">Home</Link>}
                        </div>

                        <div className="user-link-cad">
                            {!logado && <Link to="/Register">Register</Link>}
                        </div>
                    </div>
                    <h1>Register</h1>
                    <Formik
                        initialValues={{}}
                        onSubmit={handleRegister}
                        validationSchema={validationsRegister}
                    >
                        <Form className="login-form">
                            <div className="form-group">
                                <label form="username">username</label>

                                <Field name="username" type='username' className="form-field" placeholder="username" />

                                <ErrorMessage
                                    component="span"
                                    name="username"
                                    className="form-error"
                                />
                            </div>
                            <div className="form-group">
                                <label form="email">Email</label>

                                <Field name="email" type='email' className="form-field" placeholder="Email" />

                                <ErrorMessage
                                    component="span"
                                    name="email"
                                    className="form-error"
                                />
                            </div>
                            <div className="form-group">
                                <label form="email">Password</label>
                                <Field name="password" type='password' className="form-field" placeholder="Password" />

                                <ErrorMessage
                                    component="span"
                                    name="password"
                                    className="form-error"
                                />
                            </div>

                            {/*Confirmação*/}

                            <div className="form-group">
                                <label form="email">Confirm your password</label>
                                <Field name="confirmation" type='password' className="form-field" placeholder="Password" />

                                <ErrorMessage
                                    component="span"
                                    name="confirmation"
                                    className="form-error"
                                />
                            </div>
                            <button className="button" type="submit">
                            Sign up
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Register;