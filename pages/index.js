import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const TIS13 = [
  { id:'TIS-01', name:'Neuro-Adaptive Learning Engine', abbr:'NALE',
    desc:'Real-time curriculum orchestration based on live cognitive state. Adjusts content type, difficulty gradient, pacing, and modality every 15 seconds based on 47 concurrent behavioral signals.' },
  { id:'TIS-02', name:'Emotion & Affect Intelligence Module', abbr:'EAIM',
    desc:'Multimodal emotion sensing via facial micro-expressions, voice prosody, keystroke latency, and cursor hesitation. Classifies 22 distinct affective states and triggers adaptive interventions.' },
  { id:'TIS-03', name:'Synthetic Cognition Engine', abbr:'SCE',
    desc:"Simulates the learner's internal mental model — tracking knowledge gaps, misconceptions, and belief structures. Enables the system to teach the concept, not just the answer." },
  { id:'TIS-04', name:'Predictive Scaffolding System', abbr:'PSS',
    desc:'Anticipates cognitive load and conceptual difficulty 3–5 learning interactions ahead. Deploys preemptive support structures before the learner experiences failure.' },
  { id:'TIS-05', name:'Contextual Intelligence Engine', abbr:'CIE',
    desc:"Maintains a 6-dimensional context model: temporal, spatial, emotional, social, cultural, and historical. Ensures every interaction is situated in the learner's reality." },
  { id:'TIS-06', name:'Curiosity Loop Architecture', abbr:'CLA',
    desc:'Embeds an Internal Surprise Metric (ISM) that drives autonomous knowledge-seeking behavior in the AI. The system explores conceptual gaps without external prompting.' },
  { id:'TIS-07', name:'Generative Curriculum Studio', abbr:'GCS',
    desc:'GAN + LLM hybrid that generates fully personalized, culturally-calibrated educational content in real time. Produces lessons, assessments, simulations, and explanations on demand.' },
  { id:'TIS-08', name:'Cognitive Modeling at Scale', abbr:'CMS',
    desc:'Digital-twin model of each learner\'s cognitive architecture. Predicts error patterns, knowledge transfer readiness, and mastery timelines with 94%+ accuracy at scale.' },
  { id:'TIS-09', name:'Empathy Engine', abbr:'EE',
    desc:'Simulates emotionally-attuned responses that honor learner dignity without surveillance. Distinguishes support from monitoring; builds psychological safety as a design property.' },
  { id:'TIS-10', name:'Meta-Cognitive Reflection Layer', abbr:'MCRL',
    desc:"The system's self-awareness module. Monitors the platform's own decision quality, flags uncertainty, and triggers strategy pivots when interventions underperform." },
  { id:'TIS-11', name:'Social & Collaborative Intelligence', abbr:'SCI',
    desc:'Models group learning dynamics, peer influence, collaborative cognition, and social motivation. Orchestrates peer-to-peer learning moments at optimal times.' },
  { id:'TIS-12', name:'Ethical Reasoning Arbiter', abbr:'ERA', special:'era',
    desc:'Every decision made by TIS-01 through TIS-11 passes through ERA before execution. Applies moral backpropagation, bias detection, and consent verification in real time.' },
  { id:'TIS-13', name:'Wisdom Integration Layer', abbr:'WIL', special:'wil',
    desc:'The highest-order layer. Synthesizes outputs from all 12 subsystems into long-horizon pedagogical strategy. Optimizes for human flourishing, not just task completion.' },
]

const VOLUMES = [
  { num:'I',   title:'The Cognitive Intelligence Stack',       tag:'13 Subsystems',      desc:'The technological soul of Tilaversity — 13 interlocking AI subsystems that compound in intelligence as the platform scales, connected by the real-time Cognitive State Bus.' },
  { num:'II',  title:'Revenue Architecture & Economic Moat',  tag:'$1T Path',           desc:'A 6-layer revenue pyramid from freemium access to sovereign government contracts, defended by four unassailable economic moats that widen with every new learner.' },
  { num:'III', title:'Global Deployment Infrastructure',      tag:'2.4B Learners',      desc:'Three-tier cloud/edge/on-device architecture enabling sub-15ms response times across 190 nations, with full offline capability for 1.3B learners in emerging markets.' },
  { num:'IV',  title:'Ethical AI & Governance Framework',     tag:'9 Principles',       desc:'Ethics as competitive advantage. The Tilaversity Ethics Architecture embeds moral reasoning at every layer of the cognitive stack — not as compliance, but as architecture.' },
  { num:'V',   title:'Product Ecosystem & Platform Strategy', tag:'5 Surfaces',         desc:'Five product surfaces, a developer API economy targeting $500M by Year 7, and a Research Institute that converts intellectual authority into enterprise deals.' },
  { num:'VI',  title:'Legacy Engineering & Future Proofing',  tag:'Century-Scale',      desc:'The Temporal Design Framework stress-tests every decision across four time horizons up to 100+ years. Modular Immortality Architecture ensures zero-downtime evolution forever.' },
]

