import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import EmployeeRegistrationPage from "./components/employee-components/EmployeeRegistrationPage";
import EmployeeOrderPage from "./components/employee-components/EmployeeOrderPage";
import ProfilePage from "./components/main-components/ProfilePage";
import EmployeeCustomerOrders from "./components/employee-components/EmployeeCustomerOrders";
import EmployeeCurrentOffers from "./components/employee-components/EmployeeCurrentOffers";
import EmployeeOffersTable from "./components/employee-components/EmployeeOffersTable";
import CustomerRegistrarionPage from "./components/customer-components/CustomerRegistrarionPage";
import CustomerOrderPage from "./components/customer-components/CustomerOrderPage";
import CustomerCarsPage from "./components/customer-components/CustomerCarsPage";
import AdminEmployeesPage from "./components/admin-components/AdminEmployeesPage";
import AdminCustomersPage from "./components/admin-components/AdminCustomersPage";
import AdminCarsPage from "./components/admin-components/AdminCarsPage";
import AdminItemsPage from "./components/admin-components/AdminItemsPage";
import HomePage from "./components/HomePage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path ="" element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/registrationEmp" element={<EmployeeRegistrationPage />}/>
              <Route path="/employeeOrder" element={<EmployeeOrderPage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/customerOffers" element={<EmployeeCustomerOrders/>}/>
              <Route path="/current-offers" element={<EmployeeCurrentOffers/>}/>
              <Route path="/employeeOffers" element={<EmployeeOffersTable/>}/>
              <Route path="/registrationCus" element={<CustomerRegistrarionPage/>}/>
              <Route path="/customerOrder" element={<CustomerOrderPage/>}/>
              <Route path="/customerCars" element={<CustomerCarsPage/>}/>
              <Route path="/employees" element={<AdminEmployeesPage/>}/>
              <Route path="/customers" element={<AdminCustomersPage/>}/>
              <Route path="/customersCars" element={<AdminCarsPage/>}/>
              <Route path="/itemHub" element={<AdminItemsPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
