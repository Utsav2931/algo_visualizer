import React, { Component } from "react";

const vertexRadius = 25;
class Vertex extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.uniqueID;
    this.isDragging = false;
    this.previousColor = "aqua";
    this.state = {
      vertexIndex: this.props.vertexIndex,
      styles: { left: 500, top: 300, backgroundColor: "aqua" },
    };
  }

  dragStart = (e) => {
    this.isDragging = true;
    document.onmousemove = this.dragging;
    document.onmouseup = this.dragEnd;

    this.previousColor = this.state.styles.backgroundColor;
    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: "teal",
      },
    });
  };

  dragEnd = () => {
    this.isDragging = false;
    document.onmousemove = null;
    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: this.previousColor,
      },
    });
  };

  dragging = (e) => {
    if (this.isDragging) {
      let newLeft, newTop;
      if (e.type === "touchmove") {
        newLeft = e.touches[0].clientX - vertexRadius;
        newTop = e.touches[0].clientY - vertexRadius;
      } else {
        newLeft = e.clientX - vertexRadius;
        newTop = e.clientY - vertexRadius;
      }
      this.setState({
        styles: {
          left: newLeft,
          top: newTop,
          backgroundColor: this.state.styles.backgroundColor,
        },
      });

      // changing edge position when node moves
      this.props.moveIncidentEdges(
        this.id,
        newLeft + vertexRadius,
        newTop + vertexRadius
      );
    }
  };

  changeBackgroundColor = (color) => {
    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: color,
      },
    });
  };

  changeVertexIndex = (n) => {
    this.setState({
      vertexIndex: n,
    });
  };

  render() {
    return (
      <div
        className="drag"
        style={this.state.styles}
        onMouseDown={this.dragStart}
        onMouseMove={this.dragging}
        onMouseUp={this.dragEnd}
        onTouchStart={this.dragStart}
        onTouchMove={this.dragging}
        onTouchEnd={this.dragEnd}
      >
        <h3>{this.state.vertexIndex} </h3>
      </div>
    );
  }
}

export default Vertex;
