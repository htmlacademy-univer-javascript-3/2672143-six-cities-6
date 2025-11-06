import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRouter';

const meta = {
  title: 'Components/PrivateRoute',
  component: PrivateRoute,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof PrivateRoute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Authorized: Story = {
  args: {
    isAuthorized: true,
  },
  render: (args) => (
    <div>
      <p>User is authorized - content should be displayed</p>
      <PrivateRoute {...args} />
    </div>
  ),
};

export const NotAuthorized: Story = {
  args: {
    isAuthorized: false,
  },
  render: (args) => (
    <div>
      <p>User is not authorized - redirect to login</p>
      <PrivateRoute {...args} />
    </div>
  ),
};

export const NotAuthorizedCustomRedirect: Story = {
  args: {
    isAuthorized: false,
    redirectPath: '/auth',
  },
  render: (args) => (
    <div>
      <p>User is not authorized - redirect to custom path /auth</p>
      <PrivateRoute {...args} />
    </div>
  ),
};

export const AuthorizedCustomRedirect: Story = {
  args: {
    isAuthorized: true,
    redirectPath: '/auth',
  },
  render: (args) => (
    <div>
      <p>User is authorized - redirectPath prop is ignored</p>
      <PrivateRoute {...args} />
    </div>
  ),
};
