import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import Footer from './Footer';
import LoginValidation from './LoginValidation';
import axios from 'axios';
import '../css/login.css';
function Login() {

    let history = useNavigate();

    const [userData, setUserData] = useState(null);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const Submitform = (event) => {
        
        event.preventDefault();
        const validationErrors = LoginValidation(values);
        
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            
            const data = {
                email: values.email,
                password: values.password,
            };
            console.log("Submitting:", data);
            axios.post('http://localhost/login.php', data)
                .then((response) => {
                    if (response.data.status === 'success') {
                        const { userData } = response.data;
                        
                        setUserData(userData);
                        window.localStorage.setItem('isLoggedIn', true);
                        window.localStorage.setItem('userId', userData['id']);
                        history('/chat');
                    } else {
                        // Login failed, show an alert with the error message
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <Fragment>

            <header>
                <div className="header-container">
                    <h1>Login</h1>
                    <LoginHeader />
                </div>
            </header>

            <main>
                {/* <!-- Homepage Content --> */}
                <section id="loginpage">
                    <div className="overlay">
                        <div className="content">
                            <form action="" onSubmit={Submitform}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder='Enter email' onChange={handleInput} value={values.email} required />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}

                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder='Enter password' onChange={handleInput} value={values.password} required />
                                {errors.password && <span className='text-danger'>{errors.password}</span>}

                                <input type="submit" value="Log In" onClick={Submitform}/>
                                <Link to="/forgot_password">Forgot Password</Link>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </Fragment >
    )
}

export default Login;