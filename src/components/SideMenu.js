import React from "react";
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import "react-pro-sidebar/dist/css/styles.css";

export default function SideMenu(){
    return(
        <ProSidebar style={{ height: "210vh", position:'fixed' }}>
            <Menu>
                <MenuItem >
                <a href="/">
                <img src="https://img.icons8.com/color/45/null/dashboard-layout.png"/>
                <b>Dashboard</b>
                </a>
                </MenuItem>
                <MenuItem>
                <a href="/profile">
                    <img src="https://img.icons8.com/avantgarde/45/null/gender-neutral-user.png"/>
                   <b>My Profile</b>
                </a>
                </MenuItem>
                <MenuItem>
                <a href="/listproj">
                <img src="https://img.icons8.com/external-febrian-hidayat-fill-lineal-febrian-hidayat/45/null/external-manage-business-and-management-febrian-hidayat-fill-lineal-febrian-hidayat.png"/>
                    <b>Manage Projects</b>
                </a> 
                </MenuItem>  
            </Menu>
        </ProSidebar>
    )
}





