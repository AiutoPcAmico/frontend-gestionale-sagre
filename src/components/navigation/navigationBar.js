import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

import logo_parrocchia from "../../images/logo_parrocchia.png";
import { useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";

const pages = [
  "Cucina",
  "Piastra",
  "Griglia",
  "Pizzeria",
  "Bar",
  "Bancone",
  "Cassa",
];

function NavigationBar() {
  const [settings, setSettings] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((state) => state.sessionInfo.user);

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

  useEffect(() => {
    if (user.username) setSettings(["Profilo", "Logout"]);
    else setSettings(["Login"]);
  }, [user]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "cursive",
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              alt="logo Parrocchia"
              src={logo_parrocchia}
              style={{ height: "50px" }}
            ></img>
            <span style={{ marginLeft: "10px" }}>
              Oratorio<br></br> di Cividate
            </span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "cursive",
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              alt="logo Parrocchia"
              src={logo_parrocchia}
              style={{ height: "50px" }}
            ></img>
            <span style={{ marginLeft: "10px" }}>
              Oratorio<br></br> di Cividate
            </span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Typography textAlign="center" sx={{ marginRight: "10px" }}>
            {user.username}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user.username && (
                  <Avatar
                    alt="LoggedUser"
                    sx={{ bgcolor: deepOrange[500] }}
                    src=""
                  >
                    {user.username.charAt(0)}
                  </Avatar>
                )}
                {!user.username && (
                  <Avatar alt="Not logged user" src=""></Avatar>
                )}
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export { NavigationBar };
