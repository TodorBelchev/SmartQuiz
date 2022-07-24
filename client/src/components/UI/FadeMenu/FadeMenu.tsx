import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import IFadeMenuItem from '../../../interfaces/IFadeMenuItem';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

interface Props {
    items: IFadeMenuItem[];
    title: string;
}

const FadeMenu: React.FC<Props> = ({ items, title }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: '75px', textAlign: 'center' }}>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: '#fff' }}
            >
                {title}
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {items.map(i => (
                    <MenuItem key={i.to} onClick={handleClose}>
                        {i.onClick === undefined && <Link to={i.to}>{i.text}</Link>}
                        {i.onClick !== undefined && <Link to={i.to} onClick={i.onClick}>{i.text}</Link>}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default FadeMenu;