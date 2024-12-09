import { Box, Paper, Typography, Button, ButtonGroup } from "@suid/material";
import { createSignal } from "solid-js";

interface ProgressStepsProps {
  steps: string[];
  activeStep?: number;
  onStepChange?: (step: number) => void;
  disabled?: boolean;
}

const ProgressSteps = (props: ProgressStepsProps) => {
  //const [activeStep, setActiveStep] = createSignal(props.activeStep || 0);

  const handleStepChange = (index: number) => {
    if (props.disabled) return;
    //setActiveStep(index);
    props.onStepChange?.(index);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <ButtonGroup variant="contained" sx={{ width: "100%" }}>
          {props.steps.map((step, index) => (
            <Button
              disabled={props.disabled}
              sx={{
                bgcolor: props.activeStep >= index ? "primary.main" : "grey.300",
                flex: 1,
                position: "relative",
                "&:not(:last-child)::after": {
                  content: '""',
                  position: "absolute",
                  right: -1,
                  top: "50%",
                  width: 20,
                  height: 2,
                  bgcolor: props.activeStep > index ? "primary.main" : "grey.300",
                  transform: "translateY(-50%)",
                },
              }}
            >
              <Typography variant="body2">
                {`Step ${index + 1}`}
                <br />
                {step}
              </Typography>
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default ProgressSteps;