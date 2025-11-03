import { Box, Typography } from "@mui/joy";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        py: 2,
        px: 3,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography level="body-sm" textAlign="center">
        Header
      </Typography>
    </Box>
  );
}
