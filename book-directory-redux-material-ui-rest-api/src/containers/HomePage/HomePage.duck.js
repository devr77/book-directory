export const FETCH_BOOKS_REQUEST = 'app/HomePage/FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'app/HomePage/FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_ERROR = 'app/HomePage/FETCH_BOOKS_ERROR';

const intialState = {
    fetchBooksInProgress: false,
    fetchBooksError: null,
    books: []
};

export default function homePageReducer(state = intialState, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_BOOKS_REQUEST:
            return { ...state, fetchBooksInProgress: true, fetchBooksError: null };
        case FETCH_BOOKS_SUCCESS:
            return { ...state, fetchBooksInProgress: false, books: payload }
        case FETCH_BOOKS_ERROR:
            return { ...state, fetchBooksInProgress: false, fetchBooksError: payload }
        default:
            return state;
    }
}

const fetchBooksRequest = () => ({ type: FETCH_BOOKS_REQUEST });
const fetchBooksSuccess = data => ({ type: FETCH_BOOKS_SUCCESS, payload: data });
const fetchBooksError = e => ({ type: FETCH_BOOKS_ERROR, payload: e });

export const fetchBooks = () => (dispatch, getState, axios) => {
    dispatch(fetchBooksRequest());
    return axios.get('/api/v1/books')
        .then(response => dispatch(fetchBooksSuccess(response.data)))
        .catch(err => dispatch(fetchBooksError(err)));
}