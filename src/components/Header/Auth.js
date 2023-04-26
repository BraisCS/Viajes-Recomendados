import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IconButton, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import "../Header/Auth.css";

export const Auth = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /* Registered User */
  return user ? (
    <div className="Authbuttons">
      {/* New Recommendation */}
      <Link to={"/newrecommendation"}>
        <IconButton
          sx={{
            color: "black",
            "&:hover": {
              color: "#80b192",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Link>

      {/* User Menu */}
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          color: "black",
          "&:hover": {
            color: "#80b192",
          },
        }}
      >
        <PersonIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {" "}
        <MenuItem>
          <Link to={`/user/${user.id}`}>
            <IconButton>
              <PersonIcon />
            </IconButton>
            {user.name}
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/users/${user.id}`}>
            {" "}
            <IconButton>
              <EditIcon />
            </IconButton>
            Editar perfil
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          <IconButton>
            <LogoutIcon />
          </IconButton>
          Salir
        </MenuItem>
      </Menu>
    </div>
  ) : (
    /* Unregistered User */
    <div className="Authbuttons">
      <button className="navuser">
        <Link to={"./login"}> Accede </Link>
      </button>
      <button className="navuser">
        <Link to={"./register"}> Registro </Link>
      </button>
    </div>
  );
};
