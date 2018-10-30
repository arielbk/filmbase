import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Movie from './Movie';

export default class MoviesList extends PureComponent {
  state = {
    movies: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <MovieGrid>
        {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
  max-width: 1250px;
  margin: 0 auto;

  @media (min-width: 1250px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 1020px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 820px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
