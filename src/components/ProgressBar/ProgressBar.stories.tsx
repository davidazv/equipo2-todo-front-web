import type { Meta, StoryObj } from '@storybook/react'
import ProgressBar from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Empty: Story = { args: { value: 0, color: '#2563EB' } }
export const Half: Story = { args: { value: 50, color: '#2563EB' } }
export const Full: Story = { args: { value: 100, color: '#10b981' } }
export const Custom: Story = { args: { value: 65, color: '#f97316' } }
