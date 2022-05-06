import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from './HomePage.duck';
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  ButtonBase,
} from '@material-ui/core';

import css from './HomePage.module.css';

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
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  link: {
    marginTop: 7
  }
}));

function HomePage() {

  const dispatch = useDispatch();
  const {
    fetchBooksInProgress,
    fetchBooksError,
    books,
  } = useSelector(state => state.HomePage);

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className={classes.root}>

      {fetchBooksInProgress ? <p>Loading...</p> : null}
      {fetchBooksError ? <p>Error fetching books</p> : null}

      {books.map((book, index) => (
        <Paper className={classes.paper} key={index}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt={book.title} src={book.thumbnailUrl} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {book.shortDescription}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Authors: {book.authors.map((a, i) => !!a ? <span key={i} className={css.author}>{a}</span> : null)}
                  </Typography>
                  <Typography className={classes.link}>
                    <Link to={`/${book.isbn}`}>
                      Edit book
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}

    </div>
  );
}

export default HomePage;