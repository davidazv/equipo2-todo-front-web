// ── Backend API types ──────────────────────────────────────────────────────
export type Category = {
  id: string
  name: string
}

export type Comment = {
  id: string
  content: string
  createdAt: string
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

export type ApiTodo = {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string | null
  dueDate: string | null
  priority: Priority | null
  parentId: string | null
  categories: Category[]
  comments: Comment[]
  tasks: ApiTodo[]
}

// ── UI types ───────────────────────────────────────────────────────────────
export interface Task {
  id: string
  title: string
  description: string
  dueDate: string | null
  priority: 'low' | 'medium' | 'high'
  completed: boolean
}

export interface StudyList {
  id: string
  title: string
  subtitle: string
  taskCount: number
  color: string
  completedPercentage: number
}

export interface DueTodayTask {
  title: string
  dueTime: string
  priority: 'low' | 'medium' | 'high'
  listId: string
}

export interface NewTask {
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

export interface NewList {
  title: string
  description: string
  color: string
}
