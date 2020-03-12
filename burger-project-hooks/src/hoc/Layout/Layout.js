import React, { Component } from 'react';
import ReactAux from '../ReactAux/ReactAux';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        showSideDrawer : false
    }
    
    SideDrawerCloseHandler = () => {
        this.setState({showSideDrawer:false});
    }

    ToogleMenuHandler =() => {

        //to jest złe roziązanie bo state jets zmieniany asynchronicznie i 
        // this.setState({showSideDrawer:  !this.state.showSideDrawer  }); 

        //to jest dobre rowziązanie
        this.setState( (prevState) =>  {
            return  {showSideDrawer: !prevState.showSideDrawer}
        }  )
    }
    
    render () {
        return (
            <ReactAux>
                <Toolbar 
                    isAuth = {this.props.isAuthenticated}
                    toogleMenu={this.ToogleMenuHandler}
                />
                <SideDrawer 
                    isAuth = {this.props.isAuthenticated}
                    open ={this.state.showSideDrawer} 
                    closed = {this.SideDrawerCloseHandler}/>
                {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </ReactAux>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);
