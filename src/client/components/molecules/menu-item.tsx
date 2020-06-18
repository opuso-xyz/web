import React from 'react';
import styled from '@emotion/styled';
import { IconContext } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  title: string;
  link: string;
  icon: any;
}

const MenuItemContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.1rem;
  &:hover {
    background-color: white;
  }
  .active {
    background-color: white;
  }
`;

const MenuItemTitle = styled.h3`
  margin-left: 1rem;
  font-weight: 400;
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkContainer = styled.div`
  .active {
    background-color: white;
  }
`;

const IconContainer = styled.div`
  margin-top: 0.05rem;
`;

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, link }) => {
  return (
    <LinkContainer>
      <NavLink
        to={link}
        style={{ textDecoration: 'none', color: 'black', display: 'flex' }}
        activeClassName="active"
        exact={true}
      >
        <MenuItemContainer>
          <IconContext.Provider value={{ size: '16px' }}>
            <IconContainer>{icon}</IconContainer>
          </IconContext.Provider>
          <MenuItemTitle>{title}</MenuItemTitle>
        </MenuItemContainer>
      </NavLink>
    </LinkContainer>
  );
};

export default MenuItem;
