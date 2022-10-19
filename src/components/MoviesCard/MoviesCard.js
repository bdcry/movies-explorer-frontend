import './MoviesCard.css';

function MoviesCard({ card }) {
  return (
    <article className='movie'>
      <button className='movie__delete'></button>
      <img src={card.image} alt={card.title} className='movie__photo' />
      <div className='movie__text'>
        <h2 className='movie__title'>{card.title}</h2>
        <p className='movie__duration'>{card.duration}</p>
      </div>
    </article>
  );
};

export default MoviesCard;