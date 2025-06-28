import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Fade,
  useTheme,
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
  const [view, setView] = useState<"announcements" | "quizzes" | null>(null);
  const theme = useTheme();

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
        {/* Sidebar */}
        <Sidebar setView={setView} currentView={view} />

        {/* Main content */}
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 6,
            ml: { sm: "0px", md: "220px" },
            transition: "all 0.3s ease",
          }}
        >
          {/* Announcements */}
          {(view === "announcements" || view === null) && (
            <Fade in timeout={500}>
              <Box mb={6}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  📢 Announcements
                </Typography>

                <Grid container spacing={3}>
                  {announcements.map((a: any) => (
                    <Grid item xs={12} md={6} key={a._id}>
                      <Card
                        elevation={2}
                        sx={{
                          transition: "transform 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" color="primary">
                            {a.teacherName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(a.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body1" mt={1}>
                            {a.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          )}

          {/* Quizzes */}
          {(view === "quizzes" || view === null) && (
            <Fade in timeout={500}>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  🧠 Quizzes
                </Typography>

                <Grid container spacing={3}>
                  {quizzes.map((q: any) => (
                    <Grid item xs={12} sm={6} md={4} key={q._id}>
                      <Card
                        elevation={2}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transition: "transform 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" color="primary">
                            {q.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={1}
                          >
                            {q.courseName} | {q.topic}
                          </Typography>
                          <Typography variant="body2">
                            Due:{" "}
                            <strong>
                              {new Date(q.dueDate).toLocaleDateString()}
                            </strong>
                          </Typography>
                          <Box mt={2}>
                            <a
                              href={q.quizLink}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: theme.palette.primary.main,
                                textDecoration: "none",
                                fontWeight: 500,
                              }}
                            >
                              View Quiz →
                            </a>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default DashboardPage;
