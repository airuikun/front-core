import React from 'react';
import Bundle from "./lazyload";
import locales from './locales';
/* eslint import/no-webpack-loader-syntax: off */
import QuickStart from 'bundle-loader?lazy&name=quick-start!./pages/quick-start';
import theme from 'bundle-loader?lazy&name=theme!./pages/theme';
import Avatar from 'bundle-loader?lazy&name=avatar!./pages/avatar';
import affix from 'bundle-loader?lazy&name=affix!./pages/affix';
import Color from 'bundle-loader?lazy&name=color!./pages/color';
import Collapse from 'bundle-loader?lazy&name=collapse!./pages/collapse';
import changelog from 'bundle-loader?lazy&name=changelog!./pages/changelog';
import CopyToClipboard from 'bundle-loader?lazy&name=copy-to-clipboard!./pages/copy-to-clipboard';
import layout from 'bundle-loader?lazy&name=layout!./pages/layout';
import list from 'bundle-loader?lazy&name=list!./pages/list';
import icon from 'bundle-loader?lazy&name=icon!./pages/icon';
import button from 'bundle-loader?lazy&name=button!./pages/button';
import hotkeys from 'bundle-loader?lazy&name=hotkeys!./pages/hotkeys';
import FormCom from 'bundle-loader?lazy&name=form!./pages/form';
import radio from 'bundle-loader?lazy&name=radio!./pages/radio';
import checkbox from 'bundle-loader?lazy&name=checkbox!./pages/checkbox';
import card from 'bundle-loader?lazy&name=card!./pages/card';
import capsule from 'bundle-loader?lazy&name=capsule!./pages/capsule';
import select from 'bundle-loader?lazy&name=select!./pages/select';
import SwitchCom from 'bundle-loader?lazy&name=switch!./pages/switch';
import slider from 'bundle-loader?lazy&name=slider!./pages/slider';
import input from 'bundle-loader?lazy&name=input!./pages/input';
import HeatMap from 'bundle-loader?lazy&name=heat-map!./pages/heat-map';
import inputNumber from 'bundle-loader?lazy&name=input-number!./pages/input-number';
import inputPassword from 'bundle-loader?lazy&name=input-password!./pages/input-password';
import timePicker from 'bundle-loader?lazy&name=time-picker!./pages/time-picker';
import datePicker from 'bundle-loader?lazy&name=date-picker!./pages/date-picker';
import divider from 'bundle-loader?lazy&name=divider!./pages/divider';
import calendar from 'bundle-loader?lazy&name=calendar!./pages/calendar';
import table from 'bundle-loader?lazy&name=table!./pages/table';
import tabs from 'bundle-loader?lazy&name=tabs!./pages/tabs';
import tooltip from 'bundle-loader?lazy&name=tooltip!./pages/tooltip';
import tag from 'bundle-loader?lazy&name=tag!./pages/tag';
import tree from 'bundle-loader?lazy&name=tree!./pages/tree';
import rate from 'bundle-loader?lazy&name=rate!./pages/rate';
import recommendation from 'bundle-loader?lazy&name=recommendation!./pages/recommendation';
import badge from 'bundle-loader?lazy&name=badge!./pages/badge';
import menu from 'bundle-loader?lazy&name=menu!./pages/menu';
import paging from 'bundle-loader?lazy&name=paging!./pages/paging';
import progress from 'bundle-loader?lazy&name=progress!./pages/progress';
import breadcrumb from 'bundle-loader?lazy&name=breadcrumb!./pages/breadcrumb';
import dropdown from 'bundle-loader?lazy&name=dropdown!./pages/dropdown';
import steps from 'bundle-loader?lazy&name=steps!./pages/steps';
import backtop from 'bundle-loader?lazy&name=timestamp!./pages/backtop';
import alert from 'bundle-loader?lazy&name=alert!./pages/alert';
import modal from 'bundle-loader?lazy&name=modal!./pages/modal';
import message from 'bundle-loader?lazy&name=message!./pages/message';
import notification from 'bundle-loader?lazy&name=notification!./pages/notification';
import carousel from 'bundle-loader?lazy&name=carousel!./pages/carousel';
import loading from 'bundle-loader?lazy&name=loading!./pages/loading';
import transition from 'bundle-loader?lazy&name=transition!./pages/transition';
import timestamp from 'bundle-loader?lazy&name=timestamp!./pages/timestamp';
import upload from 'bundle-loader?lazy&name=upload!./pages/upload';
/* eslint import/no-webpack-loader-syntax: off */

