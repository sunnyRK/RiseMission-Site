import { navMenus } from "@/lib/nav";
import { NavBar } from "./nav-bar";

export function SiteHeader() {
  return <NavBar menus={navMenus()} />;
}
