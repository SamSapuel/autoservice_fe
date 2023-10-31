import React, {useEffect, useState} from "react";
import NavigationBarAdmin from "./NavigationBarAdmin";
import "./AdminTables.css";
import axios from "axios";
function AdminCarsPage() {
    const [cars, setCars] = useState([]);
    const getCars = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/customerCar/all", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        return response.data;
    };

    const deleteCar = (car, event) => {
        event.preventDefault();
        axios.delete('http://localhost:8080/api/v1/customerCar/'+car.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            setCars(prevCars => prevCars.filter(prevCars => prevCars.id !== car.id))
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCustomers = await getCars();
            if (fetchedCustomers) {
                setCars(fetchedCustomers);
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
                    <th>Model</th>
                    <th>Age</th>
                    <th>Condition</th>
                    <th>Owner</th>
                    <th>License plate</th>
                    <th></th>
                    </thead>
                    <tbody>
                    {cars && cars.map((car) => (
                        <tr>
                            <td>#{car.id}</td>
                            <td>{car.model}</td>
                            <td>{car.age}</td>
                            <td>{car.condition}</td>
                            <td>{car.customer.username}</td>
                            <td>{car.licensePlate}</td>
                            <td><a className="remove__button" onClick={(event) => deleteCar(car, event)}>Remove</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
        </body>
    )
}

export default AdminCarsPage;