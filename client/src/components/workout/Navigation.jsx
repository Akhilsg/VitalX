import { Chip, Stack } from "@mui/material";

export const QuickNav = ({ weeks, currentWeek, onWeekSelect }) => (
  <Stack
    direction="row"
    spacing={1}
    sx={{
      position: "sticky",
      top: 0,
      zIndex: 1,
      py: 2,
      px: 3,
      bgcolor: "background.paper",
      borderBottom: 1,
      borderColor: "divider",
    }}
  >
    {weeks.map((week) => (
      <Chip
        key={week.weekNumber}
        label={`Week ${week.weekNumber}`}
        onClick={() => onWeekSelect(week.weekNumber)}
        color={currentWeek === week.weekNumber ? "primary" : "default"}
        variant={currentWeek === week.weekNumber ? "filled" : "outlined"}
      />
    ))}
  </Stack>
);

export const DayTabs = ({ days, selectedDay, onDaySelect }) => (
  <Stack
    direction="row"
    spacing={1}
    sx={{
      mb: 2,
      overflowX: "auto",
      pb: 1,
    }}
  >
    {days.map((day, index) => (
      <Chip
        key={day.day}
        label={day.day}
        onClick={() => onDaySelect(index)}
        color={selectedDay === index ? "primary" : "default"}
        variant={selectedDay === index ? "filled" : "outlined"}
      />
    ))}
  </Stack>
);
