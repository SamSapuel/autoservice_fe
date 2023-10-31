import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import NavigationBarAdmin from "./NavigationBarAdmin";
function AdminItemsPage() {
    const [items, setItems] = useState([]);
    const [showBanner, setShowBanner] = useState(false);
    const [inStock, setInStock] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    const getItems = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/item", {
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
        setName("");
        setPrice(0);
    };

    const createOrder = async (event) => {
        event.preventDefault();
        const createdItem = {
            name: name,
            inStock: inStock,
            price: price
        };
        return axios.post('http://localhost:8080/api/v1/item', createdItem, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            setItems(prevItems => [...prevItems, response.data])
            setShowBanner(false);
            setPrice(0);
            setName("");
        }).catch(error => {
            console.log(error);
        });
    };

    const handleSelectStock = (event) => {
        event.preventDefault();
        setInStock(event.target.value);
    }


    useEffect(() => {
        const fetchData = async () => {
            const fetchedItems = await getItems();
            if (fetchedItems) {
                setItems(fetchedItems);
            }
        }
        fetchData();
    }, []);

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
                        <h2>Create new item</h2>
                        <form onSubmit={createOrder} className="create__order__form">
                            <select onChange={handleSelectStock}>
                                <option value="" disabled selected>Select a stock</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            <div className="order__form">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Name"
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                    required
                                />
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                    placeholder="Price"
                                    pattern="[0-9]*"
                                    required
                                />
                            </div>
                            <button className="main__button big__button" type={"submit"}>Create item</button>
                        </form>

                    </div>
                </section>
                :
                <div></div>
            }

            <NavigationBarAdmin/>
            <section className="main__content">
                <header>
                    <h1>Auto<span>Service_</span><b>IS</b></h1>
                </header>
                <div className="main__container">
                    <div className="main__title">
                        <h2>Your orders</h2>
                        <a onClick={handleClick} className="main__button">Create item</a>
                    </div>
                    <table>
                        <thead>
                        <th>id</th>
                        <th>Name</th>
                        <th>In Stock</th>
                        <th>Price</th>
                        </thead>
                        <tbody>
                        {items && items.map((item) => (
                            <tr>
                                <td>#{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.inStock.toString()}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default AdminItemsPage;