const REVENUE_TIERS = [
  { code:'L6', name:'Sovereignty',  title:'COGNITIVE SOVEREIGNTY TIER',     desc:'Enterprise contracts with governments, supranational bodies (UNESCO, World Bank), and national education ministries.', price:'$50M–$500M / yr' },
  { code:'L5', name:'Institutional',title:'INSTITUTIONAL INTELLIGENCE',     desc:'University systems, hospital networks, corporate universities. B2B SaaS with deep API integration and custom cognitive models.', price:'$500K–$50M ACV' },
  { code:'L4', name:'Enterprise',   title:'ENTERPRISE WORKFORCE INTELLIGENCE',desc:'Corporate L&D, onboarding, and skills development. Per-seat and outcome-based pricing. Targets Fortune 500 and large employers.', price:'$100–$500/seat/yr' },
  { code:'L3', name:'Professional', title:'PROFESSIONAL & CREATOR ECONOMY',  desc:'Certifications, professional upskilling, content creator tools, and AI-powered course-building platform.', price:'$50–$200/yr' },
  { code:'L2', name:'Consumer',     title:'DIRECT CONSUMER SUBSCRIPTIONS',   desc:'Individual learners: K-12, university students, adult learners. The volume engine that fuels data compounding.', price:'$15–$80/mo' },
  { code:'L1', name:'Access',       title:'FREEMIUM & ACCESS GATEWAY',       desc:'Zero-cost access tier for emerging markets, NGO partnerships, and viral acquisition. Creates the data flywheel.', price:'Free' },
]

const MOATS = [
  { num:'01', title:'Data Gravity', desc:"Tilaversity accumulates the world's richest dataset of human cognitive development. 500M+ daily events. Each new learner makes the models smarter. Competitors cannot buy this advantage — they must earn it through time and users." },
  { num:'02', title:'Switching Cost Architecture', desc:'Every learner profile is a years-long cognitive fingerprint. Every institution has custom AI models trained on their specific population. The deeper the integration, the more catastrophic the switching cost becomes.' },
  { num:'03', title:'Regulatory Entrenchment', desc:"Tilaversity proactively shapes the regulatory landscape for AI in education. By setting the ethical and technical standards, we ensure that compliance frameworks describe our platform. Becoming the compliance standard is the most durable moat." },
  { num:'04', title:'Talent & Disciplinary Density', desc:'Building TIS-13 requires the rarest combination of talent on earth: cognitive neuroscientists, AI architects, educational philosophers, affective computing engineers, and ethical AI designers.' },
]

const ROADMAP = [
  { phase:'Phase 1', name:'Foundation',      timeframe:'Months 1–12',  target:'1M Learners',   arrt:'Series A/B', desc:'Deploy TIS-01 through TIS-06. Seed the Cognitive Data Lake. Prove cognitive superiority over incumbents.', tags:['NALE + EAIM live','CSB v1.0','TEA Layer 1 & 2','10 Institutional Clients'] },
  { phase:'Phase 2', name:'Compounding',     timeframe:'Year 2–3',     target:'20M Learners',  arrt:'$200M ARR',  desc:'Launch TIS-07 through TIS-10. Developer API platform. Network effects begin. Platform measurably smarter than competition.', tags:['GCS Engine Live','API Platform v1.0','Full TIS-13 Integrated','3 Government Contracts'] },
  { phase:'Phase 3', name:'Dominance',       timeframe:'Year 4–6',     target:'200M Learners', arrt:'$2B ARR',    desc:'All TIS-13 live. Global presence across 6 regions. Tilaversity OS launched for institutions. IPO preparation.', tags:['Tilaversity OS','Research Institute','20 Governments','Full MIA Enforced'] },
  { phase:'Phase 4', name:'Civilizational',  timeframe:'Year 7–12',    target:'2.4B Learners', arrt:'$100B ARR',  desc:'Cognitive OS becomes the global standard. Trillion-dollar valuation. Temporal Design Framework fully operative.', tags:['60+ Governments','$1T Valuation','Global Cognitive OS','Legacy Protocols Live'] },
]

const PRINCIPLES = [
  { num:'01', title:'Human Dignity is Non-Negotiable', desc:'Every learner, regardless of geography, ability, or background, receives the same foundational respect from every Tilaversity system.' },
  { num:'02', title:'Consent is Structural, Not Cosmetic', desc:'All data use is informed, voluntary, revocable, and granular. Emotional data is the most sacred — processed on-device, never stored without explicit opt-in.' },
  { num:'03', title:'Transparency as a Design Property', desc:'Every adaptive intervention can be explained in plain language. No black boxes where human lives are involved.' },
  { num:'04', title:'Bias is Inevitable; Inaction is Inexcusable', desc:'Continuous bias auditing, diverse training data curation, and differential performance monitoring across all demographic groups.' },
  { num:'05', title:'Alignment Over Autonomy', desc:'AI augments human judgment. It never replaces it in high-stakes educational and developmental decisions.' },
  { num:'06', title:'Scale Without Soul Erosion', desc:'As the platform grows, ethical standards strengthen, not weaken. Ethics-by-design pipelines are mandatory, not optional.' },
  { num:'07', title:'No Dark Patterns, No Behavioral Hacking', desc:'Tilaversity optimizes for long-term human flourishing. Engagement metrics that conflict with learner wellbeing are discarded.' },
  { num:'08', title:'Accountability Has No Expiration', desc:'Detailed decision logs, provenance chains, and audit trails. Every cognitive intervention is attributable, reversible, and owned.' },
  { num:'09', title:'Build for the Mind You Want to Meet', desc:"Before deploying any system, ask: Would I want this AI to interact with my child? If the answer is uncertain, the system is not ready." },
]

