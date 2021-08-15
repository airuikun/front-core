import React, { PropTypes } from 'react';
import { fetchSummaryData } from '../actions/main';



const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class Summary extends React.Component {

  componentDidMount() {
			const { dispatch } = this.props;
			dispatch(fetchSummaryData())
  }

  render() {
	

    return (
        <div className="row">
				<div className="col-md-3 col-sm-6">
					<div className="widget widget-stats bg-green">
						<div className="stats-icon"><i className="fa fa-desktop"></i></div>
						<div className="stats-info">
							<h4>TOTAL VISITORS</h4>
							<p> { this.props.main.totalVisitors } </p>	
						</div>
						<div className="stats-link">
							<a href="javascript:;">View Detail <i className="fa fa-arrow-circle-o-right"></i></a>
						</div>
					</div>
				</div>
		
				<div className="col-md-3 col-sm-6">
					<div className="widget widget-stats bg-blue">
						<div className="stats-icon"><i className="fa fa-chain-broken"></i></div>
						<div className="stats-info">
							<h4>BOUNCE RATE</h4>
							<p> { this.props.main.bounceRate } </p>	
						</div>
						<div className="stats-link">
							<a href="javascript:;">View Detail <i className="fa fa-arrow-circle-o-right"></i></a>
						</div>
					</div>
				</div>
			
				<div className="col-md-3 col-sm-6">
					<div className="widget widget-stats bg-purple">
						<div className="stats-icon"><i className="fa fa-users"></i></div>
						<div className="stats-info">
							<h4>UNIQUE VISITORS</h4>
							<p> { this.props.main.uniqueVisitors } </p>	
						</div>
						<div className="stats-link">
							<a href="javascript:;">View Detail <i className="fa fa-arrow-circle-o-right"></i></a>
						</div>
					</div>
				</div>
			
				<div className="col-md-3 col-sm-6">
					<div className="widget widget-stats bg-red">
						<div className="stats-icon"><i className="fa fa-clock-o"></i></div>
						<div className="stats-info">
							<h4>AVG TIME ON SITE</h4>
							<p> { this.props.main.avgTime } </p>	
						</div>
						<div className="stats-link">
							<a href="javascript:;">View Detail <i className="fa fa-arrow-circle-o-right"></i></a>
						</div>
					</div>
				</div>
			</div>
    )
  }
}

Summary.propTypes = propTypes;
export default Summary
