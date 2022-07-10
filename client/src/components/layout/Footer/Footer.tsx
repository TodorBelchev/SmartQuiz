import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { theme } from "../../../utils/theme";

const Footer: React.FC = () => {
    return (
        <Box sx={{ background: theme.palette.primary.main, padding: '1rem', marginTop: '20px' }}>
            <Container>
                <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>SmartQuiz education system 2022 &copy;</Typography>
            </Container>
        </Box>
    )
}

export default Footer;