import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import blankPoster from './blank.png';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w185';

const Movie = (props) => {
  const { movie, children } = props;
  return (
    <StyledMovie>
      <Link to={`/${movie.id}`}>
        <Overdrive id={String(movie.id)}>
          <Poster
            src={
            movie.poster_path
              ? `${POSTER_PATH}${movie.poster_path}`
              : blankPoster
            }
            alt={movie.title}
          />
        </Overdrive>
        <Overlay>
          {children}
        </Overlay>
      </Link>
    </StyledMovie>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
  transition: transform 0.3s;
  border-radius: 3px;

  :hover {
    transform: scale(1.1);
  }
`;

const StyledMovie = styled.div`
  width: 185px;
  height: 278px;
  position: relative;
  margin: 0 auto;
  a {
    text-decoration: none;
    color: #fff;
  }
  h3 {
    margin: 0;
  }
  h5 {
    margin: 0.5rem 0 0.7rem;
    font-weight: 400;
  }
`;

const Overlay = styled.div`
  background: rgba(0,0,0,0.8);
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity .3s;

  :hover {
    opacity: 1;
  }
`;
