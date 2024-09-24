import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import PortraitIcon from '@mui/icons-material/Portrait';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import { useCurrentUser } from '../../users/providers/UserProvider';

export default function Footer() {
    const { user } = useCurrentUser();
    const navigate = useNavigate();
    return (
        <>
            <Paper
                elevation={3}
                sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
            >
                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction label="About"
                        icon={<InfoIcon />} onClick={() => navigate(ROUTES.ABOUT)} />
                    {user ? <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />}
                        onClick={() => navigate(ROUTES.FAV_CARDS)} /> : null}

                    {user && user.isBusiness ? <BottomNavigationAction label="My Cards" icon={<PortraitIcon />}
                        onClick={() => navigate(ROUTES.MY_CARDS)} /> : null}

                </BottomNavigation>
            </Paper>
        </>
    )
}




