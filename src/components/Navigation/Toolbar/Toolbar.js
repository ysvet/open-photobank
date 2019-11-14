import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={styles.Logo}>
            <Link to="/">
                <Logo />
            </Link>
        </div>
        <nav className={styles.DesktopOnly}>
             <NavigationItems />
        </nav>
    </header>
);

export default toolbar;