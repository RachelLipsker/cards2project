
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../../../providers/CustomThemeProvider';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
    const { isDark } = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const handleChange = ({ target }) => setSearchParams({ q: target.value })
    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchParams.get("q") ?? ""}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{
                width: '200px',
                display: { xs: "none", sm: "inline-flex" },
                backgroundColor: isDark ? "#333333" : "#e3f2fd",
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                        borderColor: '#888',
                    },
                },
            }}
        />
    );
}