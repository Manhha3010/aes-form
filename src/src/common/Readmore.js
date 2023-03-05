import { Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const Readmore = (props) => {
  const { text, overSx, showLength = 100 } = props;
  const theme = useTheme();
  const { main } = theme.palette.primary;
  const [toggleReadMore, setToggleReadMore] = useState(true);

  const handleClickReadMore = (e) => {
    e.stopPropagation();
    setToggleReadMore(!toggleReadMore);
  };

  if (text) {
    return (
      <Typography
        style={{
          whiteSpace: "pre-line",
          textAlign: "left",
        }}
        {...overSx}
      >
        {text.length > showLength ? (
          <>
            {toggleReadMore ? text.slice(0, showLength) + "..." : text}
            &nbsp;
            <Typography
              component="small"
              sx={{ color: "#0084FF", cursor: "pointer" }}
              onClick={handleClickReadMore}
            >
              {toggleReadMore ? "Xem thêm" : "Thu gọn"}
            </Typography>
          </>
        ) : (
          text
        )}
      </Typography>
    );
  }

  return text;
};

export default Readmore;
