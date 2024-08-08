import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../firebaseConfig';
import '../styles/ProfileStyle.css';
import ImageModal from './ImageModal';

interface ProfileProps {
  userData: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    profilePicture: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
  });

  const [profilePicture, setProfilePicture] = useState<string>(userData.profilePicture);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser?.uid || ''));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password, 
        });
        setProfilePicture(userData.profilePictureUrl);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let updatedProfilePictureUrl = profilePicture;
      if (newProfilePicture) {
        const storageRef = ref(storage, `profilePictures/${auth.currentUser?.uid}/${newProfilePicture.name}`);
        await uploadBytes(storageRef, newProfilePicture);
        updatedProfilePictureUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(doc(db, 'users', auth.currentUser?.uid || ''), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profilePictureUrl: updatedProfilePictureUrl,
      });

      setProfilePicture(updatedProfilePictureUrl);
      alert('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
           
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture-preview"
                onClick={openModal} 
              />
            )}
             <input type="file" id="profilePicture" onChange={handleProfilePictureChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>

      {isModalOpen && <ImageModal imageUrl={profilePicture} onClose={closeModal} />}
    </div>
  );
};

export default Profile;
