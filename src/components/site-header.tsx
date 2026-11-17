"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About PKMI" },
  { href: "/our-work", label: "Our Work" },
  { href: "/events-news", label: "Events & News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="PKMI home" onClick={() => setOpen(false)}>
          <span className="brand-mark"><img src="/images/pkmi-emblem.jpg" alt="" /></span>
          <span className="brand-copy">
            <strong>PHENOMENAL KINGDOM<br />MOTHERS INTERNATIONAL</strong>
            <small>Motherhood is a grace. Motherhood is a mantle.</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>

        <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav-link active" : "nav-link"}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link className="button button-small nav-cta" href="/membership" onClick={() => setOpen(false)}>
            Connect with Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
