import React from "react";
import { Outlet } from "react-router";
import "./style.css";

const Layout = (props) => {
    return (
        <div className="layout">
                {props.children}
            <Outlet />
        </div>
    )
}

export default Layout;