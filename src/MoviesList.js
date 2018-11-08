import styled from 'styled-components';
import React, { PureComponent, Fragment } from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';

import Loading from './Loading';
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
    loading: true,
    searchQuery: null,
  }

  async componentDidMount() {
    const { match } = this.props;
    const searchQuery = match.params.query;
    await this.setState({ searchQuery });
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
      await this.setState({ loading: true });

      const { sortBy, searchQuery } = this.state;
      const { match } = this.props;
      const { params } = match;
      const { page } = params;

      let res;
      if (!searchQuery) {
        res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`);
      } else {
        res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`);
      }
      const movies = await res.json();
      this.setState({
        movies: movies.results,
        loading: false,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  render() {
    const {
      movies, genres, sortBy, loading,
    } = this.state;
    const { match } = this.props;
    let page = parseInt(match.params.page, 10);
    if (Number.isNaN(page)) {
      page = 1;
    }

    return (
      <Fragment>

        <SortOptions>
          <h4>Sort by:</h4>
          <button
            style={sortBy === 'popularity.desc' ? { color: '#5eb94e' } : {}}
            onClick={() => this.setState({ sortBy: 'popularity.desc' }, this.fetchMovies)}
            type="button"
          >
            most popular
          </button>
          <button
            style={sortBy === 'release_date.desc' ? { color: '#5eb94e' } : {}}
            onClick={() => this.setState({ sortBy: 'release_date.desc' }, this.fetchMovies)}
            type="button"
          >
            newest
          </button>
          <button
            style={sortBy === 'vote_average.desc' ? { color: '#5eb94e' } : {}}
            onClick={() => this.setState({ sortBy: 'vote_average.desc' }, this.fetchMovies)}
            type="button"
          >
            best rated
          </button>
        </SortOptions>

        {loading
          ? <Loading />
          : (
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
                        {genres.map(genre => genreID === genre.id
                          && <Genre key={genre.name}>{genre.name}</Genre>)}
                      </span>
                    ))}
                  </div>
                </Movie>
              ))}
            </MovieGrid>
          )}
        <PageControls page={page} />
      </Fragment>
    );
  }
}

MoviesList.defaultProps = {
  match: {
    params: {
      page: '1',
    },
  },
};

MoviesList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }),
};

const MovieGrid = styled.div`
  margin: 0 auto;
  display: grid;
  padding: 4rem 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
  max-width: 1250px;

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

const SortOptions = styled.div`
  h4 {
    margin: 0;
    margin-bottom: 1rem;
  }
  margin-top: 4rem;
  background: #111;
  border-radius: 12px;
  display: inline-block;
  padding: 1rem;
  button {
    font-size: 1rem;
    background: transparent;
    border: none;
    margin: 0.5rem;
    color: #777;
    :hover {
      cursor: pointer;
    }
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
