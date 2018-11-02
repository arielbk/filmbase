import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w185';

export default class Movie extends Component {
  render() {
    const { movie } = this.props;
    const { children } = this.props;
    return (
      <StyledMovie
        onMouseEnter={() => this.setState({ showOverlay: true })}
        onMouseLeave={() => this.setState({ showOverlay: false })}
      >
        <Link to={`/${movie.id}`}>
          <Overdrive id={String(movie.id)}>
            <Poster src={Object.keys(movie).length && `${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <Overlay>
            {children}
          </Overlay>
        </Link>
      </StyledMovie>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
  }).isRequired,
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
  a {
    text-decoration: none;
    color: #fff;
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
