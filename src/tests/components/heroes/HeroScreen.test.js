import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Testing to <HeroScreen />', () => {
  const historyMock = {
    push: jest.fn(),
  };

  test('should to show Redirect component if there is not args in URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );

    expect(wrapper.find('Redirect').exists()).toBeTruthy();
  });

  test('should to show a hero if parameter exists', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Route path='/hero/:heroId' component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('.row').exists()).toBeTruthy();
    expect(wrapper.find('button').exists()).toBeTruthy();
    expect(wrapper.find('button').text()).toBe('Back');
  });

  test('should to back screen with push', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Route
          path='/hero/:heroId'
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    wrapper.find('button').simulate('click');

    expect(historyMock.push).toHaveBeenCalledWith('/marvel');
  });

  test('should to call Redirect component if hero not exists', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-ironooooo']}>
        <Route
          path='/hero/:heroId'
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe('');
  });
});
