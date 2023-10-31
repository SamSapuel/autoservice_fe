import React, {useEffect, useState} from "react";
import axios from "axios";
import NavigationBarCustomer from "./NavigationBarCustomer";

function CustomerCarsPage() {
    const [cars, setCars] = useState([]);
    const [showBanner,setShowBanner] = useState(false);
    const [licensePlate, setLicensePlate] = useState("");
    const [age, setAge] = useState(0);
    const [model, setModel] = useState("");
    const [condition, setCondition] = useState("");

    const getCars = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/customerCar", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            setCars(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        setShowBanner(true);
    }


    const resetForm = (event) => {
        event.preventDefault();
        setLicensePlate("");
        setModel("");
        setAge(0);
        setCondition("");
    }

    const createOrder = async (event) => {
        event.preventDefault();
        const createdCar = {
            age: age,
            model: model,
            condition: condition,
            licensePlate: licensePlate
        }
        return axios.post("http://localhost:8080/api/v1/customerCar", createdCar, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            setCars(prevCars => [...prevCars, response.data])
            setShowBanner(false);
        }).catch(error => {
            console.log(error);
        })

    }

    const deleteCar = (car) => {
        axios.delete('http://localhost:8080/api/v1/customerCar/'+car.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            setCars(prevCars => prevCars.filter(prevCar => prevCar.id !== car.id))
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCars = await getCars();
            if (fetchedCars) {
                setCars(fetchedCars);
            }
        }
        fetchData();
    }, [])

    return (
        <body className="control__page">
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
                    <h2>Create new car</h2>
                    <form onSubmit={createOrder} className="create__order__form">
                        <div className="order__form">
                            <input
                                type="text"
                                value={licensePlate}
                                onChange={(event) => {setLicensePlate(event.target.value);}}
                                placeholder="License plate"
                                required
                            />
                            <input
                                type="text"
                                value={model}
                                onChange={(event) => setModel(event.target.value)}
                                placeholder="Model"
                                required
                            />
                            <input
                                type="text"
                                value={age}
                                onChange={(event) => setAge(event.target.value)}
                                placeholder="Age"
                                pattern="[0-9]*"
                                required
                            />
                            <input
                                type="text"
                                value={condition}
                                onChange={(event) => setCondition(event.target.value)}
                                placeholder="Condition"
                                required
                            />
                        </div>
                        <button className="main__button big__button" type={"submit"}>Create car</button>
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
                    <div className="button__container">
                        <button onClick={handleClick} className="main__button">Create car</button>
                    </div>
                </div>
                <table>
                    <thead>
                    <th>id</th>
                    <th>Model</th>
                    <th>Age</th>
                    <th>Condition</th>
                    <th>License Plate</th>
                    <th></th>
                    </thead>
                    <tbody>
                    {cars && cars.map((car) => (
                        <tr>
                            <td>#{car.id}</td>
                            <td>{car.model}</td>
                            <td>{car.age}</td>
                            <td>{car.condition}</td>
                            <td>{car.licensePlate}</td>
                            <td><a className="remove__button" onClick={() => deleteCar(car)} >Remove</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
        </body>
    );
}

export default CustomerCarsPage;