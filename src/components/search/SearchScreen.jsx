import React from 'react';
import { heroes } from '../../data/heroes';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';

export const SearchScreen = () => {
  const heroesFiltered = heroes;

  const [formValues, handleInputChange] = useForm({
    heroName: '',
  });

  const { heroName } = formValues;

  const handleSearch = (e) => {
    e.preventDefault();

    console.log(heroName);
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
              name='heroName'
              placeholder='Find hero ...'
              className='form-control'
              value={heroName}
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
