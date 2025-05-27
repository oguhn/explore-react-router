import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route(
    "/.well-known/appspecific/com.chrome.devtools.json",
    "pages/debug-null.tsx",
  ),
  index("common/pages/home.tsx"),
  route("action-pick/:id", "features/action-pick/page/action-pick.tsx"),
  route("dashboard", "features/dashboard/page/dashboard.tsx"),
  route("profile", "features/profile/page/profile.tsx"),
  route("settings", "features/settings/page/settings.tsx"),
  route("purchase-history", "features/purchase-history/page/purchase-history.tsx"),
  route("logout", "features/logout/page/logout.tsx"),
] satisfies RouteConfig;
