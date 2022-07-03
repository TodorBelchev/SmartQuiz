import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#fb8c00',
            contrastText: '#fafafa',
        },
        secondary: {
            main: '#f50057',
        },
    },
};

export const theme = createTheme(themeOptions);