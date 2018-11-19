import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import React, { Component, Fragment } from 'react';
import commaNumber from 'comma-number';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';

import Loading from './Loading';
import { Poster } from './Movie';


export const POSTER_PATH = 'https://image.tmdb.org/t/p/w185';
const POSTER_PATH_SMALL = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';
export const CAST_PATH = 'https://image.tmdb.org/t/p/w185';

class MovieDetail extends Component {
  state = {
    movie: {},
    credits: {},
    loading: true,
  }

  static contextTypes = {
    router: () => null,
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    // film details
    try {
      const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US`);
      const movie = await movieRes.json();

      const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=5f65a05aa95f0f49a243118f362a4d69`);
      const credits = await creditsRes.json();

      this.setState({
        movie,
        credits,
        loading: false,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  render() {
    const { movie, credits, loading } = this.state;
    const { history } = this.props;
    return (
      <MovieWrapper>
        {loading && <Loading />}
        {!loading && movie && !movie.status_code && (
          <Fragment>
            <Background backdrop={Object.keys(movie).length && `${BACKDROP_PATH}${movie.backdrop_path}`} />
            <MovieInfo>
              <SidePanel>
                <SideTitle>
                  <h1 data-testid="movie-title" style={{ display: 'inline' }}>{movie.title}</h1>
                  <h4 data-testid="movie-tagline">
                    {movie.tagline}
                  </h4>
                </SideTitle>
                <Overdrive id={String(movie.id)}>
                  <Poster data-testid="movie-poster" src={Object.keys(movie).length && `${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                </Overdrive>
                <Votes>
                  <ReactStars
                    count={5}
                    value={movie.vote_average / 2}
                    size={24}
                    color2="#4e9a46"
                    edit={false}
                  />
                  <div>
                    <span data-testid="vote-average">
                      {movie.vote_average}
                    </span>
                    /10
                    <span style={{ marginLeft: '1rem' }}>
                      (
                      <span data-testid="vote-count">
                        {movie.vote_count}
                      </span>
                      {' '}
                      votes)
                    </span>
                  </div>
                </Votes>
                <div>
                  {movie.genres && movie.genres.map(genre => (
                    <GenreTab data-testid="movie-genre" key={genre.name}>{genre.name}</GenreTab>
                  ))}
                </div>
                <SideStat>
                  <span>Released:</span>
                  <h3 data-testid="movie-release-date">
                    {movie.release_date}
                  </h3>
                </SideStat>

                <SideStat>
                  <span>Runtime:</span>
                  <h3 data-testid="movie-runtime">
                    {movie.runtime}
                    min
                  </h3>
                </SideStat>

                {movie.budget !== 0
                && (
                <SideStat>
                  <span>Budget:</span>
                  <h3 data-testid="movie-budget">
                    $
                    {(commaNumber(movie.budget))}
                  </h3>
                </SideStat>
                )}

                {movie.revenue !== 0
                && (
                <SideStat>
                  <span>Revenue:</span>
                  <h3 data-testid="movie-revenue">
                    $
                    {(commaNumber(movie.revenue))}
                  </h3>
                </SideStat>
                )}

                {movie.belongs_to_collection
                  && (
                    <RelatedFilms>
                      <h4>part of</h4>
                      <h3>{movie.belongs_to_collection.name}</h3>
                      <img src={Object.keys(movie).length && `${POSTER_PATH_SMALL}${movie.belongs_to_collection.poster_path}`} alt={movie.belongs_to_collection.name} />
                    </RelatedFilms>
                  )
                }
              </SidePanel>
              <MainContent>
                <MainTitle>
                  <h1 data-testid="movie-title" style={{ display: 'inline' }}>{movie.title}</h1>
                  <h4 data-testid="movie-tagline">
                    {movie.tagline}
                  </h4>
                </MainTitle>

                {/* CAST */}
                <Cast>
                  {credits.cast && (
                    credits.cast.map(credit => (
                      <div data-testid="movie-credit" key={credit.credit_id}>
                        <h3 data-testid="credit-name">{credit.name}</h3>
                        <img data-testid="credit-photo" src={Object.keys(credit).length && `${CAST_PATH}${credit.profile_path}`} alt={credit.name} />
                        <h4 data-testid="credit-character">{credit.character}</h4>
                      </div>
                    )))}
                </Cast>

                <Overview data-testid="movie-overview">{movie.overview}</Overview>

                <h3>Images</h3>
                <h3>Videos</h3>
                <h3>Recommendations</h3>

                <BackButton onClick={history.goBack}>&lt;</BackButton>

              </MainContent>
            </MovieInfo>
          </Fragment>
        )}
        {!loading && movie && movie.status_code === 34 && (
          <Fragment>
            <h2 data-testid="movie-title" style={{ marginTop: '6rem' }}>Film not found!</h2>
            <BackButton onClick={history.goBack}>&lt;</BackButton>
          </Fragment>
        )}
      </MovieWrapper>
    );
  }
}

MovieDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(MovieDetail);

const MovieWrapper = styled.div`
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${props => props.backdrop}) center no-repeat;
  background-size: cover;
  z-index: -1;
  filter: blur(10px);
`;

const MovieInfo = styled.div`
  background-image: linear-gradient(rgba(0,0,0,0.8), rgba(10,10,10,1));
  text-align: left;
  padding: 6rem 5%;
  display: flex;
  justify-content: center;

  @media (max-width: 760px) {
    display: block;
  }

  @media (max-width: 360px) {
    padding: 6rem 1rem;
  }
`;

const MainContent = styled.div`
  padding: 0 0 0 2rem;
  max-width: 850px;
  overflow: auto;
  h1 {
    margin-bottom: 0.4rem;
    text-shadow: 1px 6px 22px #000;
  }

  @media (max-width: 760px) {
    padding: 0;
  }
`;

const SidePanel = styled.div`
  position: relative;
  margin: 0 1rem;
  width: 186px;

  @media (max-width: 760px) {
    margin: 0 auto;
  }
`;

const GenreTab = styled.div`
  background: rgba(0,0,0,0.1);
  border: 2px solid #777;
  color: #ddd;
  padding: 0.8rem 1rem;
  width: 150px;
  margin: 0.8rem auto;
  border-radius: 22px;
  text-align: center;
  text-shadow: 0 2px 6px #000;

  :last-child {
    margin-bottom: 2rem;
  }
`;

const Votes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 1.5rem;
  padding: 0.4rem 0.9rem 1rem 0.2rem;
  text-align: center;
  border-radius: 22px;
  div {
    margin-top: 0.5rem;

    span {
      font-size: 0.8rem; 
      color: #aaa;
    }
  }
`;

const SideStat = styled.div`
  font-size: 0.8rem;
  margin-bottom: 2rem;

  span {
    color: #777;
  }
  h3 {
    margin: 0.4rem;
    font-size: 1.4rem;
    // text-align: center;
    font-weight: 400;
  }
`;

const Overview = styled.p`
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const Title = styled.div`
  display: inline-block;
  margin-bottom: 2rem;
  width: auto;

h4 {
  color: #777;
  font-weight: 400;
  margin: 0.3rem 0
  }
`;

const MainTitle = styled(Title)`
  @media (max-width: 760px) {
    display: none;
  }
`;

const SideTitle = styled(Title)`
  @media (min-width: 760px) {
    display: none;
  }
`;

const Cast = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  background: rgba(0,0,0,0.4);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  div {
    whitespace: wrap;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    h4 {
      font-size: 1rem;
      color: #999;
      font-weight: 400;
    }

    img {
      border-radius: 3px;
      width: 120px;
      box-shadow: 0 0 35px black;
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.125rem;
  width: 3.125rem;
  border-radius: 22px;
  font-size: 1.5rem;
  font-weight: 400;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  background: #111;
  color: #eee;
  border: 1px solid #4e9a46;
  :hover {
    cursor: pointer;
    background: #4e9a46;
  }
`;

const BackButton = styled(Button)`
  position: fixed;
  top: 2rem;
  left: 1rem;

  @media (max-width: 760px) {
    display: none;
  }
`;

const RelatedFilms = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  margin: 2rem 0;
  border-radius: 12px;
  background: rgba(0,0,0,0.4);
  max-width: 100%;
  text-align: center;

  h4 {
    color: #777;
    margin: 0;
  }
  h3 {
    margin: 0.8rem 0;
  }
  img {
    border-radius: 3px;
  }
`;
