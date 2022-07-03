import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import classes from './Navigation.module.css';
import { useAppSelector } from "../../../hooks/useRedux";
import FadeMenu from "../../UI/FadeMenu/FadeMenu";

interface Props {
    window?: () => Window;
    children: React.ReactNode;
}

const drawerWidth = 240;

const Navigation: React.FC<Props> = (props: Props) => {
    const { window, children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const user = useAppSelector(state => state.auth);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Link to='/' className={classes.link}>
                <Typography variant="h6" sx={{ my: 2 }}>
                    SmartQuiz
                </Typography>
            </Link>
            <Divider />
            <List sx={{ padding: '0' }}>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to='/' className={classes.link}>
                            <ListItemText primary='Home' />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                {user._id !== null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to='/quizzes/all' className={classes.link}>
                            <ListItemText primary='Quizzes' />
                        </Link>
                    </ListItemButton>
                </ListItem>}
                {user._id !== null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to='/quizzes/add' className={classes.link}>
                            <ListItemText primary='Add quiz' />
                        </Link>
                    </ListItemButton>
                </ListItem>}
                <Divider />
                {user._id !== null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to='/articles/all' className={classes.link}>
                            <ListItemText primary='Articles' />
                        </Link>
                    </ListItemButton>
                </ListItem>}
                {user._id !== null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to='/articles/add' className={classes.link}>
                            <ListItemText primary='Add article' />
                        </Link>
                    </ListItemButton>
                </ListItem>}
                <Divider />
                {user._id !== null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to='/user/all' className={classes.link}>
                            <ListItemText primary='All users' />
                        </Link>
                    </ListItemButton>
                </ListItem>}
                {user._id !== null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to={`/user/${user._id}`} className={classes.link}>
                            <ListItemText primary={user.username} />
                        </Link>
                    </ListItemButton>
                </ListItem>}
                {user._id !== null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to={`/user/${user._id}/logout`} className={classes.link}>
                            <ListItemText primary='Logout' />
                        </Link>
                    </ListItemButton>
                </ListItem>}
                {user._id === null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to='/user/login' className={classes.link}>
                            <ListItemText primary='Sign in' />
                        </Link>
                    </ListItemButton>
                </ListItem>}
                {user._id === null && <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to='/user/register' className={classes.link}>
                            <ListItemText primary='Sign up' />
                        </Link>
                    </ListItemButton>
                </ListItem>}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
            <AppBar component="nav">
                <Box sx={{ margin: '0 auto', maxWidth: '1200px', width: '100%' }}>
                    <Toolbar sx={{ margin: '0 auto' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to='/' className={classes.link}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                SmartQuiz
                            </Typography>
                        </Link>
                        {user._id !== null && <FadeMenu title="Quizzes" items={[{ text: 'All quizzes', to: '/quizzes/all' }, { text: 'Add quiz', to: '/quizzes/add' }]} />}
                        {user._id !== null && <FadeMenu title="Articles" items={[{ text: 'All articles', to: '/articles/all' }, { text: 'Add article', to: '/articles/add' }]} />}
                        {user._id !== null && <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: '75px', textAlign: 'center' }}>
                            <Link to="/user/all">
                                <Button sx={{ color: '#fff' }}>
                                    Users
                                </Button>
                            </Link>
                        </Box>}
                        {user._id !== null && <FadeMenu title="Profile" items={[{ text: `${user.username}`, to: `/user/${user._id}` }, { text: 'Logout', to: `/user/${user._id}/logout` }]} />}
                        {user._id === null && <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: '75px' }}>
                            <Link to="/user/login">
                                <Button sx={{ color: '#fff' }}>
                                    Sign in
                                </Button>
                            </Link>
                        </Box>}
                        {user._id === null && <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: '75px' }}>
                            <Link to="/user/register">
                                <Button sx={{ color: '#fff' }}>
                                    Sign up
                                </Button>
                            </Link>
                        </Box>}
                    </Toolbar>
                </Box>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Container component="main" sx={{ marginTop: '80px' }}>
                {children}
            </Container>
        </Box>
    );
}

export default Navigation;