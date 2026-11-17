import type { Icon3DName } from "./icon-3d";
import { Icon3D } from "./icon-3d";

/** Presentation only: which 3D icon heads each tool, topic and doc page. */
export const TOOL_ICON3D: Record<string, Icon3DName> = {
  "sleep-calculator": "3d-moon",
  "online-alarm-clock": "3d-bell",
  "nap-calculator": "3d-clock",
  "snooze-calculator": "3d-calculator",
  "sleep-debt-calculator": "3d-calendar",
  "chronotype-quiz": "3d-sun",
};

export const TOPIC_ICON3D: Record<string, Icon3DName> = {
  "heavy-sleepers": "3d-bell",
  "snooze-habit": "3d-clock",
  "waking-up-early": "3d-sun",
  "sleep-science": "3d-flask",
  "wake-up-challenges": "3d-dumbbell",
  "iphone-alarms": "3d-phone",
  "alarm-apps": "3d-trophy",
};

/**
 * Page-header 3D icon: floats gently on a soft glow, like the app's tab
 * headers. Fixed box, so it never shifts layout.
 */
export function HeroIcon({ name, center = false, size = 72 }: { name: Icon3DName; center?: boolean; size?: number }) {
  return (
    <span aria-hidden className={`rm-hero-icon ${center ? "mx-auto" : ""}`} style={{ width: size, height: size }}>
      <Icon3D name={name} size={size} priority className="rm-float" />
    </span>
  );
}
