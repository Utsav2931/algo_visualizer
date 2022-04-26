import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft/";
import TimelineIcon from "@material-ui/icons/Timeline";
import AddNodeIcon from "@material-ui/icons/Add";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UndirectedEdgeIcon from "@material-ui/icons/RemoveOutlined";
import DirectedEdgeIcon from "@material-ui/icons/ArrowForwardOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import BookIcon from "@material-ui/icons/Book";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Menu from "../Menu/Menu";
import AlgorithmOptions from "../Menu/AlgorithmOptions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import SettingsIcon from "@material-ui/icons/Settings";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from '@material-ui/core/Slider';

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
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
  slider: {
    width: "50%"
  },
  drawerHeader: {
    //overflowY: "scroll",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerContent: {
    overflowY: "scroll",
    display: "flex",
    //alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1, 1),
  },
  visualizeButton: {
    alignItems: "center",
    padding: theme.spacing(2, 1, 2),
  },
}));
const CustomDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [algorithmMenuAnchor, setAlgorithmMenuAnchor] = useState(null);
  const algorithmMenuOpen = Boolean(algorithmMenuAnchor);

  const [addEdgeFromMenuAnchor, setAddEdgeFromMenuAnchor] = useState(null);
  const [addEdgeFrom, setAddEdgeFrom] = useState("From");
  const [addEdgeTo, setAddEdgeTo] = useState("To");
  const addEdgeFromMenuOpen = Boolean(addEdgeFromMenuAnchor);
  const [addEdgeToMenuAnchor, setAddEdgeToMenuAnchor] = useState(null);
  const addEdgeToMenuOpen = Boolean(addEdgeToMenuAnchor);

  const [nodeIndices, setNodeIndices] = useState([]);
  const [deleteNode, setDeleteNode] = useState("Index");
  const [deleteNodeMenuAnchor, setDeleteNodeMenuAnchor] = useState(null);
  const deleteNodeMenuOpen = Boolean(deleteNodeMenuAnchor);

  const [deleteEdgeFromMenuAnchor, setDeleteEdgeFromMenuAnchor] =
    useState(null);
  const [deleteEdgeFrom, setDeleteEdgeFrom] = useState("From");
  const [deleteEdgeTo, setDeleteEdgeTo] = useState("To");
  const deleteEdgeFromMenuOpen = Boolean(deleteEdgeFromMenuAnchor);
  const [deleteEdgeToMenuAnchor, setDeleteEdgeToMenuAnchor] = useState(null);
  const deleteEdgeToMenuOpen = Boolean(deleteEdgeToMenuAnchor);

  const [isDirectedEdge, setIsDirectedEdge] = useState(false);
  const [isWeightedGraph, setIsWeightedGraph] = useState(null);
  const [edgeWeight, setEdgeWeight] = useState(null);

  const [startNodeMenuAnchor, setStartNodeMenuAnchor] = useState(null);
  const startNodeMenuOpen = Boolean(startNodeMenuAnchor);

  //const nodeIndices = []
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

  // [...Array(props.canvasRef.current.state.noOfVertices).keys()]
  // useEffect(() => {
  //     nodeIndices = [...Array(props.canvasRef.current.state.noOfVertices).keys()]
  // }, [props.canvasRef.current.state.noOfVertices])
  //console.log(props.canvasRef, nodeIndices);
  const closeMenu = () => {
    setAlgorithmMenuAnchor(null);
    setAddEdgeFromMenuAnchor(null);
    setAddEdgeToMenuAnchor(null);
    setDeleteNodeMenuAnchor(null);
    setDeleteEdgeFromMenuAnchor(null);
    setDeleteEdgeToMenuAnchor(null);
    setStartNodeMenuAnchor(null);
  };

  const openAlgorithmMenu = (e) => {
    setAlgorithmMenuAnchor(e.currentTarget);
  };

  const selectAlgorithm = (algorithm) => {
    props.selectAlgorithm(algorithm);
    closeMenu();
  };

  const openAddEdgeFromMenu = (e) => {
    setAddEdgeFromMenuAnchor(e.currentTarget);
  };

  const openAddEdgeToMenu = (e) => {
    setAddEdgeToMenuAnchor(e.currentTarget);
  };

  const selectAddEdgeFrom = (from) => {
    setAddEdgeFrom(from);
    closeMenu();
  };

  const selectAddEdgeTo = (to) => {
    setAddEdgeTo(to);
    closeMenu();
  };

  const addEdge = (from, to) => {
    props.canvasRef.current.addEdge(from, to, isDirectedEdge, edgeWeight);
    setAddEdgeFrom("From");
    setAddEdgeTo("To");
  };

  const openStartNodeMenu = (e) => {
    setStartNodeMenuAnchor(e.currentTarget);
  };

  const selectStartNode = (node) => {
    props.selectStartNode(node);
    closeMenu();
  };

  const openDeleteNodeMenu = (e) => {
    setDeleteNodeMenuAnchor(e.currentTarget);
  };

  const selectDeleteNode = (node) => {
    setDeleteNode(node);
    closeMenu();
  };

  const openDeleteEdgeFromMenu = (e) => {
    setDeleteEdgeFromMenuAnchor(e.currentTarget);
  };

  const openDeleteEdgeToMenu = (e) => {
    setDeleteEdgeToMenuAnchor(e.currentTarget);
  };

  const selectDeleteEdgeFrom = (from) => {
    setDeleteEdgeFrom(from);
    closeMenu();
  };

  const selectDeleteEdgeTo = (to) => {
    setDeleteEdgeTo(to);
    closeMenu();
  };

  const deleteEdge = (from, to) => {
    props.canvasRef.current.deleteEdge(from, to);
    setDeleteEdgeFrom("From");
    setDeleteEdgeTo("To");
  };

  const checkDirectedEdge = () => {
    setIsDirectedEdge((prev) => !prev);
  };

  const checkWeightedGraph = () => {
    if (props.canvasRef.current.state.edges.length !== 0) {
      const check = window.confirm("Changing Graph type will clear the canvas");
      if (check) {
        props.canvasRef.current.clearCanvas();
        if (isWeightedGraph === true) setEdgeWeight(null);
        setIsWeightedGraph((prev) => !prev);
      }
    } else {
      if (isWeightedGraph === true) setEdgeWeight(null);
      setIsWeightedGraph((prev) => !prev);
    }
  };

  const weightChangeHandler = (e) => {
    setEdgeWeight(e.target.value);
  };

  const clearCanvas = () => {
    props.canvasRef.current.clearCanvas();
    setAddEdgeFrom("From");
    setAddEdgeTo("To");
    setDeleteEdgeFrom("From");
    setDeleteEdgeTo("To");
    setEdgeWeight(null);
    props.selectStartNode("Start Node");
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h5" align="center" color="primary">
          CONTROL PANEL
        </Typography>
        <IconButton onClick={props.handleDrawerClose}>
          {/* {theme.direction === "ltr" ? ( */}
          <ChevronLeftIcon />
          {/* ) : ( */}
          {/* <ChevronRightIcon /> */}
          {/* )} */}
        </IconButton>
      </div>
      <Divider />
      <div className={classes.drawerContent}>
        <List>
          <ListItem>
            <ListItemIcon>
              <TimelineIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Select Algorithm" />
            <Menu
              selectOption={selectAlgorithm}
              selectedOption={props.selectedAlgorithm}
              open={algorithmMenuOpen}
              anchor={algorithmMenuAnchor}
              close={closeMenu}
              options={props.AlgorithmOptions}
              click={(e) => openAlgorithmMenu(e)}
            ></Menu>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {/* <TimelineIcon fontSize="large" /> */}
            </ListItemIcon>
            <ListItemText primary="Select Start Node" />
            <Menu
              selectOption={selectStartNode}
              selectedOption={props.startNode}
              open={startNodeMenuOpen}
              anchor={startNodeMenuAnchor}
              close={closeMenu}
              options={nodeIndices}
              click={(e) => openStartNodeMenu(e)}
            ></Menu>
          </ListItem>
          {/* <Divider /> */}


          <ListItem>
            <ListItemIcon>
              {/* <TimelineIcon fontSize="large" /> */}
            </ListItemIcon>
            <ListItemText primary="Speed" />
            <div className={classes.slider}>
              <Slider
                defaultValue={3}
                // getAriaValueText={valuetext}
                onChange={props.speedChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
              />
            </div>
          </ListItem>

          <Divider />


          {/* <ListItem>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText
              primary="Some Description About Algorithm"
              secondary="asfasfmc.ngkresjg jrgbkjrvgkjcrngjkergbkjergbjkdf vdn vjdsbgjkergbjdsv dsjgbkjsb vjnd djfg jh vdjnjdhg jdfv jdhrgvb d jdrhg jvh"
            ></ListItemText>
          </ListItem>
          <Divider /> */}
          <ListItem>
            <ListItemIcon>
              <SettingsIcon fontSize="large" />
            </ListItemIcon>
            {/* <FormControl>
              <ListItemText primary="Graph Type"></ListItemText>
              <RadioGroup row>
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" />}
                  label="Un-Weighted"
                />
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" />}
                  label="Weighted"
                />
              </RadioGroup>
            </FormControl> */}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={isWeightedGraph}
                    onChange={checkWeightedGraph}
                    color="primary"
                  />
                }
                label="Weighted Graph"
                labelPlacement="start"
              />
            </FormGroup>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <AddNodeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Add a New Node"></ListItemText>
            <IconButton
              color="primary"
              onClick={() => props.canvasRef.current.addVertex()}
            >
              <AddNodeIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              {isDirectedEdge ? (
                <DirectedEdgeIcon fontSize="large" />
              ) : (
                <UndirectedEdgeIcon fontSize="large" />
              )}
            </ListItemIcon>
            <ListItemText primary="Add Edge"></ListItemText>
            <Menu
              selectedOption={addEdgeFrom}
              options={nodeIndices}
              selectOption={selectAddEdgeFrom}
              open={addEdgeFromMenuOpen}
              anchor={addEdgeFromMenuAnchor}
              close={closeMenu}
              click={(e) => openAddEdgeFromMenu(e)}
            ></Menu>
            &nbsp;&nbsp;
            <Menu
              selectedOption={addEdgeTo}
              options={nodeIndices}
              selectOption={selectAddEdgeTo}
              open={addEdgeToMenuOpen}
              anchor={addEdgeToMenuAnchor}
              close={closeMenu}
              click={(e) => openAddEdgeToMenu(e)}
            ></Menu>
            <IconButton
              color="primary"
              onClick={() =>
                addEdge(parseInt(addEdgeFrom), parseInt(addEdgeTo))
              }
              disabled={
                addEdgeFrom === addEdgeTo ||
                addEdgeFrom === "From" ||
                addEdgeTo === "To" ||
                (isWeightedGraph && edgeWeight === null)
              }
            >
              <AddNodeIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {/* {isDirectedEdge ? (
                <DirectedEdgeIcon fontSize="large" />
              ) : (
                <UndirectedEdgeIcon fontSize="large" />
              )} */}
            </ListItemIcon>
            <ListItemText primary="Directed"></ListItemText>
            <Switch
              checked={isDirectedEdge}
              onChange={checkDirectedEdge}
              color="primary"
            />
            <ListItemText primary=""></ListItemText>
            {isWeightedGraph ? (
              <TextField
                type="number"
                onChange={(e) => weightChangeHandler(e)}
                label="Edge Weight"
                error={edgeWeight === ""}
                style={{ width: "130px" }}
              >
                {edgeWeight}
              </TextField>
            ) : null}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <DeleteIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Delete Node"></ListItemText>
            <Menu
              selectedOption={deleteNode}
              options={nodeIndices}
              selectOption={selectDeleteNode}
              open={deleteNodeMenuOpen}
              anchor={deleteNodeMenuAnchor}
              close={closeMenu}
              click={(e) => openDeleteNodeMenu(e)}
            ></Menu>
            <IconButton
              color="primary"
              onClick={() => {
                props.canvasRef.current.deleteVertex(parseInt(deleteNode));
                setDeleteNode("Index");
              }}
              disabled={deleteNode === "Index"}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>{/* <DeleteIcon fontSize="large" /> */}</ListItemIcon>
            <ListItemText primary="Delete Edge"></ListItemText> &nbsp;
            <Menu
              selectedOption={deleteEdgeFrom}
              options={nodeIndices}
              selectOption={selectDeleteEdgeFrom}
              open={deleteEdgeFromMenuOpen}
              anchor={deleteEdgeFromMenuAnchor}
              close={closeMenu}
              click={(e) => openDeleteEdgeFromMenu(e)}
            ></Menu>
            &nbsp;&nbsp;
            <Menu
              selectedOption={deleteEdgeTo}
              options={nodeIndices}
              selectOption={selectDeleteEdgeTo}
              open={deleteEdgeToMenuOpen}
              anchor={deleteEdgeToMenuAnchor}
              close={closeMenu}
              click={(e) => openDeleteEdgeToMenu(e)}
            ></Menu>
            <IconButton
              color="primary"
              onClick={() =>
                deleteEdge(parseInt(deleteEdgeFrom), parseInt(deleteEdgeTo))
              }
              disabled={
                deleteEdgeFrom === deleteEdgeTo ||
                deleteEdgeFrom === "From" ||
                deleteEdgeTo === "To"
              }
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </List>
      </div>
      <Divider />
      {/* <div className={classes.visualizeButtonContainer}> */}
      &nbsp; &nbsp;
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.buttonContainer}
      >
        {/* <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => props.canvasRef.current.startVisualizing()}
        >
          VISUALIZE
        </Button>
        &nbsp; */}
        {/* <Grid
          container
          direction="row"
          justify="space-around"
        //alignItems="center"
        //className={classes.visualizeButtonContainer}
        > */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => props.canvasRef.current.reset()}
        >
          RESET
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => clearCanvas()}
        >
          CLEAR
        </Button>
      </Grid>
      {/* </Grid> */}
      {/* </div> */}
      {/* <div className={classes.visualizeButton}> */}
      {/* </div> */}
      {/* <Grid container spacing="1">
                <Grid justify="center">
                    Select Algorithm - <Menu open={algorithmMenuOpen} options={AlgorithmOptions}></Menu>
                </Grid>

            </Grid> */}
    </Drawer>
  );
};

export default CustomDrawer;
