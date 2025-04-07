import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  LinearProgress,
  Slide,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { AnimatePresence, m } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import logo from "../assets/processing.png";
import DisplayWorkoutPlan from "../components/workout/DisplayWorkoutPlan";
import GenerationStatus from "../components/workout/GenerationStatus";
import BasicInfo from "../components/workout/steps/BasicInfo";
import EquipmentAccess from "../components/workout/steps/EquipmentAccess";
import ExperienceLevel from "../components/workout/steps/ExperienceLevel";
import GoalSelection from "../components/workout/steps/GoalSelection";
import OptionalFields from "../components/workout/steps/OptionalFields";
import GoalSpecificQuestions from "../components/workout/steps/GoalSpecificQuestions";
import Finalize from "../components/workout/steps/Finalize";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.background.neutral,
    borderRadius: 1,
  },
}));

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.background.neutral,
  zIndex: 1,
  color: theme.palette.text.secondary,
  mx: "-100px",
  width: 45,
  height: 45,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  position: "relative",
  overflow: "hidden",
  transform: ownerState.active ? "scale(1.1)" : "scale(1)",
  ...(ownerState.active && {
    color: theme.palette.primary.contrastText,
    boxShadow: `0 4px 30px 0 ${theme.palette.primary.main}50`,
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      animation: "rotate 3s linear infinite",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 2,
      borderRadius: "50%",
      background: "transparent",
    },
    "& .step-icon": {
      position: "relative",
      zIndex: 2,
      animation: "pulse 2s infinite",
    },
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    animation: "bounce 0.5s ease-out",
  }),
  "@keyframes rotate": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.1)" },
    "100%": { transform: "scale(1)" },
  },
  "@keyframes bounce": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.2)" },
    "100%": { transform: "scale(1.1)" },
  },
}));

function CustomStepIcon(props) {
  const { active, completed } = props;

  const icons = {
    1: "mdi:account",
    2: "solar:target-bold",
    3: "solar:clipboard-add-bold",
    4: "solar:dumbbell-bold",
    5: "mdi:arm-flex",
    6: "solar:heart-pulse-bold",
    7: "solar:rocket-bold",
  };

  return (
    <CustomStepIconRoot ownerState={{ completed, active }}>
      {completed ? (
        <Icon icon="ic:round-check" width="32" height="32" />
      ) : (
        <Box sx={{ mb: "-5px" }} className="step-icon">
          <Icon icon={icons[String(props.icon)]} width="30" height="30" />
        </Box>
      )}
    </CustomStepIconRoot>
  );
}

