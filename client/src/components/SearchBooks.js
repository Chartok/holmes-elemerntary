"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SaveBookBtn_1 = __importDefault(require("./SaveBookBtn"));
const material_1 = require("@mui/material");
const hooks_1 = require("../utils/hooks");
const client_1 = require("@apollo/client");
const queries_1 = require("../utils/queries");
const authContext_1 = require("../context/authContext");
const react_2 = require("react");
function SearchBooks() {
    const [searchBooks, { loading, error, data }] = (0, client_1.useLazyQuery)(queries_1.SEARCH_BOOKS);
    const { user } = (0, react_2.useContext)(authContext_1.AuthContext);
    const search = () => {
        searchBooks({ variables: { query: values.searchInput } });
    };
    const { onChange, onSubmit, values } = (0, hooks_1.useForm)(search, {
        searchInput: '',
    });
    return (<material_1.Container maxWidth="md">
      <material_1.Box my={4}>
        <material_1.Typography component="h1" gutterBottom>
          Search for Books!
        </material_1.Typography>
        <form onSubmit={onSubmit}>
          <material_1.TextField fullWidth name='searchInput' label="Search for a book" value={values.searchInput} onChange={onChange}/>
          <material_1.Button variant="contained" color="primary" type="submit" onClick={onSubmit}>
            Submit Book Search
          </material_1.Button>
        </form>
      </material_1.Box>
      <material_1.Box my={4}>

        {loading && <material_1.Typography>Loading...</material_1.Typography>}

        {error && <material_1.Alert severity="error" sx={{ mt: 2 }}>
          An error occurred: {error.message}
        </material_1.Alert>}

        {(data === null || data === void 0 ? void 0 : data.searchBooks) && (<material_1.List>
            {data.searchBooks.map((book) => (<material_1.ListItem key={book.bookId}>
                <material_1.Link href={book.link}>
                  <img src={book.image} alt={book.title}/>
                  <material_1.Typography>
                    <strong>Title:</strong> {book.title}
                  </material_1.Typography>
                  <material_1.Typography>
                    <strong>Authors:</strong> {book.authors.join}
                  </material_1.Typography>

                </material_1.Link>
                {user ?
                    <>
                    <SaveBookBtn_1.default book={book}/>
                  </>
                    :
                        <>

                  </>}
              </material_1.ListItem>))}
          </material_1.List>)}

      </material_1.Box>
    </material_1.Container>);
}
exports.default = SearchBooks;
