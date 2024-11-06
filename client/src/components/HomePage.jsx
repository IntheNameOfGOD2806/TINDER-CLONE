import React from 'react';
import PropTypes from 'prop-types';
import {useAuthStore} from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const HomePage = (props) => {
    const {logout, authUser} = useAuthStore()
    const handelLogout = () => {
        const res = logout();
        if (res?.success) {
            toast.success("Logout successful");
        }
    }
    return (

        <div>
            {authUser && JSON.stringify(authUser)}
            <button className="btn btn-accent"
                    onClick={() => {
                        handelLogout()
                    }}
            >logout
            </button>
        </div>
    );
};

HomePage.propTypes = {};

export default HomePage;