'use client';

import { useState, useEffect } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter, usePathname } from "next/navigation";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// clipped AppBar (full width always)
const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

// mini variant drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme)
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme)
      })
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const onClickToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
  // Wait for the transition to finish before triggering the resize
  const timeoutId = setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 300); // 300ms covers the standard MUI transition duration

  return () => clearTimeout(timeoutId);
}, [open]);


  // Navigation items
  const mainMenuItems = [
    { text: "Dashboard", icon: <InboxIcon />, path: "/dashboard" },
    { text: "Analytics", icon: <MailIcon />, path: "/dashboard/analytics" },
    { text: "Orders", icon: <InboxIcon />, path: "/dashboard/orders" },
    { text: "Customers", icon: <MailIcon />, path: "/dashboard/customers" },
    { text: "Products", icon: <InboxIcon />, path: "/dashboard/products" },
  ];

  const secondaryMenuItems = [
    { text: "Settings", icon: <InboxIcon />, path: "/dashboard/settings" },
    { text: "Help", icon: <MailIcon />, path: "/dashboard/help" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ color: "white" }}>
        <Toolbar>
          <IconButton
            onClick={onClickToggle}
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader />

        <Divider />

        <List>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: pathname === item.path ? 
                    theme.palette.action.selected : 'transparent'
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center"
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText 
                  primary={item.text} 
                  sx={{ opacity: open ? 1 : 0 }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {secondaryMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: pathname === item.path ? 
                    theme.palette.action.selected : 'transparent'
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center"
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          overflowX: "hidden",
          width: '100%'
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}