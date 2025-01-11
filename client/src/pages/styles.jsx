import { styled } from "@mui/material";

export const StyledCalendar = styled("div")(({ theme }) => ({
  width: "calc(100% + 2px)",
  marginLeft: -1,
  marginBottom: -1,

  "& .fc": {
    "--fc-border-color": "rgba(145, 158, 171, 0.16)",
    "--fc-now-indicator-color": "#FF5630",
    "--fc-today-bg-color": "rgba(145, 158, 171, 0.08)",
    "--fc-page-bg-color": "#141A21",
    "--fc-neutral-bg-color": "#28323D",
    "--fc-list-event-hover-bg-color": "rgba(145, 158, 171, 0.08)",
    "--fc-highlight-color": "rgba(145, 158, 171, 0.08)",
  },

  "& .fc .fc-license-message": { display: "none" },
  "& .fc a": { color: "#FFFFFF" },

  "& .fc .fc-col-header ": {
    boxShadow: "inset 0 -1px 0 rgba(145, 158, 171, 0.16)",
    "& th": { borderColor: "transparent" },
    "& .fc-col-header-cell-cushion": { fontWeight: 600, padding: "13px 0" },
  },

  "& .fc .fc-list-empty": {
    fontSize: "1.25rem",
    backgroundColor: "transparent",
    color: "rgba(145, 158, 171, 0.6)",
  },

  "& .fc .fc-event": {
    borderColor: "transparent !important",
    color: "unset !important",
    backgroundColor: "transparent",
  },
  "& .fc .fc-event .fc-event-main": {
    borderRadius: "6px",
    "&::before": {
      top: 0,
      left: 0,
      width: "100%",
      content: "''",
      opacity: 0.4,
      height: "100%",
      borderRadius: 6,
      position: "absolute",
      transition: theme.transitions.create(["opacity"]),
      "&:hover": { "&::before": { opacity: 0.32 } },
    },
  },
  "& .fc .fc-event .fc-event-main-frame": {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: "20px",
  },
  "& .fc .fc-daygrid-event .fc-event-title": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  "& .fc .fc-event .fc-event-time": {
    overflow: "unset",
    fontWeight: 700,
  },

  "& .fc .fc-popover": {
    border: 0,
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.24)",
    borderRadius: 12,
    backgroundColor: "#1C252E",
  },
  "& .fc .fc-popover-header": {
    fontWeight: 600,
    padding: "8px",
    backgroundColor: "rgba(145, 158, 171, 0.08)",
  },
  "& .fc .fc-popover-close": {
    opacity: 0.48,
    transition: "all 0.3s ease",
    "&:hover": { opacity: 1 },
  },
  "& .fc .fc-more-popover .fc-popover-body": { padding: "8px" },
  "& .fc .fc-popover-body": {
    "& .fc-daygrid-event.fc-event-start, & .fc-daygrid-event.fc-event-end": {
      margin: "2px 0",
    },
  },

  "& .fc .fc-day-other .fc-daygrid-day-top": {
    opacity: 1,
    "& .fc-daygrid-day-number": { color: "rgba(145, 158, 171, 0.6)" },
  },
  "& .fc .fc-daygrid-day-number": {
    fontSize: "0.875rem",
    padding: "8px 8px 0",
  },
  "& .fc .fc-daygrid-event": { marginTop: 4 },
  "& .fc .fc-daygrid-event.fc-event-start, & .fc .fc-daygrid-event.fc-event-end":
    {
      marginLeft: 4,
      marginRight: 4,
    },
  "& .fc .fc-daygrid-more-link": {
    fontSize: "0.75rem",
    color: "rgba(145, 158, 171, 0.6)",
    "&:hover": {
      backgroundColor: "unset",
      textDecoration: "underline",
      color: "#FFFFFF",
      fontWeight: 600,
    },
  },

  "& .fc .fc-timegrid-axis-cushion": {
    fontSize: "0.875rem",
    color: "rgba(145, 158, 171, 0.6)",
  },
  "& .fc .fc-timegrid-slot-label-cushion": { fontSize: "0.875rem" },

  "& .fc-direction-ltr .fc-list-day-text, .fc-direction-rtl .fc-list-day-side-text, .fc-direction-ltr .fc-list-day-side-text, .fc-direction-rtl .fc-list-day-text":
    { fontWeight: 600 },
  "& .fc .fc-list-event": {
    fontSize: "0.875rem",
    "& .fc-list-event-time": { color: "rgba(145, 158, 171, 0.6)" },
  },
  "& .fc .fc-list-table": { "& th, td": { borderColor: "transparent" } },
}));
