import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Tooltip, Avatar } from "@mui/material";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const settings = ["Профіль", "Вийти"];

const Navbar = ({ isDark, setIsDark }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { isAuth, logout, user } = useAuth();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutButtonHandler = () => {
        logout();
        handleCloseUserMenu();
    };

    const changeThemeHandle = () => {
        setIsDark(!isDark);
    };

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LibraryBooksIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Bookland
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography sx={{ textAlign: "center" }}>
                                    Книги
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography sx={{ textAlign: "center" }}>
                                    Автори
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <LibraryBooksIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Bookland
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Link to="/books">
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Книги
                            </Button>
                        </Link>
                        <Link to="/authors">
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Автори
                            </Button>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 0, mx: 5 }}>
                        <IconButton
                            onClick={changeThemeHandle}
                            sx={{ color: "white" }}
                        >
                            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {isAuth ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={user.image ? user.image : ""} 
                                        />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ color: "white" }}
                                    >
                                        Увійти
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ color: "white" }}
                                    >
                                        Зареєструватися
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: "center" }}>
                                    Профіль
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={logoutButtonHandler}>
                                <Typography sx={{ textAlign: "center" }}>
                                    Вийти
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
