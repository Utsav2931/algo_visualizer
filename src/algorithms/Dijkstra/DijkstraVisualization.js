import React, { useEffect, useState } from "react";
import asyncTimeOut from "../../helpers/asyncTimeOut";
import MinHeap from "../../helpers/dataStructures/MinHeap";
import DijskstraModal from "../../components/UI/Components/DijkstraModal";
//const delayTime = 1000;
const DijkstraVisualization = (props) => {
  const delayTime = props.visualizationSpeed;

  const [vertexIndices, setVertexIndices] = useState(new Map());
  const [nodeIndices, setNodeIndices] = useState(new Array(props.noOfVertices));
  const [parent, setParents] = useState(new Array(props.noOfVertices));

  const [showModal, setShowModal] = useState(false);
  const [showVertexMenuAnchor, setShowVertexMenuAnchor] = useState(null);
  const showVertexOpen = Boolean(showVertexMenuAnchor);
  const [selectedVertex, setSelectedVertex] = useState("Select Vertex");

  const [message, setShowMessage] = useState(null);

  const visualizeDijkstra = async () => {
    if (props.noOfVertices === 0) props.endVisualizing();
    let parent = new Array(props.noOfVertices);
    let indices = new Array(props.noOfVertices);

    let vertexIndices = new Map();

    parent.fill(-1);

    for (var i = 0; i < props.noOfVertices; i++) {
      vertexIndices.set(props.vertexIDs[i], i);
      indices[i] = i;
    }
    setNodeIndices(indices);
    setVertexIndices(vertexIndices);

    const minHeap = new MinHeap(props.noOfVertices);
    minHeap.decreaseKey(props.startingVertex, 0);

    while (!minHeap.isEmpty()) {
      const currWeight = minHeap.getMinValue();
      const vertexID = props.vertexIDs[minHeap.extractMin()];
      const neighbours = props.adjList
        .get(vertexID)
        .map((edgeID) => props.edgeRefs.get(edgeID));

      props.vertexRefs.get(vertexID).current.changeBackgroundColor("#01B878");
      await asyncTimeOut(delayTime);

      for (var i = 0; i < neighbours.length; i++) {
        const connectedVertexIndex = vertexIndices.get(
          neighbours[i].current.getOtherVertexID(vertexID)
        );
        if (!minHeap.isPresent(connectedVertexIndex)) continue;
        const weight = parseInt(neighbours[i].current.props.weight || 0);

        neighbours[i].current.changeBackgroundColor("#ED3C61");
        await asyncTimeOut(delayTime);

        if (minHeap.decreaseKey(connectedVertexIndex, currWeight + weight)) {
          const prevConnectedEdge = parent[connectedVertexIndex];

          if (prevConnectedEdge != -1)
            prevConnectedEdge.current.changeBackgroundColor("#CDCDCD");

          neighbours[i].current.changeBackgroundColor("#01B878");
          parent[connectedVertexIndex] = neighbours[i];
        } else {
          neighbours[i].current.changeBackgroundColor("#CDCDCD");
        }

        await asyncTimeOut(delayTime);
      }
    }
    setParents(parent);
    setShowModal(true);
    props.endVisualizing();
  };

  const getShortestPath = (index) => {
    let shortestPath = [];
    let weight = 0;

    let vertexId = props.vertexIDs[index];
    let vertexIndex = index;
    // parent[i] contains the edge in the shortest path
    if (parent.length <= vertexIndex || vertexIndex === props.startingVertex) {
      return;
    } else if (parent[vertexIndex] === -1) {
      let message = "Vertex is not connected to source";
      setShowMessage(message);
    } else {
      //Resetting the previous path to the original color
      props.edgeRefs.forEach((ref) => {
        if (ref.current.state.styles.stroke === "red")
          ref.current.changeBackgroundColor("#01B878");
      });

      shortestPath.push(vertexIndex);

      while (parent[vertexIndex] !== -1) {
        weight += parseInt(parent[vertexIndex].current.props.weight || 0);
        const connectedVertexId =
          parent[vertexIndex].current.getOtherVertexID(vertexId);
        const connectedVertexIndex = vertexIndices.get(connectedVertexId);
        vertexIndex = connectedVertexIndex;
        vertexId = connectedVertexId;
        shortestPath.push(vertexIndex);
      }
      shortestPath.reverse();

      shortestPath.forEach((index) => {
        if (parent[index] !== -1)
          parent[index].current.changeBackgroundColor("red");
      });

      let message = (
        <div>
          <p style={{ margin: "2px" }}>
            Shortest path : <b>{shortestPath.join(" -> ")}</b>
          </p>
          <p style={{ margin: "2px" }}>
            Total weight : <b>{weight}</b>
          </p>
        </div>
      );
      setShowMessage(message);
    }
  };

  useEffect(() => {
    if (!props.isVisualizing) {
      return;
    }
    if (showModal) closeModal();
    visualizeDijkstra();
  }, [props.isVisualizing]);

  useEffect(() => {
    // A change in either of vertices, start node, edges should close the modal
    if (showModal) closeModal();
  }, [props.noOfVertices, props.startingVertex, props.edges]);

  // useEffect(() => {
  //   visualizeDijkstra();
  // }, [vertexIndices, parent]);

  //Functions related to modal
  const closeMenu = () => {
    setShowVertexMenuAnchor(null);
  };

  const openVertexMenu = (e) => {
    setShowVertexMenuAnchor(e.currentTarget);
  };

  const selectVertex = (vertexIndex) => {
    setSelectedVertex(vertexIndex);
    closeMenu();
    getShortestPath(vertexIndex);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVertex("Select Vertex");
    setShowMessage(null);
  };

  return (
    <div>
      {showModal ? (
        <DijskstraModal
          showModal={showModal}
          closeModal={closeModal}
          selectVertex={selectVertex}
          openVertexMenu={openVertexMenu}
          closeMenu={closeMenu}
          startingVertex={props.startingVertex}
          selectedVertex={selectedVertex}
          message={message}
          nodeIndices={nodeIndices}
          showVertexMenuAnchor={showVertexMenuAnchor}
          showVertexOpen={showVertexOpen}
        />
      ) : null}
    </div>
  );
};

export default DijkstraVisualization;
