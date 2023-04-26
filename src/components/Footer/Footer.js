import "../Footer/Footer.css";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";

export const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-content">
        <p>Copyright © 2023</p>
        <p>CheckAndTrip.com</p>
        <p>Todos los derechos reservados</p>
        <IconButton
          onClick={handleClick}
          sx={{
            color: "black",
            "&:hover": {
              color: "#80b192",
            },
          }}
        >
          <KeyboardDoubleArrowUpOutlinedIcon />
        </IconButton>
      </div>
      <div className="footer-scroll-top"></div>
    </footer>
  );
};
