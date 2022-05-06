import React from 'react';
import { Field } from 'react-final-form';
import {
    makeStyles,
    TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    input: {
        width: '100%'
    },
}));

function FieldTextInputComponent(props) {

    const {
        input,
        ...rest
    } = props;

    const classes = useStyles();

    const inputProps = {
        ...input,
        ...rest,
    };

    return (
        <TextField
            className={classes.input}
            {...inputProps}
        />
    )
}

const FieldTextInput = props => {
    return <Field component={FieldTextInputComponent} {...props} />
}

export default FieldTextInput;