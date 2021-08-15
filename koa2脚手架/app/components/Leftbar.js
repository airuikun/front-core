import React, { PropTypes } from 'react';

class Leftbar extends React.Component {

  render() {
    return (
        <div id="sidebar" className="sidebar">
			<div data-scrollbar="true" data-height="100%">   
			    <ul className="nav">
					<li className="nav-profile">
						<div className="image">
							<a href="javascript:;"><img src="assets/img/user-13.jpg" alt="" /></a>
						</div>
						<div className="info">
							Sean Ngu
							<small>Front end developer</small>
						</div>
					</li>
				</ul>

                <ul className="nav">
                    <li className="nav-header">Navigation</li>
					<li className="has-sub active">
						<a href="javascript:;">
						    <i className="fa fa-laptop"></i>
						    <span>Dashboard</span>
					    </a>
					</li>
					
                    <li className="has-sub">
						<a href="javascript:;">
						    <b className="caret pull-right"></b>
							<i className="fa fa-star"></i> 
							<span>Widget</span>
						</a>
						<ul className="sub-menu">
						    <li><a href="../../frontend/one-page-parallax/index.html" target="_blank">One Page Parallax</a></li>
							<li><a href="../../frontend/one-page-parallax/index.html" target="_blank">One Page Parallax</a></li>	
						</ul>
					</li>
                </ul>
            </div>

        </div>
    )
  }
}

export default Leftbar;