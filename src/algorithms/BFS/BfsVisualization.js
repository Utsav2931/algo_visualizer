import { useState, useEffect } from "react";
import asyncTimeOut from "../../helpers/asyncTimeOut";
import Queue from "../../helpers/dataStructures/Queue";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//const delayTime = 1000;
const BfsVisualization = (props) => {
  const vertexIndices = new Map();
  const delayTime = props.visualizationSpeed
  const [visited, setVisited] = useState(
    new Array(props.noOfVertices).fill(-1)
  );
  const BFS = async (vertexID) => {
    const queue = new Queue();
    // const newVisited = visited
    // newVisited[vertexID] = 1;
    // await asyncTimeOut(delayTime);
    queue.enqueue(vertexID);

    //setVisited(newVisited)
    while (!queue.empty()) {
      const frontVertexID = queue.front();
      queue.dequeue();
      const incidentEdges = props.adjList.get(frontVertexID);
      const connectedVerticesID = incidentEdges.map((id) =>
        props.edgeRefs.get(id).current.getOtherVertexID(frontVertexID)
      );
      for (var i = 0; i < connectedVerticesID.length; i++) {
        const vertexIndex = vertexIndices.get(connectedVerticesID[i]);
        if (visited[vertexIndex] === -1) {
          const newVisited = visited;
          newVisited[vertexIndex] = 1;
          queue.enqueue(connectedVerticesID[i]);
          await asyncTimeOut(delayTime);
          props.edgeRefs
            .get(incidentEdges[i])
            .current.changeBackgroundColor("#01B878");
          props.vertexRefs
            .get(connectedVerticesID[i])
            .current.changeBackgroundColor("#01B878");
          toast.info("BFS will travers till the shallowest node. So that's why the edge between node " + vertexIndices.get(vertexID) + " and node " + props.vertexRefs
            .get(connectedVerticesID[i]).current.state.vertexIndex + " has been marked green.", { autoClose: delayTime * 10, pauseOnHover: false })
          await asyncTimeOut(delayTime * 11);
          setVisited(newVisited);
        }
      }
    }
  };

  const visualizeBFS = async () => {
    const newVisited = visited;
    newVisited[props.startingVertex] = -1;

    await asyncTimeOut(delayTime);
    props.vertexRefs
      .get(props.vertexIDs[props.startingVertex])
      .current.changeBackgroundColor("#01B878");

    setVisited(newVisited);

    await BFS(props.vertexIDs[props.startingVertex]);
    props.endVisualizing();
  };

  useEffect(() => {
    for (var i = 0; i < props.noOfVertices; i++) {
      vertexIndices.set(props.vertexIDs[i], i);
    }
    visualizeBFS();
  }, []);
  return <div></div>;
};

export default BfsVisualization;
