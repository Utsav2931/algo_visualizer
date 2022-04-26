import * as React from "react";
import { Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "10vh 0 0 50vw",
  },
  bar: {
    position: "absolute",
    alignContent: "center",
    marginTop: "10vh",
    minWidth: "none",
    padding: "5px",
  },
}));

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });
  const classes = useStyles();

  const { vertical, horizontal } = state;

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={props.open}
        onClose={props.handleClose}
        message={props.message}
        key={vertical + horizontal}
        className={classes.bar}
      />
    </div>
  );
}
