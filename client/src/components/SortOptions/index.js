import React from 'react';
import { StyledSortOptions, SortButton } from './SortOptions.styled';
import { setSortBy, updateFilmList, setListPage } from '../../actions/listActions';

const SortOptions = ({ sortBy, setSortBy }) => {
	return (
		<StyledSortOptions>
			<h4>Sort by:</h4>
			<SortButton
				active={sortBy === 'popularity.desc'}
				onClick={() => setSortBy('popularity.desc')}
			>
				most popular
			</SortButton>
			<SortButton
				active={sortBy === 'release_date.desc'}
				onClick={() => setSortBy('release_date.desc')}
			>
				newest
			</SortButton>
			<SortButton
				active={sortBy === 'vote_average.desc'}
				onClick={() => setSortBy('vote_average.desc')}
			>
				top rated
			</SortButton>
		</StyledSortOptions>
	);
};

export default SortOptions;
