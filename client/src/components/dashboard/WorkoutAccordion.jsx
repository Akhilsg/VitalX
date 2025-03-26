import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

export default function ExerciseAccordion({
  exerciseIdx,
  line,
  isToday,
  isPastEvent,
  isFutureEvent,
  expandedExercise,
  setExpandedExercise,
  selectedEvent,
  exerciseTracking,
  setExerciseTracking,
  loadingSetId,
  handleSetUpdate,
}) {
  const theme = useTheme();
  // Parse exercise info
  const totalSets = parseInt(line.split("sets x")[0].split(": ")[1]);
  const exerciseName = line.split(": ")[0];

  // Compute how many sets are completed
  const completedSets = Object.entries(
    exerciseTracking[selectedEvent.id] || {}
  ).filter(
    ([key, val]) =>
      key.startsWith(`${exerciseIdx}-`) && key.endsWith("-completed") && val
  ).length;
  const isCompleted = completedSets === totalSets;

  const handleAccordionChange = (e, isExpanded) => {
    setExpandedExercise(isExpanded ? exerciseIdx : null);
  };

  return (
    <Accordion
      key={exerciseIdx}
      expanded={expandedExercise === exerciseIdx}
      onChange={handleAccordionChange}
      sx={{
        mb: 2,
        background: isCompleted
          ? alpha(theme.palette.success.main, 0.1)
          : alpha(theme.palette.background.neutral, 0.6),
        backdropFilter: "blur(8px)",
        boxShadow: "none",
        border: `0.5px solid ${
          isCompleted
            ? theme.palette.success.dark
            : alpha(theme.palette.divider, 0.1)
        }`,
        borderRadius: "16px !important",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<Icon icon="solar:alt-arrow-down-linear" />}
        sx={{
          "& .MuiAccordionSummary-content": { my: 2 },
          borderBottom:
            expandedExercise === exerciseIdx
              ? `1px dashed ${theme.palette.divider}`
              : "none",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          width="100%"
          sx={{ mr: 1 }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              display: "flex",
              background: isCompleted
                ? `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`
                : `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
            }}
          >
            <Icon
              icon={
                isCompleted ? "solar:check-circle-bold" : "solar:dumbbell-bold"
              }
              width={24}
              style={{
                color: isCompleted ? "#fff" : theme.palette.primary.main,
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {exerciseName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {completedSets} / {totalSets} sets completed
            </Typography>
          </Box>

          {isCompleted && (
            <Chip
              label="Completed"
              color="success"
              size="small"
              icon={<Icon icon="solar:check-circle-bold" />}
            />
          )}
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.4),
          }}
        >
          <Box
            sx={{
              gridColumn: "2",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 80px",
              gap: 2,
              mb: 1,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
            >
              Weight (lbs)
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
            >
              Reps
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
            >
              Done
            </Typography>
          </Box>

          {Array.from({ length: totalSets }).map((_, setIndex) => {
            const setCompleted =
              exerciseTracking[selectedEvent.id]?.[
                `${exerciseIdx}-${setIndex}-completed`
              ];
            const setWeight =
              exerciseTracking[selectedEvent.id]?.[
                `${exerciseIdx}-${setIndex}-weight`
              ] || "";
            const setReps =
              exerciseTracking[selectedEvent.id]?.[
                `${exerciseIdx}-${setIndex}-reps`
              ] || "";

            return (
              <React.Fragment key={setIndex}>
                {/* The big number on the left: set # */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isToday
                      ? setCompleted
                        ? theme.palette.success.main
                        : theme.palette.primary.main
                      : setCompleted
                      ? alpha(theme.palette.success.main, 0.2)
                      : alpha(theme.palette.primary.main, 0.2),
                    color: !isToday ? "disabled.main" : "white",
                    fontWeight: 600,
                  }}
                >
                  {setIndex + 1}
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 80px",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  {/* Weight TextField */}
                  <Tooltip
                    title={
                      isFutureEvent
                        ? "Can't track future workouts"
                        : isPastEvent && !isToday
                        ? "Can't modify past workouts"
                        : ""
                    }
                  >
                    <TextField
                      size="small"
                      type="number"
                      placeholder="0"
                      disabled={!isToday}
                      value={setWeight}
                      slotProps={{
                        input: {
                          sx: {
                            height: 40,
                            bgcolor: "background.paper",
                            textAlign: "center",
                            "& input": { textAlign: "center" },
                          },
                        },
                      }}
                      onChange={(e) => {
                        setExerciseTracking((prev) => ({
                          ...prev,
                          [selectedEvent.id]: {
                            ...prev[selectedEvent.id],
                            [`${exerciseIdx}-${setIndex}-weight`]:
                              e.target.value,
                          },
                        }));
                      }}
                      onBlur={(e) => {
                        if (isToday) {
                          // call handleSetUpdate
                          handleSetUpdate(
                            selectedEvent.id,
                            exerciseIdx,
                            setIndex,
                            {
                              weight: e.target.value,
                            }
                          );
                        }
                      }}
                      sx={{
                        ...(!isToday && {
                          opacity: 0.5,
                          cursor: "not-allowed",
                        }),
                      }}
                    />
                  </Tooltip>

                  {/* Reps TextField */}
                  <Tooltip
                    title={
                      isFutureEvent
                        ? "Can't track future workouts"
                        : isPastEvent && !isToday
                        ? "Can't modify past workouts"
                        : ""
                    }
                  >
                    <TextField
                      size="small"
                      type="number"
                      placeholder="0"
                      disabled={!isToday}
                      value={setReps}
                      slotProps={{
                        input: {
                          sx: {
                            height: 40,
                            bgcolor: "background.paper",
                            textAlign: "center",
                            "& input": { textAlign: "center" },
                          },
                        },
                      }}
                      onChange={(e) => {
                        setExerciseTracking((prev) => ({
                          ...prev,
                          [selectedEvent.id]: {
                            ...prev[selectedEvent.id],
                            [`${exerciseIdx}-${setIndex}-reps`]: e.target.value,
                          },
                        }));
                      }}
                      onBlur={(e) => {
                        if (isToday) {
                          handleSetUpdate(
                            selectedEvent.id,
                            exerciseIdx,
                            setIndex,
                            {
                              reps: e.target.value,
                            }
                          );
                        }
                      }}
                      sx={{
                        ...(!isToday && {
                          opacity: 0.5,
                          cursor: "not-allowed",
                        }),
                      }}
                    />
                  </Tooltip>

                  {/* Completed Icon Button */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip
                      title={
                        isFutureEvent
                          ? "Can't track future workouts"
                          : isPastEvent && !isToday
                          ? "Can't modify past workouts"
                          : ""
                      }
                    >
                      <span>
                        <IconButton
                          disabled={
                            !isToday ||
                            loadingSetId ===
                              `${selectedEvent.id}-${exerciseIdx}-${setIndex}`
                          }
                          onClick={() =>
                            handleSetUpdate(
                              selectedEvent.id,
                              exerciseIdx,
                              setIndex,
                              {
                                completed: !setCompleted,
                              }
                            )
                          }
                          sx={{
                            width: 40,
                            height: 40,
                            opacity: !isToday ? 0.5 : 1,
                            color: setCompleted
                              ? theme.palette.success.main
                              : theme.palette.action.disabled,
                            bgcolor: setCompleted
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.background.paper, 0.8),
                            "&:hover": {
                              bgcolor: setCompleted
                                ? alpha(theme.palette.success.main, 0.2)
                                : alpha(theme.palette.background.paper, 1),
                            },
                            "&:disabled": {
                              bgcolor: alpha(
                                theme.palette.background.paper,
                                0.8
                              ),
                              color: theme.palette.text.secondary,
                            },
                          }}
                        >
                          {loadingSetId ===
                          `${selectedEvent.id}-${exerciseIdx}-${setIndex}` ? (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                color: "disabled.main",
                                p: 3,
                              }}
                            >
                              <CircularProgress color="inherit" size={20} />
                            </Box>
                          ) : (
                            <Icon
                              icon={setCompleted ? "mdi:check" : "mdi:minus"}
                            />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
