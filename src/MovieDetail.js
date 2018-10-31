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
    router: () => true,
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

    console.log(credits);

    return (
      <MovieWrapper>
        <Background backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`} />
        <MovieInfo>
          <SidePanel>
            <Overdrive id={String(movie.id)}>
              <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
            </Overdrive>
            <h3>
              {' '}
              {movie.release_date}
            </h3>
            <div>
              {movie.genres && movie.genres.map(genre => (
                <GenreTab key={genre.name}>{genre.name}</GenreTab>
              ))}
            </div>

            <h4>
              Runtime:
              {' '}
              {movie.runtime}
              {' '}
              min
            </h4>
            {movie.budget !== 0
            && (
            <p>
              Budget: $
              {(commaNumber(movie.budget))}
            </p>
            )
            }
            {movie.revenue !== 0
            && (
            <p>
              Revenue: $
              {(commaNumber(movie.revenue))}
            </p>
            )
            }

            {movie.belongs_to_collection
              && (
                <RelatedFilms>
                  <h4>part of</h4>
                  <h3>{movie.belongs_to_collection.name}</h3>
                  <img src={`${POSTER_PATH_SMALL}${movie.belongs_to_collection.poster_path}`} alt={movie.belongs_to_collection.name} />
                </RelatedFilms>
              )
            }
          </SidePanel>
          <MainContent>
            <h1>{movie.title}</h1>
            <Tagline>
              {movie.tagline}
            </Tagline>
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
                <span>
                  (
                  {movie.vote_count}
                  {' '}
                  votes)
                </span>
              </div>
            </Votes>

            {/* CAST */}
            <Cast>
              {credits.cast && (
                credits.cast.map(cast => (
                  <div>
                    <h3>{cast.name}</h3>
                    <img src={`${CAST_PATH}${cast.profile_path}`} alt={cast.name} />
                    <h4>{cast.character}</h4>
                  </div>
                )))}
            </Cast>

            <Overview>{movie.overview}</Overview>

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
  // padding-top: 10rem;

  // background-attachment: fixed;
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
  margin: 0 auto 1.5rem;
  margin-left: 50%;
  transform: translate(-50%, 0);
  // background: rgba(0,0,0,0.4);
  display: inline-block;
  padding: 0.4rem 0.9rem 1rem 0.2rem;
  text-align: center;
  border-radius: 22px;
  div {
    margin-top: 0.5rem;
  }
  span {
    margin-left: 1rem;
    font-size: 0.8rem; 
    color: #aaa;
  }
`;

const Overview = styled.p`
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const Tagline = styled.div`
  color: #777;
  margin-bottom: 1.5rem;
`;

const Cast = styled.div`
  // height: 300px;
  display: flex;
  width: 100%;
  padding: 1rem;
  border-radius: 3px;
  margin-bottom: 2rem;
  background: rgba(0,0,0,0.4);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  div {
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
  border-radius: 22px;
  background: rgba(0,0,0,0.4);
  max-width: 100%;
  text-align: center;

  h4 {
    margin: 0;
    color: #999;
  }
  h3 {
    margin: 0.4rem 0 0.8rem;
  }
  img {
    border-radius: 3px;
  }
`;
