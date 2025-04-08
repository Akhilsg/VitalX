import { Icon } from "@iconify/react";
import {
  alpha,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { Scrollbar } from "../../common/scrollbar";
import WorkoutAccordion from "./WorkoutAccordion";

export default function WorkoutDrawer({
  open,
  onClose,
  selectedEvent,
  exerciseTracking,
  setExerciseTracking,
  loadingSetId,
  handleSetUpdate,
  handleMarkComplete,
  completeLoading,
}) {
  const theme = useTheme();
  const [expandedExercise, setExpandedExercise] = useState(null);

  // Check if all exercises are done for this event
  const allExercisesCompleted = useMemo(() => {
    if (!selectedEvent) return false;
    const lines = selectedEvent.extendedProps.description.split("\n");
    return lines.every((line, exerciseIdx) => {
      const totalSets = parseInt(line.split("sets x")[0].split(": ")[1]);
      const completedSets = Object.entries(
        exerciseTracking[selectedEvent.id] || {}
      ).filter(
        ([key, val]) =>
          key.startsWith(`${exerciseIdx}-`) && key.endsWith("-completed") && val
      ).length;
      return completedSets === totalSets;
    });
  }, [selectedEvent, exerciseTracking]);

  if (!selectedEvent) {
    return null;
  }

  const isToday = moment(selectedEvent.start).isSame(moment(), "day");

  const handleClose = () => {
    setExpandedExercise(null);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      aria-hidden="false"
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 480 },
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.neutral} 100%)`,
          backdropFilter: "blur(8px)",
          boxShadow: `-8px 0 32px -4px ${alpha(
            theme.palette.common.black,
            0.2
          )}`,
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Drawer Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: `1px dashed ${theme.palette.disabled.main}`,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {selectedEvent.title}
              </Typography>
            </Box>

            <IconButton onClick={handleClose} color="iconButton">
              <Icon icon="material-symbols:close-rounded" />
            </IconButton>
          </Stack>
        </Box>

        {/* Exercises */}
        <Scrollbar sx={{ p: 3, flexGrow: 1, overflowX: "hidden" }}>
          {selectedEvent.extendedProps.description
            .split("\n")
            .map((line, exerciseIdx) => {
              const isPastEvent = moment(selectedEvent.start).isBefore(
                moment(),
                "day"
              );
              const isFutureEvent = moment(selectedEvent.start).isAfter(
                moment(),
                "day"
              );

              return (
                <WorkoutAccordion
                  key={exerciseIdx}
                  exerciseIdx={exerciseIdx}
                  line={line}
                  isToday={isToday}
                  isPastEvent={isPastEvent}
                  isFutureEvent={isFutureEvent}
                  expandedExercise={expandedExercise}
                  setExpandedExercise={setExpandedExercise}
                  selectedEvent={selectedEvent}
                  exerciseTracking={exerciseTracking}
                  setExerciseTracking={setExerciseTracking}
                  loadingSetId={loadingSetId}
                  handleSetUpdate={handleSetUpdate}
                />
              );
            })}
        </Scrollbar>

        {/* Footer: Mark complete button */}
        <Box sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="success"
            startIcon={<Icon icon="solar:check-circle-bold" />}
            loading={completeLoading}
            disabled={!allExercisesCompleted}
            onClick={() => handleMarkComplete(selectedEvent.id)}
            sx={{
              boxShadow: `0 8px 16px ${alpha(
                theme.palette.success.main,
                0.24
              )}`,
            }}
          >
            Complete Workout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
