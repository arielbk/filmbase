import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	StyledDropdown,
	Top,
	ProfPic,
	TopArrow,
	Bottom,
	CurrentUser,
	AuthLink,
	BottomArrow,
} from './AuthDropdown.styled';

export default class AuthDropdown extends Component {
	state = {
		open: false,
	};

	onToggle = () =>
		this.setState(prevState => ({
			open: !prevState.open,
		}));

	render() {
		const { open } = this.state;
		const { user, onLogout } = this.props;
		return (
			<StyledDropdown>
				<Top onClick={this.onToggle}>
					<ProfPic />
					<TopArrow />
				</Top>
				{open && (
					<Bottom>
						<CurrentUser>Logged in as {user.name}</CurrentUser>
						<AuthLink>
							<Link to="/hearted" onClick={this.onToggle}>
								Hearted Films
							</Link>
						</AuthLink>
						<AuthLink
							onClick={() => {
								onLogout();
								this.onToggle();
							}}
						>
							Logout
						</AuthLink>
						<BottomArrow />
					</Bottom>
				)}
			</StyledDropdown>
		);
	}
}
