import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../components/UserContext';

const UserForm = () => {
  const { state, dispatch } = useContext(UserContext);
  const { users } = state;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editingId) {
      const user = users.find(user => user.id === editingId);
      if (user) {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [editingId, users]);

  const addUser = (e) => {
    e.preventDefault();
    if (name && email) {
      if (editingId) {
        dispatch({
          type: 'UPDATE_USER',
          payload: { id: editingId, name, email },
        });
        setEditingId(null);
      } else {
        dispatch({
          type: 'ADD_USER',
          payload: { id: Date.now(), name, email },
        });
      }
      setName('');
      setEmail('');
    }
  };

  return (
    <div>
      <h2>{editingId ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{editingId ? 'Save' : 'Add'}</button>
      </form>
    </div>
  );
};

export default UserForm;
