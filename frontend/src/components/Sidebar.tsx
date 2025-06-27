import { Box, List, ListItemButton, ListItemText } from "@mui/material";

type Props = {
  setView: (view: "quizzes" | "announcements" | null) => void;
  currentView: "quizzes" | "announcements" | null;
};

const Sidebar = ({ setView, currentView }: Props) => {
  return (
    <Box
      sx={{
        width: 200,
        height: "100vh",
        bgcolor: "primary.main",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        pt: 8,
        zIndex: -1,
      }}
    >
      <List>
        <ListItemButton
          onClick={() => setView(null)}
          selected={currentView === null}
          sx={{
            color: "white",
            "&:hover": {
              color: "#fff",
              bgcolor: "primary.dark",
            },
          }}
        >
          <ListItemText primary="All" />
        </ListItemButton>

        <ListItemButton
          onClick={() => setView("announcements")}
          selected={currentView === "announcements"}
          sx={{
            color: "white",
            "&:hover": {
              color: "#fff",
              bgcolor: "primary.dark",
            },
          }}
        >
          <ListItemText primary="Announcements" />
        </ListItemButton>

        <ListItemButton
          onClick={() => setView("quizzes")}
          selected={currentView === "quizzes"}
          sx={{
            color: "white",
            "&:hover": {
              color: "#fff",
              bgcolor: "primary.dark",
            },
          }}
        >
          <ListItemText primary="Quizzes" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
