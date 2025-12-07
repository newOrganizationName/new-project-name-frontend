"use client";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link as JoyLink,
  Sheet,
  Stack,
} from "@mui/joy";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SURVEY_URL = "https://forms.gle/f3NJWCMYGjZZZkQD9";
const PRIMARY_GRADIENT = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const PRIMARY_GRADIENT_HOVER =
  "linear-gradient(135deg, #5568d3 0%, #6a4194 100%)";

const navItems = [
  { label: "Як це працює", href: "#how-it-works", hash: "#how-it-works" },
  { label: "Функції", href: "#main-features", hash: "#main-features" },
  { label: "FAQ", href: "#faq", hash: "#faq" },
  { label: "Контакти", href: "#contact", hash: "#contact" },
];

const HOVER_MEDIA_QUERY = "@media (hover: hover) and (pointer: fine)";

const CTA_BUTTON_SX = {
  background: PRIMARY_GRADIENT,
  color: "#fff",
  fontWeight: 600,
  borderRadius: "14px",
  boxShadow: "0 14px 28px rgba(102, 126, 234, 0.25)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
  [HOVER_MEDIA_QUERY]: {
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 18px 36px rgba(102, 126, 234, 0.35)",
      background: PRIMARY_GRADIENT_HOVER,
    },
  },
  "&:focusVisible": {
    outline: "2px solid",
    outlineColor: "primary.200",
    outlineOffset: "3px",
  },
};

const BURGER_BUTTON_SX = {
  display: { xs: "inline-flex", md: "none" },
  ml: 1,
  width: 44,
  height: 44,
  minHeight: 44,
  borderRadius: "12px",
  padding: 0,
  background: PRIMARY_GRADIENT,
  color: "#fff",
  boxShadow: "0 12px 24px rgba(102, 126, 234, 0.32)",
  border: "1px solid rgba(102, 126, 234, 0.3)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
  backdropFilter: "blur(12px)",
  [HOVER_MEDIA_QUERY]: {
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 16px 30px rgba(102, 126, 234, 0.42)",
      background: PRIMARY_GRADIENT_HOVER,
    },
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 8px 16px rgba(102, 126, 234, 0.25)",
  },
  "&:focusVisible": {
    outline: "2px solid",
    outlineColor: "primary.200",
    outlineOffset: "3px",
  },
};

const navLinkStyles = (isActive: boolean) => ({
  color: isActive ? "primary.600" : "text.primary",
  fontWeight: 500,
  fontSize: "0.9375rem",
  cursor: "pointer",
  px: 1,
  py: 0.75,
  borderRadius: "10px",
  position: "relative",
  transition: "all 0.2s ease",
  [HOVER_MEDIA_QUERY]: {
    "&:hover": {
      color: "primary.500",
      backgroundColor: "primary.50",
    },
  },
  "&:focusVisible": {
    outline: "2px solid",
    outlineColor: "primary.200",
    outlineOffset: "2px",
  },
  ...(isActive && {
    backgroundColor: "rgba(102, 126, 234, 0.12)",
  }),
});

