import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <Menu>
                <a className="menu-item" href="/">
                    Dashboard
                </a>
                <a className="menu-item" href="/listproj">
                    Project
                </a>
                {/* <a className="menu-item" href="/node">
                    Node
                </a> */}
        </Menu>
    );
};