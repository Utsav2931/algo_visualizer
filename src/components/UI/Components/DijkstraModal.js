import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Menu from "./../Menu/Menu";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    margin: "10vh 0 30vw 0",
  },
  disabledButton: {
    backgroundColor: "#808080",
  },
  paper: {
    position: "absolute",
    top: "70px",
    right: "10px",
    zIndex: "1000",
    minWidth: "30vw",
    paddingBottom: "10px",
    // overflow: "scroll",
    maxHeight: "80vh",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
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

  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  button: {
    "& > *": {
      margin: theme.spacing(0.6),
    },
  },
  heading: { margin: theme.spacing(0.6) },
  icon: {
    position: "absolute",
    right: "10px",
  },
}));

const DijskstraModal = (props) => {
  const classes = useStyles();

  return (
    <Fade in={props.showModal}>
      <Paper elevation={4} className={classes.paper}>
        <Grid className={classes.grid}>
          <Typography variant="h6" align="center" className={classes.heading}>
            Get shortest path
          </Typography>
          <IconButton onClick={props.closeModal} className={classes.icon}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid className={classes.grid}>
          <Typography> Source : {props.startingVertex}</Typography>

          <Menu
            selectOption={props.selectVertex}
            selectedOption={props.selectedVertex}
            open={props.showVertexOpen}
            anchor={props.showVertexMenuAnchor}
            close={props.closeMenu}
            options={props.nodeIndices.filter(
              (index) => index !== props.startingVertex
            )}
            click={(e) => props.openVertexMenu(e)}
          ></Menu>
        </Grid>
        <Grid>{props.message}</Grid>
      </Paper>
    </Fade>
  );
};

export default DijskstraModal;
