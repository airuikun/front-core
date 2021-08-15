import { HashRouter, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'
import React, { Component } from 'react';
import locales from './locales';
import { Icon, version } from "../src";
import Logo from "./assets/logo.svg";
import ScrollToTop from 'react-scroll-up';
import { routes, getLang } from "./Routers";

// 获取所有路由
const getRoutesTotal = (obj) => {
  let _obj = obj || routes;
  let arr = [];
  for (let a in _obj) {
    if (_obj[a] instanceof Array) {
      arr = arr.concat(_obj[a])
    } else {
      arr = arr.concat(getRoutesTotal(_obj[a]))
    }
  }
  return arr
}

// 路由实例化
const getRoutes = () => {
  let routes = getRoutesTotal();
  return routes.map((item, idx) => {
    let COM = item.component;
    if (!item.path) {
      return <Redirect key={idx} push to={{ pathname: item.redirect }} />
    }
    if (item.exact) {
      return <Route exact key={idx} path={item.path} component={COM} />
    } else {
      return <Route key={idx} path={item.path} component={COM} />
    }
  })
}

const getPageName = (location) => {
  const routes = location.match(/(?:\/(.+))?(\/(.+)\?|\/(.+))/);
  if (routes) {
    return routes[3] || routes[4];
  }
  return 'quick-start';
}

const getLangName = () => localStorage.getItem('WUI_LANG') || 'cn';

const renderMenuLi = (item, idx) => {
  if (!item.path) return null;
  if (getPageName(window.location.href) === getPageName(item.path)) {
    return <li key={`${idx}`} className="active" key={idx}>{getLang(`page.${getPageName(item.path)}`)}</li>
  }
  return (
    <li key={`${idx}`}>
      <Link to={`/${getLangName()}/${getPageName(item.path)}`}>
        {getLang(`page.${getPageName(item.path)}`)}
      </Link>
    </li>
  )
}

const renderMenu = (obj) => {
  let _obj = obj || routes;
  let html = []
  for (let a in _obj) {
    if (_obj[a] instanceof Array) {
      html = html.concat(_obj[a].map((item, idx) => renderMenuLi(item, idx)))
    } else if (_obj[a] instanceof Object) {
      for (let e in _obj[a]) {
        if (_obj[a][e] instanceof Array) {
          html = html.concat(
            <ul key={`${e}`}>
              <li className="title">{getLang(`category.${e}`)}</li>
              {_obj[a][e].map((item, item_idx) => renderMenuLi(item, item_idx))}
            </ul>
          )
        }
      }
    }
  }
  return html
}

const RoutersContainer = withRouter(({ history, location, ...props }) => {
  const prefixCls = 'w-docs';
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-menu-warpper`}>
        <div className={`${prefixCls}-menu-content`}>
          <div className={`${prefixCls}-logo`}>
            <a href="https://uiw-react.github.io">
              <img src={Logo} alt="logo" />
              <span>uiw <i className="version">{version} </i> <sup /></span>
            </a>
          </div>
          <ul className={`${prefixCls}-menu-list`}>
            {renderMenu()}
          </ul>
          <div className={`${prefixCls}-info`}>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/uiw-react/uiw/issues"><Icon type="message" /> 反馈建议</a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/uiw-react/uiw/issues/new"><Icon type="question-circle" /> 提交bug</a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/uiw-react/uiw"><Icon type="github" /> Github</a>
          </div>
        </div>
      </div>
      <div className={`${prefixCls}-content`} ref={(elm) => {
        if (elm) {
          elm.scrollTop = 0
        }
      }}>
        <Switch>
          {getRoutes()}
        </Switch>
        <ScrollToTop showUnder={160} style={{ bottom: 20, zIndex: 999 }}>
          <div className={`${prefixCls}-totop`}></div>
        </ScrollToTop>
      </div>
    </div>
  )
})

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setPage(() => {
      if (!this.state.locale) {
        this.setLocale(localStorage.getItem('WUI_LANG') || 'cn');
      }
    });
  }
  componentWillMount() {
    window.addEventListener("hashchange", () => {
      this.setPage();
    }, false);
  }
  getLocale(key) {
    const map = locales[this.state.locale] || {};
    return key.split('.').reduce((a, b) => {
      const parent = map[a];
      if (b) {
        return (parent || {})[b];
      }
      return parent;
    });
  }
  setPage(fn) {
    this.setState({ page: this.getPage() }, fn);
  }
  getPage() {
    const routes = window.location.hash.match(/(?:\/(.+))?(\/(.+)\?|\/(.+))/);
    if (routes) {
      if (locales.hasOwnProperty(routes[1])) {
        this.setState({ locale: routes[1] }, () => {
          localStorage.setItem('WUI_LANG', this.state.locale);
        });
      }
      return routes[3] || routes[4];
    }
    return 'quick-start';
  }
  render() {
    return (
      <HashRouter>
        <RoutersContainer />
      </HashRouter>
    )
  }
}


