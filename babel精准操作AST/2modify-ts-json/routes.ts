import React from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import ComplexTable from 'pages/Home';
import Mypage from 'pages/Mypage';

interface IRouteItem {
  key?: string; // 无key时，没有权限校验
  path: string;
  exact?: boolean;
  Component: React.FC<BrowserRouterProps>;
}

export const routes: IRouteItem[] = [
  {
    key: 'home',
    path: '/',
    exact: true,
    Component: ComplexTable,
  },
  {
    key: 'mypage',
    path: '/mypage',
    exact: true,
    Component: Mypage,
  },
];
