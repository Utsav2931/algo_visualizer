import React, { useState, useRef } from "react";
import Header from "../UI/Header/Header";
import AlgorithmOptions from "../UI/Menu/AlgorithmOptions";
import Canvas from "../GraphComponents/Canvas";

const Layout = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    AlgorithmOptions[0]
  );

  const [isVisualizing, setIsVisualizing] = useState(false);
  const [speed, setSpeed] = useState(1000); // store this dfault speed in some config file
  const [adjListOpen, setAdjListOpen] = useState(false);
  const [startNode, setStartNode] = useState("Start Node");
  const [topoModalOpen, setTopoModalOpen] = useState(false);

  const speedChange = (e, value) => {
    setSpeed(3000 / value);
  };

  const selectStartNode = (node) => {
    setStartNode(node);
  };

  const startVisualizing = () => {
    setIsVisualizing(true);
  };

  const toggleAdjList = () => {
    setAdjListOpen((prev) => !prev);
  };

  const endVisualizing = () => {
    setIsVisualizing(false);
  };

  const selectAlgorithm = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const toggleTopoModal = (action) => {
    setTopoModalOpen(action);
  };

  const canvasRef = useRef(null);
  return (
    <div>
      <Header
        startNode={startNode}
        selectStartNode={selectStartNode}
        selectAlgorithm={selectAlgorithm}
        AlgorithmOptions={AlgorithmOptions}
        selectedAlgorithm={selectedAlgorithm}
        canvasRef={canvasRef}
        startVisualizing={startVisualizing}
        isVisualizing={isVisualizing}
        toggleAdjList={toggleAdjList}
        isAdjListOpen={adjListOpen}
        speedChange={speedChange}
        initialSpeed={speed}
      ></Header>
      <Canvas
        startNode={startNode}
        visualizationStart={startVisualizing}
        visualizationEnd={endVisualizing}
        isVisualizing={isVisualizing}
        selectedAlgorithm={selectedAlgorithm}
        ref={canvasRef}
        open={adjListOpen}
        visualizationSpeed={speed}
        topoModalOpen={topoModalOpen}
        setTopoModalOpen={toggleTopoModal}
      />
    </div>
  );
};

export default Layout;
