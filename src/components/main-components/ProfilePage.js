import NavigationBarEmployee from "../employee-components/NavigationBarEmployee";
import axios, {get} from "axios";
import "./ProfilePage.css";
import {useEffect, useState} from "react";
import NavigationBarCustomer from "../customer-components/NavigationBarCustomer";
import NavigationBarAdmin from "../admin-components/NavigationBarAdmin";

function ProfilePage() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [phone, setPhone] = useState("");
    const [accessType, setAccessType] = useState("");
    const [email, setEmail] = useState("");
    const [addInfo, setAddInfo] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(0);
    const [isEditable, setIsEditable] = useState(false);

    /*
    thank you for motivating
    me my dear friends: De1sPudge, Ruzzek, Andrew, Mukan
    and my darling Tasia
     */

    useEffect( () => {
        const fetchData = async () => {
            const fetchedData = await getUserDetails();

            if (fetchedData) {
                setFirstName(fetchedData.firstName);
                setSecondName(fetchedData.secondName);
                setAccessType(fetchedData.accessType);
                setPhone(fetchedData.phone);
                setEmail(fetchedData.email);
                setId(fetchedData.id);
                setUsername(fetchedData.username);
                if (fetchedData.accessType === "CUSTOMER_ACCESS") {
                    setAddInfo(fetchedData.info)
                } else {
                    setAddInfo(fetchedData.specialization);
                }
                setPassword(fetchedData.password);
            }
        }
        fetchData();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (accessType === "EMPLOYEE_ACCESS" || accessType === "ADMIN_ACCESS") {
            const response = await axios.put("http://localhost:8080/api/v1/employee", {
                id: id,
                firstName: firstName,
                secondName:secondName,
                username: username,
                email: email,
                phone: phone,
                accessType: accessType,
                password: password,
                specialization: addInfo
            },{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })

        } else {
            const response = await axios.put("http://localhost:8080/api/v1/customer", {
                id: id,
                firstName: firstName,
                secondName:secondName,
                username: username,
                email: email,
                phone: phone,
                accessType: accessType,
                password: password,
                info: addInfo
            },{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        }
    }

    const getUserDetails = async () => {
        if (localStorage.getItem("accessType") && (localStorage.getItem("accessType") === "EMPLOYEE_ACCESS" || localStorage.getItem("accessType") === "ADMIN_ACCESS")) {
            const response = await axios.get("http://localhost:8080/api/v1/employee/currentEmployee", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            return response.data;
        } else {
            const response = await axios.get("http://localhost:8080/api/v1/customer/currentCustomer", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            return response.data;
        }
    }

    const handleEditClick = async (event) => {
        if (isEditable) {
            setIsEditable(false);
            await handleSubmit(event);
        } else {
            setIsEditable(true);
        }

    }

    return (
        <div className="control__page">
            {localStorage.getItem("accessType") && localStorage.getItem("token") && (
                localStorage.getItem("accessType") === "EMPLOYEE_ACCESS" ? <NavigationBarEmployee /> :
                    localStorage.getItem("accessType") === "ADMIN_ACCESS" ? <NavigationBarAdmin /> :
                        <NavigationBarCustomer />
            )}
            <section className="main__content">
                <header>
                    <h1>Auto<span>Service_</span><b>IS</b></h1>
                </header>
                <div className="main__container">
                    <div className="main__title">
                        <h2>Your profile</h2>
                    </div>
                    <div className="profile__info">
                        <div className="profile__info__main">
                            <h3>Welcome, Mr. {localStorage.getItem("username")}</h3>
                            <div className="profile__section">
                                <h4>First name:</h4>
                                <form onSubmit={handleSubmit} id="profile-firstname">
                                    <input type="text"
                                           readOnly={!isEditable}
                                           value={firstName}
                                           onChange={(event) => {
                                               setFirstName(event.target.value);
                                           }}/>
                                        <button onClick={handleEditClick} className="profile__section__edit" type="button">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12.0625 5.57813L9.40625 2.95313L10.2813 2.07813C10.5208 1.83854 10.8152 1.71875 11.1644 1.71875C11.5135 1.71875 11.8077 1.83854 12.0469 2.07813L12.9219 2.95313C13.1615 3.19271 13.2865 3.48188 13.2969 3.82063C13.3073 4.15938 13.1927 4.44833 12.9531 4.6875L12.0625 5.57813ZM2.5 13.125C2.32292 13.125 2.17438 13.065 2.05438 12.945C1.93438 12.825 1.87459 12.6767 1.875 12.5V10.7344C1.875 10.651 1.89063 10.5702 1.92188 10.4919C1.95313 10.4135 2 10.3433 2.0625 10.2813L8.5 3.84375L11.1563 6.5L4.71875 12.9375C4.65625 13 4.58604 13.0469 4.50813 13.0781C4.43021 13.1094 4.34938 13.125 4.26563 13.125H2.5Z"
                                                    fill="#4D4D4D"/>
                                            </svg>
                                        </button>
                                </form>
                            </div>

                            <div className="profile__section">
                                <h4>Second name:</h4>
                                <form onSubmit={handleSubmit} id="profile-firstname">
                                    <input type="text"
                                           readOnly={!isEditable}
                                           value={secondName}
                                           onChange={(event) => setSecondName(event.target.value)}
                                    />
                                    <button onClick={handleEditClick} className="profile__section__edit" type="button">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.0625 5.57813L9.40625 2.95313L10.2813 2.07813C10.5208 1.83854 10.8152 1.71875 11.1644 1.71875C11.5135 1.71875 11.8077 1.83854 12.0469 2.07813L12.9219 2.95313C13.1615 3.19271 13.2865 3.48188 13.2969 3.82063C13.3073 4.15938 13.1927 4.44833 12.9531 4.6875L12.0625 5.57813ZM2.5 13.125C2.32292 13.125 2.17438 13.065 2.05438 12.945C1.93438 12.825 1.87459 12.6767 1.875 12.5V10.7344C1.875 10.651 1.89063 10.5702 1.92188 10.4919C1.95313 10.4135 2 10.3433 2.0625 10.2813L8.5 3.84375L11.1563 6.5L4.71875 12.9375C4.65625 13 4.58604 13.0469 4.50813 13.0781C4.43021 13.1094 4.34938 13.125 4.26563 13.125H2.5Z"
                                                fill="#4D4D4D"/>
                                        </svg>
                                    </button>
                                </form>
                            </div>

                            <div className="profile__section">
                                <h4>Phone number:</h4>
                                <form id="profile-firstname">
                                    <input type="text"
                                           readOnly={!isEditable}
                                           value={phone}
                                           onChange={(event) => setPhone(event.target.value)}
                                    />
                                    <button onClick={handleEditClick} className="profile__section__edit" type="button">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.0625 5.57813L9.40625 2.95313L10.2813 2.07813C10.5208 1.83854 10.8152 1.71875 11.1644 1.71875C11.5135 1.71875 11.8077 1.83854 12.0469 2.07813L12.9219 2.95313C13.1615 3.19271 13.2865 3.48188 13.2969 3.82063C13.3073 4.15938 13.1927 4.44833 12.9531 4.6875L12.0625 5.57813ZM2.5 13.125C2.32292 13.125 2.17438 13.065 2.05438 12.945C1.93438 12.825 1.87459 12.6767 1.875 12.5V10.7344C1.875 10.651 1.89063 10.5702 1.92188 10.4919C1.95313 10.4135 2 10.3433 2.0625 10.2813L8.5 3.84375L11.1563 6.5L4.71875 12.9375C4.65625 13 4.58604 13.0469 4.50813 13.0781C4.43021 13.1094 4.34938 13.125 4.26563 13.125H2.5Z"
                                                fill="#4D4D4D"/>
                                        </svg>
                                    </button>
                                </form>
                            </div>

                            <div className="profile__section info">
                                <h4>{localStorage.getItem("accessType") === "EMPLOYEE_ACCESS" || localStorage.getItem("accessType") === "ADMIN_ACCESS" ? "Specialization:" : "Info:"}</h4>
                                <form id="profile-firstname">
                                    {isEditable ? (
                                        <input
                                            id="profile-info"
                                            type="text"
                                            value={addInfo}
                                            onChange={(event) => setAddInfo(event.target.value)}
                                        />
                                    ) : (
                                        <p id="profile-info">{addInfo}</p>
                                    )}
                                    <button onClick={handleEditClick} className="profile__section__edit" type="button">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.0625 5.57813L9.40625 2.95313L10.2813 2.07813C10.5208 1.83854 10.8152 1.71875 11.1644 1.71875C11.5135 1.71875 11.8077 1.83854 12.0469 2.07813L12.9219 2.95313C13.1615 3.19271 13.2865 3.48188 13.2969 3.82063C13.3073 4.15938 13.1927 4.44833 12.9531 4.6875L12.0625 5.57813ZM2.5 13.125C2.32292 13.125 2.17438 13.065 2.05438 12.945C1.93438 12.825 1.87459 12.6767 1.875 12.5V10.7344C1.875 10.651 1.89063 10.5702 1.92188 10.4919C1.95313 10.4135 2 10.3433 2.0625 10.2813L8.5 3.84375L11.1563 6.5L4.71875 12.9375C4.65625 13 4.58604 13.0469 4.50813 13.0781C4.43021 13.1094 4.34938 13.125 4.26563 13.125H2.5Z"
                                                fill="#4D4D4D"/>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="profile__info__right"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;