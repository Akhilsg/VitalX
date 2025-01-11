import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          Welcome to VitalX
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
          Your personalized fitness journey starts here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/workout")}
          sx={{ mt: 4, py: 2, px: 5, borderRadius: 4, fontSize: 18 }}
        >
          Get Started
        </Button>
      </Box>

      <Box sx={{ mt: 10 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
        >
          Why Choose VitalX?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", py: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Tailored Plans
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Get a workout plan customized for your goals and fitness
                  level.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", py: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Track Your Progress
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Monitor your progress with our detailed analytics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", py: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Community Support
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Join a supportive community of fitness enthusiasts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ textAlign: "center", mt: 8, py: 4, backgroundColor: "#f5f5f5" }}
      >
        <Typography variant="body1">
          &copy; 2025 VitalX. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
