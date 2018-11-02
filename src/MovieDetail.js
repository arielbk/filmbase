import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import React, { Component } from 'react';
import commaNumber from 'comma-number';
import ReactStars from 'react-stars';
import { Poster } from './Movie';


const POSTER_PATH = 'https://image.tmdb.org/t/p/w185';
const POSTER_PATH_SMALL = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';
const CAST_PATH = 'https://image.tmdb.org/t/p/w185';

class MovieDetail extends Component {
  state = {
    movie: {},
    credits: {},
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
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  render() {
    const { movie } = this.state;
    const { credits } = this.state;
    return (
      <MovieWrapper>
        <Background backdrop={Object.keys(movie).length && `${BACKDROP_PATH}${movie.backdrop_path}`} />
        <MovieInfo>
          <SidePanel>
            <Overdrive id={String(movie.id)}>
              <Poster src={Object.keys(movie).length && `${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
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
                {movie.vote_average}
                /10
                <span style={{ marginLeft: '1rem' }}>
                  (
                  {movie.vote_count}
                  {' '}
                  votes)
                </span>
              </div>
            </Votes>
            <div>
              {movie.genres && movie.genres.map(genre => (
                <GenreTab key={genre.name}>{genre.name}</GenreTab>
              ))}
            </div>
            <SideStat>
              <span>Released:</span>
              <h3>
                {movie.release_date}
              </h3>
            </SideStat>

            <SideStat>
              <span>Runtime:</span>
              <h3>
                {movie.runtime}
                min
              </h3>
            </SideStat>

            {movie.budget !== 0
            && (
            <SideStat>
              <span>Budget:</span>
              <h3>
                $
                {(commaNumber(movie.budget))}
              </h3>
            </SideStat>
            )}

            {movie.revenue !== 0
            && (
            <SideStat>
              <span>Revenue:</span>
              <h3>
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
            <Title>
              <h1 style={{ display: 'inline' }}>{movie.title}</h1>
              <h4>
                {movie.tagline}
              </h4>
            </Title>

            {/* CAST */}
            <Cast>
              {credits.cast && (
                credits.cast.map(cast => (
                  <div key={cast.name}>
                    <h3>{cast.name}</h3>
                    <img src={Object.keys(cast).length && `${CAST_PATH}${cast.profile_path}`} alt={cast.name} />
                    <h4>{cast.character}</h4>
                  </div>
                )))}
            </Cast>

            <Overview>{movie.overview}</Overview>

            <h3>Images</h3>
            <h3>Videos</h3>
            <h3>Recommendations</h3>

            {/* These should really be somewhere else... */}
            <BackButton onClick={this.props.history.goBack}>Go back!</BackButton>
            <SearchButton>Search</SearchButton>

          </MainContent>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

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
  // background: rgba(10,10,10,0.8);
  background-image: linear-gradient(rgba(0,0,0,0.8), rgba(10,10,10,1));
  text-align: left;
  padding: 4rem 10%;
  display: flex;
  justify-content: center;
`;

const MainContent = styled.div`
  padding: 0 2rem;
  max-width: 850px;
  overflow: auto;
  h1 {
    margin-bottom: 0.4rem;
    text-shadow: 1px 6px 22px #000;
  }
`;

const SidePanel = styled.div`
  position: relative;
  margin: 0 1rem;
  width: 186px;
  // top: -8rem;
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
    text-align: center;
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
    // max-width: 152px;  
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
  padding: 1rem;
  border: none;
  border-radius: 22px;
  font-size: 1rem;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  background: #4E9A46;
  color: #eee;
  border: 1px solid rgba(0,0,0,0);
  :hover {
    cursor: pointer;
    background: #111;
    border: 1px solid #4E9A46;
    color: #ccc;
  }
`;

const BackButton = styled(Button)`
  position: fixed;
  top: 2rem;
  left: 1rem;
`;

const SearchButton = styled(Button)`
  position: fixed;
  top: 2rem; 
  right: 1rem;
  background: #111;
  border: 1px solid #4E9A46;
  color: #ccc;
  padding: 1rem 2rem;
  :hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    background: #4E9A46;
    color: #eee;
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
