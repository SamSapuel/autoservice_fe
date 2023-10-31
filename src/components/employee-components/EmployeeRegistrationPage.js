import React, { useState } from "react";
import axios from "axios";
import "../LoginPage.css";
function EmployeeRegistrationPage() {
    const API_URL = "http://localhost:8080/api/v1/registrationEmp";
    const [form , setForm] = useState({
        "firstName": "",
        "secondName": "",
        "username": "",
        "accessType": "EMPLOYEE_ACCESS",
        "email": "",
        "phone": "",
        "password": "",
        "specialization": ""
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(API_URL, {
                firstName: form.firstName,
                secondName: form.secondName,
                username: form.username,
                accessType: form.accessType,
                email: form.email,
                phone: form.phone,
                password: form.password,
                specialization: form.specialization
            })
            window.location.href="/login";
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <body className="login">
            <header>
                <div className="container">
                    <h1>Auto<span>Service_</span><b>IS</b></h1>
                </div>
            </header>
            <section>
                <div className="container">
                    <form className="register"
                        onSubmit={handleSubmit}>
                        <legend>Sign up</legend>
                        <input required
                               placeholder="First name"
                               name = {"firstName"}
                               value={form.firstName}
                               onChange={(event) => setForm({...form, firstName: event.target.value})}
                        />
                        <input required
                               placeholder="Second name"
                               name = {"secondName"}
                               value = {form.secondName}
                               onChange={(event) => setForm({...form, secondName: event.target.value})}
                        />
                        <input required
                               placeholder="Phone number"
                               name = {"phone"}
                               value = {form.phone}
                               onChange={(event) => setForm({...form, phone: event.target.value})}
                        />
                        <input required
                               placeholder="Email"
                               name = {"email"}
                               value = {form.email}
                               onChange={(event) => setForm({...form, email: event.target.value})}
                        />
                        <input required
                               placeholder="Username"
                               name = {"username"}
                               value = {form.username}
                               onChange={(event) => setForm({...form, username: event.target.value})}
                        />
                        <input required
                               type="password"
                               placeholder="Password"
                               name = {"password"}
                               value={form.password}
                               onChange={(event) => setForm({...form, password: event.target.value})}
                        />
                        <input placeholder="Specialization (optional)"
                               name = {"specialization"}
                               value={form.specialization}
                               onChange={(event) => setForm({...form, specialization: event.target.value})}
                        />
                        <button type="submit">Sign Up</button>
                        <p>Already have an account?<br></br><a href="./login">Sign in</a> right now!</p>
                    </form>
                </div>
            </section>
        </body>
    );
}

export default EmployeeRegistrationPage;