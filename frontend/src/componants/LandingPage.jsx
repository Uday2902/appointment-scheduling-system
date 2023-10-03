import { Box, Container, Stack, Typography } from "@mui/material";
import themeTypography from "../utils/typography";
import { useSelector } from "react-redux";
import LaunchButton from "./LaunchButton"
import { useNavigate } from "react-router-dom"

function LandingPage() {

  const navigate = useNavigate()
  
  let isPatient = false;

  // const isAuth = useSelector((state) => {
  //   return state.users.isAuthenticated;
  // });

  // const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* {!isLoading ? (
        <Loading />
      ) : ( */}
        <Box>
          {(localStorage.getItem('unity-jwt-patient') ? isPatient=true : isPatient=false)}
          <Container sx={{ height: "100vh", background: "#f8f5fc" }}>
            <Stack sx={{ height: "inherit" }} justifyContent="center">
              <Typography
                sx={{ ...themeTypography.h2, letterSpacing: "0.02em", mb: 1, color: "#471e75" }}
              >
                Step into a Healthier Tomorrow with
              </Typography>
              <Typography
                sx={{ ...themeTypography.h1, letterSpacing: "0.02em", mb: 1, color: "#471e75" }}
              >
                UNITY HOSPITAL
              </Typography>
              <Typography
                sx={{ ...themeTypography.h3, letterSpacing: "0.05em", mb: 5, fontSize: "24px", color: "#471e75" }}
              >
                Putting Your Health First, Always
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
              >
              {isPatient? 
              <div 
              onClick = {() => { 
                  navigate('/bookAppointment')
                }}> <LaunchButton value={"Book an Appointment"} /> </div>: null}
              
              </Stack>
            </Stack>
          </Container>
        </Box>
      {/* )} */}
    </>
  );
}

export default LandingPage;
