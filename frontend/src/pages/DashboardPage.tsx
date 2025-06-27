import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import {
  useGetQuizzesQuery,
  useGetAnnouncementsQuery,
} from "../services/apiSlice";

type Props = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const DashboardPage = ({ mode, setMode }: Props) => {
  const [view, setView] = useState<"announcements" | "quizzes" | null>(null); // null = show all

  const {
    data: quizzes = [],
    isLoading: quizzesLoading,
    isError: quizzesError,
  } = useGetQuizzesQuery();

  const {
    data: announcements = [],
    isLoading: announcementsLoading,
    isError: announcementsError,
  } = useGetAnnouncementsQuery();

  if (quizzesLoading || announcementsLoading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (quizzesError || announcementsError) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error">
          Failed to load dashboard data.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar mode={mode} setMode={setMode} />
      <Box display="flex">
        <Sidebar setView={setView} currentView={view} />
        <Container sx={{ mt: 4, mb: 4, ml: { xs: 0, md: "220px" } }}>
          {(view === "announcements" || view === null) && (
            <>
              <Typography variant="h4" gutterBottom>
                📢 Announcements
              </Typography>
              <Grid container spacing={2} sx={{ mb: 5 }}>
                {announcements.map((a: any) => (
                  <Grid item xs={12} md={6} key={a._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{a.teacherName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(a.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {a.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {(view === "quizzes" || view === null) && (
            <>
              <Typography variant="h4" gutterBottom>
                🧠 Quizzes
              </Typography>
              <Grid container spacing={2}>
                {quizzes.map((q: any) => (
                  <Grid item xs={12} md={6} key={q._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{q.title}</Typography>
                        <Typography color="textSecondary">
                          {q.courseName} | {q.topic}
                        </Typography>
                        <Typography>
                          Due: {new Date(q.dueDate).toLocaleDateString()}
                        </Typography>
                        <a
                          href={q.quizLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: "none", color: "#1976d2" }}
                        >
                          View Quiz →
                        </a>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default DashboardPage;
