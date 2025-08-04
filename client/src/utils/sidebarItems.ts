import { ISidebarRoute } from "../interface/interface";
import { roles } from "../interface/role";

export const sidebarRouteList: Record<roles, ISidebarRoute[]> = {
  admin: [
    {
      name: "Dashboard",
      link: "/admin",
    },
    { name: "Test", link: "/test" },
  ],
  user: [],
  guest: [
    {
      name: "Dashboard",
      link: "/",
    },
    { name: "Test", link: "/test" },
  ],
};
