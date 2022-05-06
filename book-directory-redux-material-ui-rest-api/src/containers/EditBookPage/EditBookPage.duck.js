export const FETCH_BOOK_REQUEST = 'app/EditBookPage/FETCH_BOOKS_REQUEST';
export const FETCH_BOOK_SUCCESS = 'app/EditBookPage/FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_ERROR = 'app/EditBookPage/FETCH_BOOK_ERROR';

export const UPDATE_BOOK_REQUEST = 'app/EditBookPage/UPDATE_BOOK_REQUEST';
export const UPDATE_BOOK_SUCCESS = 'app/EditBookPage/UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_ERROR = 'app/EditBookPage/UPDATE_BOOK_ERROR';

export const REMOVE_BOOK_REQUEST = 'app/EditBookPage/REMOVE_BOOK_REQUEST';
export const REMOVE_BOOK_SUCCESS = 'app/EditBookPage/REMOVE_BOOK_SUCCESS';
export const REMOVE_BOOK_ERROR = 'app/EditBookPage/REMOVE_BOOK_ERROR';

const intialState = {
    book: null,
    fetchBookInProgress: false,
    updateBookInProgress: false,
    removeBookInProgress: false,
    fetchBookError: null,
    updateBookgError: null,
    removeBookError: null
};

export default function booksReducer(state = intialState, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_BOOK_REQUEST:
            return { ...state, fetchBookInProgress: true, fetchBookError: null };
        case FETCH_BOOK_SUCCESS:
            return { ...state, fetchBookInProgress: false, book: payload }
        case FETCH_BOOK_ERROR:
            return { ...state, fetchBookInProgress: false, fetchBookError: payload }

        case UPDATE_BOOK_REQUEST:
            return { ...state, updateBookInProgress: true, updateBookgError: null };
        case UPDATE_BOOK_SUCCESS:
            return { ...state, updateBookInProgress: false, book: payload }
        case UPDATE_BOOK_ERROR:
            return { ...state, updateBookInProgress: false, updateBookgError: payload }

        case REMOVE_BOOK_REQUEST:
            return { ...state, removeBookInProgress: true, removeBookError: null };
        case REMOVE_BOOK_SUCCESS:
            return { ...state, removeBookInProgress: false, book: null }
        case REMOVE_BOOK_ERROR:
            return { ...state, removeBookInProgress: false, removeBookError: payload }
        default:
            return state;
    }
}

const fetchBookRequest = () => ({ type: FETCH_BOOK_REQUEST });
const fetchBookSuccess = data => ({ type: FETCH_BOOK_SUCCESS, payload: data });
const fetchBookError = e => ({ type: FETCH_BOOK_ERROR, payload: e });

const updateBookRequest = () => ({ type: UPDATE_BOOK_REQUEST });
const updateBookSuccess = data => ({ type: UPDATE_BOOK_SUCCESS, payload: data });
const updateBookError = e => ({ type: UPDATE_BOOK_ERROR, payload: e });

const removeBookRequest = () => ({ type: REMOVE_BOOK_REQUEST });
const removeBookSuccess = () => ({ type: REMOVE_BOOK_SUCCESS });
const removeBookError = e => ({ type: REMOVE_BOOK_ERROR, payload: e });

export const fetchBook = id => (dispatch, getState, axios) => {
    dispatch(fetchBookRequest());
    return axios.get(`/api/v1/books/${id}`)
        .then(response => dispatch(fetchBookSuccess(response.data)))
        .catch(err => dispatch(fetchBookError(err)));
}

export const updateBook = params => (dispatch, getState, axios) => {
    const { isbn, ...updatedValues } = params;
    dispatch(updateBookRequest());
    return axios.put(`/api/v1/books/${isbn}`, updatedValues)
        .then(response => dispatch(updateBookSuccess(response.data)))
        .catch(err => dispatch(updateBookError(err)));
}

export const removeBook = id => (dispatch, getState, axios) => {
    dispatch(removeBookRequest());
    return axios.delete(`/api/v1/books/${id}`)
        .then(response => dispatch(removeBookSuccess()))
        .catch(err => dispatch(removeBookError(err)));
}