const SURFACES = [
  { num:'1', label:'Surface 1', title:'Tilaversity Learner', sub:'Consumer AI Tutor',                    role:'Mass adoption engine, data flywheel, brand equity builder', badge:'Volume Engine' },
  { num:'2', label:'Surface 2', title:'Tilaversity Educator', sub:'Teacher Co-Intelligence',             role:'Institutional sales driver, educator loyalty, curriculum integration lock-in', badge:'Institutional Lock-in' },
  { num:'3', label:'Surface 3', title:'Tilaversity Studio', sub:'AI Curriculum Builder',                 role:'Creator economy play; turns every educator into a content creator on our infrastructure', badge:'Creator Economy' },
  { num:'4', label:'Surface 4', title:'Tilaversity Enterprise', sub:'Corporate Intelligence Platform',   role:'High-ACV B2B engine; fastest path to $1B ARR milestone', badge:'$1B ARR Driver' },
  { num:'5', label:'Surface 5', title:'Tilaversity OS', sub:'Institutional Cognitive Operating System',  role:'Government & university deals; positions Tilaversity as cognitive infrastructure', badge:'Sovereign Play' },
]

const TEA_LAYERS = [
  { layer:'TEA-1', title:'Algorithmic Ethics', desc:'Every output from TIS-01 through TIS-12 is audited by ERA before delivery. Real-time bias detection, consent verification, emotional boundary checking, and dignity preservation. Latency budget: <5ms.' },
  { layer:'TEA-2', title:'Data Ethics Protocol', desc:"All learner data governed by the Tilaversity Data Covenant: explicit informed consent, granular user control, right to deletion, right to explanation. Emotional signals processed on-device only." },
  { layer:'TEA-3', title:'Institutional Governance Board', desc:'Independent multi-disciplinary board of cognitive scientists, educational ethicists, child protection specialists, policymakers, and civil society representatives.' },
  { layer:'TEA-4', title:'Recursive Moral Co-Adaptation', desc:'The platform continuously simulates ethical dilemmas, tests its own decision-making against diverse moral frameworks, and updates its ethical priors. Humans and AI grow ethically together.' },
]

const MIA_PRINCIPLES = [
  { icon:'μS', title:'Cognitive Microservices', desc:'Every intelligence subsystem in TIS-13 is independently deployable, scalable, and replaceable. No single subsystem has dependencies that would cause cascading failure.' },
  { icon:'⊢',  title:'Schema-First Contracts',  desc:'All inter-subsystem communication uses versioned, schema-validated cognitive state contracts. Breaking changes require explicit migration protocols with backward compatibility windows.' },
  { icon:'∞',  title:'Evolutionary Data Architecture', desc:'The Cognitive Data Lake is designed to accommodate data structures that do not yet exist. Schema evolution is a first-class concern, not a retrofit.' },
  { icon:'⌛', title:'Ethical Archival Protocols', desc:'All deployed models are archived with their training data, evaluation results, and the ethical context in which they were approved. Full historical reconstruction enabled.' },
  { icon:'⟳',  title:'Graceful Degradation Design', desc:'Every cognitive subsystem has defined fallback behaviors that maintain learner dignity and safety even when primary intelligence fails.' },
  { icon:'◉',  title:'Sunset Protocols', desc:'Every architectural component has predefined conditions under which it will be retired. This prevents technical debt accumulation and ensures continuous platform renewal.' },
]

// ─── NEURAL CANVAS ────────────────────────────────────────────────────────────
function NeuralCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const nodes = []
    const count = 60

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2 + 1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update positions
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.25
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(37,99,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(77,141,255,0.5)'
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} id="neural-canvas" />
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0
        const num = parseFloat(target)
        const steps = 60
        const inc = num / steps
        const timer = setInterval(() => {
          start += inc
          if (start >= num) { setVal(num); clearInterval(timer) }
          else setVal(parseFloat(start.toFixed(1)))
        }, 20)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{prefix}{typeof target === 'string' && isNaN(target) ? target : val}{suffix}</span>
}

