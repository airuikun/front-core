import React, { PropTypes } from 'react';
import GitHubForkRibbon from 'react-github-fork-ribbon';

class Github extends React.Component {

  render() {
    return (
         <GitHubForkRibbon position="right" 
                        color="green"
                        href="//github.com/superalsrk/koa2-boilerplate" 
                        target="_blank" > 
            Fork me on GitHub 
        </GitHubForkRibbon> 
    )
  }
}

export default Github
