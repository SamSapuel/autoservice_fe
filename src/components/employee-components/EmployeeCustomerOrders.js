import React, {useEffect, useState} from "react";
import NavigationBarEmployee from "./NavigationBarEmployee";
import "./EmployeeCustomerOrders.css";
import EmployeeCurrentOffers from "./EmployeeCurrentOffers";
import EmployeeOffersTable from "./EmployeeOffersTable";

function EmployeeCustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [currentTable, setCurrentTable] = useState("currentOffers");

    const handleCurrentOffersClick = () => {
        setCurrentTable("currentOffers");
    }
    const handleYourOffersClick = () => {
        setCurrentTable("yourOffers");
    }

    return (
        <body className="control__page">
        <NavigationBarEmployee/>
        <section className="main__content">
            <header>
                <h1>Auto<span>Service_</span><b>IS</b></h1>
            </header>
            <div className="main__container">
                <div className="main__title">
                    <h2>Your orders</h2>
                    <div className="button__container">
                        <button onClick={handleCurrentOffersClick} className="main__button">Current Offers</button>
                        <button onClick={handleYourOffersClick} className="main__button">Your Offers</button>
                    </div>
                </div>
                {currentTable === 'currentOffers' ? (
                    <EmployeeCurrentOffers orders={orders} />
                ) : (
                    <EmployeeOffersTable orders={orders} />
                )}
            </div>
        </section>
        </body>
    );
}

export default EmployeeCustomerOrders;