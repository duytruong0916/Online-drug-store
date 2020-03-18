import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { authenticate, isAuth } from "../auth/Helpers";

const SignIn = () => {
    const [data, setdata] = useState({
        password: "",
        confirmpassword: "",
        email: "",
        error: false,
        success: false,
        errornotmatch: false,
        name: ""
    });

    const {
        success,
        email,
        password,
        confirmpassword,
        error,
        errornotmatch,
        name
    } = data;

    const onChangeHandler = name => e => {
        const value = e.target.value;
        setdata({ ...data, [name]: value });
    };

    const informParent = response => {
        authenticate(response, () => {
            setdata({
                email: "",
                error: "",
                password: "",
                confirmpassword: "",
                success: true,
                name: response.data.user.lastname
            });
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        if (!email || !password || !confirmpassword) {
            setdata({ ...data, error: "Missing required fields" });
        } else if (password !== confirmpassword) {
            setdata({ ...data, errornotmatch: "Passwords do not match" });
        } else {
            setdata({ ...data, error: "", errornotmatch: "" });
            axios({
                method: "POST",
                url: 'http://localhost:8000/api/signin',
                data: { email, password }
            })
                .then(response => {
                    console.log("USER INFO:", response.data.user);
                    console.log("TOKEN:", response.data.token);
                    authenticate(response, () => {
                        setdata({
                            email: "",
                            error: "",
                            password: "",
                            confirmpassword: "",
                            success: true,
                            name: response.data.user.last_name
                        });
                        window.location.reload(false);
                    });
                })
                .catch(error => {
                    setdata({error: error.response.data.error});
                });
        };
    };

    const ShowForm = () => (
        <div className="py-5">
            <div className="text-center font-weight-bold"><h1>LOG IN</h1></div>
            <form
                onSubmit={onSubmit}
                onBlur={() =>
                    setdata({
                        ...data,
                        error: "",
                        errornotmatch: "",
                        success: "",
                        name: ""
                    })
                }
            >
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
                                (error && !password) || errornotmatch ? "missing-field" : ""
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
                <div className="text-center text-danger m-4">
                    {error && <div>{error}</div>}
                    {!error && errornotmatch && <div>{errornotmatch}</div>}
                </div>
                <div className="text-center text-success mt-4">
                    {success && <div>Welcome Back {name.toUpperCase()} </div>}
                </div>
                <div className="text-center">
                    <button className="button-card mt-3 w-50">SUBMIT</button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="page-wrapper mx-auto py-5">
            {ShowForm()}
        </div>
    );
};

export default SignIn;
