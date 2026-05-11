import type { Meta, StoryObj } from '@storybook/react'
import Tag from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tag>

export const High: Story = { args: { label: 'high' } }
export const Medium: Story = { args: { label: 'medium' } }
export const Low: Story = { args: { label: 'low' } }
export const Custom: Story = { args: { label: 'React 19', color: '#eff6ff', textColor: '#1d4ed8' } }
