import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Grid2,
  Card,
  CardContent,
} from "@mui/material";
import { useParams } from "react-router-dom";
import QuizNavigation from "./QuizNavigation";

interface Question {
  id: number;
  questionText: string;
  options: { id: number; text: string }[];
  answer: number;
}

const questions: Question[] = [
  {
    id: 1,
    questionText: "What is the capital of France?",
    options: [
      { id: 1, text: "Paris" },
      { id: 2, text: "London" },
      { id: 3, text: "Berlin" },
    ],
    answer: 1,
  },
  {
    id: 2,
    questionText: "What is 10 / 2?",
    options: [
      { id: 1, text: "3" },
      { id: 2, text: "5" },
      { id: 3, text: "7" },
    ],
    answer: 2,
  },
  // More questions can be added here
];

const Quiz: React.FC = () => {
  const { quizId } = useParams();
  // const { questionsDraft } = useQuestionsDraft();

  const [timeLeft, setTimeLeft] = useState(300); // todo get time from API

  useEffect(() => {
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer as ReturnType<typeof setInterval>);
  }, [timeLeft]);

  const handleSubmit = () => {
    // todo result page
  };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleOptionChange = (index: number, optionId: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = optionId;
    setSelectedOptions(updatedOptions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
      }}
    >
      {/* can't use grid 2 as i want // cuz i was not put "container to give it a flex proprty" */}
      <Grid2 container spacing={3} width={"100%"} height={"100%"}>
        <Grid2
          container
          justifyContent={"space-around"}
          alignItems={"center"}
          flexDirection={"column"}
          spacing={3}
          size={{ xs: 12, lg: 3 }}
          sx={{ borderColor: "main.primary", borderRight: 1 }}
        >
          <Typography
            variant="h4"
            sx={{ width: "fit-content", color: "primary.main" }}
          >
            Question {currentQuestionIndex + 1}
          </Typography>
          <QuizNavigation />
          <Typography
            variant="body2"
            sx={{
              border: 1,
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: 1,
              p: 1,
              textAlign: "right",
              width: "fit-content",
            }}
          >
            Time left: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </Typography>
        </Grid2>
        <Grid2
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ flexGrow: 1, display: "flex " }}
        >
          <Grid2
            maxWidth="lg"
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={1}
            sx={{ width: "100%" }}
          >
            {/* image here  ,, u can use mui image :) */}
            <img
              src="https://www.google.com/imgres?q=image%20to%20html&imgurl=https%3A%2F%2Fd3m1rm8xuevz4q.cloudfront.net%2Fwp-content%2Fuploads%2F2022%2F04%2Fimage-in-html-1-1.png.webp&imgrefurl=https%3A%2F%2Fcodeinstitute.net%2Fie%2Fblog%2Fhtml-and-images%2F&docid=Y4dZJSoeU1BC7M&tbnid=sUsm-ZvMyCrFVM&vet=12ahUKEwjDi-7C-NyKAxWR0wIHHawKJ30QM3oECEwQAA..i&w=1500&h=500&hcb=2&ved=2ahUKEwjDi-7C-NyKAxWR0wIHHawKJ30QM3oECEwQAA"
              alt="logo"
            />

            <Card sx={{ padding: 3 }}>
              <CardContent>
                <Typography variant="h5" style={{ marginBottom: "20px" }}>
                  {currentQuestion.questionText}
                </Typography>
                <RadioGroup
                  sx={{ ml: 2 }}
                  name="quiz-options"
                  value={selectedOptions[currentQuestionIndex] || ""}
                  onChange={(event) =>
                    handleOptionChange(
                      currentQuestionIndex,
                      Number(event.target.value)
                    )
                  }
                >
                  {currentQuestion.options.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio />}
                      label={option.text}
                    />
                  ))}
                </RadioGroup>
                <Grid2
                  container
                  spacing={3}
                  justifyContent={"space-around"}
                  style={{ marginTop: "20px" }}
                >
                  <Button
                    variant="outlined"
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    // onClick={""}
                    disabled={currentQuestionIndex !== 5} // # of questions
                  >
                    submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </Button>
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Quiz;
