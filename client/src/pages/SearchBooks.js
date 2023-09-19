import React from 'react';
import SaveBook from '../components/SaveBookBtn';
import { Alert, Container, Box, TextField, Button, Typography, Link, List, ListItem } from '@mui/material';
import { useForm } from '../utils/formHook';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_BOOKS } from '../utils/queries';

function SearchBooks() {
  const [ searchBooks, { loading, error, data } ] = useLazyQuery( SEARCH_BOOKS );

  const search = () => {
    searchBooks( { variables: { query: values.searchInput } } );
  };

  const { onChange, onSubmit, values } = useForm( search, {
    searchInput: '',
  } );

  return (
    <Container maxWidth="md">
      <Box my={ 4 }>
        <Typography variant="h4" component="h1" gutterBottom>
          Search for Books!
        </Typography>
        <form onSubmit={ onSubmit }>
          <TextField
            fullWidth
            name='searchInput'
            label="Search for a book"
            value={ values.searchInput }
            onChange={ onChange }
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={ onSubmit }
          >
            Submit Book Search
          </Button>
        </form>
      </Box>
      <Box my={ 4 }>

        { loading && <Typography variant="body1">Loading...</Typography> }

        { error && <Alert severity="error" sx={ { mt: 2 } }>
          An error occurred: { error.message }
        </Alert> }

        { data?.searchBooks && (
          <List>
            { data.searchBooks.map( ( book ) => (
              <ListItem key={ book.bookId }>
                <Link href={ book.link }>
                  <img src={ book.image } alt={ book.title } />
                  <Typography variant="body1">
                    <strong>Description:</strong> { book.description }
                  </Typography>
                  <Typography variant="body1">
                    <strong>Authors:</strong> { book.authors.join( ', ' ) }
                  </Typography>
                </Link>
                <SaveBook book={ book } />
              </ListItem>
            ) ) }
          </List>

        ) }

      </Box>
    </Container>
  );
}
export default SearchBooks;
