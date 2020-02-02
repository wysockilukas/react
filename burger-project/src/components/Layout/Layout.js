import React from 'react';
import ReactAux from '../../hoc/ReactAux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


const layout = (props) => {
    return (
        <ReactAux>
            <Toolbar />
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className = {classes.Content}>
                {props.children}
            </main>
        </ReactAux>
    )
};


export default layout;
