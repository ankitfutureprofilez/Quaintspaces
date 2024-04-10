import React from 'react';

    const Users = ({ users }) => {
      return (
        <div>
          <h1>Users</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      );
    };

    export async function getServerSideProps() {
      // Fetch data from jsonplaceholder API 
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      return {
        props: {
          users,
        },
      };
    }    
    export default Users;