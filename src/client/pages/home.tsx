import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const CURRENT_USER = gql`
  {
    me {
      id
    }
  }
`;

const HomePage: React.FC = props => {
  // const { client, loading, data, error } = useQuery(CURRENT_USER, {
  //   fetchPolicy: 'network-only'
  // });
  // if (error) {
  //   console.log(error.message);
  // }
  return <div>Home</div>;
};

export default HomePage;
