import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 2
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} st_value = {this.state.counter}/>
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstractCounter}  />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {
                        this.props.storedResults.map( (el,idx) => (
                            <li key={el.id} onClick={ () => this.props.onDeleteResult(el.id)}> {el.value}</li>
                        ))
                    }
                    
                </ul>
            </div>
        );
    }
}


const mapStateToProps = zz => {
    return {
        ctr: zz.counter,  // uwaga ten state to initialState z pliku redux.js, a nie state z góry
        storedResults: zz.results
    }
};

const mapDispatchToProps = fn => {
    return {
        onIncrementCounter: () => fn({type: 'INCREMENT'}) ,
        onDecrementCounter: () => fn({type: 'DECREMENT'}),
        onAddCounter: () => fn({type: 'ADD', value: 5}),
        onSubstractCounter: () => fn({type: 'SUBSTRACT', payload:{value: 5}}),
        onStoreResult: () => fn({type: 'STORE_RESULT'}),
        onDeleteResult: (clickedKeyId) => fn({type: 'DELETE_RESULT', keyId: clickedKeyId})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter) ;

/*
jako argumenty funkcji counter przeklazujemy dwa argumenty
1 / Ktore elemnrty state maja byc oblsugiwane przez reduxa
2 / Akcje - funckje modyfikujace state
*/


