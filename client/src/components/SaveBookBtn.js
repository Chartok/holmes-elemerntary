import React, { useContext } from 'react';
import { SAVE_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import { Alert, Container, Box, Button, Typography } from '@mui/material';


function SaveBook() {
    const [saveBook, { loading, data, error }] = useMutation(SAVE_BOOK);
    const { user } = useContext(AuthContext);
    const handleSaveBook = async (bookData) => {
        const userId = await user?.user_id;
        const { __typename, ...bookToSave } = bookData;

        if (!userId) {
            console.error(error);
            return;
        }


        try {
            await saveBook({
                variables: { book: bookToSave, userId }
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Container >
            <Box my={4}>
                <Button variant='contained' color='primary' onClick={() => handleSaveBook() }>Save Book</Button>
            </Box>

            <Box>
                {loading && <Typography variant='body1'>Saving...</Typography>}

                {error && <Alert severity='error' sx={{ mt: 2 }}>Unable to save book! {error.message}</Alert>}

                {data && <Typography variant='body1'>Book saved!</Typography>}
            </Box>
        </Container>
    )
};

export default SaveBook;