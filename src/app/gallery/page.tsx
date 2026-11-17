// import type { Metadata } from "next";
// import { PageHero } from "@/components/page-hero";
// import { GalleryBrowser } from "@/components/gallery/gallery-browser";
// import {
//   galleryCategories,
//   galleryYears,
//   publishedEvents,
//   toEventView,
// } from "@/data/gallery";

// export const metadata: Metadata = {
//   title: "Gallery",
//   description:
//     "Photographs from PKMI conferences, retreats, fellowships and gatherings.",
// };

// export default function GalleryPage() {
//   const events = publishedEvents.map(toEventView);
//   return (
//     <>
//       <PageHero
//         eyebrow="Gallery"
//         title="Moments of faith, fellowship and service."
//         description="Browse photographs from PKMI gatherings, organised by event."
//       />
//       <section className="section-pad">
//         <div className="container">
//           <div className="narrow-copy gallery-intro">
//             <p className="lead">
//               Welcome to the PKMI gallery. Every event has its own collection,
//               so you can revisit a conference, share a gathering with a friend,
//               or see how our journey has unfolded.
//             </p>
//             <p>
//               Use the filters to find a particular year or kind of event, then
//               open any photograph to view it full screen.
//             </p>
//           </div>
//           <GalleryBrowser
//             events={events}
//             years={galleryYears}
//             categories={galleryCategories}
//           />
//         </div>
//       </section>
//     </>
//   );
// }

import type { Metadata } from "next";
import { MissingPage } from "@/components/missing-page";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <MissingPage
      code="Soon"
      eyebrow="Gallery in progress"
      title={
        <>
          Our gallery is <em>coming soon.</em>
        </>
      }
      description="We are preparing photographs from our gatherings. Thank you for your patience."
    />
  );
}