import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StyledDropdown, Top, Bottom, StyledLink, BottomArrow } from './UnauthDropdown.styled';

export default class UnauthDropdown extends Component {
	state = {
		open: false,
	};

	onToggle = () =>
		this.setState(prevState => ({
			open: !prevState.open,
		}));

	render() {
		const { open } = this.state;
		return (
			<StyledDropdown>
				<Top onClick={this.onToggle}>
					<div />
					<div />
					<div />
				</Top>
				{open && (
					<Bottom>
						<StyledLink>
							<Link to="/register" onClick={this.onToggle}>
								Register
							</Link>
						</StyledLink>
						<StyledLink>
							<Link to="/login" onClick={this.onToggle}>
								Login
							</Link>
						</StyledLink>
						<BottomArrow />
					</Bottom>
				)}
			</StyledDropdown>
		);
	}
}
