import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EventsBrowser } from "@/components/events/events-browser";
import { getAllEvents, getPosters } from "@/data/events";

export const metadata: Metadata = { title: "Events & News" };

export default function EventsNewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay connected"
        title="Gathering, growing and serving together."
        description="Follow PKMI activities, conferences, prayer gatherings and announcements from across our community."
      />
      <EventsBrowser
        events={getAllEvents()} posters={getPosters()}
        builtOn={new Date().toLocaleDateString("en-CA")}
      />
    </>
  );
}

// import type { Metadata } from "next";
// import { MissingPage } from "@/components/missing-page";

// export const metadata: Metadata = { title: "Events & News" };

// export default function EventsNewsPage() {
//   return (
//     <MissingPage
//       code="Soon"
//       eyebrow="Page in progress"
//       title={
//         <>
//           We’re still <em>preparing this page.</em>
//         </>
//       }
//       description="This section is being prepared and will be available soon. Thank you for your patience."
//     />
//   );
// }
