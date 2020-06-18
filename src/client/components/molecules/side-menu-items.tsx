import React from 'react';
import MenuItem from './menu-item';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const SideMenuItemsContainer = styled.div`
  margin: 0.5rem 0.5rem 0.5rem 1rem;
`;

interface SideMenuItemsProps {
  menuItems: MenuItemData[];
}

export interface MenuItemData {
  title: string;
  link: string;
  icon: any;
}

const SideMenuItems: React.FC<SideMenuItemsProps> = ({ menuItems }) => (
  <SideMenuItemsContainer>
    {menuItems.map((value, index) => {
      const { title, icon, link } = value;
      return <MenuItem key={title} title={title} icon={icon} link={link} />;
    })}
  </SideMenuItemsContainer>
);

export default SideMenuItems;