const getLang = (key) => {
  let locale = localStorage.getItem('WUI_LANG') || 'cn';
  const map = locales[locale] || {};
  return key.split('.').reduce((a, b) => {
    const parent = map[a];
    if (b) {
      return (parent || {})[b];
    }
    return parent;
  });
}
const asyncComponent = (comp) => (props) => {
  return (
    <Bundle load={comp}>
      {(About) => {
        return <About locale={{
          show: getLang('markdown.show'),
          hide: getLang('markdown.hide')
        }} {...props} />
      }}
    </Bundle>
  )
}

const routes = {
  documents: [
    { path: "/:lang/quick-start", exact: true, component: asyncComponent(QuickStart) },
    { path: "/:lang/theme", component: asyncComponent(theme) },
    { path: "/:lang/changelog", component: asyncComponent(changelog) },
    { path: "/:lang/recommendation", component: asyncComponent(recommendation) },
  ],
  components: {
    'Basic': [
      { path: "/:lang/color", component: asyncComponent(Color) },
      { path: "/:lang/layout", component: asyncComponent(layout) },
      { path: "/:lang/icon", component: asyncComponent(icon) },
      { path: "/:lang/button", component: asyncComponent(button) },
      { path: "/:lang/hotkeys", component: asyncComponent(hotkeys) },
    ],
    'Form': [
      { path: "/:lang/form", component: asyncComponent(FormCom) },
      { path: "/:lang/radio", component: asyncComponent(radio) },
      { path: "/:lang/checkbox", component: asyncComponent(checkbox) },
      { path: "/:lang/select", component: asyncComponent(select) },
      { path: "/:lang/slider", component: asyncComponent(slider) },
      { path: "/:lang/switch", component: asyncComponent(SwitchCom) },
      { path: "/:lang/input", component: asyncComponent(input) },
      { path: "/:lang/input-number", component: asyncComponent(inputNumber) },
      { path: "/:lang/input-password", component: asyncComponent(inputPassword) },
      { path: "/:lang/time-picker", component: asyncComponent(timePicker) },
      { path: "/:lang/date-picker", component: asyncComponent(datePicker) },
      { path: "/:lang/upload", component: asyncComponent(upload) },
    ],
    'Data Display': [
      { path: "/:lang/avatar", component: asyncComponent(Avatar) },
      { path: "/:lang/badge", component: asyncComponent(badge) },
      { path: "/:lang/calendar", component: asyncComponent(calendar) },
      { path: "/:lang/carousel", component: asyncComponent(carousel) },
      { path: "/:lang/collapse", component: asyncComponent(Collapse) },
      { path: "/:lang/card", component: asyncComponent(card) },
      { path: "/:lang/capsule", component: asyncComponent(capsule) },
      { path: "/:lang/list", component: asyncComponent(list) },
      { path: "/:lang/progress", component: asyncComponent(progress) },
      { path: "/:lang/rate", component: asyncComponent(rate) },
      { path: "/:lang/table", component: asyncComponent(table) },
      { path: "/:lang/tag", component: asyncComponent(tag) },
      { path: "/:lang/tree", component: asyncComponent(tree) },
      { path: "/:lang/tooltip", component: asyncComponent(tooltip) },
      { path: "/:lang/timestamp", component: asyncComponent(timestamp) },
      { path: "/:lang/heat-map", component: asyncComponent(HeatMap) },
    ],
    'Navigation': [
      { path: "/:lang/affix", component: asyncComponent(affix) },
      { path: "/:lang/menu", component: asyncComponent(menu) },
      { path: "/:lang/tabs", component: asyncComponent(tabs) },
      { path: "/:lang/paging", component: asyncComponent(paging) },
      { path: "/:lang/breadcrumb", component: asyncComponent(breadcrumb) },
      { path: "/:lang/dropdown", component: asyncComponent(dropdown) },
      { path: "/:lang/steps", component: asyncComponent(steps) },
    ],
    'Feedback': [
      { path: "/:lang/alert", component: asyncComponent(alert) },
      { path: "/:lang/modal", component: asyncComponent(modal) },
      { path: "/:lang/message", component: asyncComponent(message) },
      { path: "/:lang/notification", component: asyncComponent(notification) },
      { path: "/:lang/loading", component: asyncComponent(loading) },
      { path: "/:lang/transition", component: asyncComponent(transition) },
    ],
    'Other': [
      { path: "/:lang/copy-to-clipboard", component: asyncComponent(CopyToClipboard) },
      { path: "/:lang/backtop", component: asyncComponent(backtop) },
      { path: "/:lang/divider", component: asyncComponent(divider) },
    ]
  },
  redirect: [
    //重定向到 quick start 页面
    { path: "", redirect: "/cn/quick-start" }
  ]
}

export {
  routes,
  getLang
};
