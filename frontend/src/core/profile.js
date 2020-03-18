import React from "react";
import { Link } from "react-router-dom";
import { read } from "../actions/user";
import { isAuth, getCookie } from "../auth/Helpers";

const UserProfile = () => {
    const [data, setData] = React.useState({
        userInfo: {},
        error: ""
    });
    // DESTRUCTURING
    const {
        _id,
        last_name,
        first_name,
        email,
        gender,
        phoneNumber,
        creditCardNumber,
        history
    } = data.userInfo;

    React.useEffect(() => {
        let token = getCookie() ? getCookie().token : "unknown";
        let user_id = isAuth() ? isAuth()._id : "unknown";
        read(user_id, token).then(response => {
            if (response.error) {
                setData({ ...data, error: response.error });
            } else {
                setData({ ...data, userInfo: response.user });
                console.log(response.user);
            }
        });
    }, []);

    return (
        <div className="page-wrapper">
            <h1 className="text-center font-weight-bolder mt-4">User Information</h1>
            <div className="border p-md-5 p-2">
                <div className="mt-3">
                    <span className="font-weight-bolder">First name: </span>
                    <span>{first_name}</span>
                </div>
                <div className="mt-3">
                    <span className="font-weight-bolder">Last name: </span>
                    <span>{last_name}</span>
                </div>
                <div className="mt-3">
                    <span className="font-weight-bolder">Gender: </span>
                    <span>{gender}</span>
                </div>
                <div className="mt-3">
                    <span className="font-weight-bolder">Email: </span>
                    <span>{email}</span>
                </div>
                <div className="mt-3">
                    <span className="font-weight-bolder">Phone number: </span>
                    <span>{phoneNumber}</span>
                </div>
                <div className="mt-3">
                    <span className="font-weight-bolder">Credit Card Number: </span>
                    <span>
                        {creditCardNumber === '' ?<span className="text-danger small">Please click UPDATE to add your creditcard!</span> : creditCardNumber}
                    </span>
                </div>
                <div className="mt-5 text-center">
                    <Link
                        to={`/update/${_id}`}
                        style={{ textDecoration: "none" }}
                        className="bg-danger text-white px-5 py-3"
                    >
                        <span>UPDATE</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
