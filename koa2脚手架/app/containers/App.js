import React from 'react'

import LoginContainer from '../containers/LoginContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ExceptionComponent from '../components/Exception';

import { Router, Route , Redirect} from 'react-router';
import history from '../store/history';

class App extends React.Component {

  componentDidMount() {
        
  }

  render() {

    return (
          <Router history={history} >
              <Redirect from="/" to="/main" />
              <Route path='/signin' component={LoginContainer}/>
              <Route path='/main' component={DashboardContainer}/>
              <Route name='404' path='/404' component={ExceptionComponent}/>
              <Redirect from="*" to="404" />
          </Router>
    )
  }
}

export default App