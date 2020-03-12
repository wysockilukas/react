import React, { useState } from 'react';
import ReactAux from '../ReactAux/ReactAux';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const  Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)


    const SideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    const ToogleMenuHandler =() => {
        setShowSideDrawer(!showSideDrawer )
    }


        return (
            <ReactAux>
                <Toolbar 
                    isAuth = {props.isAuthenticated}
                    toogleMenu={ToogleMenuHandler}
                />
                <SideDrawer 
                    isAuth = {props.isAuthenticated}
                    open ={showSideDrawer} 
                    closed = {SideDrawerCloseHandler}/>
                {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
                <main className = {classes.Content}>
                    {props.children}
                </main>
            </ReactAux>
        )
    
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);
