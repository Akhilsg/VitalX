import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { m, useSpring } from "framer-motion";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { textGradient } from "../theme/mixins";

function Home() {
  const theme = useTheme();

  const containerRef = useRef(null);

  const navigate = useNavigate();

  const mouseX = useSpring(0, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 30 });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    mouseX.set(clientX - window.innerWidth / 2);
    mouseY.set(clientY - window.innerHeight / 2);
  };

  const features = [
    {
      icon: "fluent:brain-circuit-20-filled",
      title: "AI-Powered Workouts",
      description: "Personalized routines that evolve with your performance",
      color: theme.palette.primary.main,
      bgGradient: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.darker}50 100%)`,
    },
    {
      icon: "mdi:chart-timeline-variant",
      title: "Smart Analytics",
      description: "Real-time insights and progress visualization",
      color: theme.palette.secondary.main,
      bgGradient: `linear-gradient(135deg, ${theme.palette.secondary.main}15 0%, ${theme.palette.secondary.darker}50 100%)`,
    },
    {
      icon: "mdi:food",
      title: "AI-Powered Nutrition",
      description: "Get tailored meal plans to complement your fitness goals",
      color: theme.palette.info.main,
      bgGradient: `linear-gradient(135deg, ${theme.palette.info.main}15 0%, ${theme.palette.info.darker}50 100%)`,
    },
  ];

  const backgroundElements = Array.from({ length: 20 }, (_, i) => ({
    size: Math.random() * 40 + 10,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      sx={{
        overflow: "hidden",
        minHeight: "100vh",
        position: "relative",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${theme.palette.background.paper}22 1px, transparent 1px),
        linear-gradient(90deg, ${theme.palette.background.paper}22 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.1,
        }}
        component={m.div}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {backgroundElements.map((el, i) => (
        <Box
          key={i}
          component={m.div}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
          }}
          sx={{
            position: "absolute",
            width: el.size,
            height: el.size,
            left: el.left,
            top: el.top,
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
            filter: "blur(4px)",
            zIndex: 0,
          }}
        />
      ))}
      {/* Animated background elements */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Box
          key={`particle-${i}`}
          component={m.div}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          sx={{
            position: "absolute",
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background:
              i % 2 ? theme.palette.primary.main : theme.palette.secondary.main,
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Main content with enhanced animations */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          component={m.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          sx={{
            minHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            component={m.div}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
          >
            <Typography
              component="h1"
              textAlign="center"
              sx={{
                ...theme.typography.h2,
                my: 3,
                [theme.breakpoints.up("lg")]: {
                  fontSize: 72,
                  lineHeight: "90px",
                },
              }}
            >
              <Box
                sx={{
                  ...textGradient(
                    `180deg, rgba(145 158 171 / 0.4) 40%, ${theme.palette.action.disabled} 70%, ${theme.palette.text.secondary} 100%`
                  ),
                }}
              >
                Boost your fitness
              </Box>
              journey with&nbsp;
              <Box
                component={m.span}
                animate={{ backgroundPosition: "200% center" }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                sx={{
                  ...textGradient(
                    `45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 75%, ${theme.palette.primary.main} 100%`
                  ),
                  textAlign: "center",
                  backgroundSize: "400%",
                  filter: "drop-shadow(0 0 30px rgba(12, 104, 233, 0.3))",
                }}
              >
                VitalX
              </Box>
            </Typography>

            <Box
              component={m.div}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  maxWidth: "800px",
                  mx: "auto",
                  mb: 6,
                }}
              >
                Transform your fitness journey with next-gen AI technology
              </Typography>
            </Box>

            <Box
              component={m.div}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                "& button": {
                  backdropFilter: "blur(10px)",
                },
              }}
            >
              {/* Buttons with hover animations */}
              <Box
                component={m.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/workout")}
                  startIcon={<Icon icon="mdi:rocket-launch" />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: "1.2rem",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 0 20px ${theme.palette.primary.main}33`,
                    "&:hover": {
                      boxShadow: `0 0 40px ${theme.palette.primary.main}33`,
                    },
                  }}
                >
                  Start Your Journey
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ py: 15 }}>
          <Box
            component={m.div}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 10 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 75%, ${theme.palette.primary.main} 100%)`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                animation: "gradient 10s linear infinite",
                "@keyframes gradient": {
                  "0%": {
                    backgroundPosition: "0% center",
                  },
                  "100%": {
                    backgroundPosition: "200% center",
                  },
                },
              }}
            >
              Our Features
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: "600px", mx: "auto" }}
            >
              Discover the powerful tools that make VitalX the ultimate fitness
              companion
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  component={m.div}
                  initial={{
                    x: index % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    margin: "-100px",
                  }}
                  transition={{
                    type: "spring",
                    delay: index * 0.2,
                    duration: 0.8,
                    bounce: 0.4,
                  }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      background: feature.bgGradient,
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${feature.color}22`,
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        "& .card-glow": {
                          opacity: 0.8,
                        },
                        "& .feature-icon": {
                          transform: "scale(1.1) rotate(10deg)",
                        },
                      },
                    }}
                  >
                    {/* Animated glow effect */}
                    <Box
                      className="card-glow"
                      sx={{
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        width: "200%",
                        height: "200%",
                        background: `radial-gradient(circle, ${feature.color}30 0%, transparent 70%)`,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                      }}
                    />

                    <CardContent sx={{ p: 4, position: "relative" }}>
                      <Box
                        component={m.div}
                        className="feature-icon"
                        whileHover={{
                          rotate: [0, -10, 10, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                        sx={{
                          display: "inline-flex",
                          p: 2,
                          borderRadius: "16px",
                          background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                          backdropFilter: "blur(5px)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <Icon
                          icon={feature.icon}
                          width="48"
                          height="48"
                          style={{ color: feature.color }}
                        />
                      </Box>

                      <Box
                        component={m.div}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            mt: 3,
                            mb: 1,
                            fontWeight: "bold",
                            background: `linear-gradient(45deg, ${feature.color}, ${theme.palette.text.primary})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {feature.title}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: "text.secondary",
                            opacity: 0.9,
                            lineHeight: 1.8,
                          }}
                        >
                          {feature.description}
                        </Typography>

                        <Box
                          component={m.div}
                          whileHover={{ x: 5 }}
                          sx={{
                            mt: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: feature.color,
                            cursor: "pointer",
                          }}
                        >
                          <Typography variant="subtitle2" fontWeight="bold">
                            Learn More
                          </Typography>
                          <Icon icon="mdi:arrow-right" />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* How It Works Section */}
        <Box
          sx={{
            py: 20,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "2px",
              height: "100%",
              background: `linear-gradient(to bottom, transparent, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, transparent)`,
              opacity: 0.2,
              filter: "blur(1px)",
            },
          }}
        >
          {/* Floating Background Elements */}
          {Array.from({ length: 20 }).map((_, i) => (
            <Box
              key={`float-${i}`}
              component={m.div}
              animate={{
                y: [0, -50, 0],
                x: [0, 30, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              sx={{
                position: "absolute",
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${theme.palette.primary.main}05 0%, ${theme.palette.secondary.main}05 100%)`,
                filter: "blur(50px)",
                zIndex: 0,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* Enhanced Section Title */}
          <Box
            component={m.div}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            sx={{
              textAlign: "center",
              mb: 15,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box
              component={m.div}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              sx={{
                position: "absolute",
                inset: -100,
                background: `radial-gradient(circle at 50% 50%, ${theme.palette.primary.main}15, transparent 70%)`,
                filter: "blur(40px)",
              }}
            />

            <Typography
              variant="overline"
              component={m.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              sx={{
                color: theme.palette.action.disabled,
                letterSpacing: 4,
                mb: 2,
              }}
            >
              EXPERIENCE THE FUTURE
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient 3s linear infinite",
              }}
            >
              Your Journey to Success
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 600, mx: "auto" }}
            >
              Transform your fitness journey with our cutting-edge AI technology
            </Typography>
          </Box>

          {/* Journey Steps with Enhanced Animations */}
          {[
            {
              step: "01",
              title: "Create Your Profile",
              description:
                "Set your fitness goals, preferences, and current fitness level. Our AI analyzes your inputs to create your perfect fitness journey.",
              icon: "mdi:account-plus",
              color: theme.palette.primary.main,
              bgPattern: "circuit-board",
            },
            {
              step: "02",
              title: "Get Your Smart Plan",
              description:
                "Receive an AI-generated workout plan tailored specifically to your goals, schedule, and available equipment.",
              icon: "mdi:brain",
              color: theme.palette.secondary.main,
              bgPattern: "plus",
            },
            {
              step: "03",
              title: "Track & Evolve",
              description:
                "Monitor your progress in real-time. Our AI continuously adapts your plan based on your performance and feedback.",
              icon: "mdi:rocket-launch",
              color: theme.palette.info.main,
              bgPattern: "diagonal-lines",
            },
          ].map((item, index) => (
            <Box
              key={index}
              component={m.div}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 1,
                delay: index * 0.2,
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                mb: 12,
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Enhanced Feature Card */}
              <Box
                component={m.div}
                whileHover={{
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 5 : -5,
                }}
                sx={{
                  width: 450,
                  height: 300,
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${item.color}22 0%, ${item.color}11 100%)`,
                  border: `1px solid ${item.color}33`,
                  boxShadow: `0 0 40px ${item.color}15`,
                }}
              >
                {/* Animated Background Pattern */}
                <Box
                  component={m.div}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: `url(/patterns/${item.bgPattern}.svg)`,
                    backgroundSize: "100px",
                  }}
                />

                {/* Animated Icon */}
                <Box
                  component={m.div}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    icon={item.icon}
                    style={{
                      width: "120px",
                      height: "120px",
                      color: item.color,
                      filter: `drop-shadow(0 0 20px ${item.color}66)`,
                    }}
                  />
                </Box>

                {/* Floating Particles */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <Box
                    key={`particle-${i}`}
                    component={m.div}
                    animate={{
                      y: [0, -100],
                      x: [0, Math.random() * 30 - 15],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    sx={{
                      position: "absolute",
                      width: Math.random() * 4 + 2,
                      height: Math.random() * 4 + 2,
                      background: item.color,
                      borderRadius: "50%",
                      left: `${Math.random() * 100}%`,
                      bottom: -10,
                    }}
                  />
                ))}
              </Box>

              {/* Enhanced Content */}
              <Box sx={{ flex: 1 }}>
                <Box
                  component={m.div}
                  whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: "5rem",
                      fontWeight: 900,
                      background: `linear-gradient(45deg, ${item.color}, ${theme.palette.background.paper})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: `drop-shadow(0 0 20px ${item.color}33)`,
                    }}
                  >
                    {item.step}
                  </Typography>
                  <Box
                    sx={{
                      width: 60,
                      height: 2,
                      background: `linear-gradient(to right, ${item.color}, transparent)`,
                    }}
                  />
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    background: `linear-gradient(45deg, ${item.color}, ${theme.palette.text.primary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: "1.2rem",
                    lineHeight: 1.8,
                    maxWidth: "90%",
                  }}
                >
                  {item.description}
                </Typography>

                <Box
                  component={m.div}
                  whileHover={{ x: 10 }}
                  sx={{
                    mt: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: item.color,
                    cursor: "pointer",
                    "&:hover": {
                      "& .arrow-icon": {
                        transform: "translateX(5px)",
                      },
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Learn More
                  </Typography>
                  <Icon
                    icon="mdi:arrow-right"
                    className="arrow-icon"
                    style={{
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
