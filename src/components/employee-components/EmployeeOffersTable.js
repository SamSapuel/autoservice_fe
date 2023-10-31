import axios from "axios";
import React from "react";

export default class EmployeeOffersTable extends React.Component {

    state = {
        orders: []
    }

    handleReject = async (event, selectedOrder) => {
        event.preventDefault();
        selectedOrder.order.status = "REJECTED";
        await axios.put("http://localhost:8080/api/v1/customerOrder/updateStatus",  selectedOrder.order, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            this.setState({orders: this.state.orders.filter((order) => order.id !== selectedOrder.id)});
        }).catch(error => {
            console.log(error);
        });
    };

    handleDone = async (event, selectedOrder) => {
        event.preventDefault();
        selectedOrder.order.status = "DONE";
        await axios.put("http://localhost:8080/api/v1/customerOrder/updateStatus",  selectedOrder.order, {
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
            const response = await axios.get("http://localhost:8080/api/v1/empCusOrder/customersOrders", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const filteredOrders = response.data.filter(order => order.order.status !== 'REJECTED' && order.order.status !== 'DONE');
            this.setState({orders: filteredOrders});
        } catch (error) {
            console.log(error)
        }
    }



    render() {
        const {handleReject, handleDone} = this.props;
        const {orders} = this.state
        return (
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
                        <td>
                            <div className="action__buttons">
                                <a className="action__button rejectbutton" onClick={(event) => this.handleReject(event, order)}>Reject</a>
                                <a className="action__button acceptbutton" onClick={(event) => this.handleDone(event, order)}>Done</a>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

}