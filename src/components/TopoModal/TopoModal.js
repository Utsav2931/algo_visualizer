import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    margin: "10vh 0 0 50vw",
  },
  disabledButton: {
    backgroundColor: "#808080",
  },
  paper: {
    margin: theme.spacing(1),
    zIndex: "1000",
    width: "40vw",
    // overflow: "scroll",
    maxHeight: "80vh",
    backgroundColor: "#FFFFFF",
  },
  list: {
    display: "flex",
    justifyContent: "center",
    margin: "auto auto",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  nodes: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(0.2),
    },
  },

  button: {
    "& > *": {
      margin: theme.spacing(0.6),
    },
  },
  heading: { margin: theme.spacing(0.6) },
}));

const AdjList = (props) => {
  const classes = useStyles();
  const [children, setChildren] = useState(null);
  useEffect(() => {
    const newChildren = props.topoSort.map((key) => {
      return (
        <Button key={key} className={classes.button}>
          {key}
        </Button>
      );
    });

    setChildren(newChildren);
  }, [props]);

  return (
    <>
      <div className={classes.container}>
        <Fade in={props.open}>
          <Paper elevation={4} className={classes.paper}>
            <Typography variant="h6" align="center" className={classes.heading}>
              Topological Sort
              <IconButton
                onClick={() => props.setTopoModalOpen(false)}
                style={{ marginLeft: "5%" }}
              >
                <CloseIcon />
              </IconButton>
            </Typography>

            {/* </div> */}
            <div className={classes.list}>
              <div className={classes.nodes}>
                <ButtonGroup
                  orientation="horizontal"
                  color="secondary"
                  aria-label="horizontal contained primary button group"
                >
                  {children}
                </ButtonGroup>
              </div>
            </div>
          </Paper>
        </Fade>
      </div>
    </>
  );
};

export default AdjList;
