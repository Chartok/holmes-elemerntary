import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { saveBook, searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

// SearchForm component
const SearchForm = ({ searchInput, setSearchInput, handleFormSubmit }) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <Row>
        <Col xs={12} md={8}>
          <Form.Control
            name='searchInput'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type='text'
            size='lg'
            placeholder='Search for a book'
          />
        </Col>
        <Col xs={12} md={4}>
          <Button type='submit' variant='success' size='lg'>
            Submit Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

// BookList component
const BookList = ({ searchedBooks, handleSaveBook, savedBookIds }) => {
    // create state to hold saved bookId values
  return (
    <Container>
      <h2 className='pt-5'>
        {searchedBooks.length
          ? `Viewing ${searchedBooks.length} results:`
          : 'Search for a book to begin'}
      </h2>
      <Row>
        {searchedBooks.map((book) => {
          return (
            <Col md="4">
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  )
};


const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      setError('Please enter a search term!')
      return false;
    }

    if (!/^[a-xA-Z0-9 ]*$/.test(searchInput)) {
      setError('Please enter a valid search term!')
      return false;
    }

    setLoading(true);

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');

      setLoading(false);

    } catch (err) {
      setError(err.message);
      console.error(err);

      setLoading(false);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBook(bookToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <>

      {/* Display error if there is one */}
      {error && <div className="alert alert-danger mb-3">{error}</div>}

      {/* Display loading message when there is a request in progress */}
      {loading && <p>Loading results...</p>}

      <SearchForm
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleFormSubmit={handleFormSubmit}
      />

      <BookList books={searchedBooks} handleSaveBook={handleSaveBook} setSavedBookIds={setSavedBookIds} />

    </>
  );
};

export default SearchBooks;
