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
import { useDispatch, useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { SnackMessage } from "../SnackMessage";
import { destroySession } from "../../stores/sessionInfo";

function NavigationBar() {
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [sessionTerminated, setSessionTerminated] = useState(false);
  const user = useSelector((state) => state.sessionInfo.user);
  const pagesFromDB = useSelector((state) => state.sessionInfo.pages);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const selectedElement = (navigationTo) => {
    if (navigationTo !== "/logout") {
      handleCloseNavMenu();
      handleCloseUserMenu();

      navigate(navigationTo);
    } else {
      dispatch(destroySession());
      setSessionTerminated(true);
      navigate("/");
    }
  };

  useEffect(() => {
    //formatting data for pages
    if (pagesFromDB && pagesFromDB.length > 0) {
      var formattedData = [];
      pagesFromDB.forEach((element) => {
        if (element.navVisibile) {
          formattedData.push({
            name: element.nome,
            key: element.idPagina,
            navigate: element.percorso,
          });
        }
      });
    }

    setPages(formattedData);
  }, [pagesFromDB]);

  useEffect(() => {
    if (user.username) {
      setSettings([
        {
          name: "Profilo",
          navigate: "/",
        },
        {
          name: "Logout",
          navigate: "/logout",
        },
      ]);
    } else {
      setSettings([
        {
          name: "Login",
          navigate: "/login",
        },
      ]);

      setPages([
        {
          name: "Login",
          navigate: "/login",
        },
        {
          name: "Home",
          navigate: "/home",
        },
      ]);
    }
  }, [user, pagesFromDB]);

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
                <MenuItem
                  key={page.name}
                  onClick={() => selectedElement(page.navigate)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
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
                key={page.name}
                onClick={() => selectedElement(page.navigate)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
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
                <MenuItem
                  key={setting.name}
                  onClick={() => selectedElement(setting.navigate)}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <SnackMessage
        duration={6000}
        isOpened={sessionTerminated}
        message={"Logout effettuato con successo!"}
        setIsOpened={() => {
          setSessionTerminated(false);
        }}
        type={"success"}
      />
    </AppBar>
  );
}
export { NavigationBar };
