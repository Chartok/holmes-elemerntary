import React from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { AuthProvider } from '../context/authContext';

function SavedBooks() {
  const { loading, data, error } = useLazyQuery(QUERY_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const { user } = AuthProvider();

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
