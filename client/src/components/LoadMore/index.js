import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadMore } from '../../actions/listActions';

import { StyledLoadMore } from './LoadMore.styled';

const LoadMore = ({ isFetchingMore, fetchMore, canFetchMore, ref }) => {
	// const { list, loadMore } = props;
	// const { page, searchQuery, sortBy, moreLoading } = list;

	return (
		<StyledLoadMore
			ref={ref}
			onClick={() => {
				if (isFetchingMore) return;
				fetchMore();
			}}
			loading={isFetchingMore}
		>
			{isFetchingMore ? 'Loading...' : 'Load More...'}
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

export default connect(mapStateToProps, { loadMore })(LoadMore);
