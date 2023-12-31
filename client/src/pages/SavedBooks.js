// Import react
import React from 'react';

// Import Apollo&GQL hooks, queries, and mutations
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

// Import ui
import { Alert, Container, List, ListItem, Button, Link,  Typography } from '@mui/material';

function SavedBooks() {
  const userId = localStorage.getItem('user_id');
  const { loading, data, error, refetch } = useQuery(QUERY_ME, {
    variables: { id: userId },
  });
  console.log('data', data);
  console.log('loading', loading);
  console.log('error', error);
  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      const existingBooks = cache.readQuery({ query: QUERY_ME });
      const updatedBooks = existingBooks.savedBooks.filter((book) => book.bookId !== removeBook.bookId);
      cache.writeQuery({
        query: QUERY_ME,
        data: { savedBooks: updatedBooks },
      });
    },
  });

  const handleRemoveBook = async (bookId) => {
    await removeBook({ variables: { bookId } });
    refetch();
  };

  if (loading) return <Typography variant="body1">Loading...</Typography>;
  if (error) return <Alert severity='error'>Error: {error.message}</Alert>;

  return (
    <Container>
      <Typography variant='h3'>Saved Books</Typography>
      <List>
        {data && data.savedBooks ? (
        data.savedBooks.map((book) => (
          <ListItem key={book.bookId}>
            <Typography variant='h5'>{book.title}</Typography>
            <img src={book.image} alt={book.title} />
            <Link href={book.link}>More Info</Link>
            <Button variant='contained' color='secondary' onClick={() => handleRemoveBook(book.bookId)}>Remove Book</Button>
          </ListItem>
        ))
        ) : (
          <Typography variant='body1'>You have no saved books!</Typography>
        )}
      </List>
    </Container>
  );
}

export default SavedBooks;
