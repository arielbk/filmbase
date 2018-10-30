import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

export default class MovieDetail extends Component {
  state = {
    movie: {},
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US`);
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <SidePanel>
            <Overdrive id={String(movie.id)}>
              <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
            </Overdrive>
            <h3>
              {' '}
              {movie.release_date}
            </h3>

            <p>
              {movie.genres && movie.genres.map(genre => (
                <GenreTab>{genre.name}</GenreTab>
              ))}
            </p>

            <h4>
              Runtime:
              {' '}
              {movie.runtime}
              min
            </h4>
            <p>
              Budget: $
              {movie.budget}
            </p>
          </SidePanel>
          <div>
            <h1>{movie.title}</h1>
            <Votes>
              {movie.vote_average}
              /10
              <span>
                (
                {movie.vote_count}
                {' '}
                votes)
              </span>
            </Votes>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) center no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: rgba(0,0,0,0.9);
  text-align: left;
  padding: 2rem 10%;
  display: flex;

  > div {
    margin-left: 2rem;
  }
`;

const SidePanel = styled.div`
  position: relative;
  top: -8rem;
`;

const GenreTab = styled.div`
  background: #ccc;
  color: #333;
  padding: 0.2rem;
  border-radius: 5px;
  width: 10rem;
  margin: 0.5rem 0;
  text-align: center;
`;

const Votes = styled.div`
  span {
    margin-left: 1rem;
    font-size: 0.8rem; 
    color: #aaa;
  }
`;
