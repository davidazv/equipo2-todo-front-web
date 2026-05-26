import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: { initials: 'SA', size: 36, color: '#2563EB' },
}

export const Large: Story = {
  args: { initials: 'JD', size: 56, color: '#f97316' },
}

export const Small: Story = {
  args: { initials: 'AB', size: 24, color: '#10b981' },
}
