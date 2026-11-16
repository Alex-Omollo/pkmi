import type { ReactNode } from "react";
import Link from "next/link";

type MissingPageProps = {
  code?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
};

const quickLinks = [
  { href: "/about", label: "About PKMI" },
  { href: "/our-work", label: "Our Work" },
  { href: "/events-news", label: "Events & News" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

export function MissingPage({
  code = "404",
  eyebrow = "Page not found",
  title = <>This page has moved <em>or seems to be missing.</em></>,
  description = "The page you are looking for may have been moved, renamed or is not available yet. Let’s help you find your way.",
}: MissingPageProps) {
  return (
    <section className="missing-page">
      <div className="container missing-inner">
        <span className="missing-code" aria-hidden="true">{code}</span>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="missing-actions">
          <Link className="button" href="/">Back to home <span aria-hidden="true">↗</span></Link>
          <Link className="text-link" href="/contact">Contact the team <span aria-hidden="true">→</span></Link>
        </div>
        <nav className="missing-links" aria-label="Helpful links">
          <span>Or visit</span>
          {quickLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </div>
    </section>
  );
}