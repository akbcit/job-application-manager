import { Paper, Stack } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import { useAuth } from "../globalStates/authState";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../network/serverAPICalls/profile.getProfile";
import { ErrorAlert } from "./ErrorAltert";

export const ProfilePanel = () => {

    const { user } = useAuth();

    const profileQuery = useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile(user?.email as string),
    })

    if (profileQuery.error) {
        return (
            <ErrorAlert message="Error fetching user details" />
        )
    }



    return (
        <Paper elevation={3} sx={{ backgroundColor: 'black', color: 'white', padding: 2 }}>
            <Stack direction="row" spacing={2}>
                <Avatar>
                    <img src={user?.pictureUrl} />
                </Avatar>
            </Stack>
        </Paper>
    )
}

