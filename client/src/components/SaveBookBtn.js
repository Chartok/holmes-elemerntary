// Import useContext hook
import React,{useContext} from 'react';

// Import save book gql mutation
import {SAVE_BOOK} from '../utils/mutations';

// Import useMutation hook
import {useMutation} from '@apollo/client';

// Import JWT 
import {AuthContext} from '../context/authContext';

// Import ui 
import {Alert,Container,Box,Button,Typography} from '@mui/material';


// Savebook component for saving books; passing in books prop
export default function SaveBook({book}) {
    const [saveBook,{loading,data,error}]=useMutation(SAVE_BOOK);
    const {user}=useContext(AuthContext);

    if(loading) {
        return <Typography>Loading...</Typography>;
    } else if(error) {
        return <Alert severity='error'>Error saving book: {error.message}</Alert>
    } else if(!user) {
        return <Alert severity='warning'>You must be logged in to save books</Alert>
    }
    const handleSaveBook=async () => {
        try {
            const userId=await user?.user_id;
            const {__typename,...bookToSave}=book;

            await saveBook({
                variables: {book: bookToSave,userId}
            });
        } catch(error) {
            console.error('An error occurrd:',error)
        }
        return 'The book was saved to your library!'
    };

    return (
        <Container >
            <Box my={4}>
                <Button variant='contained' color='primary' onClick={() => handleSaveBook(data)}>Save Book</Button>
            </Box>
        </Container>
    )
};
