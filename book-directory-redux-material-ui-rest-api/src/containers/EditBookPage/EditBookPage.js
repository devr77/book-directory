import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, updateBook, removeBook } from './EditBookPage.duck';
import {
    makeStyles,
    Paper,
    Button
} from '@material-ui/core';
import { EditBookForm } from '../../forms';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 22
    },
    paper: {
        padding: theme.spacing(2),
        margin: '0 auto 22px auto',
        maxWidth: 800,
    },
    image: {
        width: 200,
        height: 200,
        margin: 'auto',
    },
    img: {
        margin: 'auto',
        display: 'block',
        height: '100%',
        width: 'auto'
    },
    title: {
        margin: '24px auto',
        textAlign: 'center'
    },
    description: {
        padding: '0 24px'
    },
    deleteButton: {
        marginTop: 20,
    }
}));

function EditBookPage(props) {

    const dispatch = useDispatch();
    const {
        book,
        fetchBookInProgress,
        updateBookInProgress,
        removeBookInProgress,
        fetchBookError,
        updateBookgError,
        removeBookError
    } = useSelector(state => state.EditBookPage);

    const classes = useStyles();

    useEffect(() => {
        const { match } = props;
        const { id } = match.params;
        if (id) dispatch(fetchBook(id));
    }, [dispatch, props]);

    const bookDoesNotExist = !fetchBookInProgress && !fetchBookError && !book;

    return (
        <div className={classes.root}>

            {fetchBookInProgress ? <p>Loading...</p> : null}
            {fetchBookError ? <p>Error fetching book</p> : null}

            {book ? (
                <Paper className={classes.paper}>

                    {updateBookInProgress ? <p>Updating...</p> : null}
                    {updateBookgError ? <p>Error updating book</p> : null}

                    {removeBookInProgress ? <p>Removing...</p> : null}
                    {removeBookError ? <p>Error removing book</p> : null}

                    <EditBookForm
                        keepDirtyOnReinitialize
                        initialValues={{ ...book }}
                        onSubmit={values => dispatch(updateBook(values))}
                    />

                    <Button variant="contained" color="secondary" className={classes.deleteButton}
                    onClick={() => dispatch(removeBook(book.isbn))}>
                        Delete book
                    </Button>
                </Paper>
            ) : null}

            {bookDoesNotExist ? <p>Book does not exist</p> : null}
        </div>
    );
}

export default EditBookPage;
