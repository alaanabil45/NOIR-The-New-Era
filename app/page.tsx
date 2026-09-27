import dynamic from "next/dynamic";
import { CoverScene } from "@/components/editorial/CoverScene";
import { Footer } from "@/components/layout/Footer";

// Everything below the first viewport is code-split out of the initial
// bundle. These are the GSAP-heaviest scenes on the page, so deferring
// them keeps first load light without affecting SEO (ssr stays on —
// only the JS chunk is deferred, not the markup).
const FabricReveal = dynamic(() =>
  import("@/components/editorial/FabricReveal").then((m) => m.FabricReveal)
);
const PieceScene = dynamic(() =>
  import("@/components/editorial/PieceScene").then((m) => m.PieceScene)
);
const EditorialStory = dynamic(() =>
  import("@/components/editorial/EditorialStory").then((m) => m.EditorialStory)
);
const LookScene = dynamic(() =>
  import("@/components/editorial/LookScene").then((m) => m.LookScene)
);
const CollectionIntro = dynamic(() =>
  import("@/components/editorial/CollectionIntro").then((m) => m.CollectionIntro)
);
const CollectionGrid = dynamic(() =>
  import("@/components/products/CollectionGrid").then((m) => m.CollectionGrid)
);

export default function Home() {
  return (
    <main>
      <CoverScene />
      <FabricReveal />
      <PieceScene />
      <EditorialStory />
      <LookScene />
      <CollectionIntro />
      <CollectionGrid />
      <Footer />
    </main>
  );
}
