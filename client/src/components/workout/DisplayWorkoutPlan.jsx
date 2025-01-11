import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useState } from "react";

const DisplayWorkoutPlan = ({ plan }) => {
  const [openVideo, setOpenVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleOpenVideo = (videoId) => {
    setCurrentVideo(videoId);
    setOpenVideo(true);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {plan.weeks.map((week) => (
        <Card
          key={week.weekNumber}
          sx={{ p: 1, mb: 3, backgroundColor: "background.card" }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom color="primary">
              Week {week.weekNumber}
            </Typography>
            {week.days.map((day) => (
              <Box key={day.day} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                  {day.day}
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {day.exercises.map((exercise, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "medium" }}
                        >
                          {exercise.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {exercise.sets} sets × {exercise.reps}
                          {exercise.duration && ` (${exercise.duration})`}
                          <br />
                          Rest: {exercise.rest}
                        </Typography>
                      </Box>
                      {exercise.videoId && (
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenVideo(exercise.videoId)}
                          sx={{ ml: "auto" }}
                        >
                          <PlayCircleIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={openVideo}
        onClose={() => setOpenVideo(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          {currentVideo && (
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src={`https://www.youtube.com/embed/${currentVideo}`}
                title="Exercise Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DisplayWorkoutPlan;
