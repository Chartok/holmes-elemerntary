"use strict";
// Savebook button component for saving books to user's collection
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const react_1 = __importStar(require("react"));
const mutations_1 = require("../utils/mutations");
const client_1 = require("@apollo/client");
const authContext_1 = require("../context/authContext");
const material_1 = require("@mui/material");
const prop_types_1 = __importDefault(require("prop-types"));
function SaveBook({ book }) {
    const [saveBook, { loading }] = (0, client_1.useMutation)(mutations_1.SAVE_BOOK);
    const { user } = (0, react_1.useContext)(authContext_1.AuthContext);
    // State for error handling
    const [saveError, setSaveError] = (0, react_1.useState)(null);
    // Loading state
    if (loading)
        return <material_1.Typography>Loading...</material_1.Typography>;
    // Error state from apollo client
    if (saveError)
        return <material_1.Alert severity='error'>Error saving book: {saveError}</material_1.Alert>;
    // If user is not logged in and can see the save book button
    if (!user)
        return <material_1.Alert severity='warning'>You must be logged in to save books</material_1.Alert>;
    const handleSaveBook = async () => {
        if (!user) {
            setSaveError('You must be logged in to save books');
            return;
        }
        try {
            const { __typename, ...bookToSave } = book;
            await saveBook({
                variables: { book: bookToSave }
            });
            setSaveError(null);
        }
        catch (Error) {
            setSaveError(Error);
            console.error("There was an error saving the book", Error);
        }
    };
    return (<material_1.Container>
            <material_1.Box my={4}>
                <material_1.Button variant='contained' color='primary' onClick={handleSaveBook} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Book'}
                </material_1.Button>
                {saveError && <material_1.Alert severity='error'>Error saving book: {saveError}</material_1.Alert>}
                {!user && <material_1.Alert severity='warning'>You must be logged in to save books</material_1.Alert>}
            </material_1.Box>
        </material_1.Container>);
}
exports.default = SaveBook;
;
// Type checking for props
SaveBook.propTypes = {
    book: prop_types_1.default.object.isRequired,
};
