import React from "react";
import { Link } from "react-router-dom";
import { read } from "../actions/user";
import { getCookie } from "../auth/Helpers";
import { update } from "../actions/user";
import { history } from '../routes/Routes';

const UserProfileUpdate = props => {
    const [data, setData] = React.useState({
        token: "",
        _id: "",
        last_name: "",
        first_name: "",
        email: "",
        gender: "",
        phoneNumber: "",
        creditCardNumber: "",
        password: "",
        confirmpassword: "",
        error: false,
        errornotmatch: false,
        success: false
    });
    // DESTRUCTURING
    const {token,_id,last_name,first_name,email,gender, phoneNumber, creditCardNumber, error, errornotmatch, success,password, confirmpassword } = data;

    React.useEffect(() => {
        let token = getCookie() ? getCookie().token : "unknown";
        let user_id = props.match.params.userid;

        read(user_id, token).then(response => {
            if (response.error) {
                setData({ ...data, error: response.error });
            } else {
                const { _id, last_name,  first_name,  email,  gender, phoneNumber, creditCardNumber} = response.user;
                setData({ ...data, token, _id,  last_name,   first_name,  email, gender, phoneNumber, creditCardNumber});
            };
        });
    }, []);

    const onChangeHandler = name => e => {
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };

    const onSubmit = e => {
        e.preventDefault();
        if (
            !first_name ||
            !last_name ||
            !email ||
            !password ||
            !confirmpassword ||
            !creditCardNumber ||
            !gender ||
            !phoneNumber
        ) {
            setData({ ...data, error: "Missing required fields" });
        } else if (password !== confirmpassword) {
            setData({ ...data, errornotmatch: "Passwords do not match" });
        } else {
            update(props.match.params.userid, token, {
                first_name,
                email,
                last_name,
                phoneNumber,
                gender,
                creditCardNumber,
                password
            }).then(response => {
                if (response.error) {
                    console.log(data.error);
                } else {
                    setData({ ...data, success: true });
                    history.push('/profile');
                }
            }).catch(error => {
                setData({ ...data, error: "Email has already been used" });
            })
        }
    };

    const ProfileUpdate = () => {
        return (
            <div>
                <form
                    onSubmit={onSubmit}
                    onBlur={() =>
                        setData({ ...data, error: "", errornotmatch: "", success: "" })
                    }
                >
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="mt-4">
                                <div>
                                    <span className="font-weight-bold">*First name:</span>
                                </div>
                                <input
                                    className={`text-input w-100 ${
                                        error && !first_name ? "missing-field" : ""
                                        }`}
                                    type="text"
                                    placeholder="First name"
                                    value={first_name}
                                    onChange={onChangeHandler("first_name")}
                                />
                            </div>
                            <div className="mt-4">
                                <div>
                                    <span className="font-weight-bold">*Last name:</span>
                                </div>
                                <input
                                    className={`text-input w-100 ${
                                        error && !last_name ? "missing-field" : ""
                                        }`}
                                    type="text"
                                    value={last_name}
                                    placeholder="Last name"
                                    onChange={onChangeHandler("last_name")}
                                />
                            </div>
                            <div className="w-50 mt-4">
                                <div>
                                    <span className="font-weight-bold">Phone:</span>
                                </div>
                                <input
                                    className="text-input w-100"
                                    type="text"
                                    value={phoneNumber}
                                    placeholder="+1( - - -) - - - - - - -"
                                    onChange={onChangeHandler("phoneNumber")}
                                />
                            </div>
                            <div className="w-50 mt-4">
                                <div>
                                    <span className="font-weight-bold">gender:</span>
                                </div>
                                <input
                                    className="text-input w-100"
                                    type="text"
                                    value={gender}
                                    placeholder="Male/Female"
                                    onChange={onChangeHandler("gender")}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="mt-4">
                                <div>
                                    <span className="font-weight-bold">*Email:</span>
                                </div>
                                <input
                                    className={`text-input w-100 ${
                                        error && !email ? "missing-field" : ""
                                        }`}
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={onChangeHandler("email")}
                                />
                            </div>
                            <div className="mt-4">
                                <div>
                                    <span className="font-weight-bold">*Password:</span>
                                </div>
                                <div>
                                    <input
                                        className={`text-input w-100 ${
                                            (error && !password) || errornotmatch
                                                ? "missing-field"
                                                : ""
                                            }`}
                                        type="password"
                                        value={password}
                                        placeholder="password"
                                        onChange={onChangeHandler("password")}
                                    />
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <span className="font-weight-bold">*Confirm password:</span>
                                    </div>
                                    <input
                                        className={`text-input w-100 ${
                                            (error && !confirmpassword) || errornotmatch
                                                ? "missing-field"
                                                : ""
                                            }`}
                                        type="password"
                                        value={confirmpassword}
                                        placeholder="Confirm password"
                                        onChange={onChangeHandler("confirmpassword")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="font-weight-bold">*Credit Card:</div>
                        {creditCardNumber === '' ? (
                            <span className="text-danger font-weight-bolder small">
                                Credit Card Missing
                            </span>
                        ) : (
                            <> </>
                            )}
                        <input
                            className={`text-input w-100 ${
                                (error && !creditCardNumber)
                                    ? "missing-field"
                                    : ""
                                }`}
                            type="text"
                            value={creditCardNumber}
                            placeholder="Credit Card Number"
                            onChange={onChangeHandler("creditCardNumber")}
                        />
                    </div>
                    <div className="text-center text-danger">
                        {error && <div>{error}</div>}
                        {!error && errornotmatch && <div>{errornotmatch}</div>}
                    </div>
                    <div className="text-center text-success">
                        {success && <div>{success}</div>}
                    </div>
                    <div className="mt-3 text-center">
                        <button
                            style={{ border: "none" }}
                            className="bg-danger text-white px-5 py-3"
                        >
                            <span>SUBMIT</span>
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="page-wrapper pb-5">
            <h1 className="text-center font-weight-bolder mt-4">
                Update Information
      </h1>
            {ProfileUpdate()}
        </div>
    );
};

export default UserProfileUpdate;
