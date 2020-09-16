import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Testing to <PrivateRoute />', () => {
  const props = {
    location: {
      pathname: '/marvel',
    },
  };

  Storage.prototype.setItem = jest.fn();

  test('should to show if is authenticated and save localStorage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <p>Ready</p>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('p').exists()).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastPath',
      props.location.pathname
    );
  });

  test('should to block if is not authenticated', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <p>Ready</p>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('p').exists()).toBeFalsy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastPath',
      props.location.pathname
    );
  });
});