const steps = [
  "Basic Info",
  "Goals",
  "Goal Details",
  "Equipment Access",
  "Experience Level",
  "Lifestyle",
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
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
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
          goalSpecificData: {}, // Add this line
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
  const [workoutId, setWorkoutId] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData).workoutId : null;
  });
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
      workoutId: workoutId,
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
        // goal details page - no validation needed
        break;
      case 3:
        if (!formData.gymAccess)
          newErrors.gymAccess = "Please select your equipment access";
        break;
      case 4:
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
    setLoading(true);

    try {
      const createResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/plans/create`,
        {
          age: formData.age,
          weight: formData.weight,
          heightInInches: calculateTotalInches(
            formData.height.ft,
            formData.height.in
          ),
          goal: formData.goal,
          gymAccess: formData.gymAccess,
          experienceLevel: formData.experienceLevel,
          workoutDays: formData.workoutDays,
          motivation: formData.motivation,
          workoutPreferences: formData.workoutPreferences,
          currentActivityLevel: formData.currentActivityLevel,
          userId: user.id,
          goalSpecificData: formData.goalSpecificData || {},
        }
      );

      setTimeout(() => {
        setWorkoutId(createResponse.data.id);
        setSubmitted(true);
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to create workout plan");
      console.log(error);
      setLoading(false);
    }
  };

  const showPlan = (data) => {
    setPlan(data.data);
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
          <GoalSpecificQuestions
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <EquipmentAccess
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <ExperienceLevel
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <OptionalFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 6:
        return <Finalize />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        pt: 2,
      }}
      ref={slideRef}
    >
      <Box
        sx={{
          width: { lg: plan ? "100%" : "70%", xs: "100%" },
          margin: "auto",
        }}
      >
        {!plan && !submitted && (
          <Box
            component={m.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <m.div
              initial={false}
              animate={{ x: activeStep * -10 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<CustomConnector />}
              >
                {steps.map((label, index) => (
                  <Step key={label} sx={{ p: 0 }}>
                    <m.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <StepLabel StepIconComponent={CustomStepIcon}>
                        {label}
                      </StepLabel>
                    </m.div>
                  </Step>
                ))}
              </Stepper>
            </m.div>
          </Box>
        )}
        {!submitted && (
          <Slide
            direction={slideDirection === "next" ? "left" : "right"}
            in={sliding}
            container={slideRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Card
              sx={{
                my: 4,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 25%, ${theme.palette.background.neutral} 100%)`,
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 4, position: "relative" }}>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                    gap: 2,
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    size="large"
                    variant="outlined"
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 2,
                      transition: "all 0.3s ease-in-out",
                      border: `1px solid ${theme.palette.divider}`,
                      "&:hover": {
                        backgroundColor: "background.neutral",
                        "& .hover-effect": {
                          transform: "translateX(0%)",
                        },
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <Box
                      className="hover-effect"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(45deg, ${theme.palette.background.neutral}50, transparent)`,
                        transform: "translateX(-100%)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                    <Icon
                      icon="solar:arrow-left-linear"
                      style={{ marginRight: 8 }}
                    />
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      transition: "all 0.3s ease-in-out",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(255, 255, 255, 0.1)",
                        transform: "translateX(-100%) rotate(45deg)",
                        transition: "transform 0.5s ease-in-out",
                      },
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 25px -8px ${theme.palette.primary.main}`,
                        "&::before": {
                          transform: "translateX(100%) rotate(45deg)",
                        },
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    {activeStep === steps.length - 1 ? (
                      <>
                        Finish
                        <Icon
                          icon="solar:rocket-bold"
                          style={{ marginLeft: 8 }}
                        />
                      </>
                    ) : (
                      <>
                        Next
                        <Icon
                          icon="solar:arrow-right-bold"
                          style={{ marginLeft: 8 }}
                        />
                      </>
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Slide>
        )}
        {loading && (
          <Fade in={loading} timeout={500}>
            <Card
              sx={{
                my: 6,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.neutral} 100%)`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.palette.primary.main}22`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                component={m.div}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${theme.palette.primary.main}15, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />

              <CardContent
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  position: "relative",
                }}
              >
                <Box
                  component={m.img}
                  src={logo}
                  alt="Loading"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  sx={{
                    width: "40%",
                    filter: `drop-shadow(0 0 20px ${theme.palette.primary.main}33)`,
                  }}
                />

                <Box sx={{ width: "100%", position: "relative" }}>
                  <LinearProgress
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: `${theme.palette.primary.main}22`,
                      "& .MuiLinearProgress-bar": {
                        backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: 3,
                      },
                    }}
                  />

                  {/* Animated glow effect for progress bar */}
                  <Box
                    component={m.div}
                    animate={{
                      x: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "30%",
                      height: "100%",
                      background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}33, transparent)`,
                      filter: "blur(3px)",
                    }}
                  />
                </Box>

                <Typography
                  component={m.h4}
                  variant="h4"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  sx={{
                    textAlign: "center",
                    background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {loadingText}
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        )}
        {submitted && !loading && !plan && (
          <AnimatePresence mode="wait">
            <Box
              component={m.div}
              key="generation"
              initial={{ rotateX: -90 }}
              animate={{ rotateX: 0 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
            >
              <GenerationStatus
                workoutId={workoutId}
                workoutDays={formData.workoutDays}
                onShowPlan={showPlan}
              />
            </Box>
          </AnimatePresence>
        )}

        {submitted && plan && <DisplayWorkoutPlan plan={plan} />}
      </Box>
    </Box>
  );
};

export default WorkoutPlan;
