import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CampaignIcon from "@mui/icons-material/Campaign";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState } from "react";

type Props = {
  setView: (view: "quizzes" | "announcements" | null) => void;
  currentView: "quizzes" | "announcements" | null;
};

const Sidebar = ({ setView, currentView }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);

  const handleToggle = () => setOpen(!open);

  const items = [
    { label: "All", value: null, icon: <HomeIcon /> },
    { label: "Announcements", value: "announcements", icon: <CampaignIcon /> },
    { label: "Quizzes", value: "quizzes", icon: <QuizIcon /> },
  ];

  return (
    <>
      {/* ☰ Toggle button on mobile */}
      {isMobile && (
        <IconButton
          onClick={handleToggle}
          sx={{
            position: "fixed",
            top: 80,
            left: 8,
            zIndex: 1300,
            bgcolor: theme.palette.background.paper,
            boxShadow: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* 🧭 Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: 220,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 220,
            boxSizing: "border-box",
            bgcolor: theme.palette.primary.main,
            color: "#fff",
            pt: 8,
          },
        }}
      >
        <List disablePadding>
          {items.map(({ label, value, icon }) => (
            <Tooltip title={label} placement="right" key={label}>
              <ListItemButton
                selected={currentView === value}
                onClick={() => {
                  setView(value);
                  if (isMobile) setOpen(false); // auto-close on mobile
                }}
                sx={{
                  color: "#fff",
                  "&.Mui-selected": {
                    bgcolor: theme.palette.primary.dark,
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                <Box sx={{ mr: 1 }}>{icon}</Box>
                <ListItemText primary={label} />
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mt: "auto" }} />
      </Drawer>
    </>
  );
};

export default Sidebar;
