import React, { useState } from 'react';
import styled from '@emotion/styled';
import MenuButton from '../atoms/menu-button';
import Colors from '../../shared/colors';
import { FiHome, FiSettings } from 'react-icons/fi/';
import SideMenuItems, { MenuItemData } from '../molecules/side-menu-items';
import { NavLink } from 'react-router-dom';
import logo from './logo-horizontal.png';
import MenuItem from '../molecules/menu-item'; // Tell Webpack this JS file uses this image

const menuWidth = '200px';
const menuTransitionType = '0.3s ease-in-out';
const headerHeight = '20px';

const SideMenuContainer = styled.div`
  height: calc(100vh - ${headerHeight});
  width: 0px;
  background: ${Colors.grey1};
  overflow: hidden;
  position: fixed;
  z-index: 1;
  transition: ${menuTransitionType};

  @media screen and (min-width: 800px) {
    width: ${menuWidth};
    &.menu-is-active {
      width: 0;
    }
  }
  @media screen and (max-width: 800px) {
    &.menu-is-active {
      width: ${menuWidth};
    }
  }
`;

const SiteContainer = styled.div`
  display: flex;
`;

const SiteNav = styled.nav`
  display: flex;
  height: ${headerHeight};
  z-index: 100;
  background: ${Colors.grey1};
  padding: 1rem 1.5rem;
  border: 1px solid #e0e0e0;
`;

const HeaderLinks = styled.h3`
  margin: 0 0 0 1rem;
  font-size: 14px;
  a {
    text-decoration: none;
    color: grey;
  }

  .active {
    color: black;
  }
`;

const SiteContent = styled.div`
  transition: ${menuTransitionType};
  width: 100vw;
  @media screen and (min-width: 800px) {
    margin-left: ${menuWidth};
    width: calc(100vw - 200px);
    &.menu-is-active {
      margin-left: 0;
      width: 100vw;
    }
  }
  @media screen and (max-width: 800px) {
    &.menu-is-active {
      margin-left: ${menuWidth};
      width: calc(100vw - 200px);
    }
  }
`;

const Logo = styled.img`
  height: 100%;
  margin: 0 2rem;
`;

const menuItems: MenuItemData[] = [
  {
    title: 'Home',
    icon: <FiHome />,
    link: '/'
  }
];

interface SideMenuProps {}

const SiteWrapper: React.FC<SideMenuProps> = ({ children }) => {
  const [menuToggled, setMenuToggle] = useState(false);

  return (
    <>
      <SiteNav>
        <MenuButton onClick={() => setMenuToggle(prevState => !prevState)} />
        <Logo src={logo} alt="Logo" />
        {menuItems.map(menu => (
          <HeaderLinks key={menu.title}>
            <NavLink to={menu.link} activeClassName="active" exact={true}>
              {menu.title}
            </NavLink>
          </HeaderLinks>
        ))}
      </SiteNav>
      <SiteContainer>
        <SideMenuContainer className={menuToggled ? 'menu-is-active' : ''}>
          <SideMenuItems menuItems={menuItems} />
          <div
            style={{
              position: 'absolute',
              bottom: '3rem',
              margin: '0.5rem 0.5rem 0.5rem 1.5rem',
              width: '100%'
            }}
          >
            <hr style={{ marginLeft: 0, width: '150px' }} />
            <MenuItem title="Settings" icon={<FiSettings />} link="/settings" />
          </div>
        </SideMenuContainer>
        <SiteContent className={menuToggled ? 'menu-is-active' : ''}>
          {children}
        </SiteContent>
      </SiteContainer>
    </>
  );
};

export default SiteWrapper;
