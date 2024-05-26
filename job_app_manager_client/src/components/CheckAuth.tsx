import { Paper } from "@mui/material";
import { useAuth } from "../globalStates/authState.tsx";
import { ErrorAlert } from "./ErrorAlert.tsx";
import LinearProgress from '@mui/material/LinearProgress';
import { useLocation } from "react-router-dom";

interface CheckAuthProps {
  children: React.ReactNode;
}

export const CheckAuth: React.FC<CheckAuthProps> = ({ children }) => {
  const { isAuthenticated, user, authLoading } = useAuth();
  const location = useLocation();

  console.log(location.pathname);

  if (authLoading) {
    return (
      <LinearProgress color="success" />
    )
  }

  if (!isAuthenticated || !user) {
    return <Paper>
      <ErrorAlert message="Resource does not exist" />
    </Paper>;
  }

  return children

};
