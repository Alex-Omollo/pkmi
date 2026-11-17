import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Our Work" };

const programs = [
  ["01", "Conferences", "National and international conferences that bring members together for teaching, fellowship, encouragement and shared vision."],
  ["02", "Seminars & workshops", "Learning opportunities that strengthen capacity and prepare members for effective ministry and service."],
  ["03", "Prayer retreats", "Dedicated times of prayer, intercession, reflection and spiritual renewal."],
  ["04", "Regional fellowships", "Local connections that nurture belonging, collaboration and mutual encouragement."],
  ["05", "Professional teams", "Networking among professionals—including doctors, lawyers and business people—to share skills and resources."],
  ["06", "Family & children initiatives", "Activities that encourage the wellbeing, growth and potential of families and children of servants of God."],
  ["07", "Project & creativity forums", "Collaborative spaces for ideas, innovation, practical initiatives and service."],
  ["08", "Kizazi Phenomenal", "A PKMI initiative for children of servants of God."],
];

export default function OurWorkPage() {
  return <>
    <PageHero eyebrow="Programs & initiatives" title="Faith expressed through action." description="Through gatherings, learning, prayer, collaboration and practical support, PKMI seeks to strengthen servants of God and their families." />
    <section className="section-pad"><div className="container"><div className="section-intro"><span className="eyebrow">Our areas of work</span><h2>Creating spaces to <em>grow and serve.</em></h2><p>Our activities bring women together, build capacity and create opportunities to support one another in the work God has called us to do.</p></div><div className="program-grid">{programs.map(([number, title, text]) => <article className="program-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="soft-section section-pad"><div className="container two-column"><div><span className="eyebrow">Member experience</span><h2>Fellowship with<br /><em>meaningful support.</em></h2></div><div><p className="lead">PKMI membership is intended to offer a loving, caring and focused interdenominational fellowship.</p><p>Members are encouraged through instruction, prayer support, burden sharing, networking and collaboration, leadership without discrimination, and the celebration of victories together.</p><Link className="text-link" href="/membership">Learn about membership →</Link></div></div></section>
    <section className="section-pad"><div className="container section-heading-row"><div><span className="eyebrow">Stay connected</span><h2>See what’s <em>coming up.</em></h2></div><Link className="button" href="/events-news">Events & news ↗</Link></div></section>
  </>;
}

// import type { Metadata } from "next";
// import { MissingPage } from "@/components/missing-page";

// export const metadata: Metadata = { title: "Our Work" };

// export default function OurWorkPage() {
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