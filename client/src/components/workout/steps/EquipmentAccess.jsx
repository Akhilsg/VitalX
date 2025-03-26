import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Grid,
  Collapse,
  Checkbox,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import { m } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const EquipmentAccess = ({ formData, handleInputChange, errors }) => {
  const theme = useTheme();
  const [showHomeEquipment, setShowHomeEquipment] = useState(false);
  const [showGymEquipment, setShowGymEquipment] = useState(false);

  useEffect(() => {
    setShowHomeEquipment(formData.gymAccess === "home-gym");
    setShowGymEquipment(formData.gymAccess === "full-gym");
  }, [formData.gymAccess]);

  const equipmentOptions = {
    "home-gym": [
      { value: "dumbbells", label: "Dumbbells", icon: "mdi:dumbbell" },
      {
        value: "resistance-bands",
        label: "Resistance Bands",
        icon: "mdi:yoga",
      },
      { value: "pull-up-bar", label: "Pull-up Bar", icon: "mdi:arm-flex" },
      { value: "bench", label: "Workout Bench", icon: "mdi:seat" },
      { value: "kettlebells", label: "Kettlebells", icon: "mdi:weight-lifter" },
      { value: "treadmill", label: "Treadmill", icon: "mdi:run" },
    ],
    "full-gym": [
      {
        value: "machines",
        label: "Weight Machines",
        icon: "mdi:weight-lifter",
      },
      { value: "free-weights", label: "Free Weights", icon: "mdi:dumbbell" },
      { value: "cardio-equipment", label: "Cardio Equipment", icon: "mdi:run" },
      {
        value: "cable-machines",
        label: "Cable Machines",
        icon: "mdi:jump-rope",
      },
      { value: "smith-machine", label: "Smith Machine", icon: "mdi:weight" },
      { value: "squat-rack", label: "Squat Rack", icon: "mdi:human-handsup" },
      {
        value: "leg-press",
        label: "Leg Press Machine",
        icon: "mdi:human-male",
      },
      {
        value: "rowing-machine",
        label: "Rowing Machine",
        icon: "icon-park-solid:rowing",
      },
      {
        value: "battle-ropes",
        label: "Battle Ropes",
        icon: "mdi:sine-wave",
      },
    ],
  };

  const handleEquipmentChange = (event) => {
    const { name, checked } = event.target;
    const currentEquipment = formData.equipmentLevel
      ? formData.equipmentLevel.split(",")
      : [];

    const updatedEquipment = checked
      ? [...currentEquipment, name]
      : currentEquipment.filter((item) => item !== name);

    handleInputChange("equipmentLevel")({
      target: { value: updatedEquipment.join(",") },
    });
  };

  const getSelectedEquipment = () => {
    return formData.equipmentLevel ? formData.equipmentLevel.split(",") : [];
  };

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // sx={{ maxWidth: 800, mx: "auto" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Icon
                icon="solar:dumbbell-large-bold"
                width={24}
                height={24}
                color={theme.palette.primary.main}
                style={{ marginRight: 12 }}
              />
              <Typography variant="subtitle1" fontWeight={500}>
                Workout Location
              </Typography>
            </Box>

            <FormControl
              component="fieldset"
              error={!!errors.gymAccess}
              sx={{ width: "100%" }}
            >
              <FormLabel
                component="legend"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Where will you be working out most often?
              </FormLabel>
              <RadioGroup
                value={formData.gymAccess}
                onChange={handleInputChange("gymAccess")}
                sx={{ mt: 2 }}
              >
                <Grid container spacing={2}>
                  {[
                    {
                      value: "full-gym",
                      label: "Commercial Gym",
                      icon: "mdi:office-building",
                      description:
                        "Access to a wide range of equipment and machines",
                    },
                    {
                      value: "home-gym",
                      label: "Home Gym",
                      icon: "mdi:home",
                      description:
                        "Working out with equipment you have at home",
                    },
                    {
                      value: "none",
                      label: "No Equipment",
                      icon: "mdi:human",
                      description:
                        "Bodyweight exercises only, no special equipment",
                    },
                  ].map((option) => (
                    <Grid item xs={12} md={4} key={option.value}>
                      <Box
                        component={m.div}
                        whileTap={{ scale: 0.98 }}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: "pointer",
                          height: "100%",
                          border: `1px solid ${
                            formData.gymAccess === option.value
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          backgroundColor:
                            formData.gymAccess === option.value
                              ? alpha(theme.palette.primary.main, 0.08)
                              : alpha(theme.palette.background.paper, 0.4),
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: alpha(theme.palette.primary.main, 0.4),
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.04
                            ),
                          },
                        }}
                        onClick={() =>
                          handleInputChange("gymAccess")({
                            target: { value: option.value },
                          })
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              mb: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                              backgroundColor:
                                formData.gymAccess === option.value
                                  ? alpha(theme.palette.primary.main, 0.2)
                                  : alpha(theme.palette.grey[500], 0.1),
                            }}
                          >
                            <Icon
                              icon={option.icon}
                              width={28}
                              height={28}
                              color={
                                formData.gymAccess === option.value
                                  ? theme.palette.primary.main
                                  : theme.palette.text.secondary
                              }
                            />
                          </Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight={
                              formData.gymAccess === option.value ? 600 : 400
                            }
                          >
                            {option.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.description}
                          </Typography>
                          <Radio
                            checked={formData.gymAccess === option.value}
                            onChange={handleInputChange("gymAccess")}
                            value={option.value}
                            sx={{
                              mt: 1,
                              "&.Mui-checked": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
              {errors.gymAccess && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.gymAccess}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={showHomeEquipment || showGymEquipment}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Icon
                  icon="solar:dumbbell-large-bold"
                  width={24}
                  height={24}
                  color={theme.palette.primary.main}
                  style={{ marginRight: 12 }}
                />
                <Typography variant="subtitle1" fontWeight={500}>
                  Available Equipment
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Select all equipment you have access to for your workouts
              </Typography>

              <Grid container spacing={2}>
                {(showHomeEquipment
                  ? equipmentOptions["home-gym"]
                  : equipmentOptions["full-gym"]
                ).map((item) => {
                  const isSelected = getSelectedEquipment().includes(
                    item.value
                  );

                  return (
                    <Grid item xs={12} sm={6} md={4} key={item.value}>
                      <Box
                        component={m.div}
                        whileTap={{ scale: 0.98 }}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          border: `1px solid ${
                            isSelected
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          backgroundColor: isSelected
                            ? alpha(theme.palette.primary.main, 0.08)
                            : alpha(theme.palette.background.paper, 0.4),
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: alpha(theme.palette.primary.main, 0.4),
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.04
                            ),
                          },
                        }}
                        onClick={() =>
                          handleEquipmentChange({
                            target: { name: item.value, checked: !isSelected },
                          })
                        }
                      >
                        <Box
                          sx={{
                            mr: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: isSelected
                              ? alpha(theme.palette.primary.main, 0.2)
                              : alpha(theme.palette.grey[500], 0.1),
                          }}
                        >
                          <Icon
                            icon={item.icon}
                            width={24}
                            height={24}
                            color={
                              isSelected
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary
                            }
                          />
                        </Box>
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          {item.label}
                        </Typography>
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => handleEquipmentChange(e)}
                          name={item.value}
                          sx={{
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Collapse>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={formData.gymAccess === "none"}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Icon
                  icon="mdi:information-outline"
                  width={24}
                  height={24}
                  color={theme.palette.primary.main}
                  style={{ marginRight: 12 }}
                />
                <Typography variant="subtitle1" fontWeight={500}>
                  Workout Space
                </Typography>
              </Box>

              <FormControl component="fieldset" sx={{ width: "100%" }}>
                <FormLabel
                  component="legend"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  What kind of space do you have for bodyweight workouts?
                </FormLabel>
                <RadioGroup
                  value={formData.workoutSpace || ""}
                  onChange={handleInputChange("workoutSpace")}
                  sx={{ mt: 2 }}
                >
                  <Grid container spacing={2}>
                    {[
                      {
                        value: "small",
                        label: "Small Space",
                        description: "Just enough room to stand and move arms",
                      },
                      {
                        value: "medium",
                        label: "Medium Space",
                        description: "Room to lie down and do basic movements",
                      },
                      {
                        value: "large",
                        label: "Large Space",
                        description:
                          "Plenty of room for all types of movements",
                      },
                    ].map((option) => (
                      <Grid item xs={12} sm={4} key={option.value}>
                        <Box
                          component={m.div}
                          whileTap={{ scale: 0.98 }}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            cursor: "pointer",
                            height: "100%",
                            border: `1px solid ${
                              (formData.workoutSpace || "") === option.value
                                ? theme.palette.primary.main
                                : theme.palette.divider
                            }`,
                            backgroundColor:
                              (formData.workoutSpace || "") === option.value
                                ? alpha(theme.palette.primary.main, 0.08)
                                : alpha(theme.palette.background.paper, 0.4),
                            transition: "all 0.2s",
                            "&:hover": {
                              borderColor: alpha(
                                theme.palette.primary.main,
                                0.4
                              ),
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.04
                              ),
                            },
                          }}
                          onClick={() =>
                            handleInputChange("workoutSpace")({
                              target: { value: option.value },
                            })
                          }
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight={
                                (formData.workoutSpace || "") === option.value
                                  ? 600
                                  : 400
                              }
                            >
                              {option.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {option.description}
                            </Typography>
                            <Radio
                              checked={
                                (formData.workoutSpace || "") === option.value
                              }
                              onChange={handleInputChange("workoutSpace")}
                              value={option.value}
                              sx={{
                                mt: 1,
                                "&.Mui-checked": {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Box>
          </Collapse>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Icon
                icon="solar:clock-circle-bold"
                width={24}
                height={24}
                color={theme.palette.primary.main}
                style={{ marginRight: 12 }}
              />
              <Typography variant="subtitle1" fontWeight={500}>
                Workout Duration
              </Typography>
            </Box>

            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <FormLabel
                component="legend"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                How much time can you dedicate to each workout session?
              </FormLabel>
              <RadioGroup
                value={formData.workoutDuration || ""}
                onChange={handleInputChange("workoutDuration")}
                sx={{ mt: 2 }}
              >
                <Grid container spacing={2}>
                  {[
                    {
                      value: "short",
                      label: "15-30 minutes",
                      icon: "mdi:timer-sand",
                    },
                    {
                      value: "medium",
                      label: "30-60 minutes",
                      icon: "mdi:timer-sand",
                    },
                    {
                      value: "long",
                      label: "60+ minutes",
                      icon: "mdi:timer-sand",
                    },
                  ].map((option) => (
                    <Grid item xs={12} sm={4} key={option.value}>
                      <Box
                        component={m.div}
                        whileTap={{ scale: 0.98 }}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: "pointer",
                          height: "100%",
                          border: `1px solid ${
                            (formData.workoutDuration || "") === option.value
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          backgroundColor:
                            (formData.workoutDuration || "") === option.value
                              ? alpha(theme.palette.primary.main, 0.08)
                              : alpha(theme.palette.background.paper, 0.4),
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: alpha(theme.palette.primary.main, 0.4),
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.04
                            ),
                          },
                        }}
                        onClick={() =>
                          handleInputChange("workoutDuration")({
                            target: { value: option.value },
                          })
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              mb: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              backgroundColor:
                                (formData.workoutDuration || "") ===
                                option.value
                                  ? alpha(theme.palette.primary.main, 0.2)
                                  : alpha(theme.palette.grey[500], 0.1),
                            }}
                          >
                            <Icon
                              icon={option.icon}
                              width={24}
                              height={24}
                              color={
                                (formData.workoutDuration || "") ===
                                option.value
                                  ? theme.palette.primary.main
                                  : theme.palette.text.secondary
                              }
                            />
                          </Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight={
                              (formData.workoutDuration || "") === option.value
                                ? 600
                                : 400
                            }
                          >
                            {option.label}
                          </Typography>
                          <Radio
                            checked={
                              (formData.workoutDuration || "") === option.value
                            }
                            onChange={handleInputChange("workoutDuration")}
                            value={option.value}
                            sx={{
                              mt: 1,
                              "&.Mui-checked": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EquipmentAccess;
