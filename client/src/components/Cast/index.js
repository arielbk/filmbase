import React, { Component } from 'react';
import blankPhoto from '../../assets/images/blank.png';
import {
	StyledCast,
	CastGrid,
	CastMember,
	CastProfile,
	CastDetails,
	CreditName,
	CreditCharacter,
	SeeMore,
	SeeMoreContainer,
} from './Cast.styled';

export const CAST_PATH = 'https://image.tmdb.org/t/p/w185';

export default class Cast extends Component {
	state = {
		castCount: 6,
	};

	seeMore = () => {
		const { credits } = this.props;
		const { castCount } = this.state;
		if (castCount === credits.length) return;
		this.setState({ castCount: castCount + 6 });
	};

	render() {
		const { credits } = this.props;
		const { castCount } = this.state;
		const cast = credits.cast.slice(0, castCount);
		return (
			<StyledCast>
				<h2>Cast &amp; Crew</h2>

				{/* INCLUDE KEY CREW HERE -- OR IN THE SIDEBAR? */}

				<CastGrid>
					{/* CAST */}
					{cast &&
						cast.map(credit => (
							<CastMember data-testid="movie-credit" key={credit.credit_id}>
								<CastProfile
									data-testid="credit-photo"
									src={
										credit.profile_path
											? `${CAST_PATH}${credit.profile_path}`
											: blankPhoto
									}
									alt={credit.name}
								/>
								<CastDetails>
									<CreditName data-testid="credit-name">{credit.name}</CreditName>
									<CreditCharacter data-testid="credit-character">
										{credit.character}
									</CreditCharacter>
								</CastDetails>
							</CastMember>
						))}
				</CastGrid>

				{castCount < credits.cast.length && (
					<SeeMoreContainer>
						<SeeMore onClick={this.seeMore}>See More</SeeMore>
					</SeeMoreContainer>
				)}
			</StyledCast>
		);
	}
}
