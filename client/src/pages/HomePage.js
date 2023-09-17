import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const HomePage = () => {
    return (
        <Container>
            <Sidebar />
            <Box textAlign='center' py={10}>
                <Typography variant="h2" gutterBottom>
                    Welcome to Book Finder
                </Typography>
                <Typography variant="subtitile" paragraph>
                    Discover and save your favorite books. Sign up to create your personal library, or login to continue exploring.
                </Typography>
                <Box mt={4}>
                    <Button variant="contained" color="primary" component={Link} to="/signup">Sign Up</Button>
                    <Button variant="outlined" color="primary" component={Link} to="/login">Login</Button>
                </Box>
                <Box mt={4}>
                    <Typography variant="body1" paragraph>
                        Explore as a guest <Link to='/searchBooks'>here</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
};

export default HomePage;
