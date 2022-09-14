import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../sidebar/index.js";
import "./style.css";

const Layout = (props) => {
    return (
        <div className="layout">
            <Sidebar />
            <div id="body">
                {props.children}
            </div>
            <Outlet />
        </div>
    )
}

export default Layout;