import React from 'react';

interface Props {
  onClick: Function;
}

const MenuButton: React.FC<Props> = ({ onClick }) => {
  return (
    <svg
      onClick={() => onClick()}
      width="24"
      height="20"
      viewBox="0 0 24 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1.5"
        y1="1.5"
        x2="22.5"
        y2="1.5"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="1.5"
        y1="9.5"
        x2="22.5"
        y2="9.5"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="1.5"
        y1="17.5"
        x2="22.5"
        y2="17.5"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MenuButton;
