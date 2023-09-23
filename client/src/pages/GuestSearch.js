import React from 'react';
import {Link} from 'react-router-dom';
import SearchBook from '../components/SearchBooks';
import {Container,Typography,Button,Box} from '@mui/material';
import {AuthContext} from '../context/authContext';
import {useContext} from 'react';

const HomePage=() => {
	const {user}=useContext(AuthContext);

	return (
		<Container>
			<Box textAlign='center' py={10}>
				<Typography variant="h2" gutterBottom>
					Welcome to Book Finder
				</Typography>
				<Typography variant="subtitile" paragraph>
					Discover new books to add to your collection.
				</Typography>
				<Box mt={4}>
					{user?
						<>
							<Box m={4} p={2}>
								<SearchBook />
							</Box>
						</>
						:
						<>
							<Typography variant="subtitile" paragraph>
								Sign up to create your personal library, or login to continue exploring.
							</Typography>   <Button variant="contained" color="primary" component={Link} to="/signup">Sign Up</Button>
							<Button variant="outlined" color="primary" component={Link} to="/login">Login</Button>
							<Box mt={4}>
								<Typography variant="body1" paragraph>
									Explore as a guest
									<Link to='/guestsearch'>here</Link>
								</Typography>
							</Box>
						</>
					}

				</Box>
			</Box>
		</Container>
	)
};

export default HomePage;
