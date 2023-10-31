import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import "./CustomerOrderPage.css";
import NavigationBarCustomer from "./NavigationBarCustomer";

function CustomerOrderPage() {
    const [orders, setOrders] = useState([]);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [showBanner, setShowBanner] = useState(false);
    const [cars, setCars] = useState([]);

    const getCars = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/customerCar", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        return response.data;
    };

    const getOrders = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/customerOrder", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        return response.data;
    };

    const handleClick = (event) => {
        event.preventDefault();
        setShowBanner(true);
    };

    const resetForm = (event) => {
        event.preventDefault();
        setSelectedItems([]);
    };

    const handleSelectCar = async (event) => {
        const selectedCarId = event.target.value;
        if (selectedCarId === "") {
            setSelectedCar(null);
        } else {
            const selectCar = cars.find(car => car.id === parseInt(selectedCarId));
            setSelectedCar(selectCar);
        }
    }

    const createOrder = async (event) => {
        event.preventDefault();
        const dateTime = `${date}T${time}`;
        const createdOrder = {
            creationTime: new Date().toISOString(),
            status: "ACCEPTED",
            dateOfOrder: dateTime,
            customerCar: selectedCar,
        };
        return axios.post('http://localhost:8080/api/v1/customerOrder', createdOrder, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            setOrders(prevOrders => [...prevOrders, response.data])
            setShowBanner(false);
            const items = [{
                description: description,
                totalPrice: 0
            }];
            axios.post("http://localhost:8080/api/v1/customerOrderItem/"+response.data.id, items, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        }).catch(error => {
            console.log(error);
        });

    };

    const formatDateTime = (dateTime) => {
        const dateObj = new Date(dateTime);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString().substring(0, 5);
        const formattedDateTime = `${date} ${time}`;
        return formattedDateTime;
    }


    useEffect(() => {
        const fetchData = async () => {
            const fetchedOrders = await getOrders();
            if (fetchedOrders) {
                setOrders(fetchedOrders);
            }
            const fetchedCars = await getCars();
            if (fetchedCars) {
                setCars(fetchedCars);
            }
        }
        fetchData();
    }, []);

    const deleteOrder = (order, event) => {
        event.preventDefault();
        axios.delete('http://localhost:8080/api/v1/customerOrder', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }, data: order
        }).then(() => {
            setOrders(prevOrders => prevOrders.filter(prevOrder => prevOrder.id !== order.id))
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="control__page">
            {showBanner ?
                <section id="create__order" className="create__order">
                    <div>
                        <a onClick={(event) => {
                            setShowBanner(false)
                            resetForm(event);
                        }} className="form__close" href="src/components#">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                                    fill="black" fillOpacity="0.5"/>
                            </svg>
                        </a>
                        <h2>Create new order</h2>
                        <form onSubmit={createOrder} className="create__order__form">
                            <select onChange={handleSelectCar}>
                                <option value="" disabled selected>Select a car</option>
                                {cars && cars.map(car => {
                                    return <option key={car.id} value={car.id}>{car.model}</option>;
                                })}
                            </select>
                            <div className="order__form">
                                <input
                                    type="datetime-local"
                                    defaultValue={`${date}T${time}`}
                                    onChange={(event) => {
                                        const dateTime = event.target.value;
                                        setDate(dateTime.substring(0, 10));
                                        setTime(dateTime.substring(11));
                                    }}
                                    required
                                />
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="Description"
                                    required
                                />
                            </div>
                            <button className="main__button big__button" type={"submit"}>Create order</button>
                        </form>

                    </div>
                </section>
                :
                <div></div>
            }

            <NavigationBarCustomer/>
            <section className="main__content">
                <header>
                    <h1>Auto<span>Service_</span><b>IS</b></h1>
                </header>
                <div className="main__container">
                    <div className="main__title">
                        <h2>Your orders</h2>
                        <a onClick={handleClick} className="main__button">Create order</a>
                    </div>
                    <table>
                        <thead>
                        <th>id</th>
                        <th>Creation time</th>
                        <th>Status of order</th>
                        <th>Customer</th>
                        <th>Car</th>
                        <th>Reservation time</th>
                        <th></th>
                        </thead>
                        <tbody>
                        {orders && orders.map((order) => (
                            <tr>
                                <td>#{order.id}</td>
                                <td>{order.creationTime}</td>
                                <td>{order.status}</td>
                                <td>{localStorage.getItem("username")}</td>
                                <td>{order.customerCar.model}</td>
                                <td>{formatDateTime(order.dateOfOrder)}</td>
                                <td><a className="remove__button" onClick={(event) => deleteOrder(order, event)}>Remove</a></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </section>
        </div>
    );
}

export default CustomerOrderPage;