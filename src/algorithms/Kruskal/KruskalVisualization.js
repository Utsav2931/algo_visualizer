import { useState, useEffect } from "react";
import asyncTimeOut from "../../helpers/asyncTimeOut";
import UnionFind from "../../helpers/dataStructures/UnionFind";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//const delayTime = 1000;
const KruskalVisualization = (props) => {
  const vertexIndices = new Map();
  const edgeWeights = [];
  const delayTime = props.visualizationSpeed
  const visualizeKruskal = async () => {
    const unionFind = new UnionFind(props.edgeRefs.size);

    for (var i = 0; i < props.noOfVertices; i++) {
      unionFind.makeSet(i);
    }

    for (var i = 0; i < edgeWeights.length; i++) {
      const vertex1 = vertexIndices.get(edgeWeights[i][1].current.n1ID);
      const vertex2 = vertexIndices.get(edgeWeights[i][1].current.n2ID);

      const makeUnion = unionFind.union(vertex1, vertex2);

      edgeWeights[i][1].current.changeBackgroundColor("#ED3C61");
      await asyncTimeOut(delayTime);
      if (makeUnion) {
        edgeWeights[i][1].current.changeBackgroundColor("#01B878");
        toast.info("According to  Kruskal's Minimum Spanning Tree Algorithm, we have to choose the smallest edge that doesn't create a loop" +
          ". So the edge between " + vertex1 + " and " + vertex2 + " has been marked green.",
          { autoClose: delayTime * 10, pauseOnHover: false })
        await asyncTimeOut(delayTime * 11);
      }
      else {
        edgeWeights[i][1].current.changeBackgroundColor("#CDCDCD")
        toast.info("So the edge between " + vertex1 + " and " + vertex2 + " has been marked gray because it creates a loop.",
          { autoClose: delayTime * 10, pauseOnHover: false })
        await asyncTimeOut(delayTime * 11);
      };
      await asyncTimeOut(delayTime);
    }

    props.endVisualizing();
  };

  useEffect(() => {
    for (var i = 0; i < props.noOfVertices; i++) {
      vertexIndices.set(props.vertexIDs[i], i);
    }

    props.edgeRefs.forEach((edgeRef, edgeID) => {
      edgeWeights.push([parseInt(edgeRef.current.props.weight), edgeRef]);
    });

    edgeWeights.sort((x, y) => {
      if (y[0] < x[0]) return 1;
      else return -1;
    });

    visualizeKruskal();
  }, []);

  return <div></div>;
};

export default KruskalVisualization;
