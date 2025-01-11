import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  dialogClasses,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { m, useTime, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCalendar } from "../components/hooks/useCalendar";
import { quotes } from "../components/quotes";
import { StyledCalendar } from "./styles";
import { Scrollbar } from "../common/scrollbar";

const Dashboard = () => {
  const time = useTime();
  const theme = useTheme();
  const [plan, setPlan] = useState(null);
  const [events, setEvents] = useState([]);
  const [progress, setProgress] = useState([]);
  const [weights, setWeights] = useState({});
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const rotate = useTransform(time, [0, 3000], [0, 360], {
    clamp: false,
  });
  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, ${theme.palette.primary.main}, ${theme.palette.info.light}, ${theme.palette.primary.main} 50%, ${theme.palette.info.light},  ${theme.palette.primary.main})`;
  });

  const { calendarRef, onDatePrev, onDateNext, onDateToday } = useCalendar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/plans/workout"
        );
        setPlan(response.data);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        toast.error("Error fetching workout plan");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (plan && plan.weeks) {
      const calendarEvents = [];
      plan.weeks.forEach((week) => {
        week.days.forEach((day) => {
          const eventDate = getStartDateForDay(
            week.weekNumber,
            parseDay(day.day)
          );
          const isToday =
            eventDate.toDateString() === new Date().toDateString();
          const isPast = eventDate < new Date().setHours(0, 0, 0, 0);
          calendarEvents.push({
            title: `${day.day} Workout`,
            start: eventDate,
            description: day.exercises
              .map(
                (exercise) =>
                  `${exercise.name}: ${exercise.sets} sets x ${exercise.reps} reps`
              )
              .join("\n"),
            videos: day.exercises.map((exercise) => exercise.videoId),
            color: isToday
              ? getCoolColor().textColor
              : isPast
              ? "#637381"
              : "#FFFFFF",
            backgroundColor: isToday
              ? getCoolColor().backgroundColor
              : isPast
              ? "rgba(145 158 171 / 0.24)"
              : "#4c93f6",
            editable: !isPast,
            isToday: isToday,
          });
        });
      });
      setEvents(calendarEvents);
    }
  }, [plan]);

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setMotivationalQuote(quotes[randomIndex]);
    };

    getRandomQuote();
  }, []);

  const parseDay = (day) => {
    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return daysMap[day] || 0;
  };

  const getStartDateForDay = (weekNumber, dayIndex) => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const daysToAdd = (weekNumber - 1) * 7 + dayIndex;
    return new Date(startOfWeek.setDate(startOfWeek.getDate() + daysToAdd));
  };

  const getCoolColor = () => {
    return {
      backgroundColor: "#0C68E9",
      textColor: "#FFFFFF",
    };
  };

  const handleMarkComplete = (eventId) => {
    const updatedProgress = [...progress];
    if (!updatedProgress.includes(eventId)) {
      updatedProgress.push(eventId);
      setProgress(updatedProgress);

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                backgroundColor: theme.palette.success.main,
                completed: true,
              }
            : event
        )
      );

      toast.success("Workout marked as complete!");
    } else {
      toast.info("This workout is already marked as complete.");
    }
    setDialogOpen(false);
  };

  const handleWeightChange = (eventId, weight) => {
    setWeights({ ...weights, [eventId]: weight });
  };

  const flexProps = {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Box sx={{ p: 3 }}>
      {motivationalQuote && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" align="center">
              "{motivationalQuote}"
            </Typography>
          </CardContent>
        </Card>
      )}
      <Card sx={{ ...flexProps, minHeight: "50vh" }}>
        <Box sx={{ padding: (theme) => theme.spacing(3, 3, 1) }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">{currentDate.toDateString()}</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={onDatePrev}>
                <Icon icon="eva:arrow-ios-back-fill" />
              </IconButton>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={onDateToday}
              >
                Today
              </Button>
              <IconButton onClick={onDateNext}>
                <Icon icon="eva:arrow-ios-forward-fill" />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
        <StyledCalendar
          sx={{ ...flexProps, ".fc.fc-media-screen": { flex: "1 1 auto" } }}
        >
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            rerenderDelay={10}
            allDayMaintainDuration
            eventResizableFromStart
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={calendarRef}
            headerToolbar={false}
            dayMaxEventRows={3}
            eventDisplay="block"
            aspectRatio={3}
            events={events.map((event, index) => ({
              id: index.toString(),
              title: event.title,
              start: event.start,
              description: event.description,
              videos: event.videos,
              backgroundColor: event.completed
                ? theme.palette.success.main
                : event.backgroundColor,
              textColor: event.color,
              isToday: event.isToday,
              editable: event.editable,
            }))}
            date={currentDate}
            eventClick={(info) => {
              setSelectedEvent(info.event);
              setDialogOpen(true);
            }}
            height="auto"
            eventContent={(arg) => {
              const isToday = arg.event.extendedProps.isToday;

              const style = {
                color: arg.event.textColor || "#FFFFFF",
                padding: "7px",
                borderRadius: "6px",
                display: "block",
              };

              if (isToday) {
                return (
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
                        backgroundColor: arg.event.backgroundColor,
                        color: arg.event.textColor,
                        padding: "7px",
                        borderRadius: "6px",
                        zIndex: 1,
                      }}
                    >
                      <strong>{arg.timeText}</strong>
                      <br />
                      {arg.event.title}
                    </Box>

                    <m.div
                      style={{
                        position: "absolute",
                        inset: "-2.5px",
                        borderRadius: "6px",
                        zIndex: 0,
                        background: rotatingBg,
                      }}
                    />
                  </Box>
                );
              }

              return (
                <div style={style}>
                  <strong>{arg.timeText}</strong>
                  <br />
                  {arg.event.title}
                </div>
              );
            }}
          />
        </StyledCalendar>
      </Card>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          [`& .${dialogClasses.paper}`]: {
            minWidth: 500,
          },
        }}
      >
        {selectedEvent &&
          (() => {
            const isFutureEvent = new Date(selectedEvent.start) > new Date();
            const isPastEvent = new Date(selectedEvent.start) <= new Date();
            const isToday =
              new Date(selectedEvent.start).toDateString() ===
              new Date().toDateString();
            const isCompleted = progress.includes(selectedEvent.id);

            return (
              <>
                <DialogTitle
                  id="alert-dialog-title"
                  sx={{
                    ...theme.typography.h4,
                    borderBottom: `1px dashed ${theme.palette.divider}`,
                  }}
                >
                  {selectedEvent.title}
                </DialogTitle>

                <DialogContent>
                  {selectedEvent.extendedProps.description
                    .split("\n")
                    .map((line, index) => {
                      const exerciseName = line.split(": ")[0];
                      const exerciseDetails = line.split(": ")[1];
                      const videoId = selectedEvent.extendedProps.videos[index];

                      const toggleVideo = (id) => {
                        setExpandedVideo(expandedVideo === id ? null : id);
                      };

                      return (
                        <List key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <ListItemText
                              primary={exerciseName}
                              secondary={exerciseDetails}
                              slotProps={{
                                primary: {
                                  typography: "subtitle1",
                                  color: "#fff",
                                },
                                secondary: {
                                  component: "span",
                                  mt: 0.5,
                                },
                              }}
                            />
                            {videoId && (
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => toggleVideo(index)}
                                startIcon={
                                  <Icon
                                    icon="ph:caret-down"
                                    style={{
                                      transition: theme.transitions.create(
                                        "transform",
                                        {
                                          duration:
                                            theme.transitions.duration.short,
                                          easing:
                                            theme.transitions.easing.easeInOut,
                                        }
                                      ),
                                      transform:
                                        expandedVideo === index
                                          ? "rotate(180deg)"
                                          : "rotate(0deg)",
                                    }}
                                  />
                                }
                              >
                                {expandedVideo === index
                                  ? "Hide Video"
                                  : "Expand Video"}
                              </Button>
                            )}
                          </Box>
                          {expandedVideo === index && videoId && (
                            <Box sx={{ mt: 2 }}>
                              <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={`Exercise Video ${index + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </Box>
                          )}
                        </List>
                      );
                    })}
                </DialogContent>

                <DialogActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: `1px dashed ${theme.palette.divider}`,
                    padding: theme.spacing(3),
                  }}
                >
                  <Tooltip
                    title={
                      isFutureEvent
                        ? "Can't complete events in the future"
                        : isPastEvent && !isToday
                        ? "Can't complete events in the past"
                        : isCompleted
                        ? "Already Completed"
                        : ""
                    }
                  >
                    <span>
                      <Button
                        onClick={() => handleMarkComplete(selectedEvent.id)}
                        startIcon={
                          <Icon
                            icon="solar:bag-check-outline"
                            width="24"
                            height="24"
                          />
                        }
                        sx={{
                          border: !isToday
                            ? `1px solid ${theme.palette.disabled.main}`
                            : `1px solid ${theme.palette.success.light}`,
                          color: theme.palette.success.light,
                        }}
                        disabled={!isToday}
                      >
                        Mark as Complete
                      </Button>
                    </span>
                  </Tooltip>
                  <Button
                    onClick={() => setDialogOpen(false)}
                    color="secondary"
                    variant="outlined"
                  >
                    Close
                  </Button>
                </DialogActions>
              </>
            );
          })()}
      </Dialog>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Track your progress:
        </Typography>
        <Typography>
          Completed {progress.length} of {events.length} workouts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => {
            setProgress([]);
            setEvents((prevEvents) =>
              prevEvents.map((event) => ({
                ...event,
                backgroundColor: event.isToday
                  ? getCoolColor().backgroundColor
                  : "#4c93f6",
                completed: false,
              }))
            );
          }}
        >
          Reset Progress
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
