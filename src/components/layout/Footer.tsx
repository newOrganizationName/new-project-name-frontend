import { Box, Typography, Link as JoyLink, Stack } from "@mui/joy";
import NextLink from "next/link";

const HOVER_MEDIA_QUERY = "@media (hover: hover) and (pointer: fine)";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 3,
        borderTop: "1px solid",
        borderColor: "rgba(102, 126, 234, 0.1)",
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
        }}
      >
        <Box>
          <JoyLink
            component={NextLink}
            href="/"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #4096FF 0%, #9B51E0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textDecoration: "none",
              display: "inline-block",
              mb: 2,
              cursor: "pointer",
            }}
          >
            Dolphilab
          </JoyLink>
          <Typography level="body-sm" color="neutral" sx={{ mb: 2 }}>
            Платформа для учнів та вчителів з інтеграцією AI. Знайдіть
            ідеального репетитора та покращуйте свої знання.
          </Typography>
        </Box>

        <Box>
          <Typography level="title-sm" sx={{ mb: 2, fontWeight: 600 }}>
            Швидкі посилання
          </Typography>
          <Stack spacing={1}>
            <JoyLink
              component={NextLink}
              href="#how-it-works"
              underline="none"
              sx={{
                color: "text.secondary",
                cursor: "pointer",
                [HOVER_MEDIA_QUERY]: { "&:hover": { color: "primary.500" } },
                fontSize: "0.875rem",
              }}
            >
              Як це працює
            </JoyLink>
            <JoyLink
              component={NextLink}
              href="#main-features"
              underline="none"
              sx={{
                color: "text.secondary",
                cursor: "pointer",
                [HOVER_MEDIA_QUERY]: { "&:hover": { color: "primary.500" } },
                fontSize: "0.875rem",
              }}
            >
              Основні функції
            </JoyLink>
            <JoyLink
              component={NextLink}
              href="#faq"
              underline="none"
              sx={{
                color: "text.secondary",
                cursor: "pointer",
                [HOVER_MEDIA_QUERY]: { "&:hover": { color: "primary.500" } },
                fontSize: "0.875rem",
              }}
            >
              Часті запитання
            </JoyLink>
            <JoyLink
              component={NextLink}
              href="#contact"
              underline="none"
              sx={{
                color: "text.secondary",
                cursor: "pointer",
                [HOVER_MEDIA_QUERY]: { "&:hover": { color: "primary.500" } },
                fontSize: "0.875rem",
              }}
            >
              Готові долучитись?
            </JoyLink>
            <JoyLink
              href="https://forms.gle/f3NJWCMYGjZZZkQD9"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: "text.secondary",
                cursor: "pointer",
                [HOVER_MEDIA_QUERY]: { "&:hover": { color: "primary.500" } },
                fontSize: "0.875rem",
              }}
            >
              Опитування
            </JoyLink>
          </Stack>
        </Box>

        <Box>
          <Typography level="title-sm" sx={{ mb: 2, fontWeight: 600 }}>
            Контакти
          </Typography>
          <Stack spacing={1}>
            <JoyLink
              href="mailto:contact@dolphilab.com"
              component="a"
              underline="none"
              sx={{
                color: "text.secondary",
                [HOVER_MEDIA_QUERY]: { "&:hover": { color: "primary.500" } },
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              contact@dolphilab.com
            </JoyLink>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 4,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography level="body-sm" color="neutral">
          © {new Date().getFullYear()} Dolphilab. Всі права захищені.
        </Typography>
      </Box>
    </Box>
  );
}
