import { Box, Typography, Grid } from "@mui/joy";
import TeacherCard from "@/components/common/TeacherCard";
import { SUBJECTS, TEACHERS } from "@/constants";

interface Props {
  params: Promise<{
    subject: string;
  }>;
}

export default async function SubjectPage({ params }: Props) {
  const resolvedParams = await params;
  const decodedSubject = decodeURIComponent(resolvedParams.subject);
  const subject = SUBJECTS.find((s) => s.path === decodedSubject);
  const teachers = subject
    ? TEACHERS.filter((teacher) => teacher.subject.path === subject.path)
    : [];

  if (!subject) {
    return (
      <Box>
        <Typography level="h1" sx={{ mb: 3 }}>
          Предмет не знайдено
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography level="h1" sx={{ mb: 3 }}>
        {subject.name}
      </Typography>
      {teachers.length > 0 ? (
        <Grid container spacing={2}>
          {teachers.map((teacher) => (
            <Grid key={teacher.id} xs={12} sm={6} md={4} lg={3}>
              <TeacherCard teacher={teacher} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography level="body-md" color="neutral">
          Поки що немає вчителів для цього предмета
        </Typography>
      )}
    </Box>
  );
}
