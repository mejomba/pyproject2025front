import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" color="primary" elevation={1}>
            <Toolbar>
                <Typography variant="h6" component="div">
                    Header
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
