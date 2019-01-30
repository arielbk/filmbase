import React, { Component } from 'react';
import { TrailerContainer, Title, YoutubeFrame } from './Trailer.styled';

export default class index extends Component {
	render() {
		const { id } = this.props;
		return (
			<TrailerContainer>
				<Title>Trailer</Title>
				{/* <YouTube opts={opts} videoId="mP0VHJYFOAU" /> */}
				<YoutubeFrame
					src={`https://www.youtube.com/embed/${id}`}
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					frameBorder={0}
				/>
			</TrailerContainer>
		);
	}
}
