import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SAVED_BOOKS } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { Alert, Container, List, ListItem, Button, Link, Typography } from '@mui/material';

function SavedBooks() {
  const userId = localStorage.getItem('user_id');
  const { loading, data, error, refetch } = useQuery(GET_SAVED_BOOKS, {
    variables: { userId },
  });
  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      const existingBooks = cache.readQuery({ query: GET_SAVED_BOOKS });
      const updatedBooks = existingBooks.savedBooks.filter((book) => book.bookId !== removeBook.bookId);
      cache.writeQuery({
        query: GET_SAVED_BOOKS,
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
        {data.savedBooks.map((book) => (
          <ListItem key={book.bookId}>
            <Typography variant='h5'>{book.title}</Typography>
            <img src={book.image} alt={book.title} />
            <Link href={book.link}>More Info</Link>
            <Button variant='contained' color='secondary' onClick={() => handleRemoveBook(book.bookId)}>Remove Book</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default SavedBooks;
