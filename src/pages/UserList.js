import React, { useState, useEffect } from 'react';
// Import axios or use fetch for making HTTP requests
import axios from 'axios';
function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const currentUserId = window.localStorage.getItem('userId');
    const data = {
      currentUserId: currentUserId,
  };
  console.log(data)

    // Append the current user ID as a query parameter
    axios.post('http://localhost/get_users.php', data)
      .then((response) => {
          if (response.data.status === 'success') {
              setUsers(response.data.users);
          } else {
              console.error(response.data.message);
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleUserSelect = (user) => {
    // Your logic to handle user selection, such as setting the selected user state
    setSelectedUsername(user.username);
    // Pass the selected user to the parent component
    onSelectUser(user);
  };
  

  return (
    <div className="people-list" id="people-list">
      <section id="userList">
        <input
          type="text"
          id="searchInput"
          placeholder="Search users..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <ul id="userListItems">
          {filteredUsers.map(user => (
            <li key={user.id}>
              <div className="button-container">
                <button onClick={() => handleUserSelect(user)}>{user.username}</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default UserList;