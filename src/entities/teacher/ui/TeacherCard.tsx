import { Card, CardContent, Typography } from "@mui/joy";

interface Props {
  teacher: {
    id: string;
    name: string;
    subject: {
      path: string;
      name: string;
    };
  };
}

export default function TeacherCard({ teacher }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography level="title-md">{teacher.name}</Typography>
        <Typography level="body-sm" color="neutral">
          {teacher.subject.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
