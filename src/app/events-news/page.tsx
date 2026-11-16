import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Events & News" };

export default function EventsNewsPage() {
  return <>
    <PageHero eyebrow="Stay connected" title="Gathering, growing and serving together." description="Follow PKMI activities, conferences, prayer gatherings and announcements from across our community." />
    <section className="section-pad"><div className="container"><div className="section-intro"><span className="eyebrow">Our calendar</span><h2>Events & <em>gatherings.</em></h2><p>PKMI’s activities include national conferences, National Kesha, prayer and fasting retreats, Kizazi Phenomenal and leadership prayer gatherings.</p></div><div className="notice-panel"><span className="notice-icon">✦</span><div><h3>Upcoming events will be announced here.</h3><p>Check back for confirmed dates, venues, registration details and event updates. We will publish verified information as it becomes available.</p></div></div></div></section>
    <section className="soft-section section-pad"><div className="container"><div className="section-intro"><span className="eyebrow">From our community</span><h2>Stories, moments <em>& milestones.</em></h2><p>As event photographs, news and testimonies are approved for publication, this space will become a window into the life of PKMI.</p></div><div className="gallery-placeholders"><div className="gallery-tile gallery-tile-one"><span>Conferences & fellowship</span></div><div className="gallery-tile gallery-tile-two"><span>Prayer & spiritual growth</span></div><div className="gallery-tile gallery-tile-three"><span>Serving families together</span></div></div></div></section>
  </>;
}
