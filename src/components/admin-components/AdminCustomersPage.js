import React, {useEffect, useState} from "react";
import NavigationBarAdmin from "./NavigationBarAdmin";
import "./AdminTables.css";
import axios from "axios";
function AdminCustomersPage() {
    const [customers, setCustomers] = useState([]);

    const getCustomers = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/customer", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        return response.data;
    };

    const deleteOrder = (user, event) => {
        event.preventDefault();
        axios.delete('http://localhost:8080/api/v1/customer', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }, data: user
        }).then(() => {
            setCustomers(prevCustomers => prevCustomers.filter(prevCustomers => prevCustomers.id !== user.id))
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCustomers = await getCustomers();
            if (fetchedCustomers) {
                setCustomers(fetchedCustomers);
            }
        }
        fetchData()
    }, []);

    return(
        <body className="control__page">
        <NavigationBarAdmin/>
        <section className="main__content">
            <header>
                <h1>Auto<span>Service_</span><b>IS</b></h1>
            </header>
            <div className="main__container">
                <div className="main__title">
                    <h2>Information</h2>
                </div>
                <table>
                    <thead>
                    <th>id</th>
                    <th>First name</th>
                    <th>Second name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Info</th>
                    <th></th>
                    </thead>
                    <tbody>
                    {customers && customers.map((user) => (
                        <tr>
                            <td>#{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.info}</td>
                            <td><a className="remove__button" onClick={(event) => deleteOrder(user, event)}>Remove</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
        </body>
    )
}

export default AdminCustomersPage;