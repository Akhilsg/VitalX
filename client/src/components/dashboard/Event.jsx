import { Icon } from "@iconify/react";
import { alpha, Box, Typography, useTheme } from "@mui/material";
import { m, useTime, useTransform } from "framer-motion";
import moment from "moment";
import React from "react";

export default function CalendarEventContent({
  arg,
  coolColors,
  userProgress,
}) {
  if (!arg.event) return null;
  const theme = useTheme();
  const time = useTime();

  const event = arg.event;
  const isPast = new Date(event.start) < new Date().setHours(0, 0, 0, 0);
  const isToday = event.extendedProps.isToday;
  const eventId = event.id;

  // Determine if completed from userProgress
  const isCompleted = userProgress?.workouts?.find(
    (w) => w.eventId === eventId
  )?.completed;

  // Some color logic
  const weekNumber = moment(event.start).week();
  const dayOfWeek = moment(event.start).day();
  const colorIndex = (weekNumber * 7 + dayOfWeek) % coolColors.length;

  const rotate = useTransform(time, [0, 3000], [0, 360], { clamp: false });
  const rotatingBgs = coolColors.map((color) =>
    useTransform(rotate, (r) => {
      return `conic-gradient(from ${r}deg, ${color.main}, ${color.light}, ${color.main} 50%, ${color.light}, ${color.main})`;
    })
  );

  const style = isPast
    ? {
        gradient: isCompleted
          ? alpha(theme.palette.success.main, 0.2)
          : theme.palette.action.disabledBackground,
      }
    : isCompleted
    ? {
        gradient: alpha(theme.palette.success.dark, 0.8),
      }
    : coolColors[colorIndex];

  const dayOfMonth = new Date(event.start).getDate();

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: dayOfMonth * 0.03,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            background: style.gradient,
            backdropFilter: "blur(8px)",
            color: isPast ? theme.palette.text.secondary : "#fff",
            padding: "10px 12px",
            borderRadius: "8px",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            opacity: isPast ? 0.6 : 1,
            boxShadow:
              isPast || isCompleted ? "none" : "0 4px 12px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: isPast || isCompleted ? "none" : "translateY(-2px)",
              boxShadow:
                isPast || isCompleted ? "none" : "0 6px 16px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Box
            sx={{
              minWidth: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: isCompleted
                ? alpha(theme.palette.success.lighter, 0.2)
                : "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isCompleted ? (
              <Icon
                icon="solar:check-circle-bold"
                style={{
                  fontSize: "20px",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }}
              />
            ) : (
              <Icon
                icon="solar:dumbbell-bold"
                style={{
                  fontSize: "20px",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }}
              />
            )}
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                maxWidth: "95%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {event.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.9,
                display: "block",
                fontWeight: 500,
              }}
            >
              {event.extendedProps.description.split("\n").length} exercises
            </Typography>
          </Box>
        </Box>

        {isToday && !isCompleted && (
          <m.div
            style={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "8px",
              zIndex: 0,
              background: rotatingBgs[colorIndex],
            }}
          />
        )}
      </Box>
    </m.div>
  );
}
