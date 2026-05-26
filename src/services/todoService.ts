import type { ApiTodo, Category } from '../types'
import { api } from './api'

export const getTodos = async (): Promise<ApiTodo[]> => {
  const response = await api.get<ApiTodo[]>('/todos')
  return response.data
}

export const searchTodos = async (query: string): Promise<ApiTodo[]> => {
  const response = await api.get<ApiTodo[]>('/todos/search', { params: { q: query } })
  return response.data
}

export const getTodoById = async (id: string): Promise<ApiTodo> => {
  const response = await api.get<ApiTodo>(`/todos/${id}`)
  return response.data
}

export const createTodo = async (title: string, description: string): Promise<ApiTodo> => {
  const response = await api.post<ApiTodo>('/todos', { title, description })
  return response.data
}

export const createTask = async (
  listId: string,
  data: {
    title: string
    description?: string
    priority?: string | null
    dueDate?: string | null
  },
): Promise<ApiTodo> => {
  const response = await api.post<ApiTodo>('/todos', {
    title: data.title,
    description: data.description ?? '',
    parentId: listId,
    priority: data.priority ?? null,
    dueDate: data.dueDate ? `${data.dueDate}T00:00:00` : null,
  })
  return response.data
}

export const getTasksByListId = async (listId: string): Promise<ApiTodo[]> => {
  const response = await api.get<ApiTodo[]>(`/todos/${listId}/tasks`)
  return response.data
}

export const updateTodo = async (
  id: string,
  data: {
    title?: string
    description?: string
    completed?: boolean
    priority?: string | null
    dueDate?: string | null
  },
): Promise<ApiTodo> => {
  const response = await api.put<ApiTodo>(`/todos/${id}`, {
    ...data,
    dueDate: data.dueDate ? `${data.dueDate}T00:00:00` : data.dueDate ?? null,
  })
  return response.data
}

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`)
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/categories')
  return response.data
}

export const createCategory = async (name: string): Promise<Category> => {
  const response = await api.post<Category>('/categories', { name })
  return response.data
}
