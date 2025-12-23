import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '.';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#f3f3f3' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithPadding: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <Story />
      </div>
    ),
  ],
};
