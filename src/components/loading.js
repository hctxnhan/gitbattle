import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
const styles = {
  fontSize: "35px",
  textAlign: "center",
  position: "absolute",
  left: 0,
  right: 0,
  top: "200px",
};

export default function Loading({ text = "Loading", speed = 300 }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, speed);

    return () => {
      window.clearInterval(interval);
    };
  }, [text, speed]);

  return <div style={styles}>{content}</div>;
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};
