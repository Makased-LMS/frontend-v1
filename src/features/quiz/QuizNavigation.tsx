import React, { useState } from "react";
import { Button, Grid2 } from "@mui/material";

interface QuizItem {
  id: number;
  completed: boolean;
}

const QuizNavigation: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const quizItems: QuizItem[] = Array.from({ length: 30 }, (_, i) => ({
    // from api
    id: i + 1,
    completed: false, //  not completed
  }));

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <Grid2 container spacing={1} width={"fit-content"}>
      {quizItems.map((item) => (
        <Grid2 key={item.id}>
          <Button
            variant={item.id === selectedId ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleSelect(item.id)}
          >
            {item.id}
          </Button>
        </Grid2>
      ))}
      <Grid2 xs={12} mt={1}>
        <Button
          variant="text"
          fullWidth
          onClick={() => alert("Finish attempt")} // todo change it
        >
          Finish attempt ...
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default QuizNavigation;
