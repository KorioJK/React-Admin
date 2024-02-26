import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
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
      return null;
  }
}
const CollapsibleItem = ({
  title,
  children,
  icon,
  sidebarCollapsed,
  setMenuSelected,
  selectedMenu,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleClick = () => {
    handleCollapseToggle();
    setMenuSelected(title);
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          m: "5px 0 5px 0",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Align items vertically
        }}
        onClick={handleClick}
      >
        {icon}
        {!sidebarCollapsed && title}
        {!isCollapsed ? (
          <ExpandLessIcon sx={{ ml: 1 }} />
        ) : (
          <KeyboardArrowLeftOutlinedIcon sx={{ ml: 1 }} />
        )}{" "}
      </Typography>

      {isCollapsed && selectedMenu === title && children}
    </>
  );
};
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>
        {title}
        <Link to={to} />
      </Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [selectedMenu, setMenuSelected] = useState("Dashboard");

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
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <CollapsibleItem
              title="Datsa"
              icon={<PeopleOutlinedIcon />}
              sidebarCollapsed={isCollapsed}
              setMenuSelected={setMenuSelected}
              selectedMenu={selectedMenu}
            >
              <Item
                title="Manage Team"
                to="/team"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Contacts Information"
                to="/contacts"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Invoices Balances"
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </CollapsibleItem>

            {mockSidebar.map((menuitem, i) => (
              <CollapsibleItem
                key={i}
                title={menuitem.title}
                icon={getIconByName(menuitem.icon)}
                sidebarCollapsed={isCollapsed}
                setMenuSelected={setMenuSelected}
                selectedMenu={selectedMenu}
              >
                {menuitem.children.map((submenuitem, j) => (
                  <Item
                    key={j}
                    title={submenuitem.title}
                    to={submenuitem.to}
                    icon={getIconByName(submenuitem.icon)}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </CollapsibleItem>
            ))}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 0" }}
            >
              Data
            </Typography>

            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 0" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 0" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
