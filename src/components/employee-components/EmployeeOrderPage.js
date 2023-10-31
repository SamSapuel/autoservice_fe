import React, {useEffect, useState} from "react";
import axios from "axios";
import "./EmployeeOrderPage.css";
import NavigationBarEmployee from "./NavigationBarEmployee";
function EmployeeOrderPage() {
    const [showBanner, setShowBanner] = useState(false);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [orderedItems, setOrderedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const incrementCount = (event) => {
        event.preventDefault();
        if (count < 5) {
            setCount(count + 1);
        }
    };

    const decrementCount = (event) => {
        event.preventDefault();
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const getItem = async () => {
        const response = await axios.get('http://localhost:8080/api/v1/item', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return response.data;
    }

    const getOrders = async () => {
        const response = await axios.get('http://localhost:8080/api/v1/employeeOrder', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return response.data;
    }

    const deleteOrder = (order, event) => {
        event.preventDefault();
        axios.delete('http://localhost:8080/api/v1/employeeOrder', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }, data: order
        }).then(() => {
            setOrders(prevOrders => prevOrders.filter(prevOrder => prevOrder.id !== order.id))
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedItems = await getItem();
            if (fetchedItems) {
                setItems(fetchedItems);
            }
            const fetchedOrders = await getOrders();
            if (fetchedOrders) {
                setOrders(fetchedOrders);
            }
        }
        fetchData();
    }, []);


    const handleClick = (event) => {
        event.preventDefault();
        setShowBanner(true);
    }

    const resetForm = (event) => {
        event.preventDefault();
        setCount(0);
        setOrderedItems([]);
        setSelectedItems([]);
    }

    const handleAddToOrder = (event) => {
        event.preventDefault();
        const selectedItem = items.find(
            (item) => item.id === parseInt(event.target.querySelector("select").value)
        );
        const alreadySelected = selectedItems.some(
            (item) => item.id === selectedItem.id
        );
        if (alreadySelected) {
            return;
        }
        if (selectedItem && count > 0) {
            const newOrderedItem = {
                id: selectedItem.id,
                inStock: selectedItem.inStock,
                price:  selectedItem.price,
                name: selectedItem.name,
                quantity: count,
            };

            setOrderedItems([...orderedItems, newOrderedItem]);
            setSelectedItems([...selectedItems, selectedItem]);
            setCount(0);
        }
    }

    const createOrder = (event) => {
        event.preventDefault();
        if (orderedItems.length === 0) {
            return;
        }
        const createdOrder = {
            creationTime: new Date().toISOString(),
            status: 'ACCEPTED',
            orderItems: orderedItems.map((item) => ({
                amount: item.quantity,
                item: {
                    id: item.id,
                    inStock: item.inStock,
                    name: item.name,
                    price: item.price
                }
            }))
        };
        resetForm(event);
        return axios.post('http://localhost:8080/api/v1/employeeOrder', createdOrder, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
                setOrders(prevOrders => [...prevOrders, response.data])
                setShowBanner(false);
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
                    <form onSubmit={handleAddToOrder}>
                        <select>
                            <option value="" disabled selected>Select an item</option>
                            {items && items.map(item => {
                                if (item.inStock) {
                                    return <option key={item.id} value={item.id}>{item.name}</option>;
                                } else {
                                    return null;
                                }
                            })}
                        </select>
                        <div className="count__changer">
                            <a href="src/components#" onClick={decrementCount}>
                                <svg width="10" height="2" viewBox="0 0 10 2" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect width="10" height="2" fill="#BB4C4C"/>
                                </svg>
                            </a>
                            <input type="text" readOnly value={count}/>
                            <a href="src/components#" onClick={incrementCount}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect y="4" width="10" height="2" fill="#21AF8D"/>
                                    <rect x="4" y="10" width="10" height="2" transform="rotate(-90 4 10)" fill="#21AF8D"/>
                                </svg>
                            </a>
                        </div>
                        <button className="main__button">Add to order</button>
                    </form>
                    <table>
                        <thead>
                        <th>Name of item</th>
                        <th>Quantity</th>
                        </thead>
                        {orderedItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </table>
                    <button className="main__button big__button" onClick={createOrder}>Create order</button>

                </div>
            </section>
                :
                <div></div>
            }

            <NavigationBarEmployee/>
            <section className="main__content">
                <header>
                    <h1>Auto<span>Service_</span><b>IS</b></h1>
                </header>
                <div className="main__container">
                    <div className="main__title">
                        <h2>Your orders</h2>
                        <a onClick={handleClick} className="main__button" href="src/components#">Create order</a>
                    </div>
                    <table>
                        <thead>
                        <th>id</th>
                        <th>Creation time</th>
                        <th>Status of order</th>
                        <th>Employee</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th></th>
                        </thead>
                        <tbody>
                            {orders && orders.map((order) => (
                                <tr>
                                    <td>#{order.id}</td>
                                    <td>{order.creationTime}</td>
                                    <td>{order.status}</td>
                                    <td>{localStorage.getItem("username")}</td>
                                    <td>
                                        {order.orderItems.map((item) => (
                                            <div key={item.id}>{item.amount} x {item.item.name}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {order.orderItems.reduce((total, item) => total + item.amount, 0)}
                                    </td>
                                    <td><a className="remove__button" onClick={(event) => deleteOrder(order, event)} href="src/components#">Remove</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                </section>
        </div>
    );
}

export default EmployeeOrderPage;