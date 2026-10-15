import type { ReactNode } from "react";
import SiteHeader from "@/app/components/SiteHeader";
import SmoothScroll from "@/app/components/SmoothScroll";
import MemoryGame from "@/app/components/MemoryGame";
import ContactForm from "@/app/components/ContactForm";
import ZeroOne from "@/app/components/ZeroOne";
import WhyFlipCards from "@/app/components/WhyFlipCards";
import WorkSlider, { type WorkItem } from "@/app/components/WorkSlider";
import MotionPathSection from "@/app/components/MotionPathSection";
import Testimonials from "@/app/components/Testimonials";
import ApproachSection from "@/app/components/ApproachSection";
import MomentumSection from "@/app/components/MomentumSection";
import FAQAccordion from "@/app/components/FAQAccordion";
import HeroBrand from "@/app/components/HeroBrand";

const services = [
  { title: "Design", copy: "Memorable brands and interfaces. We shape your identity, product design, and positioning so your product feels clear and distinctive.", code: "01", image: "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b8cb582beb1d50ae2f3185_O.avif" },
  { title: "Build", copy: "Scalable tech with a weekly shipping cadence. We own the full stack—from MVP to infrastructure—delivering production-ready code every week.", code: "02", image: "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b8cb58d5c75d3ecd98502f_N.avif" },
  { title: "Launch", copy: "Real traction, not vanity metrics. We drive GTM, pilots, and partnerships to accelerate adoption and growth.", code: "03", image: "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b8cb586246126888811e32_E.avif" },
];

const work: WorkItem[] = [
  { category: "Brand Systems / Communication / Assets", title: "Turning Brand into a Working System", description: "Helped turn an existing brand into a more complete system the team could use consistently across touchpoints.", image: "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dccd854e6d62f474713a03_engame%20img-14.avif" },
  { category: "Brand Strategy / Identity / Fundraising", title: "Clarifying the Story for Fundraising", description: "Reworked the brand and narrative to help the company show up more clearly in fundraising conversations.", image: "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dccd4cf9cf2a0cf6adfd44_agritrak%20img-12.avif" },
  { category: "Brand / Identity / Healthcare", title: "Building a Brand Around Trust and Precision", description: "Created a clearer, more credible brand system for a physician-led care platform expanding its footprint.", image: "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dccce34f56ecd8a925c6ef_Travellier%20img.avif" },
  { category: "Internal Systems / Engineering / Infrastructure", title: "Building the Systems Behind Growth", description: "Helped a fast-growing consumer brand put stronger internal systems in place as operations scaled.", image: "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dcd82214943751a716881c_ithaca%20hummus%20thumbnail.avif" },
  { category: "Product Design / Loyalty", title: "Designing a Connected Loyalty Experience", description: "Designed the MVP for a loyalty experience connecting stores, customers, and operations in one system.", image: "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dcd86bc8db79ea217048e2_hra%20thumbnail.avif" },
  { category: "Data / Platform / Infrastructure", title: "Powering a Circular Discovery Platform", description: "Built the underlying data engine needed to power discovery across circular economy programs and services.", image: "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dcd8ab88ff862aee169af8_circular%20eco%20thumbnail.avif" },
  { category: "Product / GTM / Fundraising", title: "Shaping the Path from Idea to Product", description: "Worked closely with the founder to sharpen the product direction, user understanding, and investor story.", image: "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dcd8e3c892f10fea84543c_twendi%20thumbnail.avif" },
];

const reasons = [
  ["Lean operating pod", "You do not get account managers or handoffs. You get operators. The people you meet are the people building, deciding, and shipping."],
  ["Outcomes in ambiguity", "We do not wait for a perfect brief. We step into the mess, find the real bottleneck, create clarity fast, and own the outcome."],
  ["Weekly shipping cadence", "We ship every week and show artifacts, not status updates. Progress is visible. Decisions are documented. Momentum compounds."],
  ["Distribution & traction", "Craft matters. Adoption matters more. We build with distribution in mind so what ships actually gets used, grows, and drives results."],
];

const approach = [
  ["01", "Diagnose", "We align on the goal, constraints, risks, and what “success” means."],
  ["02", "De-risk", "We validate assumptions early - customers, pricing, feasibility, distribution."],
  ["03", "Build", "Weekly cadence. Clear owners. High craft. No chaos."],
  ["04", "Launch + Grow", "We ship, measure, learn, and iterate until it sticks."],
];

