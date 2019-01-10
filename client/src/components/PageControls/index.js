import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledPageControls } from './PageControls.styled';

const PageControls = props => {
	const { list } = props;
	const { page, totalPages, searchQuery } = list;

	let backLink;
	let forwardLink;

	backLink = searchQuery
		? `/search=${searchQuery}/p=${parseInt(page) - 1}`
		: `/p=${parseInt(page) - 1}`;

	forwardLink = searchQuery
		? `/search=${searchQuery}/p=${parseInt(page) + 1}`
		: `/p=${parseInt(page) + 1}`;

	return (
		<StyledPageControls>
			{page > 1 ? (
				<a data-testid="pagecontrols-back" href={backLink}>
					<div>&lt;</div>
				</a>
			) : (
				<div>&nbsp;</div>
			)}
			<span data-testid="pagecontrols-current">page {page}</span>
			<a data-testid="pagecontrols-forward" href={forwardLink}>
				<div>&gt;</div>
			</a>
		</StyledPageControls>
	);
};

PageControls.propTypes = {
	page: PropTypes.number.isRequired,
	search: PropTypes.string,
};
PageControls.defaultProps = {
	search: null,
};

const mapStateToProps = state => ({
	list: state.list,
});

export default connect(mapStateToProps)(PageControls);
