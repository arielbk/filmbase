import React from 'react';
import PropTypes from 'prop-types';

import { StyledPageControls } from './PageControls.styled';

const PageControls = props => {
	const { page, search } = props;
	return (
		<StyledPageControls>
			{page > 1 ? (
				<a
					data-testid="pagecontrols-back"
					href={search ? `/search=${search}/p=${page - 1}` : `/p=${page - 1}`}
				>
					<div>&lt;</div>
				</a>
			) : (
				<div>&nbsp;</div>
			)}
			<span data-testid="pagecontrols-current">page {page}</span>
			<a
				data-testid="pagecontrols-forward"
				href={search ? `/search=${search}/p=${page + 1}` : `/p=${page + 1}`}
			>
				<div>&gt;</div>
			</a>
		</StyledPageControls>
	);
};

export default PageControls;

PageControls.propTypes = {
	page: PropTypes.number.isRequired,
	search: PropTypes.string,
};
PageControls.defaultProps = {
	search: null,
};
