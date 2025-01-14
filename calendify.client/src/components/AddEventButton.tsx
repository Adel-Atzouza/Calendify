import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddEvent from "./AddEventForm";

export const AddEventButton = (): JSX.Element => {
  const [showAddEvent, setShowAddEvent] = useState(false);

  const handleClickAddButton = () => {
    setShowAddEvent(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <Typography>
        <Fab
          onClick={handleClickAddButton}
          color="primary"
          aria-label="add"
          style={{
            position: "absolute",
            top: -70,
            right: 10,
          }}
        >
          <AddIcon />
        </Fab>
      </Typography>
      {showAddEvent && <AddEvent />}
    </div>
  );
};
