import React from 'react';
import Button from '../button'
import { Link } from 'react-router-dom';
import { useLogoutApiMutation} from '../../features/auth/authApiSlice';
import { selectCurrentUser } from '../../features/auth/authSlice'
import { useAppSelector } from '../../hooks/hooks';
import './header.scss'

const Header = (props) => {
	
	const [logoutApi] = useLogoutApiMutation()
	const user = useAppSelector(selectCurrentUser)
	return (
		<header className='header'>			
			<div className="container">
				<div className="header-box">
					<div className="logo">						
						<Link className='logo-link' to='/blocknot'>БЛОКНОТ</Link>						
					</div>					
						{
							user
							? 	<div className="header-button">									
									<Button handleClick={logoutApi}>
										выход
									</Button>
								</div>
							: 	null
						}					
				</div>
			</div>			
		</header>
	);
};

export default Header;