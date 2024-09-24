import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '../providers/CustomThemeProvider'

export default function PageHeader({ title, subtitle }) {
    const { isDark } = useTheme();
    return (
        <>
            <Box sx={{ p: 2 }}>
                <Typography variant='h2' component="h1" sx={{ pt: 4, color: isDark ? "#fff" : "inherit" }}>{title}</Typography>
                <Typography variant='h5' component="h2" sx={{ color: isDark ? "#c1c1c1" : "inherit" }}>{subtitle}</Typography>
                <Divider sx={{ my: 2 }} />
            </Box>
        </>
    )
}
