import React, { useState } from "react";
import interact from "interactjs";
import "./index.css";
import imagen from "./foto.jpg";
import ImageBox from "../../components/ImageBox";

const InteractiveImage = () => {
  // target elements with the "draggable" class
  window.dragMoveListener = dragMoveListener;
  interact(".resize-drag")
    .draggable({
      onmove: window.dragMoveListener,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true
        })
      ],
      restrict: {
        restriction: "parent",
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      }
    })
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          restriction: "parent",
          endOnly: true
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 }
        })
      ],

      inertia: true
    })
    .on("resizemove", function(event) {
      var target = event.target;
      var x = parseFloat(target.getAttribute("data-x")) || 0;
      var y = parseFloat(target.getAttribute("data-y")) || 0;

      // update the element's style
      target.style.width = event.rect.width + "px";
      target.style.height = event.rect.height + "px";

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px," + y + "px)";

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    });

  function dragMoveListener(event) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }
  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

  return (
    <div className="container resize-container">
      <div className={"resize-drag"}>Resize from any edge or corner</div>
      <ImageBox
        width="100%"
        radius="10px"
        fit="contain"
        alt={imagen}
        src={imagen}
        thumb={imagen}
      ></ImageBox>
    </div>
  );
};

export default InteractiveImage;
