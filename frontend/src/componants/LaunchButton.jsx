import React from "react";
import { Button } from "@mui/material";
import KeyBoardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function LaunchButton(props) {
  return (
    <div>
      <Button variant="contained" sx={{ borderRadius: 4, py: "10px", px: "25px", margin: '5px', background: "white", color: "#471e75", fontWeight: "600" }} >
        {props.value}
        { props.value !== "Sign Up" ?  <KeyBoardArrowRightIcon /> : null}
      </Button>
    </div>
  );
}

export default LaunchButton;
