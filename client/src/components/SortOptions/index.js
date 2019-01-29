import React, { Component } from 'react';
import { StyledSortOptions, SortButton } from './SortOptions.styled';
import { connect } from 'react-redux';
import { setSortBy, updateFilmList, setListPage } from '../../actions/listActions';

class SortOptions extends Component {
	handleChangeSort = async newSorting => {
		await this.props.setSortBy(newSorting);
		await this.props.setListPage(1);
		this.props.updateFilmList(
			this.props.list.page,
			this.props.list.searchQuery,
			this.props.list.sortBy
		);
	};

	render() {
		const { list } = this.props;
		const { sortBy } = list;
		return (
			<StyledSortOptions>
				<h4>Sort by:</h4>
				<SortButton
					active={sortBy === 'popularity.desc'}
					onClick={() => this.handleChangeSort('popularity.desc')}
				>
					most popular
				</SortButton>
				<SortButton
					active={sortBy === 'release_date.desc'}
					onClick={() => this.handleChangeSort('release_date.desc')}
				>
					newest
				</SortButton>
				<SortButton
					active={sortBy === 'vote_average.desc'}
					onClick={() => this.handleChangeSort('vote_average.desc')}
				>
					best rated
				</SortButton>
			</StyledSortOptions>
		);
	}
}

const mapStateToProps = state => ({
	list: state.list,
});

export default connect(
	mapStateToProps,
	{ setSortBy, updateFilmList, setListPage }
)(SortOptions);
