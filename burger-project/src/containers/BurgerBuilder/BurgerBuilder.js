import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux';

import Burger from '../../components/Burger/Burger';

/*
Ten komponent jest w folderze containers bo bedzie zareządzał stanami
*/
class BurgerBuilder extends Component {

    render () {
        return (
            <ReactAux>
                <Burger />
                <div>Build Controls</div>
            </ReactAux>
        );

    }
}


export default BurgerBuilder;