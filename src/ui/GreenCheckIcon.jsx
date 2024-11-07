import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";

function GreenCheckIcon() {
  return (
    <Avatar
      style={{
        backgroundColor: "#A5D6A7", // Light green background
        width: 24, // Adjust size as needed
        height: 24,
        position: "absolute",
        left: 4,
      }}
    >
      <CheckIcon style={{ color: "#4CAF50", fontSize: 16 }} />{" "}
      {/* Darker green for the check */}
    </Avatar>
  );
}

export default GreenCheckIcon;
