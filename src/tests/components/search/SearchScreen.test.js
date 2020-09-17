import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';
import '@testing-library/jest-dom';

describe('Testing to <SearchScreen />', () => {
  test('should to show succesfully', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path='/search' component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('should to show to "batman" and value input with query string', () => {
    const query = 'batman';
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=' + query]}>
        <Route path='/search' component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe(query);
    expect(wrapper.find('HeroCard').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  test('should to call push of history', () => {
    const historyMock = {
      push: jest.fn(),
    };
    const query = 'batman';
    const valueText = 'spider';

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=' + query]}>
        <Route
          path='/search'
          component={() => <SearchScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: valueText,
      },
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault() {},
    });

    expect(historyMock.push).toHaveBeenCalledWith(`?q=${valueText}`);
  });
});
