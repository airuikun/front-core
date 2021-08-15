import React from 'react';

import { connect } from 'react-redux';
import { checkAuth } from '../actions/authed';

import Header from '../components/Header';
import Leftbar from '../components/Leftbar';
import Github from '../components/Github';
import Summary from '../components/Summary';
import Trend from '../components/Trend';

class DashboardContainer extends React.Component {
    componentDidMount() {
        document.body.classList.remove('bg-white')
        document.getElementById('page-container').classList.add('page-sidebar-fixed')
        document.getElementById('page-container').classList.add('page-header-fixed')
        
        if(this.props.route.path != '/404') {
            this.props.dispatch(checkAuth())
        }

    }

    render() {

        return (
            <div>
                <Github/>
                <Header/>
                <Leftbar/>
                <div className="sidebar-bg"></div>
                
                <div className="content">
                    <h1 className="page-header">Dashboard <small>header small text goes here...</small></h1>
                    <Summary summary={this.props.summary} {...this.props} />
                    <Trend {...this.props} />
                </div> 
            </div>
        )
    }
}


function mapStateToProps(state) {

    return {
        main : state.main
    }
}

export default connect(mapStateToProps)(DashboardContainer)