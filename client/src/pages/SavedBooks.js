"use strict";
// // Import react
// import React from 'react';
//
// // Import Apollo&GQL hooks, queries, and mutations
// import { useMutation, useQuery } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';
// import { REMOVE_BOOK } from '../utils/mutations';
//
// // Import ui
// import { Alert, Container, List, ListItem, Button, Link,  Typography } from '@mui/material';
//
// function SavedBooks() {
//   const userId = localStorage.getItem('user_id');
//   const { loading, data, error, refetch } = useQuery(QUERY_ME, {
//     variables: { id: userId },
//   });
//   console.log('data', data);
//   console.log('loading', loading);
//   console.log('error', error);
//   const [removeBook] = useMutation(REMOVE_BOOK, {
//     update(cache, { data: { removeBook } }) {
//       const existingBooks = cache.readQuery({ query: QUERY_ME });
//       const updatedBooks = existingBooks.savedBooks.filter((book) => book.bookId !== removeBook.bookId);
//       cache.writeQuery({
//         query: QUERY_ME,
//         data: { savedBooks: updatedBooks },
//       });
//     },
//   });
//
//   const handleRemoveBook = async (bookId) => {
//     await removeBook({ variables: { bookId } });
//     refetch();
//   };
//
//   if (loading) return <Typography variant="body1">Loading...</Typography>;
//   if (error) return <Alert severity='error'>Error: {error.message}</Alert>;
//
//   return (
//     <Container>
//       <Typography variant='h3'>Saved Books</Typography>
//       <List>
//         {data && data.savedBooks ? (
//         data.savedBooks.map((book) => (
//           <ListItem key={book.bookId}>
//             <Typography variant='h5'>{book.title}</Typography>
//             <img src={book.image} alt={book.title} />
//             <Link href={book.link}>More Info</Link>
//             <Button variant='contained' color='secondary' onClick={() => handleRemoveBook(book.bookId)}>Remove Book</Button>
//           </ListItem>
//         ))
//         ) : (
//           <Typography variant='body1'>You have no saved books!</Typography>
//         )}
//       </List>
//     </Container>
//   );
// }
//
// export default SavedBooks;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("@apollo/client");
const queries_1 = require("../utils/queries");
const mutations_1 = require("../utils/mutations");
const material_1 = require("@mui/material");
const SavedBooks = () => {
    const userId = localStorage.getItem('user_id');
    const { loading, data, error, refetch } = (0, client_1.useQuery)(queries_1.QUERY_ME, {
        variables: { id: userId },
    });
    console.log('data', data);
    console.log('loading', loading);
    console.log('error', error);
    const [removeBook] = (0, client_1.useMutation)(mutations_1.REMOVE_BOOK, {
        update(cache, { data }) {
            const existingBooks = cache.readQuery({
                query: queries_1.QUERY_ME,
            });
            if (existingBooks && data) {
                const updatedBooks = existingBooks.me.savedBooks.filter((book) => book.bookId !== data.removeBook.bookId);
                cache.writeQuery({
                    query: queries_1.QUERY_ME,
                    data: {
                        me: {
                            ...existingBooks.me,
                            savedBooks: updatedBooks,
                        },
                    },
                });
            }
        },
    });
    const handleRemoveBook = async (bookId) => {
        await removeBook({ variables: { bookId } });
        refetch();
    };
    if (loading)
        return <material_1.Typography variant='body1'>Loading...</material_1.Typography>;
    if (error)
        return <material_1.Alert severity='error'>Error: {error.message}</material_1.Alert>;
    return (<material_1.Container>
			<material_1.Typography variant='h3'>Saved Books</material_1.Typography>
			<material_1.List>
				{data && data.me.savedBooks.length ? (data.me.savedBooks.map((book) => (<material_1.ListItem key={book.bookId}>
							<material_1.Typography variant='h5'>{book.title}</material_1.Typography>
							{book.image && (<img src={book.image} alt={book.title}/>)}
							<material_1.Link href={book.link}>More Info</material_1.Link>
							<material_1.Button variant='contained' color='secondary' onClick={() => handleRemoveBook(book.bookId)}>
								Remove Book
							</material_1.Button>
						</material_1.ListItem>))) : (<material_1.Typography variant='body1'>
						You have no saved books!
					</material_1.Typography>)}
			</material_1.List>
		</material_1.Container>);
};
exports.default = SavedBooks;
