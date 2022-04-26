import { useState, useEffect } from "react";
import asyncTimeOut from "../../helpers/asyncTimeOut";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//const delayTime = 1000;
toast.configure()
const message = "Hi";
const DfsVisualization = (props) => {
  const vertexIndices = new Map();
  const delayTime = props.visualizationSpeed
  const [parent, setParent] = useState(new Array(props.noOfVertices).fill(-1));

  const DFSAlgo = async (vertexID) => {
    const incidentEdges = props.adjList.get(vertexID);
    const connectedVerticesID = incidentEdges.map((id) =>
      props.edgeRefs.get(id).current.getOtherVertexID(vertexID)
    );

    for (var i = 0; i < connectedVerticesID.length; i++) {
      const vertexIndex = vertexIndices.get(connectedVerticesID[i]);

      if (parent[vertexIndex] === -1) {
        var newParent = parent;
        newParent[vertexIndex] = vertexIndices.get(vertexID);
        //console.log(vertexIndices.get(vertexID))
        await asyncTimeOut(delayTime * 2);

        props.edgeRefs
          .get(incidentEdges[i])
          .current.changeBackgroundColor("#ED3C61");
        props.vertexRefs
          .get(connectedVerticesID[i])
          .current.changeBackgroundColor("#ED3C61");
        // console.log(props.vertexRefs
        //   .get(connectedVerticesID[i]).current.state.vertexIndex)
        toast.info("DFS will travers till the deepest node. So that's why the edge between node " + vertexIndices.get(vertexID) + " and node " + props.vertexRefs
          .get(connectedVerticesID[i]).current.state.vertexIndex + " has been marked red", { autoClose: delayTime * 10, pauseOnHover: false })
        await asyncTimeOut(delayTime * 11);
        setParent(newParent);

        await DFSAlgo(connectedVerticesID[i]);
        await asyncTimeOut(delayTime);

        props.vertexRefs
          .get(connectedVerticesID[i])
          .current.changeBackgroundColor("#01B878");

        props.edgeRefs
          .get(incidentEdges[i])
          .current.changeBackgroundColor("#01B878");

        toast.info("Now there isn't any unmarked adjacent node so it will backtrack to it's root node. That's why the edge between "
          + props.vertexRefs
            .get(connectedVerticesID[i]).current.state.vertexIndex + " and " +
          vertexIndices.get(vertexID) + " has been marked green", { autoClose: delayTime * 10, pauseOnHover: false })
        await asyncTimeOut(delayTime * 11);
      }
    }
  };

  const visualizeDFS = async () => {
    var newParent = parent;
    newParent[props.startingVertex] = props.startingVertex;

    await asyncTimeOut(delayTime);
    props.vertexRefs
      .get(props.vertexIDs[props.startingVertex])
      .current.changeBackgroundColor("#ED3C61");

    setParent(newParent);

    await DFSAlgo(props.vertexIDs[props.startingVertex]);

    await asyncTimeOut(delayTime);

    props.vertexRefs
      .get(props.vertexIDs[props.startingVertex])
      .current.changeBackgroundColor("#01B878");

    props.endVisualizing();
  };

  useEffect(() => {
    for (var i = 0; i < props.noOfVertices; i++) {
      vertexIndices.set(props.vertexIDs[i], i);
    }
    visualizeDFS();
  }, []);

  // create component for DFS data
  // here we need to return that
  return <div></div>;
};

export default DfsVisualization;
