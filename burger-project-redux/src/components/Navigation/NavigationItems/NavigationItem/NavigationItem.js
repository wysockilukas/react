import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link} 
            // className={props.active ? classes.active : null}
            activeClassName = {classes.active}
            exact = {props.exact}
        >{props.children}
            </NavLink>
    </li>
);

export default navigationItem;