import { useState, useEffect } from "react";
import asyncTimeOut from "../../helpers/asyncTimeOut";
import Stack from "../../helpers/dataStructures/Stack";

//const delayTime = 1000;
const TopologicalSortVisualization = (props) => {
  const vertexIndices = new Map();
  const stack = new Stack();
  const delayTime = props.visualizationSpeed;
  const [visited, setVisited] = useState(
    new Array(props.noOfVertices).fill(false)
  );

  const TopoUtil = async (vertexID) => {
    const incidentEdges = props.adjList.get(vertexID);
    const connectedVerticesID = incidentEdges.map((id) =>
      props.edgeRefs.get(id).current.getOtherVertexID(vertexID)
    );

    for (var i = 0; i < connectedVerticesID.length; i++) {
      const vertexIndex = vertexIndices.get(connectedVerticesID[i]);

      if (!visited[vertexIndex]) {
        var newVisited = visited;
        newVisited[vertexIndex] = true;

        await asyncTimeOut(delayTime);

        props.edgeRefs
          .get(incidentEdges[i])
          .current.changeBackgroundColor("#ED3C61"); //red
        props.vertexRefs
          .get(connectedVerticesID[i])
          .current.changeBackgroundColor("#ED3C61");

        setVisited(newVisited);

        await TopoUtil(connectedVerticesID[i]);
        await asyncTimeOut(delayTime);

        props.vertexRefs
          .get(connectedVerticesID[i])
          .current.changeBackgroundColor("#01B878"); //green
        props.edgeRefs
          .get(incidentEdges[i])
          .current.changeBackgroundColor("#01B878");
      }
    }

    stack.push(vertexIndices.get(vertexID));
  };

  const visualizeTopologicalSort = async () => {
    var newVisited = visited;
    newVisited[props.startingVertex] = true;

    await asyncTimeOut(delayTime);
    props.vertexRefs
      .get(props.vertexIDs[props.startingVertex])
      .current.changeBackgroundColor("#ED3C61");

    setVisited(newVisited);

    await TopoUtil(props.vertexIDs[props.startingVertex]);

    for (var i = 0; i < props.noOfVertices; i++) {
      if (!visited[i]) {
        newVisited = visited;
        newVisited[i] = true;

        await asyncTimeOut(delayTime);
        props.vertexRefs
          .get(props.vertexIDs[i])
          .current.changeBackgroundColor("#ED3C61");

        setVisited(newVisited);

        await TopoUtil(props.vertexIDs[i]);
      }
    }

    // console.log(stack.elements());
    props.setTopoSort(stack.elements());
    props.setTopoModalOpen(true);
    props.endVisualizing();
    // props.vertexRefs
    //   .get(props.vertexIDs[props.startingVertex])
    //   .current.changeBackgroundColor("#01B878");
  };

  useEffect(() => {
    for (var i = 0; i < props.noOfVertices; i++) {
      vertexIndices.set(props.vertexIDs[i], i);
    }

    visualizeTopologicalSort();
  }, []);

  // create component for DFS data
  // here we need to return that
  return <div></div>;
};

export default TopologicalSortVisualization;
