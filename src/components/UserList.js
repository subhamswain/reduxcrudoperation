import React, { useContext, useState } from 'react';
import { UserContext } from '../components/UserContext';

const UserList = () => {
  const { state, dispatch } = useContext(UserContext);
  const { users } = state;
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const deleteUser = (id) => {
    dispatch({ type: 'DELETE_USER', payload: id });
  };

  const editUser = (id, name, email) => {
    setEditingId(id);
    setEditName(name);
    setEditEmail(email);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditEmail('');
  };

  const saveUser = (e) => {
    e.preventDefault();
    if (editName && editEmail) {
      dispatch({
        type: 'UPDATE_USER',
        payload: { id: editingId, name: editName, email: editEmail },
      });
      setEditingId(null);
      setEditName('');
      setEditEmail('');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              {editingId === user.id ? (
                <form onSubmit={saveUser}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </form>
              ) : (
                <div>
                  <button onClick={() => editUser(user.id, user.name, user.email)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
