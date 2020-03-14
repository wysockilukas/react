import React from 'react';
import classes from './Modal.module.css';

import ReactAux from '../../../hoc/ReactAux/ReactAux';
import Backdrop from '../Backdrop/Backdrop';






const modal = (props) => {

    return (
        <ReactAux>
         <Backdrop show={props.show} clicked={props.modalClosed} />
        <div 
            style={
                {
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh',
                    opacity: props.show ? '1' : '0'
                }
            }
            className={classes.Modal}
        > 
            {props.children}
        </div>           
        </ReactAux>
    );
} 

export default React.memo(modal
    , (prevProps, nextProps) => 
        nextProps.show === prevProps.show && nextProps.children === prevProps.children
    );
