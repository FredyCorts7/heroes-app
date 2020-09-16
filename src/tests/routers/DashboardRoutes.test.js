import React from 'react';
import { mount } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Testing to <DashboardRoutes />', () => {
  const authContext = {
    dispatch: jest.fn(),
    user: {
      name: 'Fredy',
      authenticated: true,
    },
  };

  test('should to show succesfully', () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text()).toBe(authContext.user.name);
  });
});
