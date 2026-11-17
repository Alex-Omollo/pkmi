import Link from "next/link";
import { FeaturedGallery } from "@/components/gallery/featured-gallery";

const activities = [
  { number: "01", title: "Conferences & gatherings", text: "National and international gatherings that encourage spiritual growth, connection and shared purpose." },
  { number: "02", title: "Prayer & retreats", text: "Prayer, fasting and retreat experiences that strengthen faith and fellowship." },
  { number: "03", title: "Learning & development", text: "Seminars, workshops and professional teams that build capacity for effective service." },
  { number: "04", title: "Family & community support", text: "Initiatives that encourage, support and strengthen servants of God and their families." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        {/* <div className="hero-image" aria-hidden="true" /> */}
        <div className="container hero-content">
          <span className="eyebrow">A Christian spiritual forum</span>
          <h1>Raising Kingdom Mothers.<br /><em>Strengthening</em> Generations.</h1>
          <p>Connecting women who serve God through faith, fellowship, prayer and practical support for stronger families and communities.</p>
          <div className="hero-actions">
            <Link className="button" href="/about">Discover PKMI <span aria-hidden="true">↗</span></Link>
            <Link className="text-link text-link-light" href="/our-work">Explore our work <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-note"><span className="hero-note-line" /> Motherhood is a grace. Motherhood is a mantle.</div>
        </div>
        <div className="hero-scroll">SCROLL TO DISCOVER <span>↓</span></div>
      </section>

      <section className="intro-section section-pad">
        <div className="container intro-grid">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>A community of women,<br /><em>united by purpose.</em></h2>
          </div>
          <div className="intro-copy">
            <p className="lead">Phenomenal Kingdom Mothers International (PKMI) is a Christian spiritual forum, birthed by God and for God.</p>
            <p>It is a network of women servants of God who came together because of the social, spiritual, emotional and economic challenges affecting families of servants of God.</p>
            <Link className="text-link" href="/about">Get to know PKMI <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="purpose-section section-pad">
        <div className="container purpose-grid">
          <div className="purpose-heading">
            <span className="eyebrow eyebrow-light">Our direction</span>
            <h2>Faith that inspires.<br /><em>Purpose that moves.</em></h2>
            <p>We stand in the gap, support the welfare of servants of God and strengthen Christian marriages, parenting and the character of individuals and families.</p>
          </div>
          <div className="purpose-cards">
            <article className="purpose-card">
              <span className="card-index">01 / VISION</span>
              <h3>Building strong families</h3>
              <p>To build servants of God together with their families to be spiritually, socially and economically prosperous and stable enough to serve God fruitfully.</p>
            </article>
            <article className="purpose-card">
              <span className="card-index">02 / MISSION</span>
              <h3>Nurturing potential</h3>
              <p>To stir up the Christian potential to nurture servants of God to influence their generation while creating a common front through networking and collaboration.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="container">
          <div className="section-heading-row">
            <div><span className="eyebrow">How we serve</span><h2>Purpose in <em>action.</em></h2></div>
            <Link className="text-link" href="/our-work">Discover our work <span aria-hidden="true">→</span></Link>
          </div>
          <div className="activity-grid">
            {activities.map((item) => (
              <article className="activity-card" key={item.number}>
                <span className="activity-number">{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
                <span className="activity-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FeaturedGallery />

      <section className="values-section section-pad">
        <div className="container values-layout">
          <div><span className="eyebrow">What guides us</span><h2>Rooted in faith.<br /><em>Grounded in service.</em></h2><p>Our values shape how we relate, serve and grow together as a community.</p></div>
          <div className="value-list">
            {['Fear of the Lord', 'God’s love demonstrated', 'Honour for servants of God', 'Discipline & integrity', 'Unity & collaboration', 'Prayer & compassion', 'Service & faithfulness'].map((value, index) => <span key={value}><b>0{index + 1}</b>{value}</span>)}
          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="container join-inner">
          <div><span className="eyebrow eyebrow-light">There is a place for you</span><h2>Let’s strengthen<br /><em>families together.</em></h2><p>Discover the PKMI community, learn about membership and connect with us.</p></div>
          <Link className="button button-gold" href="/membership">Explore membership <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
