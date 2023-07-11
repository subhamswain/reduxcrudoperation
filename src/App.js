import React from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { UserProvider } from './components/UserContext';

const App = () => {
  return (
    <UserProvider>
      <div>
        <UserList />
        <UserForm />
      </div>
    </UserProvider>
  );
};

export default App;
