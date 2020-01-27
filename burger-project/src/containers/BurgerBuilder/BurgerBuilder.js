import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux';

/*
Ten komponent jest w folderze containers bo bedzie zareządzał stanami
*/
class BurgerBuilder extends Component {

    render () {
        return (
            <ReactAux>
                <div>Burger - preview</div>
                <div>Build Controls</div>
            </ReactAux>
        );

    }
}


export default BurgerBuilder;