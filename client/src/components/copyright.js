import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright "} {new Date().getFullYear()} {" © All rights reserved by RaminHbb "}
        <Link color="inherit" href="https://github.com/raminhbbAU/GymOnlineee">
          GymOnlineee
        </Link>{" "}
      </Typography>
    );
  }

  export default Copyright;