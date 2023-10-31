import React, {useEffect, useState} from "react";
import NavigationBarAdmin from "./NavigationBarAdmin";
import "./AdminTables.css";
import axios from "axios";


function AdminEmployeesPage() {
    const [employees, setEmployees] = useState([]);

    const getEmployees = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/employee", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        const employees = response.data;

        const filteredEmployees = employees.filter(
            (employee) => employee.accessType !== "ADMIN_ACCESS"
        );
        return filteredEmployees;
    };

    const deleteOrder = (user, event) => {
        event.preventDefault();
        axios.delete('http://localhost:8080/api/v1/employee', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }, data: user
        }).then(() => {
            setEmployees(prevEmployees => prevEmployees.filter(prevEmployee => prevEmployee.id !== user.id))
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedEmployees = await getEmployees();
            if (fetchedEmployees) {
                setEmployees(fetchedEmployees);
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
                    <th>Specialization</th>
                    <th></th>
                    </thead>
                    <tbody>
                    {employees && employees.map((user) => (
                        <tr>
                            <td>#{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.specialization}</td>
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

export default AdminEmployeesPage;