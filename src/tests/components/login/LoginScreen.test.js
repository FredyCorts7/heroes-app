import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import '@testing-library/jest-dom';
import { types } from '../../../types/types';

describe('Testing to <LoginScreen />', () => {
  const authContext = {
    dispatch: jest.fn(),
  };

  const historyMock = {
    replace: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={authContext}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );

  test('should to show succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should to be dispatch and navegation', () => {
    const handleLogin = wrapper.find('button').prop('onClick');
    handleLogin();

    expect(authContext.dispatch).toHaveBeenCalledWith({
      type: types.LOGIN,
      payload: {
        name: 'Camila',
      },
    });

    expect(historyMock.replace).toHaveBeenCalledWith('/');

    localStorage.setItem('lastPath', '/dc');
    handleLogin();

    expect(historyMock.replace).toHaveBeenCalledWith('/dc');
  });
});
