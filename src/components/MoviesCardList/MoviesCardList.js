import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList ({ cards, buttonMore }) {
  const [isLoading, setLoading] = useState(false);

  const handlePreloader = () => {
    setLoading(true);
  };

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__items'>
        {cards.map((card) => (
          <MoviesCard key={card.id} card={card} />
        ))}
      </div>

      {isLoading ? (
        <Preloader />
      ) : (
        buttonMore && (
          <button className='movies-card-list__button' type='button' name='more' onClick={handlePreloader}>Ещё</button>
        )
      )}
    </section>
  );
};

export default MoviesCardList;