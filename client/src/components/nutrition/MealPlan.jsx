// MealCard.jsx
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  keyframes,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  m,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

// Enhanced keyframes animations
const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(66, 133, 244, 0.3);
  }
`;

// Styled MealCard Component with enhanced 3D effects
export const MealCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, 
        ${alpha(theme.palette.background.paper, 0.95)},
        ${alpha(theme.palette.background.paper, 0.85)})`
      : `linear-gradient(135deg, 
        ${alpha(theme.palette.background.paper, 0.95)},
        ${alpha(theme.palette.background.paper, 0.85)})`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  borderRadius: theme.spacing(2),
  boxShadow: `0 10px 40px -10px ${alpha(theme.palette.common.black, 0.2)}`,
  animation: `${fadeIn} 0.6s ease-out`,
  perspective: "1000px",
  transformStyle: "preserve-3d",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.light,
      0.2
    )}, ${alpha(theme.palette.primary.main, 0.1)})`,
    filter: "blur(8px)",
    zIndex: 0,
  },
  "&:hover": {
    transform: "translateY(-15px) rotateX(5deg)",
    boxShadow: `
      0 20px 60px -15px ${alpha(theme.palette.common.black, 0.3)},
      0 0 20px ${alpha(theme.palette.primary.main, 0.2)}
    `,
    "& .meal-card-glow": {
      opacity: 1,
    },
  },
}));

// Enhanced ingredient item with interactive effects
export const IngredientItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 1),
  margin: theme.spacing(0.5, 0),
  borderRadius: theme.spacing(1),
  transition: "all 0.4s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "-100%",
    top: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, ${alpha(
      theme.palette.primary.main,
      0.1
    )}, transparent)`,
    transition: "all 0.6s ease",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: "translateX(8px) scale(1.02)",
    "&::before": {
      left: "100%",
    },
  },
}));

// Enhanced nutrition chips with pulse animation
// export const NutritionChip = styled(Chip)(({ theme, color }) => ({
//   margin: theme.spacing(0.5),
//   fontWeight: 700,
//   padding: theme.spacing(1.5),
//   borderRadius: theme.spacing(2),
//   background: `linear-gradient(45deg,
//     ${theme.palette[color || "primary"].main},
//     ${
//       theme.palette[color || "primary"][
//         theme.palette.mode === "dark" ? "light" : "dark"
//       ]
//     })`,
//   color: theme.palette.common.white,
//   transition: "all 0.3s ease",
//   animation: `${pulse} 3s infinite`,
//   animationDelay: "calc(var(--delay, 0) * 0.5s)",
// }));

// A functional component wrapper to display a meal's details with enhanced animations
export const MealCardWrapper = ({ meal, theme }) => {
  const muiTheme = useMuiTheme();
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // For 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / 5);
    y.set((e.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  return (
    <MealCard
      ref={cardRef}
      component={m.div}
      style={{
        rotateX: isInView ? rotateX : 0,
        rotateY: isInView ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Decorative elements */}

      {/* Glow effect on hover */}
      <Box
        className="meal-card-glow"
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: 2,
          background: `radial-gradient(circle at 50% 50%, ${alpha(
            muiTheme.palette.primary.main,
            0.15
          )}, transparent 70%)`,
          opacity: 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <CardContent sx={{ position: "relative", zIndex: 1, flexGrow: 1, p: 3 }}>
        <Box
          component={m.div}
          variants={titleVariants}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            fontWeight="700"
            sx={{
              background: `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {meal.name}
          </Typography>
          <Chip
            component={m.div}
            variants={chipVariants}
            label={meal.type}
            color="primary"
            size="small"
            icon={
              <Icon
                icon={
                  meal.type === "Breakfast"
                    ? "mdi:coffee"
                    : meal.type === "Lunch"
                    ? "mdi:food"
                    : meal.type === "Dinner"
                    ? "mdi:food-turkey"
                    : "mdi:food-apple"
                }
              />
            }
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Box
            component={m.div}
            variants={itemVariants}
            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
          >
            <Chip
              label={`${meal.nutritionalInfo.calories} cal`}
              variant="soft"
              color="error"
              icon={<Icon icon="mdi:fire" />}
              style={{ "--delay": 0 }}
            />
            <Chip
              label={`${meal.nutritionalInfo.protein}g protein`}
              variant="soft"
              color="primary"
              icon={<Icon icon="mdi:arm-flex" />}
              style={{ "--delay": 1 }}
            />
            <Chip
              label={`${meal.nutritionalInfo.carbs}g carbs`}
              color="warning"
              variant="soft"
              icon={<Icon icon="mdi:bread-slice" />}
              style={{ "--delay": 2 }}
            />
            <Chip
              label={`${meal.nutritionalInfo.fat}g fat`}
              color="info"
              variant="soft"
              icon={<Icon icon="mdi:oil" />}
              style={{ "--delay": 3 }}
            />
          </Box>
        </Box>

        <Box component={m.div} variants={itemVariants}>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            color="text.primary"
            sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Icon icon="mdi:food-variant" />
            Ingredients
          </Typography>

          <List disablePadding sx={{ mb: 2 }}>
            <AnimatePresence>
              {meal.ingredients
                .slice(0, isExpanded ? meal.ingredients.length : 3)
                .map((ingredient) => (
                  <m.div
                    key={ingredient._id || ingredient.name} // Ensure key is a string
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IngredientItem>
                      <ListItemText
                        primary={`${ingredient.name} (${ingredient.amount})`}
                        secondary={
                          ingredient.purchaseLink ? (
                            <a
                              href={ingredient.purchaseLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Buy
                            </a>
                          ) : null
                        }
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontWeight: 500,
                            color: "text.primary",
                          },
                        }}
                      />
                    </IngredientItem>
                  </m.div>
                ))}
            </AnimatePresence>
          </List>

          {meal.ingredients.length > 3 && (
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                color: "primary.main",
              }}
            >
              <Icon icon="mdi:chevron-down" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </MealCard>
  );
};

export default MealCardWrapper;
