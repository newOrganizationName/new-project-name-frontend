"use client";

import {
  Box,
  Typography,
  Button,
  Card,
  Accordion,
  AccordionGroup,
  AccordionSummary,
  AccordionDetails,
  Input,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Chip,
} from "@mui/joy";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";

const features = [
  {
    title: "AI-коуч",
    description:
      "AI, що допомагає викладачам створювати, оптимізувати й просувати курси без зайвих зусиль",
    icon: "🤖",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Dolphilab Маркетплейс",
    description:
      "Єдина платформа для тих, хто хоче навчати, і тих, хто прагне вчитися. Курси, майстер-класи, відеоуроки — усе в одному місці",
    icon: "💼",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Твоя експертиза — твій бізнес",
    description:
      "Продавай знання, збирай аудиторію, монетизуй те, у чому ти найкращий",
    icon: "💰",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

const howItWorksStudents = [
  {
    step: "1",
    title: "Створи акаунт",
    description:
      "Реєструйся за кілька секунд і відкрий доступ до навчання нового рівня",
    icon: "✨",
  },
  {
    step: "2",
    title: "Обирай курси",
    description:
      "Знаходь тисячі курсів і майстер-класів від перевірених викладачів",
    icon: "🔍",
  },
  {
    step: "3",
    title: "Обери свій курс",
    description:
      "Переглядай програми, відгуки й знайди курс, який справді підходить саме тобі",
    icon: "🎯",
  },
  {
    step: "4",
    title: "Навчайся у своєму ритмі",
    description:
      "Отримуй доступ до матеріалів, вчися коли зручно та здобувай сертифікати досягнень",
    icon: "🚀",
  },
];

const howItWorksTeachers = [
  {
    step: "1",
    title: "Створи профіль викладача",
    description: "Розкажи про себе, свій досвід і напрям викладання",
    icon: "👤",
  },
  {
    step: "2",
    title: "Створи курс легко",
    description:
      "Завантажуй відео, тести, завдання й налаштовуй усе у зручному конструкторі",
    icon: "🎬",
  },
  {
    step: "3",
    title: "Публікація",
    description:
      "Запускай курс на Dolphilab, просувай його та набирай студентів",
    icon: "📢",
  },
  {
    step: "4",
    title: "Заробіток",
    description: "Отримуй оплату за кожен продаж і відстежуй статистику успіху",
    icon: "💵",
  },
];

const mainFeaturesStudents = [
  {
    title: "Моя бібліотека",
    description:
      "Твої курси — завжди під рукою. Навчайся у зручному темпі, коли й де хочеш",
    icon: "📚",
    color: "#667eea",
  },
  {
    title: "AI-рекомендації",
    description:
      "Штучний інтелект підкаже, що вивчати далі, щоб рухатися до своїх цілей швидше",
    icon: "🎯",
    color: "#f093fb",
  },
  {
    title: "Сертифікати досягнень",
    description:
      "Отримуй реальні результати й підтверджуй їх офіційними сертифікатами",
    icon: "🎓",
    color: "#43e97b",
  },
  {
    title: "Персональний прогрес",
    description:
      "Відстежуй свій шлях розвитку — AI допоможе залишатися сфокусованим і мотивованим",
    icon: "⭐",
    color: "#4facfe",
  },
];

const mainFeaturesTeachers = [
  {
    title: "Конструктор курсів",
    description:
      "Створюй повноцінні курси з відео, тестами, матеріалами та завданнями — без технічних бар’єрів",
    icon: "🛠️",
    color: "#667eea",
  },
  {
    title: "Аналітика в реальному часі",
    description:
      "Отримуй дані про продажі, дохід і залучення студентів — усе в одній панелі",
    icon: "📊",
    color: "#f093fb",
  },
  {
    title: "Автоматичні виплати",
    description:
      "Безпечні платежі, миттєві виплати та прозора фінансова система без бюрократії",
    icon: "💳",
    color: "#4facfe",
  },
  {
    title: "Інструменти зростання",
    description:
      "Просувай свої курси через соцмережі, акції, знижки й AI-маркетинг",
    icon: "📢",
    color: "#fa709a",
  },
];

const faq = [
  {
    question: "Що таке Dolphilab?",
    answer:
      "Dolphilab — це майбутня AI-платформа для викладачів і студентів нового покоління. Ми створюємо середовище, де можна буде легко створювати, продавати й проходити навчальні курси з підтримкою штучного інтелекту.",
  },
  {
    question: "На якому етапі зараз Dolphilab?",
    answer:
      "Платформа перебуває у стадії активної розробки. Ми тестуємо ключові функції та збираємо відгуки від викладачів і учнів, щоб зробити продукт максимально зручним і корисним.",
  },
  {
    question: "Коли планується запуск?",
    answer:
      "Ми готуємо перший реліз платформи та бета-тест. Якщо хочете долучитись — залиште свій email, і ми повідомимо вас, коли стане доступний ранній доступ.",
  },
  {
    question: "Як можна долучитися до бета-тесту?",
    answer:
      "Достатньо залишити свій email у формі підписки на сторінці. Ми надішлемо запрошення, коли стартуватиме перша хвиля тестування для викладачів і студентів.",
  },
  {
    question: "Для кого створюється Dolphilab?",
    answer:
      "Для викладачів, які хочуть монетизувати свої знання, і для студентів, які шукають якісне навчання з AI-підтримкою. Наша мета — об’єднати тих, хто навчає, і тих, хто хоче навчатися.",
  },
  {
    question: "Чим Dolphilab відрізняється від інших платформ?",
    answer:
      "Ми інтегруємо AI, щоб зробити навчання персоналізованим, а створення курсів — простим і швидким. Dolphilab допомагатиме викладачам будувати свій бренд і ефективно просувати курси, а студентам — знаходити саме те, що їм потрібно.",
  },
  {
    question: "Чи зможу я залишати відгуки та пропозиції?",
    answer:
      "Так! Ми відкриті до зворотного зв’язку. Якщо маєте ідеї чи побажання — напишіть нам на contact@dolphilab.com, і ми обов’язково врахуємо їх під час розробки платформи.",
  },
  {
    question: "Як залишатися в курсі новин?",
    answer:
      "Підпишіться на наш email-лист — і ми повідомимо вас про старт бета-тесту, нові можливості та спеціальні запрошення для перших користувачів.",
  },
];

const SURVEY_URL = "https://forms.gle/f3NJWCMYGjZZZkQD9";
const SECTION_CONTAINER_SX = {
  maxWidth: "1200px",
  mx: "auto",
  width: "100%",
};
const HOVER_MEDIA_QUERY = "@media (hover: hover) and (pointer: fine)";

const PAGE_BACKGROUND_SX = {
  minHeight: "calc(100vh - 200px)",
  display: "flex",
  flexDirection: "column",
  gap: { xs: 10, md: 14 },
  position: "relative",
  overflow: "hidden",
  pb: { xs: 6, md: 10 },
  backgroundColor: "#f8faff",
};

const SECTION_WRAPPER_SX = {
  position: "relative" as const,
  zIndex: 1,
  px: { xs: 1.25, sm: 1.75, md: 0 },
  py: { xs: 3.25, sm: 4.25, md: 6 },
};

const SECTION_SURFACE_SX = {
  ...SECTION_CONTAINER_SX,
  px: { xs: 1.75, sm: 2.5, md: 4 },
  py: { xs: 2.5, sm: 3.25, md: 4.5 },
};

const CARD_GRID_TEMPLATE = {
  xs: "repeat(auto-fit, minmax(260px, 1fr))",
  md: "repeat(2, minmax(0, 1fr))",
  lg: "repeat(4, minmax(0, 1fr))",
};

const TAB_PANEL_ANIMATION_SX = {
  "&[hidden]": {
    display: "none",
  },
  "&:not([hidden])": {
    animation: "panelFadeScale 0.42s ease-out",
    animationFillMode: "both",
  },
  "&:not([hidden]) > *": {
    animation: "panelContentLift 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both",
    animationDelay: "0.06s",
  },
  "&:not([hidden]) .MuiCard-root": {
    opacity: 0,
    transform: "translateY(12px) scale(0.97)",
    filter: "blur(8px)",
    animation: "cardReveal 0.54s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
    willChange: "transform, opacity, filter",
  },
  "&:not([hidden]) .MuiCard-root:nth-of-type(1)": {
    animationDelay: "0.08s",
  },
  "&:not([hidden]) .MuiCard-root:nth-of-type(2)": {
    animationDelay: "0.14s",
  },
  "&:not([hidden]) .MuiCard-root:nth-of-type(3)": {
    animationDelay: "0.2s",
  },
  "&:not([hidden]) .MuiCard-root:nth-of-type(4)": {
    animationDelay: "0.26s",
  },
  "&:not([hidden]) .MuiCard-root:nth-of-type(5)": {
    animationDelay: "0.32s",
  },
  "&:not([hidden]) .MuiCard-root:nth-of-type(6)": {
    animationDelay: "0.38s",
  },
  "@keyframes panelFadeScale": {
    from: {
      opacity: 0,
      transform: "scale(0.97)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  "@keyframes panelContentLift": {
    from: {
      opacity: 0,
      transform: "translateY(10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes cardReveal": {
    "0%": {
      opacity: 0,
      transform: "translateY(14px) scale(0.96)",
      filter: "blur(6px)",
    },
    "70%": {
      filter: "blur(1px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0) scale(1)",
      filter: "blur(0)",
    },
  },
};

const SHARED_SURFACE_STYLES = {
  borderRadius: "18px",
  border: "1px solid rgba(102, 126, 234, 0.12)",
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 255, 0.92) 100%)",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
  transition:
    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
  [HOVER_MEDIA_QUERY]: {
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 20px 44px rgba(102, 126, 234, 0.18)",
      borderColor: "rgba(102, 126, 234, 0.35)",
    },
  },
  "&:focus-within": {
    borderColor: "rgba(102, 126, 234, 0.45)",
    boxShadow: "0 20px 42px rgba(102, 126, 234, 0.22)",
  },
};

const createAccentBoxStyles = (fill?: string) => ({
  width: 56,
  height: 56,
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.75rem",
  fontWeight: 600,
  color: "#fff",
  boxShadow: "0 12px 28px rgba(102, 126, 234, 0.25)",
  background: fill
    ? fill?.includes("gradient")
      ? fill
      : `linear-gradient(135deg, ${fill} 0%, rgba(118, 75, 162, 0.88) 100%)`
    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
});

const COUNTDOWN_CARD_STYLES = {
  ...SHARED_SURFACE_STYLES,
  p: { xs: "12px 16px", sm: 2, md: 3 },
  minWidth: { xs: "72px", sm: "84px" },
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  borderRadius: "16px",
  cursor: "default",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  [HOVER_MEDIA_QUERY]: {
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 16px 30px rgba(102, 126, 234, 0.18)",
    },
  },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const launchDate = useMemo(() => {
    return new Date("2026-03-01T00:00:00");
  }, []);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate.getTime() - now;

      if (difference > 0) {
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24),
        );
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ weeks, days, hours, minutes, seconds });
      } else {
        setTimeLeft({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    if (!email) {
      setEmailError("Будь ласка, введіть email");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Будь ласка, введіть коректний email");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("emails").insert([
        {
          email: email,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error saving email:", error);
        console.error("Error details:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });

        if (error.code === "PGRST301" || error.message?.includes("JWT")) {
          setEmailError(
            "Помилка авторизації. Перевірте налаштування Supabase.",
          );
        } else if (
          error.code === "42501" ||
          error.message?.includes("permission")
        ) {
          setEmailError("Немає доступу. Перевірте політики RLS в Supabase.");
        } else {
          setEmailError(`Помилка: ${error.message || "Спробуйте ще раз"}`);
        }
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(true);
      setEmail("");
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Unexpected error:", err);
      setEmailError("Помилка при збереженні. Спробуйте ще раз.");
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={PAGE_BACKGROUND_SX}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
          pt: { xs: 6, md: 8 },
          pb: { xs: 6, md: 10 },
          px: { xs: 3, md: 0 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: "1100px",
            mx: "auto",
            minHeight: { xs: "85vh", md: "92vh" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Chip
            color="primary"
            variant="soft"
            size="lg"
            sx={{
              mb: 3,
              px: 2,
              py: 0.5,
              fontSize: "0.875rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-10px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              animation: mounted ? "bounceIn 0.8s ease 0.2s both" : "none",
              "@keyframes bounceIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(-20px) scale(0.8)",
                },
                "50%": {
                  transform: "translateY(5px) scale(1.05)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0) scale(1)",
                },
              },
            }}
          >
            🚀 Готуємось до старту
          </Chip>

          <Typography
            level="h1"
            sx={{
              mb: 3,
              fontSize: { xs: "2.75rem", md: "5rem" },
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s ease, transform 1s ease",
              lineHeight: 1.1,
            }}
          >
            Dolphilab
          </Typography>
          <Typography
            level="h2"
            sx={{
              mb: 3,
              fontSize: { xs: "1.5rem", md: "2.25rem" },
              color: "text.secondary",
              fontWeight: 500,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
              lineHeight: 1.3,
            }}
          >
            AI-маркетплейс для викладачів і учнів нового покоління
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              mb: 5,
              maxWidth: "700px",
              mx: "auto",
              color: "text.tertiary",
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s",
              lineHeight: 1.6,
            }}
          >
            Платформа, що об’єднує тих, хто навчає, і тих, хто хоче навчатися.
            Створюйте та продавайте курси, діліться знаннями або розвивайтеся з
            AI-підтримкою від Dolphilab
          </Typography>

          <Button
            component="a"
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: { sm: 240 },
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontWeight: 600,
              borderRadius: "14px",
              py: 1.25,
              px: { xs: 3, sm: 4 },
              boxShadow: "0 14px 28px rgba(102, 126, 234, 0.25)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 1s ease 0.5s, transform 1s ease 0.5s",
              [HOVER_MEDIA_QUERY]: {
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 18px 36px rgba(102, 126, 234, 0.3)",
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a4194 100%)",
                },
              },
              "&:focusVisible": {
                outline: "2px solid",
                outlineColor: "primary.200",
                outlineOffset: "3px",
              },
            }}
          >
            Пройти опитування
          </Button>

          <Box
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mt: { xs: 4, md: 5 },
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s ease 0.6s, transform 1s ease 0.6s",
            }}
          >
            <Typography
              level="body-md"
              sx={{
                mb: 4,
                color: "text.secondary",
                fontSize: "1rem",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              До занурення залишилось:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 1.5, sm: 2, md: 3 },
                px: { xs: 2, sm: 2, md: 0 },
                maxWidth: { xs: "100%", sm: "500px", md: "700px" },
                mx: "auto",
              }}
            >
              {timeLeft.weeks > 0 && (
                <Card variant="outlined" sx={COUNTDOWN_CARD_STYLES}>
                  <Typography
                    level="h1"
                    sx={{
                      fontSize: { xs: "1.375rem", sm: "2rem", md: "3rem" },
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      mb: { xs: 0.25, sm: 0.5, md: 1 },
                      lineHeight: 1.2,
                      display: "inline-block",
                      minWidth: { xs: "2ch", sm: "2ch", md: "2ch" },
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {timeLeft.weeks}
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 500,
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    {timeLeft.weeks === 1
                      ? "тиждень"
                      : timeLeft.weeks < 5
                      ? "тижні"
                      : "тижнів"}
                  </Typography>
                </Card>
              )}
              <Card variant="outlined" sx={COUNTDOWN_CARD_STYLES}>
                <Typography
                  level="h1"
                  sx={{
                    fontSize: { xs: "1.375rem", sm: "2rem", md: "3rem" },
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: { xs: 0.25, sm: 0.5, md: 1 },
                    lineHeight: 1.2,
                    display: "inline-block",
                    minWidth: { xs: "2ch", sm: "2ch", md: "2ch" },
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {timeLeft.days}
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {timeLeft.days === 1
                    ? "день"
                    : timeLeft.days < 5
                    ? "дні"
                    : "днів"}
                </Typography>
              </Card>
              <Card variant="outlined" sx={COUNTDOWN_CARD_STYLES}>
                <Typography
                  level="h1"
                  sx={{
                    fontSize: { xs: "1.375rem", sm: "2rem", md: "3rem" },
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: { xs: 0.25, sm: 0.5, md: 1 },
                    lineHeight: 1.2,
                    display: "inline-block",
                    minWidth: { xs: "2ch", sm: "2ch", md: "2ch" },
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {timeLeft.hours}
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {timeLeft.hours === 1
                    ? "година"
                    : timeLeft.hours < 5
                    ? "години"
                    : "годин"}
                </Typography>
              </Card>
              <Card variant="outlined" sx={COUNTDOWN_CARD_STYLES}>
                <Typography
                  level="h1"
                  sx={{
                    fontSize: { xs: "1.375rem", sm: "2rem", md: "3rem" },
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: { xs: 0.25, sm: 0.5, md: 1 },
                    lineHeight: 1.2,
                    display: "inline-block",
                    minWidth: { xs: "2ch", sm: "2ch", md: "2ch" },
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {timeLeft.minutes}
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {timeLeft.minutes === 1
                    ? "хвилина"
                    : timeLeft.minutes < 5
                    ? "хвилини"
                    : "хвилин"}
                </Typography>
              </Card>
              <Card variant="outlined" sx={COUNTDOWN_CARD_STYLES}>
                <Typography
                  level="h1"
                  sx={{
                    fontSize: { xs: "1.375rem", sm: "2rem", md: "3rem" },
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: { xs: 0.25, sm: 0.5, md: 1 },
                    lineHeight: 1.2,
                    display: "inline-block",
                    minWidth: { xs: "2ch", sm: "2ch", md: "2ch" },
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {timeLeft.seconds}
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {timeLeft.seconds === 1
                    ? "секунда"
                    : timeLeft.seconds < 5
                    ? "секунди"
                    : "секунд"}
                </Typography>
              </Card>
            </Box>
          </Box>
        </Box>

        <Box sx={SECTION_WRAPPER_SX}>
          <Box
            sx={{
              ...SECTION_SURFACE_SX,
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(auto-fit, minmax(260px, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              justifyContent: "center",
              alignItems: "stretch",
              gap: { xs: 3, md: 4 },
            }}
          >
            {features.map((feature) => (
              <Card
                key={feature.title}
                variant="outlined"
                sx={{
                  ...SHARED_SURFACE_STYLES,
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: { xs: 2, md: 2.5 },
                  textAlign: "left",
                  cursor: "default",
                }}
              >
                <Box sx={createAccentBoxStyles(feature.gradient)} aria-hidden>
                  {feature.icon}
                </Box>
                <Typography
                  level="title-lg"
                  sx={{ fontWeight: 700, fontSize: "1.25rem" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  level="body-sm"
                  color="neutral"
                  sx={{ lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>

        <Box
          id="how-it-works"
          sx={{ ...SECTION_WRAPPER_SX, scrollMarginTop: "80px" }}
        >
          <Box sx={{ ...SECTION_SURFACE_SX }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: "2.25rem", md: "3rem" },
                  fontWeight: 700,
                  mb: 2,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              >
                Як це працює
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  maxWidth: "600px",
                  mx: "auto",
                  color: "text.secondary",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                }}
              >
                Кроки до навчання та заробітку з Dolphilab
              </Typography>
            </Box>
            <Tabs
              defaultValue={0}
              sx={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s",
                "& .MuiTabs-indicator": {
                  display: "none !important",
                },
              }}
            >
              <TabList
                variant="plain"
                sx={{
                  justifyContent: "center",
                  mb: 5,
                  gap: 1,
                  p: 0.5,
                  borderRadius: "12px",
                  background: "background.surface",
                  width: { xs: "100%", md: "auto" },
                  maxWidth: { xs: "420px", sm: "520px", md: "fit-content" },
                  mx: "auto",
                  display: "flex",
                  border: "none !important",
                  transition: "none !important",
                  "&:focus-visible": {
                    outline: "none",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                  },
                  "& .MuiTabs-indicator": {
                    display: "none !important",
                  },
                  "& .MuiTab-root": {
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    minHeight: "auto",
                    borderRadius: "8px",
                    color: "text.secondary",
                    minWidth: { xs: "50%", sm: "auto" },
                    flexGrow: { xs: 1, sm: 0 },
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    "&::after": {
                      display: "none !important",
                      height: "0 !important",
                      width: "0 !important",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                    "&.Mui-focusVisible": {
                      outline: "none",
                    },
                    "&.Mui-selected": {
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontWeight: 600,
                      "&::after": {
                        display: "none !important",
                        height: "0 !important",
                        width: "0 !important",
                      },
                    },
                  },
                }}
              >
                <Tab>Для учнів</Tab>
                <Tab>Для вчителів</Tab>
              </TabList>
              <TabPanel value={0} sx={TAB_PANEL_ANIMATION_SX}>
                <Box
                  sx={{
                    ...SECTION_SURFACE_SX,
                    boxShadow: "none",
                    border: "none",
                    px: { xs: 2, md: 4 },
                    py: { xs: 3, md: 4 },
                    background: "transparent",
                    display: "grid",
                    gridTemplateColumns: CARD_GRID_TEMPLATE,
                    justifyContent: "center",
                    gap: { xs: 3, md: 4 },
                  }}
                >
                  {howItWorksStudents.map((item) => (
                    <Card
                      key={item.title}
                      variant="outlined"
                      sx={{
                        ...SHARED_SURFACE_STYLES,
                        p: { xs: 3, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: { xs: 2, md: 2.5 },
                        textAlign: "left",
                        cursor: "default",
                      }}
                    >
                      <Box sx={createAccentBoxStyles()} aria-hidden>
                        {item.icon}
                      </Box>
                      <Typography
                        level="title-lg"
                        sx={{ fontWeight: 700, fontSize: "1.25rem" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        level="body-sm"
                        color="neutral"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {item.description}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel value={1} sx={TAB_PANEL_ANIMATION_SX}>
                <Box
                  sx={{
                    ...SECTION_SURFACE_SX,
                    boxShadow: "none",
                    border: "none",
                    px: { xs: 2, md: 4 },
                    py: { xs: 3, md: 4 },
                    background: "transparent",
                    display: "grid",
                    gridTemplateColumns: CARD_GRID_TEMPLATE,
                    justifyContent: "center",
                    gap: { xs: 3, md: 4 },
                  }}
                >
                  {howItWorksTeachers.map((item) => (
                    <Card
                      key={item.title}
                      variant="outlined"
                      sx={{
                        ...SHARED_SURFACE_STYLES,
                        p: { xs: 3, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: { xs: 2, md: 2.5 },
                        textAlign: "left",
                        cursor: "default",
                      }}
                    >
                      <Box sx={createAccentBoxStyles()} aria-hidden>
                        {item.icon}
                      </Box>
                      <Typography
                        level="title-lg"
                        sx={{ fontWeight: 700, fontSize: "1.25rem" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        level="body-sm"
                        color="neutral"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {item.description}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </TabPanel>
            </Tabs>
          </Box>
        </Box>

        <Box
          id="main-features"
          sx={{ ...SECTION_WRAPPER_SX, scrollMarginTop: "80px" }}
        >
          <Box sx={{ ...SECTION_SURFACE_SX }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: "2.25rem", md: "3rem" },
                  fontWeight: 700,
                  mb: 2,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              >
                Основні функції
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  maxWidth: "600px",
                  mx: "auto",
                  color: "text.secondary",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                }}
              >
                Функції, що допомагають викладачам і учням зростати разом”
              </Typography>
            </Box>
            <Tabs
              defaultValue={0}
              sx={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s",
                "& .MuiTabs-indicator": {
                  display: "none !important",
                },
              }}
            >
              <TabList
                variant="plain"
                sx={{
                  justifyContent: "center",
                  mb: 5,
                  gap: 1,
                  p: 0.5,
                  borderRadius: "12px",
                  background: "background.surface",
                  width: { xs: "100%", md: "auto" },
                  maxWidth: { xs: "420px", sm: "520px", md: "fit-content" },
                  mx: "auto",
                  display: "flex",
                  border: "none !important",
                  transition: "none !important",
                  "&:focus-visible": {
                    outline: "none",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                  },
                  "& .MuiTabs-indicator": {
                    display: "none !important",
                  },
                  "& .MuiTab-root": {
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    minHeight: "auto",
                    borderRadius: "8px",
                    color: "text.secondary",
                    cursor: "pointer",
                    minWidth: { xs: "50%", sm: "auto" },
                    flexGrow: { xs: 1, sm: 0 },
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    "&::after": {
                      display: "none !important",
                      height: "0 !important",
                      width: "0 !important",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                    "&.Mui-focusVisible": {
                      outline: "none",
                    },
                    "&.Mui-selected": {
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontWeight: 600,
                      "&::after": {
                        display: "none !important",
                        height: "0 !important",
                        width: "0 !important",
                      },
                    },
                  },
                }}
              >
                <Tab>Для учнів</Tab>
                <Tab>Для вчителів</Tab>
              </TabList>
              <TabPanel value={0} sx={TAB_PANEL_ANIMATION_SX}>
                <Box
                  sx={{
                    ...SECTION_SURFACE_SX,
                    boxShadow: "none",
                    border: "none",
                    px: { xs: 2, md: 4 },
                    py: { xs: 3, md: 4 },
                    background: "transparent",
                    display: "grid",
                    gridTemplateColumns: CARD_GRID_TEMPLATE,
                    justifyContent: "center",
                    gap: { xs: 3, md: 4 },
                  }}
                >
                  {mainFeaturesStudents.map((feature) => (
                    <Card
                      key={feature.title}
                      variant="outlined"
                      sx={{
                        ...SHARED_SURFACE_STYLES,
                        p: { xs: 3, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: { xs: 2, md: 2.5 },
                        textAlign: "left",
                        cursor: "default",
                      }}
                    >
                      <Box
                        sx={createAccentBoxStyles(feature.color)}
                        aria-hidden
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        level="title-lg"
                        sx={{ fontWeight: 700, fontSize: "1.25rem" }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        level="body-sm"
                        color="neutral"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {feature.description}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel value={1} sx={TAB_PANEL_ANIMATION_SX}>
                <Box
                  sx={{
                    ...SECTION_SURFACE_SX,
                    boxShadow: "none",
                    border: "none",
                    px: { xs: 2, md: 4 },
                    py: { xs: 3, md: 4 },
                    background: "transparent",
                    display: "grid",
                    gridTemplateColumns: CARD_GRID_TEMPLATE,
                    justifyContent: "center",
                    gap: { xs: 3, md: 4 },
                  }}
                >
                  {mainFeaturesTeachers.map((feature) => (
                    <Card
                      key={feature.title}
                      variant="outlined"
                      sx={{
                        ...SHARED_SURFACE_STYLES,
                        p: { xs: 3, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: { xs: 2, md: 2.5 },
                        textAlign: "left",
                        cursor: "default",
                      }}
                    >
                      <Box
                        sx={createAccentBoxStyles(feature.color)}
                        aria-hidden
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        level="title-lg"
                        sx={{ fontWeight: 700, fontSize: "1.25rem" }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        level="body-sm"
                        color="neutral"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {feature.description}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </TabPanel>
            </Tabs>
          </Box>
        </Box>

        <Box id="faq" sx={{ ...SECTION_WRAPPER_SX, scrollMarginTop: "80px" }}>
          <Box sx={{ ...SECTION_SURFACE_SX }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: "2.25rem", md: "3rem" },
                  fontWeight: 700,
                  mb: 1.5,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              >
                Часті запитання
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  maxWidth: "600px",
                  mx: "auto",
                  color: "text.secondary",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                }}
              >
                Відповіді на найпопулярніші питання
              </Typography>
            </Box>
            <Box sx={{ maxWidth: "820px", mx: "auto" }}>
              <AccordionGroup
                variant="plain"
                sx={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s",
                  "& .MuiAccordion-root": {
                    ...SHARED_SURFACE_STYLES,
                    mb: 2,
                    borderRadius: "18px",
                    border: "1px solid rgba(102, 126, 234, 0.12)",
                    "&::before": {
                      display: "none",
                    },
                    "&.Mui-expanded": {
                      boxShadow: "0 22px 46px rgba(102, 126, 234, 0.18)",
                    },
                  },
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "680px", md: "820px" },
                  mx: "auto",
                }}
              >
                {faq.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      sx={{
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                        py: { xs: 1.75, md: 1.85 },
                        px: { xs: 3, md: 3.25 },
                        minHeight: "auto",
                        color: "text.primary",
                        letterSpacing: "-0.01em",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.question}
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        px: 2.5,
                        pb: 2,
                        pt: 0,
                      }}
                    >
                      <Typography
                        level="body-md"
                        sx={{
                          lineHeight: 1.7,
                          fontSize: "0.9375rem",
                          color: "text.secondary",
                          fontWeight: 400,
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionGroup>
            </Box>
          </Box>
        </Box>

        <Box
          id="contact"
          sx={{
            ...SECTION_WRAPPER_SX,
            scrollMarginTop: "80px",
            pb: { xs: 4, md: 5 },
          }}
        >
          <Box
            sx={{
              ...SECTION_SURFACE_SX,
              textAlign: "center",
              borderRadius: "22px",
              px: { xs: 3, md: 4.5 },
              py: { xs: 4, md: 5.5 },
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              border: "1px solid rgba(102, 126, 234, 0.08)",
              boxShadow: "0 18px 36px rgba(15, 23, 42, 0.08)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s ease 0.6s, transform 1s ease 0.6s",
            }}
          >
            <Typography
              level="h2"
              sx={{
                mb: 2,
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 700,
                position: "relative",
              }}
            >
              Готові долучитись?
            </Typography>
            <Typography
              level="body-lg"
              sx={{
                mb: 5,
                color: "text.secondary",
                maxWidth: "600px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.125rem" },
                position: "relative",
                lineHeight: 1.6,
              }}
            >
              Залиште свій email, і ми повідомимо вас про запуск платформи та
              можливість стати бета-тестером
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                maxWidth: "550px",
                mx: "auto",
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                position: "relative",
              }}
            >
              <FormControl
                sx={{
                  flex: 1,
                  outline: "none !important",
                  "&:focus": {
                    outline: "none !important",
                  },
                  "&:focus-within": {
                    outline: "none !important",
                  },
                  "&:focus-visible": {
                    outline: "none !important",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none !important",
                  },
                }}
                error={!!emailError}
              >
                <FormLabel sx={{ display: "none" }}>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Введіть ваш email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) {
                      setEmailError("");
                    }
                  }}
                  required
                  size="lg"
                  variant="outlined"
                  sx={{
                    minWidth: { xs: "100%", sm: "350px" },
                    fontSize: "1rem",
                    borderRadius: "14px",
                    height: "48px",
                    border: "1px solid",
                    borderColor: emailError
                      ? "danger.500"
                      : "rgba(102, 126, 234, 0.25)",
                    backgroundColor: "rgba(255, 255, 255, 0.96)",
                    cursor: "text",
                    outline: "none",
                    boxShadow: "none",
                    transition:
                      "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
                    [`${HOVER_MEDIA_QUERY}`]: {
                      "&:hover": {
                        borderColor: emailError ? "danger.500" : "primary.300",
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                    "&.Mui-focusVisible": {
                      outline: "none",
                    },
                    "&:focus-within": {
                      borderColor: emailError ? "danger.500" : "primary.500",
                      boxShadow: emailError
                        ? "0 0 0 2px rgba(218, 74, 74, 0.16)"
                        : "0 0 0 2px rgba(102, 126, 234, 0.18)",
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                    "&::before": {
                      display: "none",
                    },
                    "&::after": {
                      display: "none",
                    },
                    "& input": {
                      borderRadius: "inherit",
                    },
                  }}
                />
                {emailError && (
                  <Typography
                    level="body-xs"
                    sx={{
                      mt: 0.5,
                      color: "danger.500",
                      fontSize: "0.875rem",
                    }}
                  >
                    {emailError}
                  </Typography>
                )}
                {submitSuccess && (
                  <Typography
                    level="body-xs"
                    sx={{
                      mt: 0.5,
                      color: "success.500",
                      fontSize: "0.875rem",
                    }}
                  >
                    Дякуємо! Ваш email успішно збережено.
                  </Typography>
                )}
              </FormControl>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                loading={isSubmitting}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  px: 4,
                  height: "48px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: "12px",
                  whiteSpace: "nowrap",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                  [HOVER_MEDIA_QUERY]: {
                    "&:hover": {
                      transform: isSubmitting ? "none" : "translateY(-2px)",
                      boxShadow: isSubmitting
                        ? "none"
                        : "0 12px 24px rgba(102, 126, 234, 0.4)",
                    },
                  },
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {isSubmitting ? "Надсилання..." : "Надіслати"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
