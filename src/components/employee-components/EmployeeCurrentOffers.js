import React from "react";
import axios from "axios";

export default class EmployeeCurrentOffers extends React.Component {
    state = {
        orders: []
    }

    handleAccept = async (event, selectedOrder) => {
        event.preventDefault();
        selectedOrder.order.status = "IN_PROCESSING";
        await axios.put("http://localhost:8080/api/v1/empCusOrder",  selectedOrder, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            this.setState({orders: this.state.orders.filter((order) => order.id !== selectedOrder.id)});
        }).catch(error => {
            console.log(error);
        });
    };

    async componentDidMount() {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/empCusOrder/pool", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.setState({orders: response.data});
        } catch (error) {
            console.log(error)
        }
    }
    render () {
        const {orders} = this.state;
        return  (
            <table>
                <thead>
                <th>id</th>
                <th>Reservation time</th>
                <th>Car name</th>
                <th>Offer</th>
                <th></th>
                </thead>
                <tbody>
                {orders && orders.map((order) => (
                    <tr>
                        <td>#{order.id}</td>
                        <td>{order.order.dateOfOrder}</td>
                        <td>{order.order.customerCar.model}</td>
                        <td>
                            {order.order.orderItems.map((item) => (
                                <div>{item.description}</div>
                            ))}
                        </td>
                        <td><a className="accept__button" onClick={(event) => this.handleAccept(event, order)}>Accept</a></td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}