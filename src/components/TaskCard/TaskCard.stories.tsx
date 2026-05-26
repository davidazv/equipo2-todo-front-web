import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import TaskCard from './TaskCard'

const meta: Meta<typeof TaskCard> = {
  title: 'Components/TaskCard',
  component: TaskCard,
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
}
export default meta

type Story = StoryObj<typeof TaskCard>

export const Pending: Story = {
  args: {
    task: {
      id: '1',
      title: 'Implementar autenticación con Firebase',
      description: 'Configurar sign-in con email/password y persistencia de sesión.',
      dueDate: '2025-05-15',
      priority: 'high',
      completed: false,
    },
  },
}

export const Completed: Story = {
  args: {
    task: {
      id: '2',
      title: 'Diseñar pantalla de login',
      description: 'Figma mockup listo y aprobado.',
      dueDate: null,
      priority: 'medium',
      completed: true,
    },
  },
}

export const LowPriority: Story = {
  args: {
    task: {
      id: '3',
      title: 'Actualizar README',
      description: '',
      dueDate: null,
      priority: 'low',
      completed: false,
    },
  },
}
