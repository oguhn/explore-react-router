import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("common/pages/home.tsx"),
  route("action-pick/:id", "common/features/action-pick/page/action-pick.tsx"),

] satisfies RouteConfig;
