import React from "react";

export default function useHover() {
  const [hovering, setHovering] = React.useState(false);

  const onMouseOut = () => setHovering(false);
  const onMouseOver = () => setHovering(true);

  return [
    hovering,
    {
      onMouseOut,
      onMouseOver,
    },
  ];
}
