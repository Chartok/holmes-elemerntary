import React, { useState, useEffect } from 'react';

import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { useForm } from '../utils/hooks';
import { AuthProvider } from '../context/authContext';

const SEARCH_BOOKS = gql`
  query SearchBooks($title: String!) {
    searchBooks(title: $title) {
      id
      title
      authors
      description
      image
      link
    }
  }
`;

const SearchBooks = () => {
  const { query } = useForm();

  const [search, setSearch] = useState(query || '');

  const [searchBooks, { loading, data }] = useLazyQuery(SEARCH_BOOKS);

  const [saveBook] = useMutation(SAVE_BOOK);

  const { user } = AuthProvider();

  useEffect(() => {
    if (!search || !user) {
      return;
    }
    searchBooks({ variables: { title: search } });
  }, [search, searchBooks, user]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-input"
          placeholder="Search for a book"
          name="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" onClick={() => setSearch(search)}>
          Search
        </button>
      </form>
      {/* Display the search results */}
      {loading && <div>Loading...</div>}
      {data?.searchBooks?.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <button onClick={() => saveBook({ variables: { input: book } })}>
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchBooks;
