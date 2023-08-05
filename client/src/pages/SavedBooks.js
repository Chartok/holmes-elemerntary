
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_ME, REMOVE_BOOK } from './utils'; // Assuming the path is correct
import { useAuth } from './authContext'; // Assuming the path is correct

function SavedBooks() {
  const { loading, data, error } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const { user } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Saved Books</h2>
      {data?.me?.savedBooks?.map((book) => (
        <div key={book.bookId}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <button onClick={() => removeBook({ variables: { bookId: book.bookId } })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default SavedBooks;
