import styled from 'styled-components';
import React, { PureComponent, Fragment } from 'react';
import ReactStars from 'react-stars';

import PageControls from './PageControls';
import Movie from './Movie';

export default class MoviesList extends PureComponent {
  state = {
    movies: [],
  }

  async componentDidMount() {
    try {
      let page;
      !this.props.match.params
        ? page = 1
        : page = this.props.match.params.page;
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
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
    let page = parseInt(this.props.match.params.page, 10);
    if (isNaN(page)) {
      page = 1;
    }
    return (
      <Fragment>
        <PageControls page={page} />
        <MovieGrid>
          {movies.map(movie => (
            <Movie key={movie.id} movie={movie}>
              <h3>{movie.title}</h3>
              <ReactStars
                count={5}
                value={movie.vote_average / 2}
                size={24}
                color2="#4e9a46"
                edit={false}
              />
              <div>
                Genres need to go here (API call)
              </div>
            </Movie>
          ))}
        </MovieGrid>
        <PageControls page={page} />
      </Fragment>
    );
  }
}

const MovieGrid = styled.div`
  display: grid;
  padding: 4rem 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
  max-width: 1250px;
  margin: 0 auto;

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
