import { useTranslations } from "next-intl";

export const useNavigationConfig = () => {
  const t = useTranslations();

  return [
    {
      label: t("mainNavigation.homePage"),
      path: "/",
    },
    {
      label: t("mainNavigation.aboutPage"),
      path: "/o-nas",
    },
    {
      label: t("mainNavigation.blogPage"),
      path: "/blog",
    },
  ];
};
