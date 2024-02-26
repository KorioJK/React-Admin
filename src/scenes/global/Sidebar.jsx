import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState, Component, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { mockSidebar } from "../../data/mockData";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import Axios from "axios";

function getIconByName(iconName) {
  switch (iconName) {
    case "home":
      return <HomeOutlinedIcon />;
    case "people":
      return <PeopleOutlinedIcon />;
    case "contacts":
      return <ContactsOutlinedIcon />;
    case "receipt":
      return <ReceiptOutlinedIcon />;
    case "person":
      return <PersonOutlinedIcon />;
    case "calendar":
      return <CalendarTodayOutlinedIcon />;
    case "help":
      return <HelpOutlinedIcon />;
    case "barChart":
      return <BarChartOutlinedIcon />;
    case "pieChart":
      return <PieChartOutlinedIcon />;
    case "timeline":
      return <TimelineOutlinedIcon />;
    case "menu":
      return <MenuOutlinedIcon />;
    case "map":
      return <MapOutlinedIcon />;
    case "analytics":
      return <AnalyticsOutlinedIcon />;
    default:
      // Return a default icon or handle the case when the iconName doesn't match any case
      return <AnalyticsOutlinedIcon />;
  }
}
const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  setMenuSelected,
  selectedMenu,
  submenuitems,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <SubMenu
      active={selectedMenu === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setMenuSelected(title)}
      icon={getIconByName(icon)}
      title={title}
    >
      {submenuitems.map((submenuitem, j) => (
        <MenuItem
          key={j}
          active={selected === submenuitem.title}
          style={{ color: colors.grey[100] }}
          onClick={() => setSelected(submenuitem.title)}
          icon={getIconByName(submenuitem.icon)}
        >
          <Typography>
            {submenuitem.title}
            <Link to={submenuitem.to} />
          </Typography>
        </MenuItem>
      ))}
    </SubMenu>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [selectedMenu, setMenuSelected] = useState("Dashboard");
  const [apiData, setData] = useState(mockSidebar);

  useEffect(() => {
    Axios.get("http://localhost:5050/rolerights/18").then((res) => {
      setData(res.data.rolerights);
    });
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-sidebar-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-sidebar-inner:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ITEM */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="https://media.licdn.com/dms/image/C4D03AQHyjcY9bQXvyQ/profile-displayphoto-shrink_800_800/0/1655815488956?e=1714003200&v=beta&t=RSbJzwbC-LxmvcBCw-DVotRyBKXwlQqNXqfrc9_SACg"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  John Korio
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  CPO/CISO
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {apiData.map((menuitem, i) => (
              <Item
                key={i}
                title={menuitem.title}
                icon={menuitem.icon}
                selected={selected}
                setSelected={setSelected}
                setMenuSelected={setMenuSelected}
                selectedMenu={selectedMenu}
                submenuitems={menuitem.children}
              />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
