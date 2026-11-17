import type { CSSProperties, ReactNode } from "react";
import { Icon3D, type Icon3DName } from "@/components/site/icon-3d";

/**
 * The app's welcome-scene orbit (Onboarding/OnboardingWelcomeScene.swift):
 * 3D icons on frosted-glass bubbles drifting around a centerpiece on an
 * ellipse, the near half in front, the far half behind, smaller and dimmer.
 *
 * Pure CSS, 0 JS: each bubble runs two sine-like `alternate` animations (x and
 * y, a quarter period apart) plus a slow bob. Depth (scale, opacity, z-index)
 * rides on the y animation. Negative delays spread the icons evenly. With
 * reduced motion the animations are paused at that evenly spaced resting
 * layout, exactly like the app's `t = 0` frame.
 */
export function Orbit({
  icons,
  children,
  className = "",
  bubble = 64,
  period = 60,
}: {
  icons: Icon3DName[];
  children?: ReactNode;
  className?: string;
  bubble?: number;
  /** Seconds per lap. The app uses 90 s; a little faster reads better on the web. */
  period?: number;
}) {
  const n = icons.length;
  return (
    <div aria-hidden className={`rm-orbit ${className}`} style={{ "--period": `${period}s`, "--bubble": `${bubble}px` } as CSSProperties}>
      {children && <div className="rm-orbit-center">{children}</div>}
      {icons.map((name, i) => {
        // Start at the top (−90°) like OBOrbit.offset, evenly spaced.
        const phase = -((i / n) * period);
        return (
          <div key={name + i} className="rm-orbit-y" style={{ "--d": `${phase}s` } as CSSProperties}>
            <div className="rm-orbit-x">
              <div className="rm-orbit-bob" style={{ "--b": `${-i * 1.3}s` } as CSSProperties}>
                <span className="rm-bubble">
                  <Icon3D name={name} size={Math.round(bubble * 0.72)} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
