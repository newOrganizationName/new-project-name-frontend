'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Box, Card, Divider, Stack, Typography } from '@mui/joy';

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: {
    text: string;
    linkText: string;
    linkHref: string;
  };
}

export function AuthFormLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthFormLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        bgcolor: 'background.surface',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Box textAlign="center">
            <Typography level="h3" component="h1">
              {title}
            </Typography>
            <Typography level="body-sm" sx={{ mt: 1 }}>
              {subtitle}
            </Typography>
          </Box>

          {children}

          <Divider>або</Divider>

          <Typography level="body-sm" textAlign="center">
            {footer.text}{' '}
            <Link
              href={footer.linkHref}
              style={{ color: 'inherit', fontWeight: 600 }}
            >
              {footer.linkText}
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}
