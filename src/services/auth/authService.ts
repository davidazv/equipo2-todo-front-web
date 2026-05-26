import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './auth'
import { api } from '../api'

export const login = async (email: string, password: string): Promise<void> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject({ code: 'auth/network-request-failed' }), 10000)
  )
  const userCredential = await Promise.race([
    signInWithEmailAndPassword(auth, email, password),
    timeout,
  ])
  const token = await (userCredential as Awaited<ReturnType<typeof signInWithEmailAndPassword>>).user.getIdToken(false)
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
