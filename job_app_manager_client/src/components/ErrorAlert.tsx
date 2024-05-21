import Alert from "@mui/material/Alert";

interface ErrorAlertProps {
  message: string;
}


export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return <Alert severity="warning">{message}</Alert>;
};
