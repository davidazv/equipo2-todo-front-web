import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './auth'
import { api } from '../api'

export const login = async (email: string, password: string): Promise<void> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const token = await userCredential.user.getIdToken()
  localStorage.setItem('token', token)
}

export const register = async (
  fullName: string,
  email: string,
  password: string,
): Promise<void> => {
  await api.post('/users', { fullName, email, password })
}

export const logout = async (): Promise<void> => {
  await signOut(auth)
  localStorage.removeItem('token')
}

export const getToken = (): string | null => {
  return localStorage.getItem('token')
}
