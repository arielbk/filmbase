import React, { Component } from 'react';
import { StyledSortOptions } from './SortOptions.styled';
import { connect } from 'react-redux';
import { setSortBy, updateFilmList, setListPage } from '../../actions/listActions';

class SortOptions extends Component {
	handleChangeSort = newSorting => {
		this.props.setSortBy(newSorting);
		this.props.setListPage(1);
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
				<button
					style={sortBy === 'popularity.desc' ? { color: '#5eb94e' } : {}}
					onClick={this.handleChangeSort}
					type="button"
				>
					most popular
				</button>
				<button
					style={sortBy === 'release_date.desc' ? { color: '#5eb94e' } : {}}
					onClick={this.handleChangeSort}
					type="button"
				>
					newest
				</button>
				<button
					style={sortBy === 'vote_average.desc' ? { color: '#5eb94e' } : {}}
					onClick={this.handleChangeSort}
					type="button"
				>
					best rated
				</button>
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
