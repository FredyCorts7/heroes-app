import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';
import '@testing-library/jest-dom';

describe('Testing to <AppRouter />', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      authenticated: false,
    },
  };

  test('should to show login if is not authenticated', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text()).toBe('Login');
    expect(wrapper.find('button').exists()).toBeTruthy();
  });

  test('should to show MarvelScreen if is authenticated', () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        authenticated: true,
        name: 'Camila',
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    // console.log(wrapper.html());
    expect(wrapper.find('.navbar').exists()).toBeTruthy();
  });
});
