import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import StudyListCard from './StudyListCard'

const meta: Meta<typeof StudyListCard> = {
  title: 'Components/StudyListCard',
  component: StudyListCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: 320 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof StudyListCard>

export const Active: Story = {
  args: {
    id: '1',
    title: 'Ciencias de la Computación',
    subtitle: 'Algoritmos y estructuras de datos',
    taskCount: 8,
    color: '#2563EB',
    completedPercentage: 65,
  },
}

export const Empty: Story = {
  args: {
    id: '2',
    title: 'Matemáticas',
    subtitle: 'Cálculo diferencial e integral',
    taskCount: 0,
    color: '#10b981',
    completedPercentage: 0,
  },
}

export const Done: Story = {
  args: {
    id: '3',
    title: 'Historia',
    subtitle: 'Proyecto final entregado',
    taskCount: 5,
    color: '#f97316',
    completedPercentage: 100,
  },
}
