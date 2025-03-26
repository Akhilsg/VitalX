import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import CalendarEventContent from "../components/dashboard/Event";
import WorkoutDrawer from "../components/dashboard/WorkoutDrawer";
import { useCalendar } from "../components/hooks/useCalendar";
import { quotes } from "../components/quotes";
import { StyledCalendar } from "./styles";

import { m } from "framer-motion";
import LoadingDots from "../common/LoadingText";
import AnalyticCard from "../components/dashboard/AnalyticsCard";
import Drawer from "../components/dashboard/Drawer";
import {
  initializeProgressFailure,
  initializeProgressStart,
  initializeProgressSuccess,
  markWorkoutComplete,
  updateSetSuccess,
} from "../redux/slices/progressSlice";

const Dashboard = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userProgress } = useSelector((state) => state.progress);

  const [plan, setPlan] = useState(null);
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [exerciseTracking, setExerciseTracking] = useState({});
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loadingSetId, setLoadingSetId] = useState(null);

  const coolColors = [
    {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    },
    {
      main: theme.palette.secondary.main,
      light: theme.palette.secondary.light,
      gradient: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
    },
    {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      gradient: `linear-gradient(135deg, ${theme.palette.warning.light}, ${theme.palette.warning.main})`,
    },
    {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      gradient: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.main})`,
    },
    {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      gradient: `linear-gradient(135deg, ${theme.palette.info.light}, ${theme.palette.info.main})`,
    },
  ];

  const { calendarRef, onDatePrev, onDateNext, onDateToday } = useCalendar();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/plans/workout/${user.id}`
        );
        setPlan(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching workout plan:", error);

        setLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (plan) {
      dispatch(initializeProgressStart());
      axios
        .get(
          `http://localhost:5000/api/progress/initialize/${user.id}/${plan._id}`
        )
        .then((res) => {
          const { userProgress } = res.data;
          const tracking = {};

          userProgress.workouts.forEach((workout) => {
            tracking[workout.eventId] = {};
            workout.exercises.forEach((exercise, exerciseIdx) => {
              exercise.sets.forEach((set, setIdx) => {
                tracking[workout.eventId][`${exerciseIdx}-${setIdx}-weight`] =
                  set.weight;
                tracking[workout.eventId][`${exerciseIdx}-${setIdx}-reps`] =
                  set.reps;
                tracking[workout.eventId][
                  `${exerciseIdx}-${setIdx}-completed`
                ] = set.completed;
              });
            });
          });

          setExerciseTracking(tracking);
          dispatch(initializeProgressSuccess(userProgress));
        })
        .catch((error) => {
          console.error(error);
          dispatch(initializeProgressFailure(error.message));
          toast.error("Failed to load progress");
        });
    }
  }, [plan, dispatch, user.id]);

  useEffect(() => {
    if (plan && plan.weeks && userProgress) {
      const calendarEvents = [];

      plan.weeks.forEach((week) => {
        week.days.forEach((day) => {
          const eventId = `${week.weekNumber}-${day.day}`;
          const eventDate = getStartDateForDay(
            week.weekNumber,
            parseDay(day.day)
          );

          const isPast = eventDate < new Date().setHours(0, 0, 0, 0);
          const isToday =
            eventDate.toDateString() === new Date().toDateString();

          const weekNumber = moment(eventDate).week();
          const dayOfWeek = moment(eventDate).day();
          const colorIndex = (weekNumber * 7 + dayOfWeek) % coolColors.length;

          const isCompleted = userProgress?.workouts?.find(
            (w) => w.eventId === eventId
          )?.completed;

          calendarEvents.push({
            id: eventId,
            title: `${day.day}`,
            start: eventDate,
            end: eventDate,
            allDay: true,
            description: day.exercises
              .map((ex) => `${ex.name}: ${ex.sets} sets x ${ex.reps} reps`)
              .join("\n"),
            videos: day.exercises.map((ex) => ex.videoId),
            backgroundColor: isPast
              ? "transparent"
              : coolColors[colorIndex].gradient,
            editable: !isPast,
            isToday,
            isCompleted,
          });
        });
      });

      setEvents(calendarEvents);
    }
  }, [plan, userProgress]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setMotivationalQuote(quotes[randomIndex]);
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

  const handleSetUpdate = async (eventId, exerciseIdx, setIndex, data) => {
    const setId = `${eventId}-${exerciseIdx}-${setIndex}`;
    setLoadingSetId(setId);

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/progress/update-set/${user.id}`,
        {
          planId: plan._id,
          eventId,
          exerciseIndex: exerciseIdx,
          setIndex,
          ...data,
        }
      );

      dispatch(updateSetSuccess(response.data.userProgress));

      setExerciseTracking((prev) => ({
        ...prev,
        [eventId]: {
          ...prev[eventId],
          ...(data.weight !== undefined && {
            [`${exerciseIdx}-${setIndex}-weight`]: data.weight,
          }),
          ...(data.reps !== undefined && {
            [`${exerciseIdx}-${setIndex}-reps`]: data.reps,
          }),
          ...(data.completed !== undefined && {
            [`${exerciseIdx}-${setIndex}-completed`]: data.completed,
          }),
        },
      }));
    } catch (error) {
      toast.error("Failed to update set");
      console.error(error);
    } finally {
      setLoadingSetId(null);
    }
  };

  const handleMarkComplete = async (eventId) => {
    setCompleteLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/progress/mark-complete/${user.id}`,
        {
          planId: plan._id,
          eventId,
        }
      );
      dispatch(markWorkoutComplete(response.data.userProgress));
      setDialogOpen(false);

      if (userProgress.workouts.find((w) => w.eventId === eventId).completed) {
        toast.info("Workout already marked as complete!");
        return;
      }
      toast.success("Workout marked as complete!");
    } catch (error) {
      toast.error("Failed to mark workout complete");
      console.error(error);
    } finally {
      setCompleteLoading(false);
    }
  };

  const calculateStreak = (workouts) => {
    if (!workouts?.length) return 0;
    let streak = 0;
    const sortedWorkouts = workouts
      .filter((w) => w.completed)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    return streak;
  };

  const calculateTotalSets = (workouts) => {
    if (!workouts?.length) return 0;
    return workouts.reduce((total, workout) => {
      return (
        total +
        workout.exercises.reduce((sets, exercise) => {
          return sets + exercise.sets.filter((set) => set.completed).length;
        }, 0)
      );
    }, 0);
  };

  const calculateProgress = (workouts, plan) => {
    if (!workouts?.length || !plan) return 0;

    const totalSets = plan.weeks.reduce((weekTotal, week) => {
      return (
        weekTotal +
        week.days.reduce((dayTotal, day) => {
          return (
            dayTotal +
            day.exercises.reduce((exerciseTotal, exercise) => {
              return exerciseTotal + (exercise.sets || 1);
            }, 0)
          );
        }, 0)
      );
    }, 0);

    const completedSets = workouts.reduce((total, workout) => {
      return (
        total +
        workout.exercises.reduce((exerciseTotal, exercise) => {
          return (
            exerciseTotal + exercise.sets.filter((set) => set.completed).length
          );
        }, 0)
      );
    }, 0);

    return Math.round((completedSets / totalSets) * 100);
  };

  return (
    <Container
      component={m.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      maxWidth={false}
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        pt: "8px",
        pb: "64px",
        [theme.breakpoints.up("lg")]: {
          px: "40px",
        },
        p: {
          xs: 0,
          sm: 0,
          md: 0,
          lg: 0,
          xl: 0,
        },
        borderTop: { lg: `solid 1px rgba(145 158 171 / 0.12)}` },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box
          sx={{
            gap: 3,
            display: "flex",
            minWidth: { lg: 0 },
            py: { lg: 3, xl: 5 },
            flexDirection: "column",
            flex: { lg: "1 1 auto" },
            px: { xs: 2, sm: 3, xl: 5 },
          }}
        >
          <Stack
            direction="row"
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr 1fr"
            spacing={2}
          >
            {[
              {
                title: "Sets Completed",
                value: loading ? (
                  <LoadingDots circle />
                ) : (
                  calculateTotalSets(userProgress?.workouts) || 0
                ),
                icon: "solar:dumbbells-bold-duotone",
                color: theme.palette.warning.main,
              },
              {
                title: "Workouts Completed",
                value: loading ? (
                  <LoadingDots circle />
                ) : (
                  userProgress?.workouts?.filter((w) => w.completed).length || 0
                ),
                icon: "solar:clipboard-check-bold-duotone",
                color: theme.palette.success.main,
              },
              {
                title: "Current Streak",
                value: loading ? (
                  <LoadingDots circle />
                ) : (
                  `${calculateStreak(userProgress?.workouts) || 0} days`
                ),
                icon: "solar:fire-bold-duotone",
                color: theme.palette.error.main,
              },
              {
                title: "Program Progress",
                value: loading ? (
                  <LoadingDots circle />
                ) : (
                  `${calculateProgress(userProgress?.workouts, plan)}%`
                ),
                icon: "solar:graph-up-bold-duotone",
                color: theme.palette.secondary.main,
              },
            ].map((card, index) => (
              <m.div
                key={card.title}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 180,
                }}
              >
                <AnalyticCard
                  title={card.title}
                  value={card.value}
                  iconComponent={
                    <Icon
                      icon={card.icon}
                      style={{
                        fontSize: 40,
                        color: card.color,
                        filter: `drop-shadow(0 4px 12px ${alpha(
                          card.color,
                          0.3
                        )})`,
                      }}
                    />
                  }
                  color={`linear-gradient(135deg, ${card.color} 0%, ${alpha(
                    card.color,
                    0.8
                  )} 100%)`}
                  gradientColor={card.color}
                />
              </m.div>
            ))}
          </Stack>
          <Card
            component={m.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Box sx={{ padding: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6">
                  {currentDate.toDateString()}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
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

            <StyledCalendar>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={calendarRef}
                headerToolbar={false}
                initialView="dayGridMonth"
                weekends
                editable
                droppable
                selectable
                events={events}
                eventContent={(arg) => (
                  <CalendarEventContent
                    arg={arg}
                    coolColors={coolColors}
                    userProgress={userProgress}
                  />
                )}
                eventClick={(info) => {
                  setSelectedEvent(info.event);
                  setDialogOpen(true);

                  if (!exerciseTracking[info.event.id]) {
                    setExerciseTracking((prev) => ({
                      ...prev,
                      [info.event.id]: {},
                    }));
                  }
                }}
              />
            </StyledCalendar>
          </Card>

          {/* Drawer that shows the selected event's exercises/sets */}
          <WorkoutDrawer
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            selectedEvent={selectedEvent}
            exerciseTracking={exerciseTracking}
            setExerciseTracking={setExerciseTracking}
            loadingSetId={loadingSetId}
            handleSetUpdate={handleSetUpdate}
            handleMarkComplete={handleMarkComplete}
            completeLoading={completeLoading}
          />
        </Box>

        <Drawer events={events} />
      </Box>
    </Container>
  );
};

export default Dashboard;
