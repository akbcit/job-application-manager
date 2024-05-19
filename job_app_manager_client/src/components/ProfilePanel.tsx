import { Paper, Stack } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import { useAuth } from "../globalStates/authState";

export const ProfilePanel = () => {
    const { user } = useAuth();

    return (
        <Paper elevation={3} sx={{ backgroundColor: 'black', color: 'white', padding: 2 }}>
            <Stack direction="row" spacing={2}>
                <Avatar>
                    <img src = {user?.pictureUrl} />
                </Avatar>
            </Stack>
        </Paper>
    )
}

