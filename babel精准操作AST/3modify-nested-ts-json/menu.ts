import React from 'react';
import { HomeOutlined } from '@ant-design/icons';

export interface IMenuItem {
  key: string;
  children?: IMenuItem[];
  icon?: React.FC;
  exact?: boolean;
}

export const menu: IMenuItem[] = [
  {
    key: 'home',
    icon: HomeOutlined,
    exact: false,
    children: [
      {
        key: 'list',
        icon: HomeOutlined,
        exact: true,
      },
    ],
  },
  {
    key: 'mypage',
    icon: HomeOutlined,
    exact: true,
  },
];
