import React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import {
    makeStyles,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import {
    FieldTextInput
} from '../../components';

const useStyles = makeStyles((theme) => ({
    fieldArrayWrapper: {
        paddingBottom: theme.spacing(2),
        display: 'flex'
    },
    fieldArray: {
        flex: 1,
        marginRight: 20,
    },
    addButton: {
        marginLeft: 20
    },
    fieldLabel: {
        paddingBottom: theme.spacing(1)
    }
}));

function EditBookForm(props) {

    const classes = useStyles();

    return (
        <Form
            {...props}
            mutators={{
                ...arrayMutators
            }}
            render={formProps => {

                const {
                    handleSubmit,
                    form: {
                        mutators: { push }
                    },
                } = formProps;

                return (
                    <form onSubmit={handleSubmit}>
                        <Grid container alignItems="flex-start" spacing={4}>
                            <Grid item xs={12}>
                                <FieldTextInput
                                    id="title"
                                    name="title"
                                    label="Title" />
                            </Grid>
                            <Grid item xs={4}>
                                <FieldTextInput
                                    id="pageCount"
                                    name="pageCount"
                                    label="Page Count"
                                    type="number" />
                            </Grid>
                            <Grid item xs={4}>
                                <FieldTextInput
                                    id="status"
                                    name="status"
                                    label="Status" />
                            </Grid>
                            <Grid item xs={12}>
                                <FieldTextInput
                                    id="thumbnailUrl"
                                    name="thumbnailUrl"
                                    label="Thumbnail URL" />
                            </Grid>
                            <Grid item xs={12}>
                                <FieldTextInput
                                    id="shortDescription"
                                    name="shortDescription"
                                    label="Short Description"
                                    parse={v => v}
                                    multiline />
                            </Grid>
                            <Grid item xs={12}>
                                <FieldTextInput
                                    id="longDescription"
                                    name="longDescription"
                                    label="Long Description"
                                    parse={v => v}
                                    multiline />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.fieldLabel}>
                                    Authors
                                    <Button variant="contained" size="small" color="primary" className={classes.addButton}
                                        onClick={() => push('authors', undefined)}>
                                        Add
                                    </Button>
                                </Typography>
                                <FieldArray
                                    name="authors">
                                    {({ fields }) =>
                                        fields.map((field, index) => (
                                            <div className={classes.fieldArrayWrapper} key={index}>
                                                <FieldTextInput
                                                    className={classes.fieldArray}
                                                    key={index}
                                                    id={field}
                                                    name={field}
                                                    placeholder="Author" />
                                                <span
                                                    onClick={() => fields.remove(index)}
                                                    role="img"
                                                    aria-label="remove"
                                                    style={{ cursor: 'pointer', paddingTop: 10 }}
                                                > ❌ </span>
                                            </div>
                                        ))
                                    }
                                </FieldArray>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.fieldLabel}>
                                    Categories
                                    <Button variant="contained" size="small" color="primary" className={classes.addButton}
                                        onClick={() => push('categories', undefined)}>
                                        Add
                                    </Button>
                                </Typography>
                                <FieldArray
                                    name="categories">
                                    {({ fields }) =>
                                        fields.map((field, index) => (
                                            <div className={classes.fieldArrayWrapper} key={index}>
                                                <FieldTextInput
                                                    className={classes.fieldArray}
                                                    key={index}
                                                    id={field}
                                                    name={field}
                                                    placeholder="Category" />
                                                <span
                                                    onClick={() => fields.remove(index)}
                                                    role="img"
                                                    aria-label="remove"
                                                    style={{ cursor: 'pointer', paddingTop: 10 }}
                                                > ❌ </span>
                                            </div>
                                        ))
                                    }
                                </FieldArray>
                            </Grid>

                            <Grid item xs={6}>
                                <Button variant="contained" color="primary" type="submit">
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            }}
        />
    );
}

export default EditBookForm;
