import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Link className="brand brand-footer" href="/">
            <span className="brand-mark"><img src="/images/pkmi-emblem.jpg" alt="" /></span>
            <span className="brand-copy">
              <strong>PHENOMENAL KINGDOM<br />MOTHERS INTERNATIONAL</strong>
              <small>Motherhood is a grace. Motherhood is a mantle.</small>
            </span>
          </Link>
          <p>A Christian spiritual forum bringing together women who serve God to strengthen families, encourage one another and serve faithfully.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About PKMI</Link>
          <Link href="/our-work">Our Work</Link>
          <Link href="/events-news">Events & News</Link>
          <Link href="/membership">Membership</Link>
        </div>
        <div>
          <h3>Get in touch</h3>
          <Link href="/contact">Contact the team</Link>
          <Link href="/membership">Membership enquiries</Link>
          <a href="mailto:info@pkmi.org">Email PKMI</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Phenomenal Kingdom Mothers International.</span>
          <span>Faith · Fellowship · Service</span>
        </div>
      </div>
    </footer>
  );
}
