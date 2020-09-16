import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import '@testing-library/jest-dom';
import { types } from '../../../types/types';

describe('Testing to <Nabvar />', () => {
  const historyMock = {
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
    replace: jest.fn(),
  };

  const authContext = {
    dispatch: jest.fn(),
    user: {
      name: 'Julio',
      authenticated: true,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={authContext}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should to show succesfully', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text()).toBe(authContext.user.name);
  });

  test('should to call Logout and to use history.replace', () => {
    wrapper.find('button').simulate('click');

    expect(authContext.dispatch).toHaveBeenCalledWith({ type: types.LOGOUT });
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  });
});
