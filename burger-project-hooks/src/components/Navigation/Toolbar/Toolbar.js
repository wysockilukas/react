import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props)=> {

    return (
        <header className={classes.Toolbar}>
            <DrawerToogle clicked={props.toogleMenu}/>
            {/* <div onClick={props.toogleMenu}>MENU</div> */}
            <div><Logo height="50px"/></div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
};


export default toolbar;
