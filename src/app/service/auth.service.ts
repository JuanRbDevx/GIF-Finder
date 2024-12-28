import { Injectable } from '@angular/core';
import { auth } from '../firebase.config';
import { deleteUser } from 'firebase/auth';  // Importa el método deleteUser
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { User } from './../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private db: Firestore;

  constructor() {
    this.db = getFirestore();
  }

  // Iniciar sesión y obtener datos adicionales del usuario
  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Establecer el estado de logueado en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userCredential.user.uid);

        // Obtener los datos del usuario desde Firestore
        const userDocRef = doc(this.db, 'users', userCredential.user.uid); // Documento en Firestore con UID
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Ahora puedes almacenar esos datos en localStorage o en un servicio
          localStorage.setItem('username', userData["username"]);
          localStorage.setItem('name', userData["name"]);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error('Error en login:', error);
        throw error; // Propaga el error para manejarlo en el componente
      });
  }

  // Registrar un usuario
  register(email: string, password: string, name: string, username: string): Promise<void> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Establecer el estado de logueado en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userCredential.user.uid);

        // Guardar datos adicionales en Firestore
        const userDocRef = doc(this.db, 'users', userCredential.user.uid);
        await setDoc(userDocRef, {
          email: email,  // Ahora también guardamos el correo en Firestore
          name: name,
          username: username
        });

        // También puedes almacenar el correo en localStorage si es necesario
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        localStorage.setItem('name', name);
      })
      .catch((error) => {
        console.error('Error en registro:', error);
        throw error;
      });
  }

  // Cerrar sesión y eliminar el valor en localStorage
  logout(): Promise<void> {
    return signOut(auth)
      .then(() => {
        // Elimina el estado de logueado y los datos del usuario de localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        throw error;
      });
  }

  // Verificar si el usuario está logueado (si existe el valor en localStorage)
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Obtener el ID del usuario (UID)
  getUserId(): string | null {
    return localStorage.getItem('userId');

  }

  // Obtener los datos del usuario (nombre y username)
  getUserData(): { name: string | null, username: string | null, email: string | null } {
    return {
      name: localStorage.getItem('name'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email')
    };
  }

  deleteUser(): Promise<void> {
    const user = auth.currentUser; // Obtén el usuario actualmente logueado

    if (user) {
      // Eliminar los datos del usuario en Firestore
      const userDocRef = doc(this.db, 'users', user.uid); // Referencia al documento del usuario en Firestore
      return deleteDoc(userDocRef)  // Elimina el documento del usuario en Firestore
        .then(async () => {
          // Ahora elimina al usuario en Firebase Authentication
          await deleteUser(user);  // Elimina el usuario de Firebase Authentication

          // Elimina los datos relacionados con el usuario del localStorage
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userId');
          localStorage.removeItem('username');
          localStorage.removeItem('name');

          console.log('Usuario eliminado exitosamente');
        })
        .catch((error) => {
          console.error('Error al eliminar el usuario:', error);
          throw error;  // Propaga el error para que el componente pueda manejarlo si es necesario
        });
    } else {
      return Promise.reject('No hay usuario logueado');
    }
  }



}
