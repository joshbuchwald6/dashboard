import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDEcJctDfvt7QG20ISqZBLQ7IAxHBntQN4',
  authDomain: 'dashboard-3d04c.firebaseapp.com',
  projectId: 'dashboard-3d04c',
  storageBucket: 'dashboard-3d04c.appspot.com',
  messagingSenderId: '350298019367',
  appId: '1:350298019367:web:0a73a252540487e81ba002',
  measurementId: 'G-EP6XBJN733'
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const auth = getAuth(app)
export const storage = getStorage(app) 