import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Membership" };

const benefits = ["A loving, caring and focused interdenominational fellowship.", "Instruction to prepare members for effective ministry.", "Prayer support.", "Burden sharing, especially during grief.", "Networking and collaboration through a resource team.", "Leadership without discrimination based on place, gender, tribe or educational/material status.", "Celebrating victories together."];

export default function MembershipPage() {
  return <>
    <PageHero eyebrow="Join the fellowship" title="There is strength in walking together." description="Discover the fellowship, encouragement and shared commitment at the heart of Phenomenal Kingdom Mothers International." />
    <section className="section-pad"><div className="container two-column"><div><span className="eyebrow">Belonging & purpose</span><h2>A community that<br /><em>stands together.</em></h2></div><div><p className="lead">PKMI brings together women servants of God who desire to grow in faith, strengthen families and support one another in service.</p><p>Membership connects women to a focused interdenominational fellowship with opportunities for instruction, prayer, burden sharing, networking and collaboration.</p></div></div></section>
    <section className="soft-section section-pad"><div className="container"><div className="section-intro"><span className="eyebrow">Membership benefits</span><h2>More than membership.<br /><em>A shared commitment.</em></h2></div><div className="benefit-grid">{benefits.map((benefit, index) => <div className="benefit-item" key={benefit}><span>0{index + 1}</span><p>{benefit}</p></div>)}</div></div></section>
    <section className="section-pad"><div className="container two-column"><div><span className="eyebrow">Membership details</span><h2>How membership<br /><em>is structured.</em></h2><p>PKMI’s current membership information includes an annual calendar beginning 1 May, registration and subscription contributions.</p></div><div className="fees-card"><div><span>One-time registration</span><strong>KSh 500</strong></div><div><span>Monthly subscription</span><strong>KSh 100</strong></div><div><span>Annual subscription option</span><strong>KSh 1,200</strong></div><small>Figures are reproduced from the supplied PKMI overview. Please contact PKMI to confirm current payment instructions and membership conditions before making any payment.</small></div></div></section>
    <section className="join-section"><div className="container join-inner"><div><span className="eyebrow eyebrow-light">Take the next step</span><h2>Interested in<br /><em>joining PKMI?</em></h2><p>Get in touch with the organization for membership guidance and current registration information.</p></div><Link className="button button-gold" href="/contact">Make an enquiry ↗</Link></div></section>
  </>;
}

// import type { Metadata } from "next";
// import { MissingPage } from "@/components/missing-page";

// export const metadata: Metadata = { title: "Membership" };

// export default function MembershipPage() {
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