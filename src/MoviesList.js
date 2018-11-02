import styled from 'styled-components';
import React, { PureComponent, Fragment } from 'react';
import ReactStars from 'react-stars';

import PageControls from './PageControls';
import Movie from './Movie';

export default class MoviesList extends PureComponent {
  state = {
    // list of movies to show
    movies: [],
    // populated by API request, genre codes corresponding to a genre name
    genres: [],
    // how the list of movies should be sorted
    sortBy: 'popularity.desc',
  }

  async componentDidMount() {
    this.fetchMovies();
    try {
      const genresRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US');
      const genreObj = await genresRes.json();
      this.setState({
        genres: genreObj.genres,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  fetchMovies = async () => {
    try {
      let page;
      const { sortBy } = this.state;
      console.log('sortby', sortBy)
      console.log('match', this.props.match);
      // if there are no params, user must be on homepage (page 1)
      !this.props.match.params
        ? page = 1
        : page = this.props.match.params.page;
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`);
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  render() {
    const { movies, genres } = this.state;
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
              <div style={{ marginTop: '1rem' }}>
                {movie.genre_ids.length && movie.genre_ids.map(genreID => (
                  <span key={genreID}>
                    {/* can I use a for each to return something?? need to figure this one out */}
                    {/* just return the genre name if the genre id matches the one brought in from the api */}
                    {genres.map(genre => genreID === genre.id && <Genre key={genre.name}>{genre.name}</Genre>)}
                  </span>
                ))}
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

const Genre = styled.div`
  display: inline-block;
  padding: 0.4rem;
  margin-right: 0.5rem;
  border-radius: 3px;
  background: rgba(0,0,0,0.8);
  color: #ccc;
  &::after {
    content: ' / ';
  }
  &:last-child {
    :after {
      content: '';
    }
  }
`;