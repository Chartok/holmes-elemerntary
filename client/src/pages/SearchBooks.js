import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link, List, ListItem } from '@mui/material';
import { useForm } from '../utils/hooks';
import { useQuery, useMutation, gql } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $title) {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;

function SearchBooks() {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);
  const searchBookCallback = () => {
    if (data) {
      setSearchedBooks(data.searchBooks);
    }
  };
  const { onChange, onSubmit, values } = useForm(searchBookCallback, {
    searchInput: '',
  });
  const { searchInput } = values;
  
  const { loading, error, data } = useQuery(SEARCH_BOOKS, {
    variables: { query: searchInput },
  });
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search for Books!
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            name='searchInput'
            label="Search for a book"
            value={values.searchInput}
            onChange={onChange}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!values.searchInput}
            onClick={onSubmit}
          >
            Submit Book Search
          </Button>
        </form>
      </Box>
      <Box my={4}>
        {loading ? (
          <Typography variant="h5">Loading...</Typography>
        ) : error ? (
          <Typography variant="h5">Error: {error.message}</Typography>
        ) : (
          <List>
            {searchedBooks.map((book) => (
              <ListItem key={book.bookId}>
                <Link href={book.link}>
                  <Typography>
                    <strong>
                      {book.title} by {book.authors.join(', ')}
                    </strong>
                  </Typography>
                </Link>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => saveBook(book)}
                >
                  Save
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default SearchBooks;