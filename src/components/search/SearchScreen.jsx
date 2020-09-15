import React from 'react';
import { useLocation } from 'react-router-dom';
import { heroes } from '../../data/heroes';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import queryString from 'query-string';

export const SearchScreen = ({ history }) => {
  const { search } = useLocation();
  const { q = '' } = queryString.parse(search);

  const heroesFiltered = heroes;

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <>
      <div className='row'>
        <div className='col-5'>
          <h4>Search Form</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type='text'
              name='searchText'
              placeholder='Find hero ...'
              className='form-control'
              value={searchText}
              onChange={handleInputChange}
              autoComplete='off'
            />

            <button type='submit' className='btn btn-primary btn-block mt-2'>
              Search
            </button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Results</h4>
          <hr />

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
