import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  LinearProgress,
  Slide,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import logo from "../assets/processing.png";
import DisplayWorkoutPlan from "../components/workout/DisplayWorkoutPlan";
import BasicInfo from "../components/workout/steps/BasicInfo";
import EquipmentAccess from "../components/workout/steps/EquipmentAccess";
import ExperienceLevel from "../components/workout/steps/ExperienceLevel";
import GoalSelection from "../components/workout/steps/GoalSelection";
import OptionalFields from "../components/workout/steps/OptionalFields";

const steps = [
  "Basic Info",
  "Goals",
  "Equipment Access",
  "Experience Level",
  "Lifestyle & Preferences",
  "Finalize",
];

const loadingMessages = [
  "Finding the perfect personalization for you...",
  "Finalizing the magical matches...",
  "AI is still working hard...",
  "Analyzing your fitness goals...",
  "Crafting your custom workout plan...",
  "Optimizing exercises for your equipment...",
  "Calculating optimal sets and reps...",
  "Making final adjustments to your plan...",
  "Almost there, putting finishing touches...",
];
const STORAGE_KEY = "SKILLS_USA-workout_onboarding";

const WorkoutPlan = () => {
  const [activeStep, setActiveStep] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData).step : 0;
  });
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData
      ? JSON.parse(savedData).data
      : {
          age: null,
          weight: null,
          height: {
            ft: null,
            in: null,
          },
          goal: "",
          gymAccess: "",
          equipmentLevel: "",
          experienceLevel: "",
          workoutDays: [],
          currentActivityLevel: "",
          dietaryPreference: "",
          motivation: "",
          workoutPreferences: [],
        };
  });
  const [errors, setErrors] = useState({});
  const [sliding, setSliding] = useState(true);
  const [slideDirection, setSlideDirection] = useState("");
  const [submitted, setSubmitted] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData).planSubmitted : false;
  });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(loadingMessages[0]);
  const [plan, setPlan] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData).generatedPlan : null;
  });

  const slideRef = useRef();

  useEffect(() => {
    const dataToSave = {
      step: activeStep,
      data: {
        ...formData,
        height: {
          ft: formData.height.ft,
          in: formData.height.in,
        },
        heightInInches: calculateTotalInches(
          formData.height.ft,
          formData.height.in
        ),
      },
      planSubmitted: submitted,
      generatedPlan: plan,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [activeStep, formData, plan]);

  useEffect(() => {
    if (loading) {
      const intervalId = setInterval(() => {
        const nextMessage =
          loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        setLoadingText(nextMessage);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [loading]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.age) newErrors.age = "Age is required";
        if (formData.age < 13 || formData.age > 100)
          newErrors.age = "Please enter a valid age";
        if (!formData.weight) newErrors.weight = "Weight is required";
        if (formData.weight < 30 || formData.weight > 300)
          newErrors.weight = "Please enter a valid weight";
        if (!formData.height) newErrors.height = "Height is required";
        if (formData.height < 75 || formData.height > 250)
          newErrors.height = "Please enter a valid height";
        break;
      case 1:
        if (
          !formData.goal ||
          formData.goal.split(",").filter(Boolean).length === 0
        ) {
          newErrors.goal = "Please select at least one goal";
        }
        break;
      case 2:
        if (!formData.gymAccess)
          newErrors.gymAccess = "Please select your equipment access";
        break;
      case 3:
        if (!formData.experienceLevel)
          newErrors.experienceLevel = "Please select your experience level";
        if (!formData.workoutDays || formData.workoutDays.length === 0)
          newErrors.workoutDays = "Select at least one workout day";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep === steps.length - 1) {
        setSliding(false);
        setTimeout(() => {
          generateWorkoutPlan();
        }, 300);
      } else {
        setSlideDirection("next");
        setSliding(false);
        setTimeout(() => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSliding(true);
        }, 300);
      }
    }
  };

  const handleBack = () => {
    setSlideDirection("back");
    setSliding(false);

    setTimeout(() => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setSliding(true);
    }, 350);
  };

  const calculateTotalInches = (ft, inches) => {
    return parseInt(ft) * 12 + parseInt(inches || 0);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      workoutPreferences: checked
        ? [...prevFormData.workoutPreferences, name]
        : prevFormData.workoutPreferences.filter((item) => item !== name),
    }));
  };

  const generateWorkoutPlan = async () => {
    setSubmitted(true);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/plans/generate",
        {
          age: formData.age,
          weight: formData.weight,
          heightInInches: formData.heightInInches,
          goal: formData.goal,
          gymAccess: formData.gymAccess,
          experienceLevel: formData.experienceLevel,
          workoutDays: formData.workoutDays,
          motivation: formData.motivation,
          workoutPreferences: formData.workoutPreferences,
          currentActivityLevel: formData.currentActivityLevel,
        }
      );

      setPlan(response.data);
      setLoading(false);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step: activeStep,
          data: formData,
          generatedPlan: response.data,
        })
      );
    } catch (error) {
      console.error("Error generating workout plan:", error);
      toast.error("Failed to generate workout plan. Please try again.");
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInfo
            formData={formData}
            setFormData={setFormData}
            calculateTotalInches={calculateTotalInches}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <GoalSelection
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <EquipmentAccess
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <ExperienceLevel
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <OptionalFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 5:
        return (
          <>
            <Typography variant="h6">
              You are almost ready to finalize your plan!
            </Typography>
            <Typography>
              Based on your inputs, we will tailor the best workout routine for
              you. Please review the plan below and make any necessary changes.
            </Typography>
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: "90%", overflow: "hidden" }} ref={slideRef}>
      <Box sx={{ width: "70%", margin: "auto" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <br />
        {!submitted ? (
          <Slide
            direction={slideDirection === "next" ? "left" : "right"}
            in={sliding}
            container={slideRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Card sx={{ mt: 2 }}>
              <CardContent sx={{ p: 3 }}>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Slide>
        ) : loading ? (
          <Fade in={submitted} timeout={500}>
            <Card>
              <CardContent
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Loading"
                  width="50%"
                  sx={{ margin: "auto" }}
                />
                <LinearProgress sx={{ my: 3 }} color="primary" />
                <Typography variant="h4" align="center">
                  {loadingText}
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        ) : (
          <div>
            {!loading && plan && (
              <Box sx={{ mt: 4, p: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                  Your 30-Day {formData.goal} Plan
                </Typography>
                <DisplayWorkoutPlan plan={plan} />
              </Box>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default WorkoutPlan;
