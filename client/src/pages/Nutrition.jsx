// Nutrition.jsx
import {
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { AnimatePresence, m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import api from "../api/axios";
import { MealCardWrapper } from "../components/nutrition/MealPlan";
import { PreferencesForm } from "../components/nutrition/PreferencesForm";
import { CustomTabs } from "../common/tabs";

const Nutrition = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);

  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  // Form states
  const [preferences, setPreferences] = useState({
    dietaryPreferences: [],
    hasAllergies: false,
    allergies: [],
    excludedIngredients: [],
    calorieGoal: "",
    proteinGoal: "",
    carbGoal: "",
    fatGoal: "",
  });

  const [allergyInput, setAllergyInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    if (user) {
      fetchNutritionPlan();
    }
  }, [user]);

  const fetchNutritionPlan = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/nutrition/user/${user.id}`);
      setNutritionPlan(response.data);
      setPreferences(
        response.data.preferences || {
          dietaryPreferences: [],
          hasAllergies: false,
          allergies: [],
          excludedIngredients: [],
          calorieGoal: "",
          proteinGoal: "",
          carbGoal: "",
          fatGoal: "",
        }
      );
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        createNewPlan();
      } else {
        toast.error("Failed to load nutrition plan");
        setLoading(false);
      }
    }
  };

  const createNewPlan = async () => {
    try {
      const response = await api.post(`/nutrition/create`, {
        userId: user.id,
        preferences,
      });
      setNutritionPlan(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to create nutrition plan");
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      await api.put(`/nutrition/preferences/${user.id}`, preferences);
      toast.success("Preferences saved successfully");
    } catch (error) {
      toast.error("Failed to save preferences");
    }
  };

  const generateNutritionPlan = async () => {
    try {
      setGenerating(true);
      await savePreferences();

      const workoutResponse = await api.get(`/nutrition/user/${user.id}`);
      const workoutPlanId = workoutResponse.data?._id;

      const response = await api.post(`/nutrition/generate/${user.id}`, {
        workoutPlanId,
      });
      setNutritionPlan(response.data);
      toast.success("Nutrition plan generated successfully!");
      setGenerating(false);
    } catch (error) {
      toast.error("Failed to generate nutrition plan");
      setGenerating(false);
    }
  };

  const handleDayChange = (event, newValue) => {
    setActiveDay(newValue);
  };

  const addItem = (type, value) => {
    if (!value.trim()) return;
    switch (type) {
      case "allergies":
        if (!preferences.allergies.includes(value.trim())) {
          setPreferences({
            ...preferences,
            allergies: [...preferences.allergies, value.trim()],
          });
          setAllergyInput("");
        }
        break;
      case "excludedIngredients":
        if (!preferences.excludedIngredients.includes(value.trim())) {
          setPreferences({
            ...preferences,
            excludedIngredients: [
              ...preferences.excludedIngredients,
              value.trim(),
            ],
          });
          setExcludedInput("");
        }
        break;
      case "dietaryPreferences":
        if (!preferences.dietaryPreferences.includes(value)) {
          setPreferences({
            ...preferences,
            dietaryPreferences: [...preferences.dietaryPreferences, value],
          });
        }
        break;
      default:
        break;
    }
  };

  const removeItem = (type, index) => {
    switch (type) {
      case "allergies":
        setPreferences({
          ...preferences,
          allergies: preferences.allergies.filter((_, i) => i !== index),
        });
        break;
      case "excludedIngredients":
        setPreferences({
          ...preferences,
          excludedIngredients: preferences.excludedIngredients.filter(
            (_, i) => i !== index
          ),
        });
        break;
      case "dietaryPreferences":
        setPreferences({
          ...preferences,
          dietaryPreferences: preferences.dietaryPreferences.filter(
            (_, i) => i !== index
          ),
        });
        break;
      default:
        break;
    }
  };

  const handlePreferenceChange = (event) => {
    const { name, checked, value, type } = event.target;
    setPreferences({
      ...preferences,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNumberInput = (event) => {
    const { name, value } = event.target;
    if (value === "" || /^\d+$/.test(value)) {
      setPreferences({
        ...preferences,
        [name]: value,
      });
    }
  };

  const renderNutritionPlan = () => {
    if (
      !nutritionPlan ||
      !nutritionPlan.weeklyPlan ||
      nutritionPlan.weeklyPlan.length === 0
    ) {
      return (
        <Card sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            No nutrition plan generated yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Complete the steps above to generate your personalized nutrition
            plan
          </Typography>
        </Card>
      );
    }
    const currentDay =
      nutritionPlan.weeklyPlan[activeDay] || nutritionPlan.weeklyPlan[0];

    return (
      <Box>
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <CustomTabs
            value={activeDay}
            onChange={handleDayChange}
            variant="fullWidth"
            scrollButtons="false"
          >
            {daysOfWeek.map((day, index) => (
              <Tab
                key={day}
                label={day}
                sx={{
                  minWidth: "auto", // Allow tabs to shrink if needed
                  fontWeight: activeDay === index ? 700 : 500,
                  color:
                    activeDay === index
                      ? theme.palette.primary.main
                      : "inherit",
                }}
              />
            ))}
          </CustomTabs>
        </Paper>

        <Box sx={{ mb: 4 }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
            }}
          >
            {[
              {
                label: "Calories",
                value: currentDay.totalNutrition?.calories,
                unit: "kcal",
              },
              {
                label: "Protein",
                value: currentDay.totalNutrition?.protein,
                unit: "g",
              },
              {
                label: "Carbs",
                value: currentDay.totalNutrition?.carbs,
                unit: "g",
              },
              {
                label: "Fat",
                value: currentDay.totalNutrition?.fat,
                unit: "g",
              },
            ].map((item) => (
              <Box key={item.label} sx={{ textAlign: "center" }}>
                <Typography variant="overline">{item.label}</Typography>
                <Typography variant="h5">
                  {item.value || "--"}
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {item.unit}
                  </Typography>
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>

        <Grid container spacing={3}>
          {currentDay.meals.map((meal, index) => (
            <Grid item xs={12} md={6} key={index}>
              <MealCardWrapper meal={meal} theme={theme} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: `conic-gradient(${theme.palette.primary.main} 25%, ${theme.palette.secondary.main} 75%)`,
              }}
            />
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: theme.palette.text.primary }}
            >
              Preparing your personalized nutrition plan...
            </Typography>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 400,
                textAlign: "center",
              }}
            >
              Hang tight! We're crafting a plan tailored just for you. This
              might take a moment.
            </Typography>
          </m.div>
        </Box>
      ) : (
        <Box>
          {nutritionPlan &&
          nutritionPlan.weeklyPlan &&
          nutritionPlan.weeklyPlan.length > 0 ? (
            <AnimatePresence exitBeforeEnter>
              <m.div
                key={activeDay}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {renderNutritionPlan()}
              </m.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PreferencesForm
                  preferences={preferences}
                  setPreferences={setPreferences}
                  allergyInput={allergyInput}
                  setAllergyInput={setAllergyInput}
                  excludedInput={excludedInput}
                  setExcludedInput={setExcludedInput}
                  addItem={addItem}
                  removeItem={removeItem}
                  handleNumberInput={handleNumberInput}
                  handlePreferenceChange={handlePreferenceChange}
                  generateNutritionPlan={generateNutritionPlan}
                  savePreferences={savePreferences}
                  generating={generating}
                  theme={theme}
                />
              </m.div>
            </AnimatePresence>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Nutrition;
