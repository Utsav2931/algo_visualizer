import { v4 as uuidv4 } from "uuid";
import React from "react";
import Edge from "./Edge";
import Vertex from "./Vertex";
import DfsVisualization from "../../algorithms/DFS/DfsVisualization";
import BfsVisualization from "../../algorithms/BFS/BfsVisualization";
import KruskalVisualization from "../../algorithms/Kruskal/KruskalVisualization";
import PrimVisualization from "../../algorithms/Prim/PrimVisualization";
import DijkstraVisualization from "../../algorithms/Dijkstra/DijkstraVisualization";
import TopologicalSortVisualization from "../../algorithms/TopologicalSort/TopologicalSortVisualization";
import AdjList from "../AdjList/AdjList";
import TopoModal from "../TopoModal/TopoModal";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.vertexIDs = [];
    this.edgeRefs = new Map();
    this.vertexRefs = new Map();
    this.adjList = new Map();
    this.directedTo = new Map();

    // this stores the directed edge incident TO a vertex
    this.state = {
      visualize: false,
      noOfVertices: 0,
      vertices: [],
      edges: [],
      topoSort: [],
    };
  }

  moveEdge = (vertexID, x, y) => {
    for (var i = 0; i < this.adjList.get(vertexID).length; i++) {
      const id = this.adjList.get(vertexID)[i];
      this.edgeRefs.get(id).current.changePosition(vertexID, x, y);
    }
    if (this.directedTo.has(vertexID)) {
      for (var i = 0; i < this.directedTo.get(vertexID).length; i++) {
        const id = this.directedTo.get(vertexID)[i];
        this.edgeRefs.get(id).current.changePosition(vertexID, x, y);
      }
    }
  };

  addVertex = () => {
    var newVertices = this.state.vertices.map((vertex) => vertex);
    const newVertexRef = React.createRef();
    const uniqueID = uuidv4();
    newVertices.push(
      <Vertex
        ref={newVertexRef}
        vertexIndex={this.state.noOfVertices}
        moveIncidentEdges={this.moveEdge}
        uniqueID={uniqueID}
        key={uniqueID}
      />
    );
    this.vertexIDs.push(uniqueID);
    this.vertexRefs.set(uniqueID, newVertexRef);
    this.adjList.set(uniqueID, []);

    this.setState({
      vertices: newVertices,
      noOfVertices: this.state.noOfVertices + 1,
    });
  };

  isEdgePresent = (n1ID, n2ID, isDirected) => {
    for (var i = 0; i < this.adjList.get(n1ID).length; i++) {
      const edgeRef = this.edgeRefs.get(this.adjList.get(n1ID)[i]);
      if (edgeRef.current.props.isDirected && edgeRef.current.n2ID === n2ID) {
        return this.adjList.get(n1ID)[i];
      }
      if (
        !edgeRef.current.props.isDirected &&
        (edgeRef.current.n1ID === n2ID || edgeRef.current.n2ID === n2ID)
      ) {
        return this.adjList.get(n1ID)[i];
      }
    }

    // Directed edge from n2 to n1 exists and user trying to
    // add Un-Directed edge from n1 to n2
    if (!isDirected && this.directedTo.has(n1ID)) {
      for (var i = 0; i < this.directedTo.get(n1ID).length; i++) {
        const edgeRef = this.edgeRefs.get(this.directedTo.get(n1ID)[i]);
        if (edgeRef.current.n1ID == n2ID) return this.directedTo.get(n1ID)[i];
      }
    }
    return false;
  };
  // CASE 1 - Un-Directed edge from n1 to n2 exists
  // Can NOT add any other edge between n1 and n2

  // CASE 2 - Directed edge from n1 to n2 exists
  // Can only add Directed edge from n2 to n1
  // Can NOT add any Un- directed edge between n1 and n2

  addEdge = (n1, n2, isDirected, weight) => {
    const n1ID = this.vertexIDs[n1];
    const n2ID = this.vertexIDs[n2];
    if (this.isEdgePresent(n1ID, n2ID, isDirected) !== false) {
      // console.log("edge already +nt");
      return;
    }

    const newEdgeRef = React.createRef();
    const uniqueID = uuidv4();
    var newEdges = this.state.edges.map((edge) => edge);

    newEdges.push(
      <Edge
        weight={weight}
        ref={newEdgeRef}
        key={uniqueID}
        n1Ref={this.vertexRefs.get(n1ID)}
        n2Ref={this.vertexRefs.get(n2ID)}
        edgeKey={uniqueID}
        isDirected={isDirected}
      />
    );

    this.edgeRefs.set(uniqueID, newEdgeRef);

    this.adjList.get(n1ID).push(uniqueID);
    if (!isDirected) this.adjList.get(n2ID).push(uniqueID);

    if (isDirected) {
      if (this.directedTo.has(n2ID)) this.directedTo.get(n2ID).push(uniqueID);
      else this.directedTo.set(n2ID, [uniqueID]);
    }

    this.setState({
      edges: newEdges,
    });
  };

  clearCanvas = () => {
    this.vertexIDs = [];
    this.edgeRefs = new Map();
    this.vertexRefs = new Map();
    this.adjList = new Map();
    this.directedTo = new Map();

    this.setState({
      visualize: false,
      noOfVertices: 0,
      vertices: [],
      edges: [],
      topoSort: [],
    });
    this.props.visualizationEnd();
  };

  // check for optimisation
  deleteVertex = (vertexIndex) => {
    const uniqueID = this.vertexIDs[vertexIndex];
    this.vertexRefs.delete(uniqueID);

    const incidentEdges = this.adjList.get(uniqueID);

    for (var i = 0; i < incidentEdges.length; i++) {
      const edgeID = incidentEdges[i];
      const edgeRef = this.edgeRefs.get(edgeID);
      this.edgeRefs.delete(edgeID);

      const connectedVertexID = edgeRef.current.getOtherVertexID(uniqueID);

      if (edgeRef.current.props.isDirected) {
        const updatedNeighbour = this.directedTo
          .get(connectedVertexID)
          .filter((id) => id !== edgeID);

        this.directedTo.set(connectedVertexID, updatedNeighbour);
      } else {
        const updatedNeighbour = this.adjList
          .get(connectedVertexID)
          .filter((id) => id !== edgeID);

        this.adjList.set(connectedVertexID, updatedNeighbour);
      }
    }

    if (this.directedTo.has(uniqueID)) {
      const incomingDirectedEdges = this.directedTo.get(uniqueID);
      for (var i = 0; i < incomingDirectedEdges.length; i++) {
        const edgeID = incomingDirectedEdges[i];
        const edgeRef = this.edgeRefs.get(edgeID);
        this.edgeRefs.delete(edgeID);
        const connectedVertexID = edgeRef.current.getOtherVertexID(uniqueID);

        const updatedNeighbour = this.adjList
          .get(connectedVertexID)
          .filter((id) => id !== edgeID);

        this.adjList.set(connectedVertexID, updatedNeighbour);
      }
      this.directedTo.delete(uniqueID);
    }

    this.vertexIDs.splice(vertexIndex, 1);
    this.adjList.delete(uniqueID);

    for (i = vertexIndex; i < this.state.noOfVertices - 1; i++) {
      const ind = this.vertexRefs.get(this.vertexIDs[i]).current.state
        .vertexIndex;
      if (ind > vertexIndex) {
        this.vertexRefs
          .get(this.vertexIDs[i])
          .current.changeVertexIndex(ind - 1);
      }
    }

    this.setState({
      noOfVertices: this.state.noOfVertices - 1,
      vertices: this.state.vertices.filter(
        (vertex) => vertex.props.uniqueID !== uniqueID
      ),
      edges: this.state.edges.filter(
        (edge) =>
          edge.props.n1Ref.current.id !== uniqueID &&
          edge.props.n2Ref.current.id !== uniqueID
      ),
    });
  };

  deleteEdge = (n1, n2) => {
    const n1ID = this.vertexIDs[n1];
    const n2ID = this.vertexIDs[n2];

    var toDeleteEdgeID = this.isEdgePresent(n1ID, n2ID, true);
    if (toDeleteEdgeID === false) {
      // console.log("edge NOT +nt");
      return;
    }

    const toDeleteEdgeRef = this.edgeRefs.get(toDeleteEdgeID);
    this.edgeRefs.delete(toDeleteEdgeID);

    const updated1Neighbour = this.adjList
      .get(n1ID)
      .filter((edgeID) => edgeID !== toDeleteEdgeID);
    this.adjList.set(n1ID, updated1Neighbour);

    if (toDeleteEdgeRef.current.props.isDirected === false) {
      const updated2Neighbour = this.adjList
        .get(n2ID)
        .filter((edgeID) => edgeID !== toDeleteEdgeID);
      this.adjList.set(n2ID, updated2Neighbour);
    }

    if (toDeleteEdgeRef.current.props.isDirected) {
      const updated = this.directedTo
        .get(n2ID)
        .filter((edgeID) => edgeID !== toDeleteEdgeID);
      this.directedTo.set(n2ID, updated);
    }

    this.setState({
      edges: this.state.edges.filter(
        (edge) => edge.props.edgeKey !== toDeleteEdgeID
      ),
    });
  };

  // add code for getting starting vertex as input
  startVisualizing = () => {
    this.props.visualizationStart();
  };

  endVisualizing = () => {
    this.props.visualizationEnd();
  };

  reset = () => {
    this.vertexRefs.forEach((ref) => ref.current.changeBackgroundColor("aqua"));
    this.edgeRefs.forEach((ref) => ref.current.changeBackgroundColor("black"));
    this.props.visualizationEnd();
  };

  checkIfAllEdgesAreDirected = () => {
    const adj = [...this.adjList.entries()];

    for (var i = 0; i < adj.length; i++) {
      const entry = adj[i][1];
      for (var j = 0; j < entry.length; j++) {
        const edgeRef = this.edgeRefs.get(entry[j]);

        if (!edgeRef.current.props.isDirected) {
          return false;
        }
      }
    }
    return true;
  };

  isCyclic = () => {
    const vertexIndices = new Map();
    const V = this.state.noOfVertices;
    for (var i = 0; i < V; i++) {
      vertexIndices.set(this.vertexIDs[i], i);
    }

    let visited = new Array(V).fill(false);
    let recStack = new Array(V).fill(false);

    // Call the recursive helper function to
    // detect cycle in different DFS trees
    for (let i = 0; i < V; i++)
      if (
        this.isCyclicUtil(this.vertexIDs[i], vertexIndices, visited, recStack)
      )
        return true;

    return false;
  };

  isCyclicUtil = (vertexID, vertexIndices, visited, recStack) => {
    var index = vertexIndices.get(vertexID);

    if (!visited[index]) {
      visited[index] = true;
      recStack[index] = true;

      const incidentEdges = this.adjList.get(vertexID);
      const connectedVerticesID = incidentEdges.map((id) =>
        this.edgeRefs.get(id).current.getOtherVertexID(vertexID)
      );

      for (let c = 0; c < connectedVerticesID.length; c++) {
        const otherIndex = vertexIndices.get(connectedVerticesID[c]);

        if (
          !visited[otherIndex] &&
          this.isCyclicUtil(
            connectedVerticesID[c],
            vertexIndices,
            visited,
            recStack
          )
        )
          return true;
        else if (recStack[otherIndex]) return true;
      }
      recStack[index] = false;
      return false;
    }
  };

  isGraphDAG = () => {
    if (!this.checkIfAllEdgesAreDirected()) {
      console.log("There are undirected edges in your graph");
      return false;
    }

    if (this.isCyclic()) {
      console.log("There is a cycle in your graph");
      return false;
    }

    return true;
  };

  setTopoSort = (array) => {
    const revArray = [];

    for (var i = array.length - 1; i >= 0; i--) {
      revArray.push(array[i]);
    }

    // console.log(revArray);

    this.setState({ topoSort: revArray });
  };

  render() {
    return (
      <>
        <div className="graph">
          {this.state.vertices}
          {this.state.edges}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "DFS" ? (
            <DfsVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
            />
          ) : null}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "BFS" ? (
            <BfsVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
            />
          ) : null}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "Kruskal MST" ? (
            <KruskalVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
            />
          ) : null}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "Prim MST" ? (
            <PrimVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
            />
          ) : null}
          {this.props.selectedAlgorithm === "Dijkstra" ? (
            <DijkstraVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
              isVisualizing={this.props.isVisualizing}
              edges={this.state.edges}
            />
          ) : null}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "Topological Sort" ? (
            <TopologicalSortVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
              setTopoModalOpen={this.props.setTopoModalOpen}
              setTopoSort={this.setTopoSort}
            />
          ) : null}
        </div>
        <AdjList
          adjList={this.adjList}
          nodeIndices={this.vertexIDs}
          edgeRefs={this.edgeRefs}
          open={this.props.open}
        ></AdjList>
        <TopoModal
          topoSort={this.state.topoSort}
          open={this.props.topoModalOpen}
          setTopoModalOpen={this.props.setTopoModalOpen}
        ></TopoModal>
      </>
    );
  }
}

export default Canvas;