const momentum = [
  ["01", "The 30-Min Jam", "We ask the hard questions - context, constraints, and “what is actually at stake?” No pitch, just clarity to see if we can move the needle for you."],
  ["02", "The Sprint Plan", "Within 48 hours, you receive a clear plan detailing outcomes, timeline, and investment. We define exactly what the first two weeks of execution will ship."],
  ["03", "Weekly deliverables", "Sprint priorities, shipped work, decisions logged, and the next sprint plan."],
  ["04", "Weekly Execution", "We run on a relentless cadence. Every week, you receive a prioritized sprint plan, shipped artifacts (code, design, or GTM assets), and a decision log documenting the “why” behind every move."],
];

const people = [
  ["Bhuvish Mehta", "Founder", "Usually found talking to founders, thinking about sales, and getting excited about hard business problems.", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69c2810ddd42035a25b280cc_Bhuvish%20Mehta.avif"],
  ["Kshitija Sarda", "Founding Team - Growth & Operations", "Keeps the trains running, the priorities clear, and the weekly momentum real.", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69c28115d8f1fdd95b369ee4_Kshitija.avif"],
  ["Mike Deats", "Advisor | ex-Paychex, PrimePay", "Brings a calm, experienced view on systems, product, and building things properly.", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69c2812b85f116be5e268795_M%20Deats%20Headshot%20-%20Michael%20Deats.avif"],
  ["Rob Poltrino", "Advisor | COO, SDH Capital", "Helps keep the business side sharp - from financial thinking to operational discipline.", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69c28137a733f1306b7f3250_Rob%20Poltrino.avif"],
  ["Mike Della Porta", "Advisor | ex-CTO, Butler/Till", "Brings technology and growth experience from years of building and scaling real companies.", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69c28121fd70f838266c8aa1_MDP%20Headshot%20-%20Mike%20Della%20Porta.avif"],
];

const clientLogos = [
  ["twendi", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69ca6004302a7f6b80e70d30_twendi%20logo.svg"],
  ["PreDiXome bio", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69d897de4fdb8dfcc7bfeb11_predixome-bio%20logo.svg"],
  ["circular.eco", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69ca60048ac79e3ca54350ef_circular-eco%20logo.svg"],
  ["Ithaca Hummus", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69ca600493f8e6e24dd06325_ithaca-hummus%20logo.svg"],
  ["Agriotrak", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69d897de442ab9b1089cc4d6_agriotak%20logo.svg"],
  ["Unify", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69ca60040cf7c29599d2bf19_unify%20logo.svg"],
  ["Endgame Advisory", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69ca6004294cf400ea69df11_endgame-advisory%20logo.svg"],
  ["HRA", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69ca6004eb8eb5fe378c2c1c_hra%20logo.svg"],
];

const stats = [
  ["12+", "Years of experience", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b8dc235426dde7452da952_Frame%20284.avif"],
  ["23+", "Startups supported", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b8da3760e9285f5e9f4d5a_Rectangle%2042.avif"],
  ["51+", "Weeks of shipping", "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b8dc236a13b4d542dd0126_Frame%20285.avif"],
];

const testimonials = [
  ["Bhuvish has helped our business tremendously. From ideation to fundraising strategy to building product. We couldn’t be more grateful for his contribution.", "Adam Franklin", "Founder & CEO, Twendi", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69cabf6d3af5ed228049802c_Adam%20_%20Twendi.avif"],
  ["They delivered our product-spec site quickly with clear communication and professionalism. They understood our needs and built a reliable platform for managing product information.", "Tom McLernon", "Director, Ithaca Hummus", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69cabf82509b788add0b1b2b_Ithaca%20Hummus.avif"],
  ["The team delivered timely service and strong visual branding, fully understanding our goals. I’ll continue recommending them to others.", "Ian Wilson, MD", "CEO & Co-Founder, Travelier IR Services LLC", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69cabf92599c96cf1cfccd10_Ian%20Wilson.avif"],
  ["The team provided strong design and architecture support and was a reliable partner throughout our project.", "Param Modi", "Product Development Engineer, HRA", "https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69cabf9b663d74611bce35ce_Param%20_%20HRA.avif"],
];

const faqs: [string, string][] = [
  ["How are you different from an agency, dev shop, or consultancy?", "We work alongside you to understand the problem first and stay involved until there is real progress."],
  ["What kinds of teams are a fit?", "Founders and leadership teams building something meaningful who want hands-on execution."],
  ["What does a sprint actually include?", "A focused engagement that clarifies priorities and delivers usable outputs your team can act on immediately."],
  ["What does success look like?", "Things feel clearer. Decisions are easier. Momentum increases."],
  ["How do you price engagements?", "We scope carefully, keep timelines clear, and share pricing upfront."],
  ["How quickly can we start?", "Typically within a week after the first conversation."],
];

function IndexTag({ children }: { children: string }) {
  return <span className="section-index">[ {children} ]</span>;
}

function SectionTitle({ index, children, dark = false }: { index: string; children: ReactNode; dark?: boolean }) {
  return <header className={`section-title${dark ? " section-title--dark" : ""}`}><IndexTag>{index}</IndexTag><h2>{children}</h2></header>;
}

function FounderMotif({ variant }: { variant: "founders" | "leaders" }) {
  const src = variant === "founders"
    ? "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b324c052ce26982522a45b_Layer_1.svg"
    : "https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b324c0a0df578a0bc2f9e4_Layer_1-1.svg";
  return <img className="founder-motif" src={src} alt="" loading="lazy" />;
}

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero__headline-wrap">
            <h1 id="hero-title" className="heading-style-h2">
              <span className="hero__title-first-line"><span className="hero__index">[ 00000 ]</span><span className="hero__title-copy">Execution shouldn’t</span></span>
              <span className="hero__title-second-line"><span>(feel)<sup>*</sup></span> slow or lonely</span>
            </h1>
          </div>
          <HeroBrand />
        </section>

        <section className="clients" id="clients" aria-labelledby="clients-title">
          <header className="clients__heading">
            <IndexTag>00001</IndexTag>
            <h2 id="clients-title"><span className="clients__title-line"><span>Clients</span><span className="clients__eye" aria-hidden="true"><span className="clients__eye-zero">0</span></span><span>Who</span></span><span className="clients__title-line">Chose Execution</span></h2>
          </header>
          <ul className="clients__list" aria-label="Our clients">
            {clientLogos.map(([name, logo]) => <li className="clients__wordmark" key={name}><img src={logo} alt={name} loading="lazy" /></li>)}
          </ul>
        </section>

        <section className="founders section-dark" id="about">
          <header className="founders__intro">
            <h2>Two Builders. One<br />Momentum.</h2>
            <div className="founders__copy"><IndexTag>00010</IndexTag><p>We work best with founders, leaders, and CXOs who care about ownership, move with speed, value craft, and expect steady weekly progress.</p></div>
          </header>
          <div className="founder-grid">
            <article className="founder-card"><div className="founder-art"><img src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b3269ca7250e2366de64d4_Frame%20204.avif" alt="A diverse group of founders and builders" loading="lazy" /></div><div className="founder-card__body"><div className="founder-card__heading"><h3>Founders</h3><FounderMotif variant="founders" /></div><span className="founder-card__tag">EARLY STAGE</span><p>You’ve got conviction and high standards. You need a senior pod that can move fast, make decisions, and own outcomes - so you’re not spending weeks coordinating people.</p></div></article>
            <article className="founder-card"><div className="founder-art"><img src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b3268b2202472660ed9eb9_Frame%20278.avif" alt="Black and white portraits of six diverse individuals" loading="lazy" /></div><div className="founder-card__body"><div className="founder-card__heading"><h3>CXO’s &amp; Leaders</h3><FounderMotif variant="leaders" /></div><span className="founder-card__tag">1 → 10</span><p>You want innovation that actually ships and gets adopted - a real product line, not another internal initiative that starts strong and fades out.</p></div></article>
          </div>
        </section>

        <MemoryGame />

        <section className="services section-dark" id="what-we-do" aria-labelledby="services-title"><header className="services__heading"><IndexTag>00011</IndexTag><h2 id="services-title">What we do</h2><span aria-hidden="true" /></header><div className="service-grid">{services.map(({ title, copy, code, image }, index) => <article className={`service-card service-card--${index + 1}`} key={title}><img className="service-card__image" src={image} alt="" loading="lazy" /><span className="service-card__number" aria-hidden="true">{code}</span><h3>{title}</h3><p>{copy}</p><span className="service-card__arrow" aria-hidden="true">↗</span></article>)}</div></section>

        <section className="work-section section-dark" id="our-work" aria-labelledby="work-title"><header className="work-section__heading"><IndexTag>00100</IndexTag><h2 id="work-title">Our Works</h2></header><WorkSlider items={work} /></section>

        <MotionPathSection />

        <section className="stats-section section-light"><SectionTitle index="00101">Execution By Numbers</SectionTitle><div className="stats-grid">{stats.map(([number, label, image]) => <article key={label}><img src={image} alt="" loading="lazy" /><strong>{number}</strong><p>{label}</p></article>)}</div></section>

        <section className="why-section section-dark" aria-labelledby="why-title"><header className="why-section__heading"><div className="why-section__heading-inner"><IndexTag>Why Choose Us</IndexTag><h2 id="why-title">We are built to operate,<br />not just to deliver</h2></div></header><div className="why-content"><div className="why-art"><img src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b8dd7abb06beafda801156_Rectangle%2058.avif" alt="Sculptural black form with flowing curves" loading="lazy" /><img src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b8dd7abd2ee1f92849c54e_Rectangle%2060.avif" alt="A team collaborating around a laptop" loading="lazy" /></div><WhyFlipCards items={reasons} /></div></section>

        <Testimonials items={testimonials.map(([quote, name, role, image]) => ({ quote, name, role, image }))} />

        <ApproachSection items={approach} />

        <MomentumSection items={momentum} />

        <div className="ticker" aria-label="Build with clarity. From zero to one. Ship every week. Own the outcome.">
          {["back", "front"].map((layer) => <div className={`ticker__ribbon ticker__ribbon--${layer}`} key={layer} aria-hidden="true"><div className="ticker__track">{Array.from({ length: 4 }, (_, index) => <span key={index}>BUILD WITH CLARITY <b>0</b> FROM ZERO TO ONE <b>1</b> SHIP EVERY WEEK <b>0</b> OWN THE OUTCOME <b>1</b></span>)}</div></div>)}
        </div>

        <section className="team-section section-dark" aria-labelledby="team-title">
          <header className="team-section__heading">
            <h2 id="team-title">Meet our team<br />and advisors</h2>
            <div><IndexTag>01010</IndexTag><p>Small team. Clear thinking. Fast moving. The best people to have in the room when things get messy.</p></div>
          </header>
          <div className="team-roster">{people.map(([name, role, copy, image]) => <article className="team-roster__row" key={name} tabIndex={0}>
            <div className="team-roster__identity"><h3>{name}</h3><span className="team-grid__role"><i aria-hidden="true" />{role}</span></div>
            <img className="team-roster__portrait" src={image} alt={name} loading="lazy" />
            <p>{copy}</p>
          </article>)}</div>
        </section>

        <section className="contact-section section-light" id="contact"><div className="contact-heading"><IndexTag>01011</IndexTag><h2>Ready to<br />flip the bit?</h2><svg className="contact-zero" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 2 59 9 70 5 76 16 88 17 89 30 99 38 94 50 99 62 89 70 88 83 76 84 70 95 59 91 50 98 41 91 30 95 24 84 12 83 11 70 1 62 6 50 1 38 11 30 12 17 24 16 30 5 41 9Z" fill="#ffdd00" stroke="#111" strokeWidth="3"/><text x="50" y="63" textAnchor="middle" fontFamily="monospace" fontSize="42" fontWeight="700" fill="#111">Ø</text></svg></div><ContactForm /></section>

        <section className="zero-faq-section" aria-label="Zero to one game and frequently asked questions">
          <ZeroOne />
          <section className="faq-section" aria-labelledby="faq-title">
            <h2 id="faq-title">Cut the noise. Get the <mark>answers.</mark></h2>
            <FAQAccordion items={faqs} />
          </section>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-route" aria-hidden="true"><span>[0]</span><i /><span>[1]</span><i /><span>[N]</span></div>
          <div className="footer-main">
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href="#home">Home</a><a href="#about">About Us</a><a href="#what-we-do">What We Do</a><a href="#our-work">Our Works</a>
            </nav>
            <div className="footer-contact">
              <h2>Keep In Touch</h2>
              <p>Leave your email to become a member of our community, for inspiring wonder, openness, and possible opportunities.</p>
              <form className="footer-signup" action="mailto:themosol9@reachus.si" method="post" encType="text/plain">
                <label className="sr-only" htmlFor="footer-email">Email address</label>
                <input id="footer-email" name="Email Address" type="email" placeholder="Email Address" required />
                <button type="submit" aria-label="Send email address">→</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 All Rights Reserved · Made by Web Anatomy</span>
          </div>
            <div className="footer-wordmark-marquee" role="img" aria-label="The Mosol9">
              <div className="footer-wordmark-track" aria-hidden="true">
                <span className="footer-wordmark">The Mosol9<span>.</span></span>
                <span className="footer-wordmark">The Mosol9<span>.</span></span>
              </div>
            </div>
        </div>
      </footer>
    </>
  );
}