// ─── SCROLL REVEAL HOOK ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className="nav" style={{ borderBottomColor: scrolled ? 'var(--border-hi)' : 'var(--border)' }}>
      <a href="#" className="nav-logo">TILA<span>VERSITY</span></a>
      <ul className="nav-links">
        {['Architecture','Subsystems','Revenue','Infrastructure','Ethics','Roadmap'].map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
        ))}
      </ul>
      <span className="nav-badge">Confidential · 2025</span>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">Ultra Architecture Blueprint</div>
      <h1 className="hero-title">
        Tilaversity<br /><em>Ultra Architecture</em>
      </h1>
      <p className="hero-subtitle">The Blueprint for a $1 Trillion AI Company</p>
      <p className="hero-desc">
        A unified, cross-domain framework for designing, building, deploying, and governing
        the world's most sophisticated adaptive AI platform — the cognitive operating system
        for human development at planetary scale.
      </p>
      <div className="hero-metrics">
        {[
          { v:'$1T',   l:'Target Valuation (10yr)' },
          { v:'2.4B',  l:'Addressable Learners' },
          { v:'13',    l:'Intelligence Subsystems' },
          { v:'500M+', l:'Daily Data Events' },
          { v:'190',   l:'Target Nations' },
        ].map(m => (
          <div className="metric-item" key={m.l}>
            <div className="metric-value">{m.v}</div>
            <div className="metric-label">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="hero-cta">
        <a href="#architecture" className="btn-primary">Explore Architecture ↓</a>
        <a href="#roadmap" className="btn-secondary">View Roadmap →</a>
      </div>
    </section>
  )
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function Architecture() {
  return (
    <section className="section" id="architecture">
      <div className="section-label">Architecture Overview</div>
      <h2 className="section-title">Six Volumes of <em>Civilizational</em> Design</h2>
      <p className="section-intro">
        The Ultra Architecture is organized into six major volumes, each governing a distinct dimension
        of the platform. Together they constitute a complete specification for building a cognitive AI institution at scale.
      </p>
      <div className="vol-grid reveal">
        {VOLUMES.map(v => (
          <div className="vol-card" key={v.num}>
            <div className="vol-num">{v.num}</div>
            <div className="vol-title">{v.title}</div>
            <div className="vol-desc">{v.desc}</div>
            <span className="vol-tag">{v.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── TIS-13 ──────────────────────────────────────────────────────────────────
function Subsystems() {
  return (
    <section className="section" id="subsystems">
      <div className="section-divider" style={{maxWidth:'none',padding:0,position:'relative',zIndex:1}} />
      <div className="section-label" style={{marginTop:'4rem'}}>Volume I</div>
      <h2 className="section-title">The Thirteen Intelligence <em>Subsystems</em></h2>
      <p className="section-intro">
        Every subsystem within TIS-13 serves a distinct cognitive function, designed to operate
        independently but communicate through a shared Cognitive State Bus — enabling emergent
        intelligence that exceeds the sum of its parts.
      </p>

      <div className="pull-quote reveal">
        <p>"The cognitive stack is not a single AI model. It is a 13-layer ecosystem whose intelligence compounds with every learner interaction — creating a moat that widens, not narrows, over time."</p>
      </div>

      <div className="tis-grid reveal">
        {TIS13.map((t, i) => (
          <div className={`tis-card ${t.special || ''}`} key={t.id} style={{ animationDelay:`${i*0.04}s` }}>
            <div className="tis-card-glow" />
            <div className="tis-id">{t.id} — {t.abbr}</div>
            <div className="tis-name">{t.name}</div>
            <div className="tis-desc">{t.desc}</div>
            <div className="tis-accent" style={{
              background: t.special==='era' ? 'linear-gradient(90deg,#FF4466,transparent)' :
                          t.special==='wil' ? 'linear-gradient(90deg,#E8B84B,transparent)' :
                                              'linear-gradient(90deg,#2563FF,transparent)'
            }} />
          </div>
        ))}
      </div>

      {/* CSB */}
      <div style={{marginTop:'4rem'}}>
        <div className="section-label">Subsystem 1.2</div>
        <h3 style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.5rem)',fontWeight:300,color:'var(--white)',marginBottom:'1rem'}}>
          The Cognitive State Bus
        </h3>
        <p style={{fontSize:'1rem',lineHeight:1.75,color:'var(--text-dim)',maxWidth:700,marginBottom:0}}>
          The CSB is the real-time neural backbone connecting all 13 subsystems — a shared memory and
          message-passing architecture allowing every subsystem to read and write the current cognitive
          state of the learner in under 100ms.
        </p>
      </div>
      <div className="csb-grid reveal">
        <div className="csb-panel">
          <div className="csb-panel-title">Design Principles</div>
          {['Event-driven, sub-100ms latency','Typed cognitive state schema (47 signal dimensions)','Stateful context window: 90-day rolling learner history','Privacy-preserving: on-device inference where possible','Versioned state snapshots for longitudinal modeling'].map(i => (
            <div className="csb-item" key={i}><div className="csb-dot"/><span>{i}</span></div>
          ))}
        </div>
        <div className="csb-panel">
          <div className="csb-panel-title">Infrastructure Stack</div>
          {['Apache Kafka for high-throughput event streaming','Redis for sub-millisecond state caching','Apache Flink for complex event processing','TimescaleDB for temporal cognitive data','Custom cognitive schema registry (Avro-based)'].map(i => (
            <div className="csb-item" key={i}><div className="csb-dot"/><span>{i}</span></div>
          ))}
        </div>
      </div>

      <div className="info-box reveal" style={{marginTop:'2rem'}}>
        <div className="info-box-title">The Intelligence Compounding Effect</div>
        <p>Each subsystem generates proprietary training data that makes every other subsystem smarter. As the platform scales, each new learner interaction contributes to a feedback loop that no new entrant can replicate without matching Tilaversity's user base. This is the Intelligence Compounding Effect — the mechanism that makes Tilaversity's cognitive lead widen, not narrow, over time.</p>
      </div>
    </section>
  )
}

// ─── REVENUE ─────────────────────────────────────────────────────────────────
function Revenue() {
  return (
    <section className="section" id="revenue">
      <div className="section-label">Volume II</div>
      <h2 className="section-title">Revenue Architecture <em>& Economic Moat</em></h2>
      <p className="section-intro">
        The goal is not to find product-market fit. The goal is to become the category-defining
        infrastructure layer that the entire global learning economy runs on.
      </p>

      <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem'}}>
        The Six-Layer Revenue Pyramid
      </h3>

      <div className="revenue-pyramid reveal">
        {REVENUE_TIERS.map(t => (
          <div className="rev-tier" key={t.code}>
            <div className="rev-label-col">
              <div className="rev-tier-code">{t.code}</div>
              <div className="rev-tier-name">{t.name}</div>
            </div>
            <div className="rev-body">
              <div className="rev-title">{t.title}</div>
              <div className="rev-desc">{t.desc}</div>
            </div>
            <div className="rev-price-col">
              <div className="rev-price">{t.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:'4rem', marginBottom:'2rem'}}>
        <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem'}}>
          The Four Economic Moats
        </h3>
        <div className="moat-grid reveal">
          {MOATS.map(m => (
            <div className="moat-card" key={m.num}>
              <div className="moat-num">{m.num}</div>
              <div className="moat-title">{m.title}</div>
              <div className="moat-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box reveal">
        <div className="info-box-title">Path to $1 Trillion — The Valuation Thesis</div>
        <p>The trillion-dollar thesis rests on four sequential milestones, each unlocking the next. The compounding of cognitive data, institutional entrenchment, and global infrastructure creates a valuation trajectory that resembles operating systems and cloud platforms — not EdTech companies. At Phase 4, Tilaversity is no longer valued as an education company. It is valued as the world's cognitive operating system.</p>
      </div>
    </section>
  )
}

// ─── INFRASTRUCTURE ───────────────────────────────────────────────────────────
function Infrastructure() {
  return (
    <section className="section" id="infrastructure">
      <div className="section-label">Volume III</div>
      <h2 className="section-title">Global Deployment <em>Infrastructure</em></h2>
      <p className="section-intro">
        Tilaversity's infrastructure is not a supporting function. It is a strategic weapon.
        The ability to deploy 13 interlocked cognitive subsystems to 2.4 billion learners
        across 190 nations is itself an insurmountable competitive barrier.
      </p>

      <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem'}}>
        Three-Tier Deployment Model
      </h3>
      <div className="infra-tiers reveal">
        {[
          { tier:'1', badge:'TIER 1 — CLOUD CORE',           title:'Primary Cognitive Processing',   desc:'Runs TIS-06 through TIS-13 (high-compute subsystems). Active-active multi-cloud across AWS, GCP, and Azure. 99.999% SLA. Six global regions covering N. America, EU, APAC, Africa, LATAM, ME.' },
          { tier:'2', badge:'TIER 2 — EDGE INTELLIGENCE',    title:'Distributed Processing Nodes',   desc:'Runs TIS-01 through TIS-05 (latency-sensitive subsystems). 500+ edge nodes co-located with ISPs, universities, and telcos. Enables sub-15ms response times for real-time adaptive interventions.' },
          { tier:'3', badge:'TIER 3 — ON-DEVICE RUNTIME',    title:'Offline Cognitive Engine',       desc:'Lightweight inference engine running TIS-01, TIS-02, and TIS-09 entirely on-device. Full Tilaversity capability with zero connectivity. Critical for 1.3B learners in emerging markets.' },
        ].map(c => (
          <div className="infra-card" data-tier={c.tier} key={c.tier}>
            <div className="infra-tier-badge">{c.badge}</div>
            <div className="infra-title">{c.title}</div>
            <div className="infra-desc">{c.desc}</div>
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem', marginTop:'3rem'}}>
        Core Infrastructure Stack
      </h3>
      <div className="stack-grid reveal">
        {[
          { title:'Compute & Orchestration', items:['Kubernetes (multi-cluster, multi-region) — all cognitive workloads','NVIDIA H100 / A100 GPU clusters — model training & inference','Apache Ray — distributed Python cognitive processing','KNative — serverless cognitive microservice scaling','Istio service mesh — encrypted inter-subsystem communication'] },
          { title:'Data & Intelligence', items:['Snowflake — cognitive analytics data warehouse','Apache Kafka — real-time cognitive event streaming','Pinecone / Weaviate — vector-space learner modeling','Apache Spark via Databricks — large-scale model training','dbt + Airbyte — cognitive data pipeline orchestration'] },
          { title:'AI/ML Platform Layer', items:['Custom Tilaversity Model Registry (MLflow fork)','Weights & Biases — experiment tracking across TIS-13','Hugging Face Hub (private) — model version control','TorchServe + BentoML — cognitive model serving','Seldon Core — model governance and A/B testing at scale'] },
          { title:'Security & Compliance', items:['Zero-trust network architecture (BeyondCorp model)','Homomorphic encryption for sensitive cognitive data','On-device inference for GDPR/FERPA-sensitive signals','HashiCorp Vault — secrets management across all regions','Open Policy Agent — real-time compliance enforcement'] },
        ].map(p => (
          <div className="stack-panel" key={p.title}>
            <div className="stack-title">{p.title}</div>
            {p.items.map(i => (
              <div className="stack-item" key={i}>
                <div className="stack-bullet"/>
                <span>{i}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{marginTop:'3rem'}}>
        <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem'}}>
          Cognitive Data Lake Architecture
        </h3>
        <div className="info-box reveal" style={{marginBottom:'1.5rem'}}>
          <div className="info-box-title">The Data Lake Philosophy</div>
          <p>The Cognitive Data Lake is not a storage system. It is a living memory architecture — designed to retain every signal of human learning ever processed by Tilaversity. It is the world's most valuable educational dataset, and it grows more valuable every second.</p>
        </div>
        <div className="reveal">
          <table className="lake-table">
            <thead>
              <tr><th>Data Zone</th><th>Type</th><th>Retention</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              {[
                ['Hot Zone','Real-time cognitive events','24 hours','Live subsystem inference & adaptation'],
                ['Warm Zone','Session-level learner states','90 days','Contextual modeling & short-term prediction'],
                ['Cool Zone','Longitudinal learning trajectories','7 years','Cognitive fingerprint & mastery modeling'],
                ['Cold Zone','Anonymized aggregate patterns','Indefinite','Research, model pre-training, & benchmarking'],
              ].map(([z,t,r,p]) => (
                <tr key={z}><td><span className="lake-zone">{z}</span></td><td>{t}</td><td><span className="lake-retention">{r}</span></td><td>{p}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ─── ETHICS ──────────────────────────────────────────────────────────────────
function Ethics() {
  return (
    <section className="section" id="ethics">
      <div className="section-label">Volume IV</div>
      <h2 className="section-title">Ethical AI <em>& Governance</em></h2>
      <div className="pull-quote reveal">
        <p>"Ethics is not Tilaversity's constraint. It is our competitive advantage — the reason governments trust us with their children, and the reason no AI-first competitor can touch our institutional markets."</p>
      </div>

      <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem'}}>
        Tilaversity Ethics Architecture (TEA) — Four Layers
      </h3>
      <div className="tea-grid reveal">
        {TEA_LAYERS.map(l => (
          <div className="tea-card" key={l.layer}>
            <div className="tea-layer">{l.layer}</div>
            <div className="tea-title">{l.title}</div>
            <div className="tea-desc">{l.desc}</div>
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem', marginTop:'3rem'}}>
        The Nine Principles of Tilaversity AI
      </h3>
      <div className="principles-grid reveal">
        {PRINCIPLES.map(p => (
          <div className="principle-card" key={p.num}>
            <div className="principle-num">/ {p.num}</div>
            <div className="principle-title">{p.title}</div>
            <div className="principle-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── PRODUCT ─────────────────────────────────────────────────────────────────
function Product() {
  return (
    <section className="section" id="product">
      <div className="section-label">Volume V</div>
      <h2 className="section-title">Product Ecosystem <em>& Platform Strategy</em></h2>
      <p className="section-intro">
        The most defensible AI company is not one that makes the best product —
        it is one that becomes the platform on which every other educational product is built.
      </p>

      <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem'}}>
        Five Product Surfaces
      </h3>
      <div className="surface-list reveal">
        {SURFACES.map(s => (
          <div className="surface-item" key={s.num}>
            <div className="surface-num-col"><div className="surface-num">{s.num}</div></div>
            <div className="surface-body">
              <div className="surface-label">{s.label}</div>
              <div className="surface-title">{s.title} <span style={{fontWeight:400,color:'var(--text-muted)'}}>— {s.sub}</span></div>
              <div className="surface-role">{s.role}</div>
            </div>
            <div className="surface-badge-col">
              <div className="surface-badge">{s.badge}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:'3rem'}}>
        <div className="info-box reveal">
          <div className="info-box-title">The Developer Platform & API Economy</div>
          <p>Tilaversity's most scalable revenue strategy is its Developer Platform — an open API layer that allows third-party developers, EdTech companies, and researchers to build on top of the TIS-13 cognitive stack. Every app built on Tilaversity's APIs deepens the moat and generates licensing revenue without additional marginal cost. Target: 10,000 developers, $500M API economy by Year 7.</p>
        </div>
        <div className="info-box reveal" style={{borderLeftColor:'var(--gold)'}}>
          <div className="info-box-title">The Tilaversity Research Institute (TRI)</div>
          <p>The TRI publishes groundbreaking cognitive AI research, trains the world's top talent in Tilaversity's frameworks, and positions the company as the intellectual authority on human-AI learning. This generates inbound enterprise deals, government trust, talent attraction, and regulatory influence — all without a direct sales motion. Research is Tilaversity's most efficient customer acquisition channel.</p>
        </div>
      </div>
    </section>
  )
}

// ─── ROADMAP ─────────────────────────────────────────────────────────────────
function Roadmap() {
  return (
    <section className="section" id="roadmap">
      <div className="section-label">Implementation Roadmap</div>
      <h2 className="section-title">From Blueprint <em>to $1 Trillion</em></h2>
      <p className="section-intro">
        Four phases. Each delivers standalone value while laying the irreversible foundation
        for the next. No phase is purely preparatory — every phase generates revenue, data,
        and institutional validation.
      </p>

      <div className="roadmap-timeline reveal">
        {ROADMAP.map((r, i) => (
          <div className="rm-phase" key={r.phase}>
            <div className="rm-dot" />
            <div className="rm-header">
              <span className="rm-phase-label">{r.phase}</span>
              <span className="rm-timeframe mono">{r.timeframe}</span>
            </div>
            <div style={{display:'flex',alignItems:'baseline',gap:'1.5rem',marginBottom:'0.5rem',flexWrap:'wrap'}}>
              <div className="rm-title">{r.name}</div>
              <div className="rm-target">{r.target}</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--text-muted)'}}>{r.arrt}</div>
            </div>
            <div className="rm-desc">{r.desc}</div>
            <div className="rm-deliverables">
              {r.tags.map(t => <span className="rm-tag" key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── LEGACY ───────────────────────────────────────────────────────────────────
function Legacy() {
  return (
    <section className="section" id="legacy">
      <div className="section-label">Volume VI</div>
      <h2 className="section-title">Legacy Engineering <em>& Future Proofing</em></h2>
      <div className="pull-quote reveal">
        <p>"We are not building a company for the next funding round. We are engineering a cognitive institution for the next century."</p>
      </div>

      <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'0.5rem'}}>
        Temporal Design Framework (TDF)
      </h3>
      <p style={{fontSize:'0.88rem',lineHeight:1.7,color:'var(--text-dim)',maxWidth:650,marginBottom:'1.5rem'}}>
        Every major architectural decision must be stress-tested across four time horizons,
        preventing short-term optimization from creating long-term structural fragility.
      </p>
      <div className="tdf-grid reveal">
        {[
          { h:'H1', range:'0–18 months', q:'Does this decision deliver measurable learning outcomes? Is it reversible if it fails? Can it operate at 10× current scale?' },
          { h:'H2', range:'18 months – 5 years', q:'Does this create lock-in that serves learners, or only us? Will it survive regulatory scrutiny in 50 countries? Does it compound in value over time?' },
          { h:'H3', range:'5–20 years', q:'Is this architecturally compatible with cognitive technologies we cannot yet predict? Can future teams understand, modify, and correct it?' },
          { h:'H4', range:'20+ years', q:'Will this system still serve human dignity in a world we cannot imagine? Have we designed the right failure modes and sunset mechanisms?' },
        ].map(t => (
          <div className="tdf-card" key={t.h}>
            <div className="tdf-horizon">{t.h}</div>
            <div className="tdf-range">{t.range}</div>
            <div className="tdf-questions">{t.q}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop:'3rem'}}>
        <h3 style={{fontFamily:'var(--font-ui)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1.5rem'}}>
          Modular Immortality Architecture (MIA)
        </h3>
        <div className="mia-list reveal">
          {MIA_PRINCIPLES.map(m => (
            <div className="mia-item" key={m.title}>
              <div className="mia-icon">{m.icon}</div>
              <div className="mia-content">
                <div className="mia-title">{m.title}</div>
                <div className="mia-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box reveal" style={{marginTop:'2rem',borderLeftColor:'var(--gold)'}}>
        <div className="info-box-title">The Legacy Statement Mandate</div>
        <p>Before any major system component is deployed, its architects must produce a Legacy Statement: a formal declaration of the intended human impact, the identified risks to future generations, the ethical rationale for design choices made, and the conditions under which the system should be retired. This practice transforms engineering from a technical act into a moral commitment — and creates an institutional memory that outlasts any individual or team.</p>
      </div>
    </section>
  )
}

// ─── CLOSING ─────────────────────────────────────────────────────────────────
function Closing() {
  return (
    <div className="closing">
      <div className="closing-inner">
        <div className="closing-eyebrow">Closing Declaration</div>
        <h2 className="closing-title">
          The Architecture<br />is <em>Ready.</em>
        </h2>
        <p className="closing-quote">
          "The companies that will define the next century are not the ones building
          the cleverest tools. They are the ones building the infrastructure layers
          that everyone else runs on."
        </p>
        <p style={{fontSize:'1rem',lineHeight:1.75,color:'var(--text-dim)',marginBottom:'3rem',maxWidth:600,margin:'0 auto 3rem'}}>
          The Tilaversity Ultra Architecture is a declaration of intent — the commitment to build
          the cognitive operating system for human development at planetary scale.
          The path to $1 trillion is not a matter of ambition. It is a matter of architecture.
        </p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',marginTop:'2rem'}}>
          <a href="#architecture" className="btn-primary">Explore the Architecture</a>
          <a href="#subsystems" className="btn-secondary">View TIS-13 Subsystems</a>
        </div>
        <div style={{marginTop:'4rem',paddingTop:'2rem',borderTop:'1px solid var(--border)'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:600,color:'var(--text-dim)',marginBottom:'0.5rem'}}>
            TILAVERSE INC.
          </div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'0.95rem',fontStyle:'italic',color:'var(--text-muted)',marginBottom:'0.75rem'}}>
            Architects of Intelligence
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.1em',color:'var(--text-muted)'}}>
            "We were not predicting the future. We were authoring its operating system."
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal()

  return (
    <>
      <Head>
        <title>Tilaversity Ultra Architecture — $1T AI Blueprint</title>
        <meta name="description" content="The Tilaversity Ultra Architecture: a unified, cross-domain framework for designing, building, and governing the world's most sophisticated adaptive AI platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tilaversity Ultra Architecture" />
        <meta property="og:description" content="The Blueprint for a $1 Trillion AI Company" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⬡</text></svg>" />
      </Head>

      <NeuralCanvas />
      <Nav />
      <Hero />

      {/* Section separator */}
      <div style={{position:'relative',zIndex:1,width:'100%',height:'1px',background:'linear-gradient(90deg,transparent,var(--border),transparent)'}}/>

      <Architecture />

      <div style={{position:'relative',zIndex:1,background:'var(--deep)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:600,color:'var(--white)'}}>
            <span style={{color:'var(--gold)'}}>VOL. I — </span>The Cognitive Intelligence Stack
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',maxWidth:400,lineHeight:1.6}}>
            13 interlocking AI subsystems connected by the Cognitive State Bus — the technological soul of Tilaversity
          </div>
        </div>
      </div>

      <Subsystems />

      <div style={{position:'relative',zIndex:1,background:'var(--deep)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:600,color:'var(--white)'}}>
            <span style={{color:'var(--gold)'}}>VOL. II — </span>Revenue Architecture & Economic Moat
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',maxWidth:400,lineHeight:1.6}}>
            Six revenue layers and four economic moats on the path from Series A to $1T
          </div>
        </div>
      </div>

      <Revenue />

      <div style={{position:'relative',zIndex:1,background:'var(--deep)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:600,color:'var(--white)'}}>
            <span style={{color:'var(--gold)'}}>VOL. III — </span>Global Deployment Infrastructure
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',maxWidth:400,lineHeight:1.6}}>
            Three-tier architecture serving 2.4B learners across 190 nations at sub-15ms latency
          </div>
        </div>
      </div>

      <Infrastructure />

      <div style={{position:'relative',zIndex:1,background:'var(--deep)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:600,color:'var(--white)'}}>
            <span style={{color:'var(--gold)'}}>VOL. IV — </span>Ethical AI & Governance Framework
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',maxWidth:400,lineHeight:1.6}}>
            Ethics as architecture: four TEA layers and nine inviolable principles of AI design
          </div>
        </div>
      </div>

      <Ethics />

      <div style={{position:'relative',zIndex:1,background:'var(--deep)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:600,color:'var(--white)'}}>
            <span style={{color:'var(--gold)'}}>VOL. V — </span>Product Ecosystem & Platform Strategy
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',maxWidth:400,lineHeight:1.6}}>
            Five product surfaces, a $500M API economy, and a research institute as a sales engine
          </div>
        </div>
      </div>

      <Product />

      <div style={{position:'relative',zIndex:1,background:'var(--deep)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:600,color:'var(--white)'}}>
            <span style={{color:'var(--gold)'}}>ROADMAP — </span>From Blueprint to $1 Trillion
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',maxWidth:400,lineHeight:1.6}}>
            Four phases across 12 years: Foundation → Compounding → Dominance → Civilizational
          </div>
        </div>
      </div>

      <Roadmap />

      <div style={{position:'relative',zIndex:1,background:'var(--deep)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:600,color:'var(--white)'}}>
            <span style={{color:'var(--gold)'}}>VOL. VI — </span>Legacy Engineering & Future Proofing
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',maxWidth:400,lineHeight:1.6}}>
            TDF, Modular Immortality Architecture, and the Legacy Statement Mandate
          </div>
        </div>
      </div>

      <Legacy />
      <Closing />

      <footer className="footer">
        <div className="footer-brand">TILA<span>VERSITY</span> ULTRA ARCHITECTURE</div>
        <div className="footer-copy">© 2025 TILAVERSE INC. — PROPRIETARY & CONFIDENTIAL</div>
      </footer>
    </>
  )
}
