import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card }) {
  const location = useLocation();
  return (
    <article className='movie'>
      <img src={card.image} alt={card.title} className='movie__photo' />
      <div className='movie__text'>
        <h2 className='movie__title'>{card.title}</h2>
        <p className='movie__duration'>{card.duration}</p>
      </div>
      {location.pathname === '/saved-movies' ?
        (<button type="button" className='movie__button movie__delete'></button>)
        : (<button type="button" className='movie__button movie__like movie__like_active'></button>)}
    </article>
  );
};

export default MoviesCard;