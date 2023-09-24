// Savebook button component for saving books to user's collection

// Import dependencies
import React, { useContext, useState } from 'react';
import { SAVE_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import { Alert, Container, Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function SaveBook({ book }) {
    const [ saveBook, { loading } ] = useMutation(SAVE_BOOK);
    const { user } = useContext(AuthContext);

    // State for error handling
    const [saveError, setSaveError] = useState(null);

    // Loading state
    if (loading) return <Typography>Loading...</Typography>;

    // Error state from apollo client
    if (saveError) return <Alert severity='error'>Error saving book: {saveError}</Alert>

    // If user is not logged in and can see the save book button
    if (!user) return <Alert severity='warning'>You must be logged in to save books</Alert>

    const handleSaveBook = async () => {
        try {
            const userId = await user?.user_id;
            const { __typename, ...bookToSave } = book;
            await saveBook({
                variables: { book: bookToSave, userId }
            });
        } catch (error) {
            setSaveError(error.message);
            console.error('An error occurrd:', error)
        }
        return 'The book was saved to your library!'
    };

    return (
        <Container >
            <Box my={ 4 }>
                <Button variant='contained' color='primary' onClick={handleSaveBook}>Save Book</Button>
            </Box>
        </Container>
    )
};

// Type checking for props
SaveBook.propTypes = {
    book: PropTypes.object.isRequired,
};
