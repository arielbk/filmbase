import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadMore } from '../../actions/listActions';

import { StyledLoadMore } from './LoadMore.styled';

const LoadMore = props => {
	const { list, loadMore } = props;
	const { page, searchQuery, sortBy, moreLoading } = list;

	return (
		<StyledLoadMore
			onClick={() => {
				if (moreLoading) return;
				loadMore(page + 1, searchQuery, sortBy);
			}}
			loading={moreLoading}
		>
			{moreLoading ? 'Loading...' : 'Load More...'}
		</StyledLoadMore>
	);
};

LoadMore.propTypes = {
	page: PropTypes.number,
	search: PropTypes.string,
};
LoadMore.defaultProps = {
	search: null,
	page: 1,
};

const mapStateToProps = state => ({
	list: state.list,
});

export default connect(
	mapStateToProps,
	{ loadMore }
)(LoadMore);
