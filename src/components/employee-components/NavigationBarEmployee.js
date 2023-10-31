import React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

export default class NavigationBarEmployee extends React.Component {
    handleLogout = () => {
        axios.post("http://localhost:8080/api/v1/logout", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.clear();
                    window.location.href = "/login";
                }

            }).catch(error => console.error(error));
    };

    render() {
        return(
            <section className="navigation">
                <div className="profile__name">
                    <p>{localStorage.getItem("username")}</p>
                </div>
                <div className="nav__content">
                    <nav>
                        <Link to="/profile">Your profile</Link>
                        <Link to="/employeeOrder">Current orders</Link>
                        <Link to="/customerOffers">Customer orders</Link>
                    </nav>
                    <a onClick={this.handleLogout} className="logout">Logout</a>
                </div>
            </section>
        )
    }
}


