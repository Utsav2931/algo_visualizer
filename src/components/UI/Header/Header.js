import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CustomDrawer from "./Drawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import GitHubIcon from "@material-ui/icons/GitHub";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: "60px",
    backgroundColor: "#01007C",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  visualizeButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 1, 2),
  },
  visualizeButton: {
    "&:disabled": {
      color: "grey",
    },
    fontWeight: "bold",
    fontFamily: "Segoe UI",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [nodeIndices, setNodeIndices] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const startVisualizing = () => {
    if (props.selectedAlgorithm === "Topological Sort") {
      if (!props.canvasRef.current.isGraphDAG()) {
        setSnackbarOpen(true);
        return;
      }
    }

    props.startVisualizing();
    props.canvasRef.current.startVisualizing();
  };
  useEffect(() => {
    const newNodeIndices = [];
    for (let i = 0; i < props.canvasRef.current.state.noOfVertices; i++) {
      newNodeIndices.push(i);
    }
    // console.log("useEff");
    setNodeIndices(newNodeIndices);
  }, [
    props.canvasRef.current
      ? props.canvasRef.current.state.noOfVertices
      : props.canvasRef.current,
  ]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <ChevronRightIcon />
            <ChevronRightIcon />
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6" className={clsx("title", classes.title)}>
            Algo-Visualizer
          </Typography>
          <Grid className={classes.visualizeButtonContainer}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => startVisualizing()}
              disabled={
                props.isVisualizing ||
                props.startNode === "Start Node" ||
                nodeIndices.length === 0
              }
              className={classes.visualizeButton}
            >
              VISUALIZE&nbsp;
              {props.isVisualizing && (
                <CircularProgress size={20} color="inherit" />
              )}
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="default"
              size="large"
              onClick={() => props.toggleAdjList()}
              className={classes.visualizeButton}
            >
              {(props.isAdjListOpen ? "CLOSE" : "VIEW") + " ADJ LIST"}
            </Button>
          </Grid>
          <a
            href="https://github.com/Utsav2931/algo_visualizer"
            target="_blank"
          >
            <GitHubIcon fontSize="large" style={{ color: "white" }} />
          </a>
        </Toolbar>
      </AppBar>
      <CustomDrawer
        startNode={props.startNode}
        selectStartNode={props.selectStartNode}
        selectAlgorithm={props.selectAlgorithm}
        AlgorithmOptions={props.AlgorithmOptions}
        selectedAlgorithm={props.selectedAlgorithm}
        open={open}
        handleDrawerClose={handleDrawerClose}
        canvasRef={props.canvasRef}
        speedChange={props.speedChange}
        initialSpeed={props.initialSpeed}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => {
            setSnackbarOpen(false);
          }}
          severity="warning"
        >
          "Your Graph is not DAG !, Topological Sort is enabled only on DAG"
        </MuiAlert>
      </Snackbar>
      ;
    </div>
  );
};

export default Header;
