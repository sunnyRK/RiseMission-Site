import { DocPage } from "@/components/site/doc-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Licenses and credits",
  description: "Third-party art and software credits for the Rise Mission website and iPhone app, including the CC0 3D icon set from 3dicons.",
  path: "/licenses",
});

export default function Licenses() {
  return (
    <DocPage icon="3d-medal" title="Licenses and credits" path="/licenses" updated="November 17, 2026">
      <h2>3D icons</h2>
      <p>
        The soft 3D icons on this website and in the Rise Mission app come from{" "}
        <a href="https://3dicons.co">3dicons</a> by Vijay Verma (
        <a href="https://github.com/realvjy/3dicons">realvjy/3dicons</a>), version 1, &quot;dynamic&quot; angle,
        &quot;color&quot; style. They are released under the{" "}
        <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a> public domain dedication, so
        no attribution is required. We credit them anyway, with thanks.
      </p>
      <p>We use them unmodified, renamed only, and resized for the web.</p>
      <h2>Interface icons</h2>
      <p>
        Line icons on this website are from <a href="https://lucide.dev">Lucide</a>, used under the ISC license.
      </p>
      <h2>Trademarks</h2>
      <p>iPhone, App Store, AlarmKit and Apple are trademarks of Apple Inc. Rise Mission is not affiliated with Apple.</p>
    </DocPage>
  );
}
