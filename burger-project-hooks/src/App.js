import React, { useEffect , Suspense} from 'react';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'; 
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


// import asyncComponent from './hoc/asyncComponent/asyncComponent';

const Orders = React.lazy( () => {
  return import('./containers/Orders/Orders');
});

const Checkout= React.lazy( () => {
  return import('./containers/Checkout/Checkout');
});



 const App  = (props) => {

  const { onTryAutoSignup } = props;

  useEffect( ( ) => {
    onTryAutoSignup();
  }, [ onTryAutoSignup ]);
  

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" render={ (props) => <Checkout {...props} />} />
          {/* <Route path="/checkout" component = {Checkout} /> */}
          <Route path="/orders" render={() => <Orders/>} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Ładuje się komponent ... </p>}>{routes}</Suspense>
        </Layout>
      </div>
    );
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

// export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
export default ( connect( mapStateToProps, mapDispatchToProps )( App ) );
