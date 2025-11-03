import { Box, Typography } from "@mui/joy";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography level="body-sm" textAlign="center">
        Footer
      </Typography>
    </Box>
  );
}
