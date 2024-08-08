import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/PersonsSectionStyle.css';

interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
}

const PersonsSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="person-list-section">
      <div className="card person-list-card">
        <div className="person-card-body">
          <h3>Person List</h3>
          {users.length === 0 ? (
            <p>No contacts found.</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user.id} className="person-item">
                  {user.profilePictureUrl && (
                    <img
                      src={user.profilePictureUrl}
                      alt={`${user.name}'s profile`}
                      className="profile-picture"
                    />
                  )}
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonsSection;