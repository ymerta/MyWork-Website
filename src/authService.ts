import { auth, db, storage } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Register a new user with email, password, and profile picture
export const registerWithEmailPassword = async (
  email: string,
  password: string,
  name: string,
  profilePicture: File | null
): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    let profilePictureUrl = '';
    if (profilePicture) {
      const storageRef = ref(
        storage,
        `profilePictures/${userCredential.user.uid}/${profilePicture.name}`
      );
      await uploadBytes(storageRef, profilePicture);
      profilePictureUrl = await getDownloadURL(storageRef);
    }

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      profilePictureUrl,
      createdAt: new Date(),
      role: 'user', // Default role as 'user'
    });
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Login user with email and password
export const loginWithEmailPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Logout user
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

// Function to add a new user by an admin
export const addUser = async (
  name: string,
  email: string,
  password: string,
  profilePicture: File | null
): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    let profilePictureUrl = '';
    if (profilePicture) {
      const storageRef = ref(
        storage,
        `profilePictures/${userCredential.user.uid}/${profilePicture.name}`
      );
      await uploadBytes(storageRef, profilePicture);
      profilePictureUrl = await getDownloadURL(storageRef);
    }

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      profilePictureUrl,
      createdAt: new Date(),
      role: 'user', // Default to user
    });
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Function to delete a user by an admin
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Function to check if the current user is an admin
export const isAdmin = async (): Promise<boolean> => {
  if (!auth.currentUser) return false;

  try {
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (userDoc.exists() && userDoc.data().role === 'admin') {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Function to create a new project
export const createProject = async (projectName: string): Promise<string> => {
  try {
    const projectDocRef = await addDoc(collection(db, 'projects'), {
      name: projectName,
      createdAt: new Date(),
    });
    return projectDocRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Function to add a task to a project
export const addTaskToProject = async (
  projectId: string,
  task: { assignee: string; comment: string; key: string; status: string; summary: string }
): Promise<void> => {
  try {
    const projectDocRef = doc(db, 'projects', projectId);
    const tasksCollectionRef = collection(projectDocRef, 'tasks'); // Use the project document as a reference for subcollection
    await addDoc(tasksCollectionRef, task);
  } catch (error) {
    console.error('Error adding task to project:', error);
    throw error;
  }
};

