import { Box, Typography, Grid } from "@mui/joy";
import TeacherCard from "./TeacherCard";

interface Props {
  title: string;
  items: {
    id: string;
    name: string;
    subject: {
      path: string;
      name: string;
    };
  }[];
}

export default function List({ title, items }: Props) {
  return (
    <Box>
      <Typography level="h2" sx={{ mb: 3 }}>
        {title}
      </Typography>
      {items.length > 0 ? (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
              <TeacherCard teacher={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography level="body-md" color="neutral">
          Поки що немає даних
        </Typography>
      )}
    </Box>
  );
}
