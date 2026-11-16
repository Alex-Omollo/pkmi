import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Connect with PKMI" title="We would be glad to hear from you." description="For general enquiries, membership information, partnerships or questions about our activities, reach out to the PKMI team." />
    <section className="section-pad"><div className="container contact-grid"><div><span className="eyebrow">Get in touch</span><h2>Let’s start<br /><em>a conversation.</em></h2><p className="contact-lead">We welcome enquiries from women, churches, ministries, partners and friends who would like to learn more about PKMI.</p><div className="contact-detail"><span>Email</span><a href="mailto:info@pkmi.org">info@pkmi.org</a><small>Placeholder address — replace with PKMI’s confirmed official email.</small></div><div className="contact-detail"><span>Location & reach</span><p>Connecting locally and internationally.</p><small>Add the organization’s confirmed office or postal address and country contacts.</small></div></div><div className="contact-form-card"><h3>Send an enquiry</h3><p>This starter form is a visual frontend only. Connect it to an approved email or form service before launch.</p><form action="mailto:info@pkmi.org" method="post" encType="text/plain"><label htmlFor="name">Your name</label><input id="name" name="name" placeholder="Enter your name" required /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" required /><label htmlFor="subject">What is your enquiry about?</label><select id="subject" name="subject" defaultValue="General enquiry"><option>General enquiry</option><option>Membership</option><option>Events and programs</option><option>Partnership</option></select><label htmlFor="message">Message</label><textarea id="message" name="message" rows={5} placeholder="How can we help?" required /><button className="button" type="submit">Prepare email enquiry ↗</button></form></div></div></section>
  </>;
}
