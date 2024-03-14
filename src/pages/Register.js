import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterHeader from './RegisterHeader';
import Footer from './Footer';
import RegisterValidation from './RegisterValidation';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import '../css/register.css';

function Register() {

    //track changes in variables
    const [values, setValues] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
    })

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    //track error 
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setErrors(RegisterValidation(values))
    }, [values])

    //navigate between pages
    let history = useNavigate();

    //Send email
    const form = useRef();

    //function register request
    async function registerRequest() {
        try {

            const data = {
                action: 'register',
                name: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
                password: values.password,
            };
            axios.post('http://localhost/api.php', data)
                .then((respose) => {
                    if (respose.ok) {
                        return respose.json()
                    }
                    throw new Error('error')
                })
                .then((data) => {
                    if (data.status) {
                        localStorage.setItem('token', data.status)
                        history('/confirm')
                    } else {
                        //set error
                    }
                })
        } catch (error) {
            console.log(error.message)
        }
    }

    const sendEmail = (event) => {
        event.preventDefault();
        setErrors(RegisterValidation(values));


        emailjs.sendForm('service_w8wt3lb', 'template_x7l0yqp', form.current, 'k_McoBUbPRinJC2G9')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        const data = {
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            password: values.password,
        };

        console.log(data);

        // registerRequest();

        // Call the API to register the candidate
        axios.post('http://localhost/register.php', data)
            .then((response) => {
                if (response.data.status === 'success') {
                    // Registration successful
                    history('/login');
                } else {
                    // Registration failed, show an alert with the error message
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Register</h1>
                    <RegisterHeader />
                </div>
            </header>


            <main>
                {/* <!-- Candidate Registration Content --> */}
                <section id="registerpage">
                    <div className="overlay">
                        <div className="content">
                                <form ref={form} action="" onSubmit={sendEmail}>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder='Enter name'
                                        onChange={handleInput}
                                        value={values.name}
                                        required
                                    />

                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder='Enter email'
                                        onChange={handleInput}
                                        value={values.email}
                                        required
                                    />

                                    <label htmlFor="phoneNumber">Phone Number:</label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder='Enter phone number'
                                        onChange={handleInput}
                                        value={values.phoneNumber}
                                        required
                                    />

                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder='Enter password'
                                        onChange={handleInput}
                                        value={values.password}
                                        required
                                    />

                                    <input type="submit" value="Register"/>
                                </form>
                        </div>
                    </div>
                </section>
            </main>
        </Fragment >
    )
}

export default Register;