const mobileNavLinkStyles = (isActive: boolean) => ({
  display: "block",
  px: 2,
  py: 1,
  borderRadius: "10px",
  textDecoration: "none",
  color: isActive ? "primary.600" : "text.primary",
  fontWeight: isActive ? 600 : 500,
  fontSize: "1rem",
  backgroundColor: isActive ? "rgba(102, 126, 234, 0.08)" : "transparent",
  transition: "background-color 0.2s ease, color 0.2s ease",
  "&:focusVisible": {
    outline: "2px solid",
    outlineColor: "primary.200",
    outlineOffset: "3px",
  },
});

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>(navItems[0].hash);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const previousTouchAction = body.style.touchAction;

    if (drawerOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      body.style.touchAction = "none";
      if (scrollBarWidth > 0) {
        body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
      body.style.paddingRight = previousPaddingRight;
      body.style.touchAction = previousTouchAction;
    }

    const cleanup = () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
      body.style.paddingRight = previousPaddingRight;
      body.style.touchAction = previousTouchAction;
    };

    window.visualViewport?.addEventListener("resize", cleanup, {
      passive: true,
    });

    return () => {
      cleanup();
      window.visualViewport?.removeEventListener("resize", cleanup);
    };
  }, [drawerOpen]);

  useEffect(() => {
    const setHash = () => {
      const currentHash = window.location.hash;
      if (navItems.some((item) => item.hash === currentHash)) {
        setActiveHash(currentHash);
      } else if (!currentHash) {
        setActiveHash(navItems[0].hash);
      }
    };

    setHash();
    window.addEventListener("hashchange", setHash);
    return () => window.removeEventListener("hashchange", setHash);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.hash.replace("#", ""));

    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => !!section);

    const updateActiveSection = () => {
      const sections = getSections();
      if (!sections.length) {
        return;
      }

      const headerHeight = (headerRef.current?.offsetHeight ?? 0) + 24;
      const scrollY = window.scrollY + headerHeight;

      let currentSectionId = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= scrollY) {
          currentSectionId = section.id;
        }
      }

      setActiveHash((prev) => {
        const nextHash = `#${currentSectionId}`;
        return prev === nextHash ? prev : nextHash;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const headerStyles = useMemo(
    () => ({
      py: { xs: isScrolled ? 1.5 : 2, md: isScrolled ? 1.5 : 2.25 },
      px: { xs: 2, md: 4 },
      borderBottom: "1px solid",
      borderColor: "rgba(102, 126, 234, 0.12)",
      display: "flex",
      gap: { xs: 2, md: 4 },
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 1100,
      backdropFilter: isScrolled
        ? "blur(12px) saturate(160%)"
        : "blur(20px) saturate(180%)",
      background: isScrolled
        ? "rgba(255, 255, 255, 0.86)"
        : "linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.88) 100%)",
      boxShadow: isScrolled
        ? "0 12px 24px rgba(15, 23, 42, 0.08)"
        : "0 1px 20px rgba(0, 0, 0, 0.03)",
      transition: "all 0.3s ease",
    }),
    [isScrolled],
  );

  return (
    <Box component="header" ref={headerRef} sx={headerStyles}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <JoyLink
          component="div"
          sx={{
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "#667eea",
            cursor: "pointer",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            "&:focusVisible": {
              outline: "2px solid",
              outlineColor: "primary.200",
              outlineOffset: "4px",
            },
          }}
        >
          Dolphilab
        </JoyLink>
      </Link>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 2,
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {navItems.map((item) => (
          <JoyLink
            key={item.href}
            component={Link}
            href={item.href}
            underline="none"
            sx={navLinkStyles(item.hash === activeHash)}
          >
            {item.label}
          </JoyLink>
        ))}
      </Box>

      <Button
        component={Link}
        href={SURVEY_URL}
        target="_blank"
        rel="noopener noreferrer"
        size="md"
        sx={{
          display: { xs: "none", sm: "inline-flex" },
          px: { xs: 2, md: 3 },
          py: 1,
          fontSize: { xs: "0.875rem", md: "0.9375rem" },
          whiteSpace: "nowrap",
          ...CTA_BUTTON_SX,
        }}
      >
        Пройти опитування
      </Button>

      <IconButton
        variant="solid"
        color="primary"
        aria-label="Відкрити меню"
        onClick={() => setDrawerOpen(true)}
        sx={BURGER_BUTTON_SX}
      >
        <WavesRoundedIcon sx={{ fontSize: 24, color: "inherit" }} />
      </IconButton>

      <Drawer
        open={drawerOpen}
        anchor="right"
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          backdrop: {
            sx: { backdropFilter: "blur(6px)" },
          },
        }}
      >
        <Sheet
          sx={{
            width: { xs: "100%", sm: 260 },
            maxWidth: "100vw",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 3,
            backgroundColor: "background.body",
            boxShadow: "none",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <JoyLink
              component={Link}
              href="/"
              underline="none"
              onClick={() => setDrawerOpen(false)}
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.01em",
              }}
            >
              Dolphilab
            </JoyLink>
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              aria-label="Закрити меню"
              onClick={() => setDrawerOpen(false)}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Divider />

          <Stack component="nav" spacing={1.5}>
            {navItems.map((item) => (
              <JoyLink
                key={item.href}
                component={Link}
                href={item.href}
                underline="none"
                onClick={() => setDrawerOpen(false)}
                sx={mobileNavLinkStyles(item.hash === activeHash)}
              >
                {item.label}
              </JoyLink>
            ))}
          </Stack>

          <Box sx={{ mt: "auto" }}>
            <Button
              component={Link}
              href={SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
              size="md"
              sx={{
                ...CTA_BUTTON_SX,
                width: "100%",
                py: 1.25,
                px: 2,
                mt: 1,
              }}
              onClick={() => setDrawerOpen(false)}
            >
              Пройти опитування
            </Button>
          </Box>
        </Sheet>
      </Drawer>
    </Box>
  );
}
