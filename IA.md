# Lumenfold (relevanceai.com DS clone) information architecture

Source: Local React/Vite clone at http://localhost:5191 (src/App.jsx + src/pages/*/routes.jsx) and recon specs CLONE_SPEC.md, specs/PAGES_COMPANY.md, specs/PAGES_CONTENT.md, specs/PAGES_CATALOG.md, specs/PAGES_PRODUCT.md
Status: **measured-from-code** · production approved: **false**
296 routes · 53 templates · 169 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Integration detail, Use-case detail, Blog article) account for 188 of 296 routes (64%). The remaining 108 routes span 50 templates.

| template | routes | share |
|---|---:|---:|
| Integration detail | 120 | 41% |
| Use-case detail | 56 | 19% |
| Blog article | 12 | 4% |
| Workflow detail (legacy) | 12 | 4% |
| SEO article with TOC (legacy) | 12 | 4% |
| Academy lesson | 8 | 3% |
| Customer story | 6 | 2% |
| Event detail | 6 | 2% |
| Guide article | 4 | 1% |
| Comparison page | 4 | 1% |
| Feature detail | 4 | 1% |
| Legal document | 3 | 1% |
| Topic article (bare) | 3 | 1% |
| Legacy text index | 2 | 1% |
| Note post (minimal) | 2 | 1% |
| Hub index | 2 | 1% |
| Legacy agent landing | 2 | 1% |
| Legacy SDR landing | 2 | 1% |
| Legacy use-case page | 2 | 1% |
| Homepage | 1 | 0% |
| Pricing | 1 | 0% |
| Enterprise | 1 | 0% |
| About us | 1 | 0% |
| Careers | 1 | 0% |
| Customers index | 1 | 0% |
| Book a demo | 1 | 0% |
| Contact support | 1 | 0% |
| Partners | 1 | 0% |
| Blog index | 1 | 0% |
| Comparison index | 1 | 0% |
| Changelog feed | 1 | 0% |
| FAQ page | 1 | 0% |
| Integrations index | 1 | 0% |
| Agents landing | 1 | 0% |
| Workflows index (legacy) | 1 | 0% |
| Feature detail (video variant) | 1 | 0% |
| Workforce landing | 1 | 0% |
| Bulk run (stub) | 1 | 0% |
| Tools list (stub) | 1 | 0% |
| GTM landing | 1 | 0% |
| Invent landing | 1 | 0% |
| Slack landing | 1 | 0% |
| Features catalog | 1 | 0% |
| Self-driving GTM manifesto | 1 | 0% |
| Specialist agents article | 1 | 0% |
| Legacy feature page | 1 | 0% |
| Legacy home clone (AI ops) | 1 | 0% |
| API landing (legacy B6) | 1 | 0% |
| Multi-agents landing (legacy B6) | 1 | 0% |
| BDR waitlist | 1 | 0% |
| Agent Drop microsite | 1 | 0% |
| Agents at work hub | 1 | 0% |
| Not found | 1 | 0% |

## Page chrome

**296 routes carry chrome = `built`** — Homepage, Pricing, Enterprise, About us, Careers, Customers index, Customer story, Book a demo, Contact support, Partners, Legal document, Blog index, Legacy text index, Blog article, Guide article, Topic article (bare), Note post (minimal), Hub index, Event detail, Comparison index, Comparison page, Changelog feed, FAQ page, Academy lesson, Integrations index, Integration detail, Use-case detail, Agents landing, Workflows index (legacy), Workflow detail (legacy), SEO article with TOC (legacy), Feature detail, Feature detail (video variant), Workforce landing, Bulk run (stub), Tools list (stub), GTM landing, Invent landing, Slack landing, Features catalog, Self-driving GTM manifesto, Specialist agents article, Legacy agent landing, Legacy SDR landing, Legacy feature page, Legacy use-case page, Legacy home clone (AI ops), API landing (legacy B6), Multi-agents landing (legacy B6), BDR waitlist, Agent Drop microsite, Agents at work hub, Not found.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.navbar` | SHELL | 53 | 296 | `src/components/Navbar.jsx` | Mounted once in App.jsx around the router, so every route carries it, including the not-found page and the spec-only templates once they are routed. |
| `shell.footer` | SHELL | 53 | 296 | `src/components/Footer.jsx` | Mounted once in App.jsx, so every route carries it; legacy originals that had their own footer (or none) are rebuilt with this one. |
| `conversion.grain-cta` | CONVERSION | 15 | 145 | `src/components/content/ClosingCTA.jsx (parallel copies: src/components/company/shared.jsx > GrainCTA, src/components/product/lib.jsx > ClosingCTA, src/components/catalog/sections.jsx > ClosingCTA/CtaTile)` | Closes most DS-shell pages: contact, partners, enterprise, hubs, guides, text indexes, the FAQ page, comparisons, the integrations index and details, and the built system-A product pages (see matrix). |
| `hero.integration-detail` | HERO | 1 | 120 | `src/pages/catalog/IntegrationDetail.jsx` | Every integration detail page. |
| `content.integration-setup` | CONTENT | 1 | 120 | `src/pages/catalog/IntegrationDetail.jsx (#setup)` | Every integration detail page. |
| `catalog.integration-actions` | CATALOG | 1 | 120 | `src/pages/catalog/IntegrationDetail.jsx > Group` | Every integration detail page (conditionally). |
| `proof.logo-wall` | PROOF | 15 | 81 | `src/components/LogoWall.jsx (company pages use the parallel copy src/components/company/shared.jsx > LogoGrid, whose links go to customer stories)` | Homepage plus most product, comparison, catalog-detail, event and company conversion pages (see matrix). |
| `proof.testimonials` | PROOF | 8 | 66 | `src/components/Testimonials.jsx` | Homepage and many landing/detail pages (see matrix). |
| `proof.enterprise-security` | PROOF | 6 | 64 | `src/components/Enterprise.jsx` | Homepage, enterprise, agents landing, use-case details, comparison pages, and the Slack landing. |
| `features.stack-collapse` | FEATURES | 3 | 58 | `src/components/company/enterprise.jsx > StackCollapse (parallel copy: src/components/catalog/usecase.jsx > StackCollapse, which embeds its closing CtaTile; src/components/product/invent.jsx > StackCollapse)` | Enterprise, every use-case detail page and the invent landing. |
| `features.evals-panel` | FEATURES | 3 | 58 | `src/components/catalog/sections.jsx > EvalsPanel (parallel copy: src/components/product/invent.jsx > EvalsFloor)` | Every use-case detail page, the agents landing and the invent landing. |
| `features.deploy-paths` | FEATURES | 3 | 58 | `src/components/catalog/sections.jsx > DeployPaths (parallel copy: src/components/product/workforce.jsx > ExpandTiles fed the deploy data)` | Agents landing, every use-case detail page and the workforce page. |
| `hero.use-case` | HERO | 1 | 56 | `src/components/catalog/usecase.jsx > UseCaseHero` | Every use-case (agent) detail page. |
| `features.use-case-how-it-works` | FEATURES | 1 | 56 | `src/components/catalog/usecase.jsx > HowItWorks` | Every use-case detail page. |
| `catalog.related-rail` | CATALOG | 1 | 56 | `src/components/catalog/usecase.jsx > RelatedRail` | Every use-case detail page. |
| `conversion.legacy-footer-cta` | CONVERSION | 10 | 23 | `src/components/catalog/legacy.jsx > WCta (parallel copy: src/components/product-legacy/shared.jsx > FooterCTA)` | The workflows index, SEO articles, the legacy product pages and the product one-offs (dark variant on Agent Drop). |
| `content.article-with-aside` | CONTENT | 2 | 16 | `src/components/content/ArticleAside.jsx + src/components/content/Prose.jsx` | Blog posts and learn/prompt-engineering guides. |
| `proof.legacy-logo-row` | PROOF | 3 | 15 | `src/pages/catalog/WorkflowDetail.jsx > LogoRow (parallel copy: src/pages/product-legacy/UseCaseLegacy.jsx > LogoRow and src/pages/product-legacy/BdrWaitlist.jsx, both a label row over src/components/LogoWall.jsx)` | Workflow details, the legacy use-case pages and the BDR waitlist. |
| `content.faq-accordion` | CONTENT | 8 | 14 | `src/components/content/FAQSection.jsx (parallel copies: src/components/company/shared.jsx > FAQ, src/components/product/lib.jsx > FAQSection, src/components/catalog/sections.jsx > Faq)` | Pricing, partners, comparison pages, the FAQ page, the integrations index, the agents landing, feature details and workforce. |
| `hero.legacy-uc` | HERO | 2 | 14 | `src/pages/catalog/WorkflowDetail.jsx > Hero (parallel copy: src/pages/product-legacy/UseCaseLegacy.jsx > Hero)` | Workflow detail pages and the legacy use-case pages (customer experience, market research). |
| `features.legacy-values` | FEATURES | 2 | 14 | `src/pages/catalog/WorkflowDetail.jsx > Values (parallel copy: src/pages/product-legacy/UseCaseLegacy.jsx > Values)` | Workflow details and the legacy use-case pages. |
| `features.legacy-vertical-tabs` | FEATURES | 2 | 14 | `src/pages/catalog/WorkflowDetail.jsx > VerticalTabs (parallel copy: src/pages/product-legacy/UseCaseLegacy.jsx > VTabs)` | Workflow details and the legacy use-case pages. |
| `content.post-header` | CONTENT | 2 | 14 | `src/pages/content/Article.jsx > PostHeader` | Blog posts and changelog note posts. |
| `hero.seo-banner` | HERO | 1 | 12 | `src/pages/catalog/Article.jsx (banner + Decor)` | LLM-model and industry SEO articles. |
| `features.with-without` | FEATURES | 1 | 12 | `src/pages/catalog/WorkflowDetail.jsx > Compare` | Workflow detail pages only. |
| `content.related-posts` | CONTENT | 1 | 12 | `src/pages/content/Article.jsx > BlogArticle` | Blog posts only. |
| `content.toc-article` | CONTENT | 1 | 12 | `src/components/catalog/legacy.jsx > Toc + ArticleBody` | LLM-model and industry SEO articles. |
| `conversion.blog-footer-cta` | CONVERSION | 1 | 12 | `src/pages/content/Article.jsx > BlogArticle (.blog-footer-cta)` | Blog posts only. |
| `conversion.email-capture` | CONVERSION | 1 | 12 | `src/pages/catalog/WorkflowDetail.jsx > EmailCta` | Workflow detail pages only. |
| `conversion.tasks-cta` | CONVERSION | 3 | 8 | `src/components/catalog/agents.jsx > TasksCTA (parallel copies: src/components/company/customers.jsx > TasksCTA, src/components/product/gtm.jsx > TasksCTA)` | Customer stories, the agents landing and the GTM landing. |
| `hero.academy-lesson` | HERO | 1 | 8 | `src/components/academy/lesson.jsx` | Academy lesson pages. |
| `content.academy-lesson-body` | CONTENT | 1 | 8 | `src/components/academy/lesson.jsx` | Academy lesson pages. |
| `features.autonomy-framework` | FEATURES | 2 | 7 | `src/components/Autonomy.jsx` | Homepage and every event detail page. |
| `features.autonomy-timeline` | FEATURES | 2 | 7 | `src/components/content/AutonomyTimeline.jsx (parallel copy: src/pages/product-legacy/SelfDrivingGtm.jsx > AutonomyTimeline, rendered inside its Framework)` | Every event detail page and the self-driving GTM manifesto. |
| `hero.legacy-centered` | HERO | 4 | 6 | `src/components/product-legacy/shared.jsx > CenteredHero` | The legacy agent landings, SDR landings, the AI-ops home clone and the API page. |
| `hero.story-banner` | HERO | 1 | 6 | `src/components/company/customers.jsx > StoryHero` | Every customer story detail page. |
| `content.story-article` | CONTENT | 1 | 6 | `src/components/company/customers.jsx > StoryArticle` | Every customer story detail page. |
| `content.event-register` | CONTENT | 1 | 6 | `src/pages/content/EventDetail.jsx (with src/components/content/EventForm.jsx)` | Every event detail page. |
| `features.integrations-showcase` | FEATURES | 5 | 5 | `src/components/Integrations.jsx` | Homepage, enterprise, agents landing, workforce, and the Slack landing. |
| `hero.feature` | HERO | 2 | 5 | `src/components/product/lib.jsx > FeatureHero` | The four feature detail pages and the phone-agent page. |
| `features.showcase-row` | FEATURES | 2 | 5 | `src/components/product/lib.jsx > ShowcaseRow` | The four feature detail pages and the phone-agent page. |
| `features.icon-card-grid` | FEATURES | 2 | 5 | `src/components/product/lib.jsx > IconCardGrid` | The four feature detail pages and the phone-agent page. |
| `content.prose-body` | CONTENT | 2 | 5 | `src/components/content/Prose.jsx` | Topic explainers and changelog note posts. |
| `proof.case-studies` | PROOF | 4 | 4 | `src/components/CaseStudies.jsx` | Homepage, enterprise, the agents landing and the GTM landing. |
| `proof.legacy-testimonial-grid` | PROOF | 3 | 4 | `src/components/product-legacy/shared.jsx > TestimonialGrid` | Legacy agent landings, the AI-ops home clone and the multi-agents page. |
| `hero.guide` | HERO | 1 | 4 | `src/pages/content/Article.jsx > GuideArticle` | Learn and prompt-engineering guide articles. |
| `hero.comparison` | HERO | 1 | 4 | `src/components/content/comparison.jsx > CompareHero` | Every comparison page. |
| `features.fit-cards` | FEATURES | 1 | 4 | `src/components/content/comparison.jsx > FitCards` | Every comparison page. |
| `features.differences` | FEATURES | 1 | 4 | `src/components/content/comparison.jsx > Differences` | Every comparison page. |
| `features.exemplar-run` | FEATURES | 1 | 4 | `src/components/content/comparison.jsx > ExemplarRun` | Every comparison page. |
| `features.switch-steps` | FEATURES | 1 | 4 | `src/components/content/comparison.jsx > SwitchSteps` | Every comparison page. |
| `content.comparison-table` | CONTENT | 1 | 4 | `src/components/content/comparison.jsx > CompareTable` | Every comparison page. |
| `catalog.more-features` | CATALOG | 1 | 4 | `src/components/product/lib.jsx > MoreFeatures` | The four feature detail pages. |
| `content.legacy-faq` | CONTENT | 3 | 3 | `src/components/product-legacy/shared.jsx > FAQ` | The schedule-work page, the AI-ops home clone and the agents-at-work hub. |
| `catalog.use-case-grid` | CATALOG | 3 | 3 | `src/components/UseCases.jsx` | Homepage, the agents landing and the invent landing. |
| `hero.title-band` | HERO | 2 | 3 | `src/pages/content/ListingGrid.jsx > TitleBand` | The blog index and the two legacy text indexes (learn, topics). |
| `proof.legacy-logo-grid` | PROOF | 2 | 3 | `src/components/product-legacy/shared.jsx > LegacyLogoGrid` | Legacy agent landings and the schedule-work page. |
| `proof.logo-marquee` | PROOF | 2 | 3 | `src/components/product-legacy/shared.jsx > LogoMarquee` | SDR landings and the AI-ops home clone. |
| `features.legacy-bento-cards` | FEATURES | 2 | 3 | `src/components/product-legacy/shared.jsx > BentoCards` | Legacy agent landings and the multi-agents page. |
| `hero.plain-title` | HERO | 1 | 3 | `src/pages/content/Article.jsx > TopicArticle` | Topic explainer articles only. |
| `content.legal-doc` | CONTENT | 1 | 3 | `src/pages/company/Legal.jsx` | The three legal pages (privacy, terms, data security). |
| `proof.featured-in` | PROOF | 2 | 2 | `src/components/Featured.jsx` | Homepage and the Slack landing. |
| `proof.legacy-customer-cards` | PROOF | 2 | 2 | `src/components/product-legacy/shared.jsx > CustomerCards` | The schedule-work page and the AI-ops home clone. |
| `features.how-we-work` | FEATURES | 2 | 2 | `src/components/Tiles.jsx` | Homepage and the agents landing (same component, same content). |
| `features.cost-hero` | FEATURES | 2 | 2 | `src/components/CostHero.jsx` | Homepage and the agents landing (as its agent-activity block). |
| `content.learn-more` | CONTENT | 2 | 2 | `src/components/LearnMore.jsx` | Homepage and the invent landing. |
| `conversion.legacy-next-steps` | CONVERSION | 2 | 2 | `src/components/product-legacy/shared.jsx > NextSteps` | The schedule-work page and the agents-at-work hub. |
| `hero.hub-grain` | HERO | 1 | 2 | `src/components/content/HubHero.jsx` | The events and resources hubs. |
| `proof.legacy-testimonial-card` | PROOF | 1 | 2 | `src/pages/product-legacy/UseCaseLegacy.jsx > Testimonial` | Legacy use-case pages only. |
| `proof.legacy-case-study` | PROOF | 1 | 2 | `src/pages/product-legacy/UseCaseLegacy.jsx > CaseStudy` | Only the market-research variant of the legacy use-case template. |
| `proof.sdr-featured-case-study` | PROOF | 1 | 2 | `src/pages/product-legacy/SDRLanding.jsx > FeaturedCase` | SDR landings only. |
| `features.legacy-feature-compare` | FEATURES | 1 | 2 | `src/pages/product-legacy/AgentLanding.jsx (LHeading + IconRow + CompareCards)` | Legacy agent landings only. |
| `features.legacy-what-it-does` | FEATURES | 1 | 2 | `src/pages/product-legacy/AgentLanding.jsx > WhatItDoes` | Legacy agent landings only. |
| `features.sdr-roi-stats` | FEATURES | 1 | 2 | `src/pages/product-legacy/SDRLanding.jsx > Roi` | SDR landings only (placed after the before/after block on the outbound variant). |
| `features.sdr-before-after` | FEATURES | 1 | 2 | `src/pages/product-legacy/SDRLanding.jsx > BeforeAfter` | SDR landings only. |
| `features.sdr-outbound-features` | FEATURES | 1 | 2 | `src/pages/product-legacy/SDRLanding.jsx > OutboundFeatures` | SDR landings only. |
| `features.sdr-how-it-works` | FEATURES | 1 | 2 | `src/pages/product-legacy/SDRLanding.jsx > Steps` | SDR landings only. |
| `features.sdr-team-player` | FEATURES | 1 | 2 | `src/pages/product-legacy/SDRLanding.jsx > TeamPlayer` | SDR landings only. |
| `features.legacy-all-features` | FEATURES | 1 | 2 | `src/pages/product-legacy/UseCaseLegacy.jsx > AllFeatures` | Legacy use-case pages only. |
| `features.legacy-team` | FEATURES | 1 | 2 | `src/pages/product-legacy/UseCaseLegacy.jsx > Team` | Legacy use-case pages only. |
| `catalog.text-card-grid` | CATALOG | 1 | 2 | `src/pages/content/ListingGrid.jsx > TextIndex` | The learn and topics indexes. |
| `catalog.hub-row-list` | CATALOG | 1 | 2 | `src/components/content/parts.jsx > ContentRow + HubSectionHeading` | The events and resources hubs. |
| `catalog.hub-card-grid` | CATALOG | 1 | 2 | `src/components/content/parts.jsx > ContentCard` | The events and resources hubs. |
| `conversion.sdr-timeline-cta` | CONVERSION | 1 | 2 | `src/pages/product-legacy/SDRLanding.jsx > Timeline inside src/components/product-legacy/shared.jsx > FooterCTA` | SDR landings only. |
| `hero.home` | HERO | 1 | 1 | `src/components/Hero.jsx` | Homepage only. |
| `hero.pricing-plan` | HERO | 1 | 1 | `src/pages/company/Pricing.jsx > PricingHero` | The pricing page only. |
| `hero.enterprise` | HERO | 1 | 1 | `src/components/company/enterprise.jsx > EnterpriseHero` | The enterprise page only. |
| `hero.about` | HERO | 1 | 1 | `src/pages/company/AboutUs.jsx > AboutHero` | The about page only. |
| `hero.careers` | HERO | 1 | 1 | `src/components/company/careers.jsx > CareersHero` | The careers page only. |
| `hero.customers` | HERO | 1 | 1 | `src/pages/company/Customers.jsx > CustomersHero` | The customers index only. |
| `hero.partners` | HERO | 1 | 1 | `src/pages/company/Partners.jsx > PartnersHero` | The partners page only. |
| `hero.faq-title` | HERO | 1 | 1 | `src/pages/content/FAQPage.jsx` | The FAQ page only. |
| `hero.integrations-catalog` | HERO | 1 | 1 | `src/pages/catalog/IntegrationsIndex.jsx > Hero` | The integrations index only. |
| `hero.agents` | HERO | 1 | 1 | `src/components/catalog/agents.jsx > AgentsHero` | The agents product landing only. |
| `hero.split-title-canvas` | HERO | 1 | 1 | `src/components/product/workforce.jsx > SplitTitleHero` | The workforce page only. |
| `hero.gtm` | HERO | 1 | 1 | `src/components/product/gtm.jsx > GTMHero` | The GTM product landing only. |
| `hero.invent` | HERO | 1 | 1 | `src/components/product/invent.jsx > InventHero` | The invent product landing only. |
| `hero.slack-chat` | HERO | 1 | 1 | `src/components/product/slack.jsx > SlackHero + ChatDemo (over SlackDeco background)` | The Slack product landing only. |
| `hero.features-text` | HERO | 1 | 1 | `src/components/product/catalog.jsx > FeaturesHero` | The features catalog page only. |
| `hero.sdg-road` | HERO | 1 | 1 | `src/pages/product-legacy/SelfDrivingGtm.jsx > Hero (Road, Trust)` | The self-driving GTM manifesto only. |
| `hero.multi-agents-banner` | HERO | 1 | 1 | `src/pages/product-legacy/B6.jsx > MultiAgents (hero Row)` | The multi-agents page only. |
| `hero.dark-card` | HERO | 1 | 1 | `src/pages/product-legacy/ScheduleWork.jsx > DarkHero` | The schedule-work page only. |
| `hero.agent-drop` | HERO | 1 | 1 | `src/pages/product-legacy/AgentDrop.jsx > Hero` | The Agent Drop event microsite only. |
| `hero.agents-at-work` | HERO | 1 | 1 | `src/pages/product-legacy/AgentsAtWork.jsx > Header` | The agents-at-work event hub only. |
| `proof.customer-showcase` | PROOF | 1 | 1 | `src/components/company/customers.jsx > CustomerShowcase` | The customers index only. |
| `proof.press-marquee` | PROOF | 1 | 1 | `src/pages/product-legacy/AiOps.jsx > PressMarquee` | The AI-ops home clone only. |
| `proof.awards-grid` | PROOF | 1 | 1 | `src/pages/product-legacy/AiOps.jsx > Awards` | The AI-ops home clone only. |
| `proof.sdg-industry-benchmark` | PROOF | 1 | 1 | `src/pages/product-legacy/SelfDrivingGtm.jsx > Industry` | The self-driving GTM manifesto only. |
| `proof.sdg-customer` | PROOF | 1 | 1 | `src/pages/product-legacy/SelfDrivingGtm.jsx > Customer (Radar)` | The self-driving GTM manifesto only. |
| `features.agent-governance` | FEATURES | 1 | 1 | `src/components/company/enterprise.jsx > AgentGovernance` | The enterprise page only. |
| `features.production-gap` | FEATURES | 1 | 1 | `src/components/company/enterprise.jsx > ProductionGap` | The enterprise page only. |
| `features.partners-feature-card` | FEATURES | 1 | 1 | `src/pages/company/Partners.jsx > FeatureCard` | The partners page only. |
| `features.partners-benefits` | FEATURES | 1 | 1 | `src/pages/company/Partners.jsx > Benefits` | The partners page only. |
| `features.integrations-power` | FEATURES | 1 | 1 | `src/components/catalog/sections.jsx > ExpandTiles (with NodeDiagram, PillStack3)` | The integrations index only. |
| `features.agent-comparison` | FEATURES | 1 | 1 | `src/components/catalog/agents.jsx > AgentComparison` | The agents landing only. |
| `features.workforce-how-it-works` | FEATURES | 1 | 1 | `src/components/product/workforce.jsx > ExpandTiles (how data)` | The workforce page only. |
| `features.statement-band` | FEATURES | 1 | 1 | `src/components/product/gtm.jsx > StatementBand` | The GTM landing only. |
| `features.platform-framing` | FEATURES | 1 | 1 | `src/components/product/gtm.jsx > PlatformFraming` | The GTM landing only. |
| `features.value-prop-pairs` | FEATURES | 1 | 1 | `src/components/product/gtm.jsx > ValuePropHeading + UseCasePair` | The GTM landing only. |
| `features.playbook-demo` | FEATURES | 1 | 1 | `src/components/product/gtm.jsx > PlaybookDemo` | The GTM landing only. |
| `features.evals-demo` | FEATURES | 1 | 1 | `src/components/product/gtm.jsx > EvalsDemo` | The GTM landing only. |
| `features.inline-video` | FEATURES | 1 | 1 | `src/components/product/invent.jsx > InlineVideo` | The invent landing only. |
| `features.invent-signals` | FEATURES | 1 | 1 | `src/components/product/invent.jsx > SignalsDemo` | The invent landing only. |
| `features.invent-embed` | FEATURES | 1 | 1 | `src/components/product/invent.jsx > EmbedDemo` | The invent landing only. |
| `features.slack-two-up` | FEATURES | 1 | 1 | `src/components/product/slack.jsx > TwoUpFeature` | The Slack landing only. |
| `features.slack-split-explainer` | FEATURES | 1 | 1 | `src/components/product/slack.jsx > SplitExplainer` | The Slack landing only. |
| `features.sdg-framework` | FEATURES | 1 | 1 | `src/pages/product-legacy/SelfDrivingGtm.jsx > Framework` | The self-driving GTM manifesto only. |
| `features.sdg-dimensions` | FEATURES | 1 | 1 | `src/pages/product-legacy/SelfDrivingGtm.jsx > Dimensions` | The self-driving GTM manifesto only. |
| `features.launch-swiper` | FEATURES | 1 | 1 | `src/pages/product-legacy/AgentDrop.jsx > Launches` | The Agent Drop microsite only. |
| `features.legacy-sticky-stack` | FEATURES | 1 | 1 | `src/pages/product-legacy/AiOps.jsx (StackBody in src/components/product-legacy/shared.jsx > StickyStack)` | The AI-ops home clone only (the SEO agent landing embeds the same StickyStack primitive inside its features-list block). |
| `features.legacy-layout-rows` | FEATURES | 1 | 1 | `src/pages/product-legacy/ScheduleWork.jsx > LayoutRow` | The schedule-work page only. |
| `features.legacy-feature-bento` | FEATURES | 1 | 1 | `src/pages/product-legacy/ScheduleWork.jsx > FeatureBento` | The schedule-work page only. |
| `features.legacy-product-cards` | FEATURES | 1 | 1 | `src/pages/product-legacy/ScheduleWork.jsx > ProductCards` | The schedule-work page only. |
| `features.template-slider` | FEATURES | 1 | 1 | `src/pages/product-legacy/AiOps.jsx > TemplateSlider` | The AI-ops home clone only. |
| `features.key-features-sticky` | FEATURES | 1 | 1 | `src/pages/product-legacy/AiOps.jsx > KeyFeatures` | The AI-ops home clone only. |
| `features.scale-your-team` | FEATURES | 1 | 1 | `src/pages/product-legacy/AiOps.jsx > ScaleTeam` | The AI-ops home clone only. |
| `features.api-bento` | FEATURES | 1 | 1 | `src/pages/product-legacy/B6.jsx > ApiPage (bento Row)` | The API page only. |
| `features.pattern-tabs` | FEATURES | 1 | 1 | `src/pages/product-legacy/B6.jsx > PatternTabs` | The multi-agents page only. |
| `features.template-tabs` | FEATURES | 1 | 1 | `src/pages/product-legacy/B6.jsx > TemplateTabs` | The multi-agents page only. |
| `content.about-story` | CONTENT | 1 | 1 | `src/pages/company/AboutUs.jsx > Story` | The about page only. |
| `content.careers-about` | CONTENT | 1 | 1 | `src/components/company/careers.jsx > CareersAbout` | The careers page only. |
| `content.careers-values` | CONTENT | 1 | 1 | `src/components/company/careers.jsx > CareersValues` | The careers page only. |
| `content.competitor-comparison` | CONTENT | 1 | 1 | `src/components/company/enterprise.jsx > CompetitorComparison` | The enterprise page only. |
| `content.changelog-feed` | CONTENT | 1 | 1 | `src/pages/content/Changelog.jsx` | The changelog page only. |
| `content.competitor-picker-table` | CONTENT | 1 | 1 | `src/components/catalog/agents.jsx > CompetitorTable` | The agents landing only. |
| `content.longform-article` | CONTENT | 1 | 1 | `src/pages/product-legacy/SpecialistAgents.jsx` | The specialist-agents article only. |
| `content.legacy-statement` | CONTENT | 1 | 1 | `src/pages/product-legacy/AiOps.jsx (statement Row)` | The AI-ops home clone only. |
| `content.folder-scroll` | CONTENT | 1 | 1 | `src/pages/product-legacy/AgentDrop.jsx > Folder sections + marquee` | The Agent Drop microsite only. |
| `content.watch-now` | CONTENT | 1 | 1 | `src/pages/product-legacy/AgentsAtWork.jsx > Watch` | The agents-at-work hub only. |
| `content.speaker-session-hub` | CONTENT | 1 | 1 | `src/pages/product-legacy/AgentsAtWork.jsx > Cursors + Speakers + Slider + Sessions` | The agents-at-work hub only. |
| `content.not-found` | CONTENT | 1 | 1 | `src/App.jsx > NotFound` | The catch-all route only. |
| `catalog.story-grid` | CATALOG | 1 | 1 | `src/components/company/customers.jsx > StoryGrid` | The customers index only. |
| `catalog.blog-filter-grid` | CATALOG | 1 | 1 | `src/pages/content/ListingGrid.jsx > BlogIndex` | The blog index only. |
| `catalog.comparison-index` | CATALOG | 1 | 1 | `src/pages/content/Comparison.jsx > ComparisonIndex` | The comparison index only. |
| `catalog.integrations-filter-grid` | CATALOG | 1 | 1 | `src/pages/catalog/IntegrationsIndex.jsx > Catalog` | The integrations index only. |
| `catalog.workflow-card-list` | CATALOG | 1 | 1 | `src/pages/catalog/Workflows.jsx` | The workflows index only. |
| `catalog.tools-list` | CATALOG | 1 | 1 | `src/pages/product/Tools.jsx` | The tools page only. |
| `catalog.feature-catalog` | CATALOG | 1 | 1 | `src/components/product/catalog.jsx > FeatureCatalog` | The features catalog page only. |
| `catalog.slack-use-cases` | CATALOG | 1 | 1 | `src/components/product/slack.jsx > UseCaseGrid` | The Slack landing only. |
| `conversion.careers-roles` | CONVERSION | 1 | 1 | `src/components/company/careers.jsx > CareersRoles` | The careers page only. |
| `conversion.demo-form` | CONVERSION | 1 | 1 | `src/pages/company/BookDemo.jsx > DemoHero` | The book-a-demo page only. |
| `conversion.support-form` | CONVERSION | 1 | 1 | `src/pages/company/ContactSupport.jsx > ContactHero` | The contact-support page only. |
| `conversion.partner-apply` | CONVERSION | 1 | 1 | `src/pages/company/Partners.jsx > Apply` | The partners page only. |
| `conversion.invent-get-started` | CONVERSION | 1 | 1 | `src/components/product/invent.jsx > GetStarted` | The invent landing only. |
| `conversion.slack-programmatic-cta` | CONVERSION | 1 | 1 | `src/components/product/slack.jsx > ProgrammaticCTA` | The Slack landing only. |
| `conversion.slack-final-cta` | CONVERSION | 1 | 1 | `src/components/product/slack.jsx > FinalCTA` | The Slack landing only. |
| `conversion.sdg-final-cta` | CONVERSION | 1 | 1 | `src/pages/product-legacy/SelfDrivingGtm.jsx > Final` | The self-driving GTM manifesto only. |
| `conversion.start-button-row` | CONVERSION | 1 | 1 | `src/pages/product-legacy/AgentsAtWork.jsx (final Row)` | The agents-at-work hub only. |
| `conversion.waitlist-form` | CONVERSION | 1 | 1 | `src/pages/product-legacy/BdrWaitlist.jsx > WaitlistForm (first Row)` | The BDR waitlist page only. |

**40 shared sections** appear in more than one template and belong in a component library.

**129 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.home` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | FEATURES | `features.how-we-work` | shared ×2 |
| 5 | PROOF | `proof.case-studies` | shared ×4 |
| 6 | CATALOG | `catalog.use-case-grid` | shared ×3 |
| 7 | FEATURES | `features.cost-hero` | shared ×2 |
| 8 | FEATURES | `features.autonomy-framework` | shared ×2 |
| 9 | PROOF | `proof.enterprise-security` | shared ×6 |
| 10 | FEATURES | `features.integrations-showcase` | shared ×5 |
| 11 | PROOF | `proof.testimonials` | shared ×8 |
| 12 | PROOF | `proof.featured-in` | shared ×2 |
| 13 | CONTENT | `content.learn-more` | shared ×2 |
| 14 | SHELL | `shell.footer` | shared ×53 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.pricing-plan` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | CONTENT | `content.faq-accordion` | shared ×8 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Enterprise — `template.enterprise`

1 route · `/enterprise` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.enterprise` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | PROOF | `proof.testimonials` | shared ×8 |
| 5 | PROOF | `proof.enterprise-security` | shared ×6 |
| 6 | FEATURES | `features.agent-governance` | page-local |
| 7 | FEATURES | `features.stack-collapse` | shared ×3 |
| 8 | PROOF | `proof.case-studies` | shared ×4 |
| 9 | FEATURES | `features.production-gap` | page-local |
| 10 | FEATURES | `features.integrations-showcase` | shared ×5 |
| 11 | CONTENT | `content.competitor-comparison` | page-local |
| 12 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 13 | SHELL | `shell.footer` | shared ×53 |

### About us — `template.about-us`

1 route · `/about-us` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.about` | page-local |
| 3 | CONTENT | `content.about-story` | page-local |
| 4 | SHELL | `shell.footer` | shared ×53 |

### Careers — `template.careers`

1 route · `/careers` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.careers` | page-local |
| 3 | CONTENT | `content.careers-about` | page-local |
| 4 | CONTENT | `content.careers-values` | page-local |
| 5 | CONVERSION | `conversion.careers-roles` | page-local |
| 6 | SHELL | `shell.footer` | shared ×53 |

### Customers index — `template.customers-index`

1 route · `/customers` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.customers` | page-local |
| 3 | PROOF | `proof.customer-showcase` | page-local |
| 4 | CATALOG | `catalog.story-grid` | page-local |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Customer story — `template.customer-story`

6 routes · `/customers/:slug` (1–6) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.story-banner` | page-local |
| 3 | CONTENT | `content.story-article` | page-local |
| 4 | CONVERSION | `conversion.tasks-cta` | shared ×3 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Book a demo — `template.book-a-demo`

1 route · `/book-a-demo` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONVERSION | `conversion.demo-form` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | SHELL | `shell.footer` | shared ×53 |

### Contact support — `template.contact-support`

1 route · `/contact-support` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONVERSION | `conversion.support-form` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Partners — `template.partners`

1 route · `/partners` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.partners` | page-local |
| 3 | FEATURES | `features.partners-feature-card` | page-local |
| 4 | FEATURES | `features.partners-benefits` | page-local |
| 5 | CONTENT | `content.faq-accordion` | shared ×8 |
| 6 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 7 | CONVERSION | `conversion.partner-apply` | page-local |
| 8 | SHELL | `shell.footer` | shared ×53 |

### Legal document — `template.legal`

3 routes · `/privacy-policy`, `/terms-and-conditions`, `/data-security-policy` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONTENT | `content.legal-doc` | page-local |
| 3 | SHELL | `shell.footer` | shared ×53 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.title-band` | shared ×2 |
| 3 | CATALOG | `catalog.blog-filter-grid` | page-local |
| 4 | SHELL | `shell.footer` | shared ×53 |

### Legacy text index — `template.text-index`

2 routes · `/learn`, `/topics` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.title-band` | shared ×2 |
| 3 | CATALOG | `catalog.text-card-grid` | page-local |
| 4 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Blog article — `template.blog-article`

12 routes · `/blog/:slug` (1–12) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONTENT | `content.post-header` | shared ×2 |
| 3 | CONTENT | `content.article-with-aside` | shared ×2 |
| 4 | CONTENT | `content.related-posts` | page-local |
| 5 | CONVERSION | `conversion.blog-footer-cta` | page-local |
| 6 | SHELL | `shell.footer` | shared ×53 |

### Guide article — `template.guide-article`

4 routes · `/learn/:slug | /prompt-engineering/:slug` (1–4) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.guide` | page-local |
| 3 | CONTENT | `content.article-with-aside` | shared ×2 |
| 4 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Topic article (bare) — `template.topic-article`

3 routes · `/topics/:slug` (1–3) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.plain-title` | page-local |
| 3 | CONTENT | `content.prose-body` | shared ×2 |
| 4 | SHELL | `shell.footer` | shared ×53 |

### Note post (minimal) — `template.note-article`

2 routes · `/posts/:slug` (1–2) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONTENT | `content.post-header` | shared ×2 |
| 3 | CONTENT | `content.prose-body` | shared ×2 |
| 4 | SHELL | `shell.footer` | shared ×53 |

### Hub index — `template.hub-index`

2 routes · `/events`, `/resources` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.hub-grain` | page-local |
| 3 | CATALOG | `catalog.hub-row-list` | page-local |
| 4 | CATALOG | `catalog.hub-card-grid` | page-local |
| 5 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 6 | SHELL | `shell.footer` | shared ×53 |

### Event detail — `template.event-detail`

6 routes · `/events/:slug` (1–6) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONTENT | `content.event-register` | page-local |
| 3 | FEATURES | `features.autonomy-framework` | shared ×2 |
| 4 | FEATURES | `features.autonomy-timeline` | shared ×2 |
| 5 | PROOF | `proof.logo-wall` | shared ×15 |
| 6 | SHELL | `shell.footer` | shared ×53 |

### Comparison index — `template.comparison-index`

1 route · `/vs` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CATALOG | `catalog.comparison-index` | page-local |
| 3 | SHELL | `shell.footer` | shared ×53 |

### Comparison page — `template.comparison-page`

4 routes · `/vs/:slug` (1–4) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.comparison` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | FEATURES | `features.fit-cards` | page-local |
| 5 | FEATURES | `features.differences` | page-local |
| 6 | FEATURES | `features.exemplar-run` | page-local |
| 7 | CONTENT | `content.comparison-table` | page-local |
| 8 | FEATURES | `features.switch-steps` | page-local |
| 9 | PROOF | `proof.enterprise-security` | shared ×6 |
| 10 | PROOF | `proof.testimonials` | shared ×8 |
| 11 | CONTENT | `content.faq-accordion` | shared ×8 |
| 12 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 13 | SHELL | `shell.footer` | shared ×53 |

### Changelog feed — `template.changelog`

1 route · `/changelog` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONTENT | `content.changelog-feed` | page-local |
| 3 | SHELL | `shell.footer` | shared ×53 |

### FAQ page — `template.faq-page`

1 route · `/frequently-asked-questions` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.faq-title` | page-local |
| 3 | CONTENT | `content.faq-accordion` | shared ×8 |
| 4 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Academy lesson — `template.academy-lesson`

8 routes · `/relevance-academy/:slug` (1–8) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.academy-lesson` | page-local |
| 3 | CONTENT | `content.academy-lesson-body` | page-local |
| 4 | SHELL | `shell.footer` | shared ×53 |

### Integrations index — `template.integrations-index`

1 route · `/integrations` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.integrations-catalog` | page-local |
| 3 | CATALOG | `catalog.integrations-filter-grid` | page-local |
| 4 | FEATURES | `features.integrations-power` | page-local |
| 5 | PROOF | `proof.testimonials` | shared ×8 |
| 6 | CONTENT | `content.faq-accordion` | shared ×8 |
| 7 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 8 | SHELL | `shell.footer` | shared ×53 |

### Integration detail — `template.integration-detail`

120 routes · `/integrations/:slug` (1–120) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.integration-detail` | page-local |
| 3 | CATALOG | `catalog.integration-actions` | page-local |
| 4 | CONTENT | `content.integration-setup` | page-local |
| 5 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 6 | SHELL | `shell.footer` | shared ×53 |

### Use-case detail — `template.use-case-detail`

56 routes · `/use-cases/:slug` (1–56) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.use-case` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | FEATURES | `features.use-case-how-it-works` | page-local |
| 5 | FEATURES | `features.evals-panel` | shared ×3 |
| 6 | FEATURES | `features.deploy-paths` | shared ×3 |
| 7 | PROOF | `proof.enterprise-security` | shared ×6 |
| 8 | PROOF | `proof.testimonials` | shared ×8 |
| 9 | CATALOG | `catalog.related-rail` | page-local |
| 10 | FEATURES | `features.stack-collapse` | shared ×3 |
| 11 | SHELL | `shell.footer` | shared ×53 |

### Agents landing — `template.agents-landing`

1 route · `/agents` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.agents` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | FEATURES | `features.how-we-work` | shared ×2 |
| 5 | FEATURES | `features.deploy-paths` | shared ×3 |
| 6 | PROOF | `proof.case-studies` | shared ×4 |
| 7 | FEATURES | `features.agent-comparison` | page-local |
| 8 | FEATURES | `features.evals-panel` | shared ×3 |
| 9 | FEATURES | `features.cost-hero` | shared ×2 |
| 10 | FEATURES | `features.integrations-showcase` | shared ×5 |
| 11 | CATALOG | `catalog.use-case-grid` | shared ×3 |
| 12 | PROOF | `proof.testimonials` | shared ×8 |
| 13 | PROOF | `proof.enterprise-security` | shared ×6 |
| 14 | CONTENT | `content.competitor-picker-table` | page-local |
| 15 | CONTENT | `content.faq-accordion` | shared ×8 |
| 16 | CONVERSION | `conversion.tasks-cta` | shared ×3 |
| 17 | SHELL | `shell.footer` | shared ×53 |

### Workflows index (legacy) — `template.workflows-index`

1 route · `/workflows` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CATALOG | `catalog.workflow-card-list` | page-local |
| 3 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 4 | SHELL | `shell.footer` | shared ×53 |

### Workflow detail (legacy) — `template.workflow-detail`

12 routes · `/workflows/:slug` (1–12) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.legacy-uc` | shared ×2 |
| 3 | PROOF | `proof.legacy-logo-row` | shared ×3 |
| 4 | FEATURES | `features.legacy-values` | shared ×2 |
| 5 | FEATURES | `features.with-without` | page-local |
| 6 | FEATURES | `features.legacy-vertical-tabs` | shared ×2 |
| 7 | CONVERSION | `conversion.email-capture` | page-local |
| 8 | SHELL | `shell.footer` | shared ×53 |

### SEO article with TOC (legacy) — `template.seo-article`

12 routes · `/llm-models/:slug | /industry/:slug` (1–12) · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.seo-banner` | page-local |
| 3 | CONTENT | `content.toc-article` | page-local |
| 4 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Feature detail — `template.feature-detail`

4 routes · `/knowledge`, `/approvals-escalations`, `/version-control`, `/collaboration` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.feature` | shared ×2 |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | FEATURES | `features.showcase-row` | shared ×2 |
| 5 | FEATURES | `features.icon-card-grid` | shared ×2 |
| 6 | CONTENT | `content.faq-accordion` | shared ×8 |
| 7 | CATALOG | `catalog.more-features` | page-local |
| 8 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 9 | SHELL | `shell.footer` | shared ×53 |

### Feature detail (video variant) — `template.phone-agent`

1 route · `/phone-agent` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.feature` | shared ×2 |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | FEATURES | `features.showcase-row` | shared ×2 |
| 5 | FEATURES | `features.icon-card-grid` | shared ×2 |
| 6 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 7 | SHELL | `shell.footer` | shared ×53 |

### Workforce landing — `template.workforce`

1 route · `/workforce` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.split-title-canvas` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | FEATURES | `features.workforce-how-it-works` | page-local |
| 5 | FEATURES | `features.deploy-paths` | shared ×3 |
| 6 | FEATURES | `features.integrations-showcase` | shared ×5 |
| 7 | PROOF | `proof.testimonials` | shared ×8 |
| 8 | CONTENT | `content.faq-accordion` | shared ×8 |
| 9 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 10 | SHELL | `shell.footer` | shared ×53 |

### Bulk run (stub) — `template.bulk-run`

1 route · `/bulk-run` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 3 | SHELL | `shell.footer` | shared ×53 |

### Tools list (stub) — `template.tools`

1 route · `/tools` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CATALOG | `catalog.tools-list` | page-local |
| 3 | CONVERSION | `conversion.grain-cta` | shared ×15 |
| 4 | SHELL | `shell.footer` | shared ×53 |

### GTM landing — `template.gtm`

1 route · `/gtm` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.gtm` | page-local |
| 3 | FEATURES | `features.statement-band` | page-local |
| 4 | FEATURES | `features.platform-framing` | page-local |
| 5 | PROOF | `proof.case-studies` | shared ×4 |
| 6 | PROOF | `proof.logo-wall` | shared ×15 |
| 7 | FEATURES | `features.value-prop-pairs` | page-local |
| 8 | FEATURES | `features.playbook-demo` | page-local |
| 9 | FEATURES | `features.evals-demo` | page-local |
| 10 | PROOF | `proof.testimonials` | shared ×8 |
| 11 | CONVERSION | `conversion.tasks-cta` | shared ×3 |
| 12 | SHELL | `shell.footer` | shared ×53 |

### Invent landing — `template.invent`

1 route · `/invent` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.invent` | page-local |
| 3 | FEATURES | `features.inline-video` | page-local |
| 4 | CATALOG | `catalog.use-case-grid` | shared ×3 |
| 5 | FEATURES | `features.invent-signals` | page-local |
| 6 | FEATURES | `features.evals-panel` | shared ×3 |
| 7 | FEATURES | `features.invent-embed` | page-local |
| 8 | FEATURES | `features.stack-collapse` | shared ×3 |
| 9 | CONTENT | `content.learn-more` | shared ×2 |
| 10 | CONVERSION | `conversion.invent-get-started` | page-local |
| 11 | SHELL | `shell.footer` | shared ×53 |

### Slack landing — `template.slack`

1 route · `/slack` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.slack-chat` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×15 |
| 4 | FEATURES | `features.slack-two-up` | page-local |
| 5 | FEATURES | `features.integrations-showcase` | shared ×5 |
| 6 | CATALOG | `catalog.slack-use-cases` | page-local |
| 7 | FEATURES | `features.slack-split-explainer` | page-local |
| 8 | PROOF | `proof.enterprise-security` | shared ×6 |
| 9 | CONVERSION | `conversion.slack-programmatic-cta` | page-local |
| 10 | PROOF | `proof.featured-in` | shared ×2 |
| 11 | CONVERSION | `conversion.slack-final-cta` | page-local |
| 12 | SHELL | `shell.footer` | shared ×53 |

### Features catalog — `template.features-catalog`

1 route · `/features` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.features-text` | page-local |
| 3 | CATALOG | `catalog.feature-catalog` | page-local |
| 4 | PROOF | `proof.logo-wall` | shared ×15 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Self-driving GTM manifesto — `template.self-driving-gtm`

1 route · `/self-driving-gtm` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.sdg-road` | page-local |
| 3 | FEATURES | `features.sdg-framework` | page-local |
| 4 | FEATURES | `features.autonomy-timeline` | shared ×2 |
| 5 | FEATURES | `features.sdg-dimensions` | page-local |
| 6 | PROOF | `proof.sdg-industry-benchmark` | page-local |
| 7 | PROOF | `proof.sdg-customer` | page-local |
| 8 | CONVERSION | `conversion.sdg-final-cta` | page-local |
| 9 | SHELL | `shell.footer` | shared ×53 |

### Specialist agents article — `template.specialist-agents`

1 route · `/specialist-agents` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONTENT | `content.longform-article` | page-local |
| 3 | SHELL | `shell.footer` | shared ×53 |

### Legacy agent landing — `template.legacy-agent-landing`

2 routes · `/customer-support-agent`, `/seo-agent` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.legacy-centered` | shared ×4 |
| 3 | PROOF | `proof.legacy-logo-grid` | shared ×2 |
| 4 | FEATURES | `features.legacy-feature-compare` | page-local |
| 5 | FEATURES | `features.legacy-bento-cards` | shared ×2 |
| 6 | FEATURES | `features.legacy-what-it-does` | page-local |
| 7 | PROOF | `proof.legacy-testimonial-grid` | shared ×3 |
| 8 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 9 | SHELL | `shell.footer` | shared ×53 |

### Legacy SDR landing — `template.legacy-sdr-landing`

2 routes · `/inbound`, `/outbound` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.legacy-centered` | shared ×4 |
| 3 | PROOF | `proof.logo-marquee` | shared ×2 |
| 4 | FEATURES | `features.sdr-roi-stats` | page-local |
| 5 | FEATURES | `features.sdr-before-after` | page-local |
| 6 | PROOF | `proof.sdr-featured-case-study` | page-local |
| 7 | FEATURES | `features.sdr-outbound-features` | page-local |
| 8 | FEATURES | `features.sdr-how-it-works` | page-local |
| 9 | FEATURES | `features.sdr-team-player` | page-local |
| 10 | CONVERSION | `conversion.sdr-timeline-cta` | page-local |
| 11 | SHELL | `shell.footer` | shared ×53 |

### Legacy feature page — `template.legacy-feature-page`

1 route · `/schedule-work` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.dark-card` | page-local |
| 3 | FEATURES | `features.legacy-layout-rows` | page-local |
| 4 | FEATURES | `features.legacy-feature-bento` | page-local |
| 5 | CONTENT | `content.legacy-faq` | shared ×3 |
| 6 | FEATURES | `features.legacy-product-cards` | page-local |
| 7 | CONVERSION | `conversion.legacy-next-steps` | shared ×2 |
| 8 | PROOF | `proof.legacy-customer-cards` | shared ×2 |
| 9 | PROOF | `proof.legacy-logo-grid` | shared ×2 |
| 10 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 11 | SHELL | `shell.footer` | shared ×53 |

### Legacy use-case page — `template.legacy-use-case`

2 routes · `/for-customer-experience`, `/for-market-research` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.legacy-uc` | shared ×2 |
| 3 | PROOF | `proof.legacy-logo-row` | shared ×3 |
| 4 | FEATURES | `features.legacy-values` | shared ×2 |
| 5 | FEATURES | `features.legacy-vertical-tabs` | shared ×2 |
| 6 | PROOF | `proof.legacy-case-study` | page-local |
| 7 | PROOF | `proof.legacy-testimonial-card` | page-local |
| 8 | FEATURES | `features.legacy-all-features` | page-local |
| 9 | FEATURES | `features.legacy-team` | page-local |
| 10 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 11 | SHELL | `shell.footer` | shared ×53 |

### Legacy home clone (AI ops) — `template.legacy-home-clone`

1 route · `/ai-ops` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.legacy-centered` | shared ×4 |
| 3 | PROOF | `proof.legacy-customer-cards` | shared ×2 |
| 4 | PROOF | `proof.logo-marquee` | shared ×2 |
| 5 | FEATURES | `features.legacy-sticky-stack` | page-local |
| 6 | FEATURES | `features.template-slider` | page-local |
| 7 | FEATURES | `features.key-features-sticky` | page-local |
| 8 | FEATURES | `features.scale-your-team` | page-local |
| 9 | PROOF | `proof.press-marquee` | page-local |
| 10 | CONTENT | `content.legacy-faq` | shared ×3 |
| 11 | PROOF | `proof.awards-grid` | page-local |
| 12 | PROOF | `proof.legacy-testimonial-grid` | shared ×3 |
| 13 | CONTENT | `content.legacy-statement` | page-local |
| 14 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 15 | SHELL | `shell.footer` | shared ×53 |

### API landing (legacy B6) — `template.api-landing`

1 route · `/api` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.legacy-centered` | shared ×4 |
| 3 | FEATURES | `features.api-bento` | page-local |
| 4 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Multi-agents landing (legacy B6) — `template.multi-agents`

1 route · `/multi-agents` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.multi-agents-banner` | page-local |
| 3 | FEATURES | `features.template-tabs` | page-local |
| 4 | FEATURES | `features.pattern-tabs` | page-local |
| 5 | FEATURES | `features.legacy-bento-cards` | shared ×2 |
| 6 | PROOF | `proof.legacy-testimonial-grid` | shared ×3 |
| 7 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 8 | SHELL | `shell.footer` | shared ×53 |

### BDR waitlist — `template.bdr-waitlist`

1 route · `/bdr-agent-waiting-list` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONVERSION | `conversion.waitlist-form` | page-local |
| 3 | PROOF | `proof.legacy-logo-row` | shared ×3 |
| 4 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 5 | SHELL | `shell.footer` | shared ×53 |

### Agent Drop microsite — `template.agent-drop`

1 route · `/agent-drop` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.agent-drop` | page-local |
| 3 | FEATURES | `features.launch-swiper` | page-local |
| 4 | CONTENT | `content.folder-scroll` | page-local |
| 5 | CONVERSION | `conversion.legacy-footer-cta` | shared ×10 |
| 6 | SHELL | `shell.footer` | shared ×53 |

### Agents at work hub — `template.agents-at-work`

1 route · `/agents-at-work` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | HERO | `hero.agents-at-work` | page-local |
| 3 | CONTENT | `content.watch-now` | page-local |
| 4 | CONTENT | `content.speaker-session-hub` | page-local |
| 5 | CONTENT | `content.legacy-faq` | shared ×3 |
| 6 | CONVERSION | `conversion.legacy-next-steps` | shared ×2 |
| 7 | CONVERSION | `conversion.start-button-row` | page-local |
| 8 | SHELL | `shell.footer` | shared ×53 |

### Not found — `template.not-found`

1 route · `*` · chrome: **built**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×53 |
| 2 | CONTENT | `content.not-found` | page-local |
| 3 | SHELL | `shell.footer` | shared ×53 |

## Section reference

### SHELL

_Global chrome mounted by App.jsx on every route: header/mega-menu and footer._

**`shell.navbar`** — Fixed 65px top header: Lumenfold logo, primary links that open the mega-menu panels, sign-in and primary CTA buttons; collapses to a hamburger-triggered mobile drawer.

· Mounted once in App.jsx around the router, so every route carries it, including the not-found page and the spec-only templates once they are routed. · appears on 296 routes · implemented by `src/components/Navbar.jsx`

**`shell.footer`** — Site footer: link columns, newsletter/brand block and legal row, rendered below <main>.

· Mounted once in App.jsx, so every route carries it; legacy originals that had their own footer (or none) are rebuilt with this one. · appears on 296 routes · implemented by `src/components/Footer.jsx`

### HERO

_The page-opening block of a route._

**`hero.home`** — Homepage launch hero (InventLaunchHero): mascot with halo, centred h1, sub-copy and CTA pair.

· Homepage only. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.pricing-plan`** — Pricing hero: two-line h1 over scattered mono glyphs, then a single bordered plan card with a two-column check-list and a full-width CTA.

· The pricing page only. · appears on 1 routes · implemented by `src/pages/company/Pricing.jsx > PricingHero`

**`hero.enterprise`** — Enterprise hero: 7/5 split with a pill, h1 with indigo accent and CTAs on the left, and a violet grain panel of glass chips on the right.

· The enterprise page only. · appears on 1 routes · implemented by `src/components/company/enterprise.jsx > EnterpriseHero`

**`hero.about`** — About hero: centred glass pill and accented h1 above a wide bordered office photo (no buttons).

· The about page only. · appears on 1 routes · implemented by `src/pages/company/AboutUs.jsx > AboutHero`

**`hero.careers`** — Careers hero: centred accented h1, sub-copy and one large button anchored to the open-roles list, above a wide team photo.

· The careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > CareersHero`

**`hero.customers`** — Customers index hero: static centred h1, sub-copy and a primary/secondary button pair, closed by a bottom border.

· The customers index only. · appears on 1 routes · implemented by `src/pages/company/Customers.jsx > CustomersHero`

**`hero.story-banner`** — Customer-story photo banner: full-width photo with indigo scrim, white breadcrumb, h1 and byline.

· Every customer story detail page. · appears on 6 routes · implemented by `src/components/company/customers.jsx > StoryHero`

**`hero.partners`** — Partners hero: 7/5 grid with pill, accented h1, body and an apply button left, rectangular photo right.

· The partners page only. · appears on 1 routes · implemented by `src/pages/company/Partners.jsx > PartnersHero`

**`hero.title-band`** — Editorial title band: left-aligned semibold h1 and one-line description in a bordered rail row.

· The blog index and the two legacy text indexes (learn, topics). · appears on 3 routes · implemented by `src/pages/content/ListingGrid.jsx > TitleBand`

**`hero.guide`** — Guide hero: centred large h1, a primary CTA and a star-separated reassurance note line.

· Learn and prompt-engineering guide articles. · appears on 4 routes · implemented by `src/pages/content/Article.jsx > GuideArticle`

**`hero.plain-title`** — Bare article title: a single semibold h1 at the top of the article column, no back link, date, author or cover.

· Topic explainer articles only. · appears on 3 routes · implemented by `src/pages/content/Article.jsx > TopicArticle`

**`hero.hub-grain`** — Hub grain hero: accented h1 and body on the left, a grain panel holding an auto-advancing carousel of upcoming/featured items on the right.

· The events and resources hubs. · appears on 2 routes · implemented by `src/components/content/HubHero.jsx`

**`hero.comparison`** — Comparison hero: Lumenfold-vs-competitor glyph pairing, h1 and CTAs on a grain panel.

· Every comparison page. · appears on 4 routes · implemented by `src/components/content/comparison.jsx > CompareHero`

**`hero.faq-title`** — FAQ page title: centred 48px h1 with one indigo word, alone in a page section.

· The FAQ page only. · appears on 1 routes · implemented by `src/pages/content/FAQPage.jsx`

**`hero.integrations-catalog`** — Integrations catalog hero: h1 and CTA pair over a violet grain "aurora" of rotated glass coins with app glyphs.

· The integrations index only. · appears on 1 routes · implemented by `src/pages/catalog/IntegrationsIndex.jsx > Hero`

**`hero.integration-detail`** — Integration detail header: slash breadcrumb, 56px logo tile, h1, body, primary CTA and a "more in this category" link.

· Every integration detail page. · appears on 120 routes · implemented by `src/pages/catalog/IntegrationDetail.jsx`

**`hero.use-case`** — Use-case hero with a live run panel: function-palette grain, h1, CTAs, integration logos and a scripted agent-run timeline.

· Every use-case (agent) detail page. · appears on 56 routes · implemented by `src/components/catalog/usecase.jsx > UseCaseHero`

**`hero.agents`** — Agents landing hero: h1 and CTAs above an animated dashed-path agent graph on grain.

· The agents product landing only. · appears on 1 routes · implemented by `src/components/catalog/agents.jsx > AgentsHero`

**`hero.legacy-uc`** — Legacy use-case hero rebuilt on Lumenfold tokens: tag line, large h1, body, gradient and outline pill CTAs, with a video poster (or image) media column bleeding right.

· Workflow detail pages and the legacy use-case pages (customer experience, market research). · appears on 14 routes · implemented by `src/pages/catalog/WorkflowDetail.jsx > Hero (parallel copy: src/pages/product-legacy/UseCaseLegacy.jsx > Hero)`

**`hero.seo-banner`** — Legacy SEO banner: soft violet gradient band, display-size heading (not an h1 tag), one primary button and a star-divided label row, with floating decorative shapes.

· LLM-model and industry SEO articles. · appears on 12 routes · implemented by `src/pages/catalog/Article.jsx (banner + Decor)`

**`hero.feature`** — FeatureHero: 5/7 split with h1, body and CTA pair on the left and a product mock card (or, on the phone-agent variant, a 16:9 video poster) on the right.

· The four feature detail pages and the phone-agent page. · appears on 5 routes · implemented by `src/components/product/lib.jsx > FeatureHero`

**`hero.split-title-canvas`** — Split-title hero over a 460px workflow canvas of agent nodes with a status pill and chip.

· The workforce page only. · appears on 1 routes · implemented by `src/components/product/workforce.jsx > SplitTitleHero`

**`hero.gtm`** — GTM hero: eyebrow, h1 with a rotating word (eleven options, 2.5s), and a fanned two-row deck of tool cards.

· The GTM product landing only. · appears on 1 routes · implemented by `src/components/product/gtm.jsx > GTMHero`

**`hero.invent`** — Invent hero: drifting cloud clusters, a haloed mascot with three bobbing speech pills, h1, sub-copy and CTAs, followed by a strip of scripted step cells.

· The invent product landing only. · appears on 1 routes · implemented by `src/components/product/invent.jsx > InventHero`

**`hero.slack-chat`** — Slack hero with a scripted chat demo of an agent answering inside a channel.

· The Slack product landing only. · appears on 1 routes · implemented by `src/components/product/slack.jsx > SlackHero + ChatDemo (over SlackDeco background)`

**`hero.features-text`** — Text-only features hero (no media): h1, intro and a CTA pair above the feature catalog.

· The features catalog page only. · appears on 1 routes · implemented by `src/components/product/catalog.jsx > FeaturesHero`

**`hero.sdg-road`** — Self-driving GTM "road" hero: centred h1 and lead, an SVG road with clickable autonomy-level markers, a readout box, use-case switcher pills, CTA row and a grayscale trust strip.

· The self-driving GTM manifesto only. · appears on 1 routes · implemented by `src/pages/product-legacy/SelfDrivingGtm.jsx > Hero (Road, Trust)`

**`hero.legacy-centered`** — Legacy centred hero rebuilt on Lumenfold tokens: pill, h1, body, buttons and an optional 16:9 video poster with wandering cursor labels.

· The legacy agent landings, SDR landings, the AI-ops home clone and the API page. · appears on 6 routes · implemented by `src/components/product-legacy/shared.jsx > CenteredHero`

**`hero.multi-agents-banner`** — Multi-agents enterprise banner: pill, h1 with an indigo span, sub-header, two buttons and a framed video with a pulse ring.

· The multi-agents page only. · appears on 1 routes · implemented by `src/pages/product-legacy/B6.jsx > MultiAgents (hero Row)`

**`hero.dark-card`** — Legacy dark hero card: a full-width dark rounded card holding h1, body, CTAs and a product visual.

· The schedule-work page only. · appears on 1 routes · implemented by `src/pages/product-legacy/ScheduleWork.jsx > DarkHero`

**`hero.agent-drop`** — Agent Drop launch hero: dark night-sky stage with layered land illustrations, a flickering title image with glow, a line of copy and a glowing button.

· The Agent Drop event microsite only. · appears on 1 routes · implemented by `src/pages/product-legacy/AgentDrop.jsx > Hero`

**`hero.agents-at-work`** — Agents-at-work header: full-bleed background image and muted background video behind a centred heading, a button and a short logo row.

· The agents-at-work event hub only. · appears on 1 routes · implemented by `src/pages/product-legacy/AgentsAtWork.jsx > Header`

**`hero.academy-lesson`** — Dark academy lesson header: breadcrumb (course, chevron, lesson), h1, and prev/next arrow buttons.

· Academy lesson pages. · appears on 8 routes · implemented by `src/components/academy/lesson.jsx`

### PROOF

_Social proof: customer logos, case studies, testimonials, security and awards._

**`proof.logo-wall`** — LogoGridSection: grid of grayscale customer wordmarks (six across at xl), some with a small indigo "read story" link and sliding arrow on hover.

· Homepage plus most product, comparison, catalog-detail, event and company conversion pages (see matrix). · appears on 81 routes · implemented by `src/components/LogoWall.jsx (company pages use the parallel copy src/components/company/shared.jsx > LogoGrid, whose links go to customer stories)`

**`proof.case-studies`** — Case-study accordion: expanding rows of customer outcomes with metric, quote and photo.

· Homepage, enterprise, the agents landing and the GTM landing. · appears on 4 routes · implemented by `src/components/CaseStudies.jsx`

**`proof.enterprise-security`** — EnterpriseSecurity: compliance badge strip in a slate panel followed by a three-column security check-list.

· Homepage, enterprise, agents landing, use-case details, comparison pages, and the Slack landing. · appears on 64 routes · implemented by `src/components/Enterprise.jsx`

**`proof.testimonials`** — Testimonial tabs: company tabs switching a quote, person and video-play media tile.

· Homepage and many landing/detail pages (see matrix). · appears on 66 routes · implemented by `src/components/Testimonials.jsx`

**`proof.featured-in`** — Press and awards strip (FeaturedIn): laurel-framed award marks and press logos.

· Homepage and the Slack landing. · appears on 2 routes · implemented by `src/components/Featured.jsx`

**`proof.customer-showcase`** — Customer showcase: the homepage testimonial-tab layout in its case-study variant, featuring three stories with metrics and story links.

· The customers index only. · appears on 1 routes · implemented by `src/components/company/customers.jsx > CustomerShowcase`

**`proof.legacy-logo-row`** — Legacy logo row: centred label above a six-column grid of customer wordmarks.

· Workflow details, the legacy use-case pages and the BDR waitlist. · appears on 15 routes · implemented by `src/pages/catalog/WorkflowDetail.jsx > LogoRow (parallel copy: src/pages/product-legacy/UseCaseLegacy.jsx > LogoRow and src/pages/product-legacy/BdrWaitlist.jsx, both a label row over src/components/LogoWall.jsx)`

**`proof.legacy-logo-grid`** — Legacy awards-container logo grid of thirteen-ish wordmarks under a short label, without story links.

· Legacy agent landings and the schedule-work page. · appears on 3 routes · implemented by `src/components/product-legacy/shared.jsx > LegacyLogoGrid`

**`proof.logo-marquee`** — Legacy logo marquee: three duplicated rows of customer logos scrolling horizontally.

· SDR landings and the AI-ops home clone. · appears on 3 routes · implemented by `src/components/product-legacy/shared.jsx > LogoMarquee`

**`proof.legacy-testimonial-grid`** — Legacy testimonials-simple grid: pill and heading over a masonry of short quote cards.

· Legacy agent landings, the AI-ops home clone and the multi-agents page. · appears on 4 routes · implemented by `src/components/product-legacy/shared.jsx > TestimonialGrid`

**`proof.legacy-testimonial-card`** — Single large legacy testimonial card (lavender or white shadowed panel, centred quote and person).

· Legacy use-case pages only. · appears on 2 routes · implemented by `src/pages/product-legacy/UseCaseLegacy.jsx > Testimonial`

**`proof.legacy-case-study`** — Legacy case-study block: heading, two customer logos and an image.

· Only the market-research variant of the legacy use-case template. · appears on 2 routes · implemented by `src/pages/product-legacy/UseCaseLegacy.jsx > CaseStudy`

**`proof.legacy-customer-cards`** — Legacy customer cards: three story cards with photo, logo and outcome.

· The schedule-work page and the AI-ops home clone. · appears on 2 routes · implemented by `src/components/product-legacy/shared.jsx > CustomerCards`

**`proof.sdr-featured-case-study`** — SDR featured case study: one customer story card with headline metric and quote.

· SDR landings only. · appears on 2 routes · implemented by `src/pages/product-legacy/SDRLanding.jsx > FeaturedCase`

**`proof.press-marquee`** — Press marquee: a looping row of white press cards, each an image and a button.

· The AI-ops home clone only. · appears on 1 routes · implemented by `src/pages/product-legacy/AiOps.jsx > PressMarquee`

**`proof.awards-grid`** — Awards grid: short heading and four white award cards (logo plus caption).

· The AI-ops home clone only. · appears on 1 routes · implemented by `src/pages/product-legacy/AiOps.jsx > Awards`

**`proof.sdg-industry-benchmark`** — Self-driving GTM industry section: two-column header, a four-segment benchmark track with an indigo band, and a three-cell dark-bordered stats strip with sources.

· The self-driving GTM manifesto only. · appears on 1 routes · implemented by `src/pages/product-legacy/SelfDrivingGtm.jsx > Industry`

**`proof.sdg-customer`** — Self-driving GTM customer section: h2, body and an indigo-ruled pull quote beside a before/after radar chart.

· The self-driving GTM manifesto only. · appears on 1 routes · implemented by `src/pages/product-legacy/SelfDrivingGtm.jsx > Customer (Radar)`

### FEATURES

_Product explanation modules: tiles, demos, diagrams, comparisons of approach._

**`features.how-we-work`** — HowWeWork expanding tiles: a row of colour-palette tiles that widen on hover/selection to reveal label, heading, body and an illustration.

· Homepage and the agents landing (same component, same content). · appears on 2 routes · implemented by `src/components/Tiles.jsx`

**`features.cost-hero`** — CostHero product mock: a large app-window card showing an agent run, task list and cost readout on grain.

· Homepage and the agents landing (as its agent-activity block). · appears on 2 routes · implemented by `src/components/CostHero.jsx`

**`features.autonomy-framework`** — AutonomyAndProduct four-level framework: level cards describing increasing agent autonomy beside a product visual.

· Homepage and every event detail page. · appears on 7 routes · implemented by `src/components/Autonomy.jsx`

**`features.integrations-showcase`** — IntegrationsShowcase: heading and CTA beside a wall of app-icon tiles.

· Homepage, enterprise, agents landing, workforce, and the Slack landing. · appears on 5 routes · implemented by `src/components/Integrations.jsx`

**`features.agent-governance`** — Agent governance: three expanding tiles (violet, pink, blue) about permissions, approvals and audit, under a PageSection heading.

· The enterprise page only. · appears on 1 routes · implemented by `src/components/company/enterprise.jsx > AgentGovernance`

**`features.stack-collapse`** — StackCollapse: an isometric layered-stack diagram beside a cycling highlighted list (about 1.8s per row), closed by its own grain CTA card or marquee.

· Enterprise, every use-case detail page and the invent landing. · appears on 58 routes · implemented by `src/components/company/enterprise.jsx > StackCollapse (parallel copy: src/components/catalog/usecase.jsx > StackCollapse, which embeds its closing CtaTile; src/components/product/invent.jsx > StackCollapse)`

**`features.production-gap`** — Production gap: a section contrasting pilot vs production agent requirements with a diagram.

· The enterprise page only. · appears on 1 routes · implemented by `src/components/company/enterprise.jsx > ProductionGap`

**`features.partners-feature-card`** — Partners feature card: square bordered two-column card of photo and accented h2, body and a secondary button.

· The partners page only. · appears on 1 routes · implemented by `src/pages/company/Partners.jsx > FeatureCard`

**`features.partners-benefits`** — Partners benefits bento: centred pill/heading, then a three-column hairline grid of small icon cells and large image cells.

· The partners page only. · appears on 1 routes · implemented by `src/pages/company/Partners.jsx > Benefits`

**`features.autonomy-timeline`** — AutonomyTimeline: four-step horizontal timeline with gradient connector, numbered discs and bordered step cards (scrolls horizontally on small screens).

· Every event detail page and the self-driving GTM manifesto. · appears on 7 routes · implemented by `src/components/content/AutonomyTimeline.jsx (parallel copy: src/pages/product-legacy/SelfDrivingGtm.jsx > AutonomyTimeline, rendered inside its Framework)`

**`features.fit-cards`** — Fit cards: two side-by-side cards, "when the competitor fits" vs "when Lumenfold fits", with check rows.

· Every comparison page. · appears on 4 routes · implemented by `src/components/content/comparison.jsx > FitCards`

**`features.differences`** — Key differences: numbered rows explaining where the approaches diverge (layout alternates by page).

· Every comparison page. · appears on 4 routes · implemented by `src/components/content/comparison.jsx > Differences`

**`features.exemplar-run`** — Exemplar run: a scrolling transcript panel replaying an agent run step by step.

· Every comparison page. · appears on 4 routes · implemented by `src/components/content/comparison.jsx > ExemplarRun`

**`features.switch-steps`** — Switching steps: short numbered plan for migrating from the competitor.

· Every comparison page. · appears on 4 routes · implemented by `src/components/content/comparison.jsx > SwitchSteps`

**`features.integrations-power`** — Integrations-power tiles: an ExpandTiles block whose tiles carry a node diagram and pill stacks explaining what connected apps unlock.

· The integrations index only. · appears on 1 routes · implemented by `src/components/catalog/sections.jsx > ExpandTiles (with NodeDiagram, PillStack3)`

**`features.use-case-how-it-works`** — Use-case how-it-works: pipeline tile of three cells with arrows, three feature texts, and a dashed before/after comparison table.

· Every use-case detail page. · appears on 56 routes · implemented by `src/components/catalog/usecase.jsx > HowItWorks`

**`features.evals-panel`** — Evals panel (EvalsFloor): grain-framed evaluation card listing test rows with path-drawn scores against thresholds.

· Every use-case detail page, the agents landing and the invent landing. · appears on 58 routes · implemented by `src/components/catalog/sections.jsx > EvalsPanel (parallel copy: src/components/product/invent.jsx > EvalsFloor)`

**`features.deploy-paths`** — Deploy paths: three expanding tiles (violet, pink, blue) showing ways to deploy an agent: an avatar/node graph with a dashed empty slot, a typing-input pill, and a stack of model chips.

· Agents landing, every use-case detail page and the workforce page. · appears on 58 routes · implemented by `src/components/catalog/sections.jsx > DeployPaths (parallel copy: src/components/product/workforce.jsx > ExpandTiles fed the deploy data)`

**`features.agent-comparison`** — Agent comparison: a node-canvas contrasting a single agent with a coordinated agent team.

· The agents landing only. · appears on 1 routes · implemented by `src/components/catalog/agents.jsx > AgentComparison`

**`features.with-without`** — With/without comparison: h3 then two columns, each with an icon, heading and three icon-led items.

· Workflow detail pages only. · appears on 12 routes · implemented by `src/pages/catalog/WorkflowDetail.jsx > Compare`

**`features.legacy-values`** — Legacy values block: 1.5fr/1fr heading-and-body row, a centred scale-in h2, and a three-column grid of image cards.

· Workflow details and the legacy use-case pages. · appears on 14 routes · implemented by `src/pages/catalog/WorkflowDetail.jsx > Values (parallel copy: src/pages/product-legacy/UseCaseLegacy.jsx > Values)`

**`features.legacy-vertical-tabs`** — Legacy vertical tabs: h2, then an image pane beside a menu of accordion tab cards that switch the image.

· Workflow details and the legacy use-case pages. · appears on 14 routes · implemented by `src/pages/catalog/WorkflowDetail.jsx > VerticalTabs (parallel copy: src/pages/product-legacy/UseCaseLegacy.jsx > VTabs)`

**`features.showcase-row`** — ShowcaseRow: alternating text/screenshot rows (one or two per page), optionally with a CTA pair.

· The four feature detail pages and the phone-agent page. · appears on 5 routes · implemented by `src/components/product/lib.jsx > ShowcaseRow`

**`features.icon-card-grid`** — IconCardGrid: heading over a grid of line-icon cards (four or six cards; a three-column variant on phone-agent).

· The four feature detail pages and the phone-agent page. · appears on 5 routes · implemented by `src/components/product/lib.jsx > IconCardGrid`

**`features.workforce-how-it-works`** — Workforce how-it-works tiles: three expanding tiles (violet, blue, green-ops) with node/pill diagrams.

· The workforce page only. · appears on 1 routes · implemented by `src/components/product/workforce.jsx > ExpandTiles (how data)`

**`features.statement-band`** — Statement band: one large centred positioning sentence in a bordered row.

· The GTM landing only. · appears on 1 routes · implemented by `src/components/product/gtm.jsx > StatementBand`

**`features.platform-framing`** — Platform framing: heading inside an orbit of floating tool bubbles and labels.

· The GTM landing only. · appears on 1 routes · implemented by `src/components/product/gtm.jsx > PlatformFraming`

**`features.value-prop-pairs`** — Value-prop pairs: a repeated group (four times) of a large ValuePropHeading followed by a two-cell UseCasePair with three checks per cell.

· The GTM landing only. · appears on 1 routes · implemented by `src/components/product/gtm.jsx > ValuePropHeading + UseCasePair`

**`features.playbook-demo`** — Playbook-to-agents tabbed canvas demo: tab bar over a 500px node canvas with a live status footer.

· The GTM landing only. · appears on 1 routes · implemented by `src/components/product/gtm.jsx > PlaybookDemo`

**`features.evals-demo`** — GTM evals demo: frame with a left score panel and animated bar chart, and a right list of test rows resolving with spring status dots.

· The GTM landing only. · appears on 1 routes · implemented by `src/components/product/gtm.jsx > EvalsDemo`

**`features.inline-video`** — Inline video band: PageSection heading over a square-cornered 16:9 poster that swaps to an iframe on click.

· The invent landing only. · appears on 1 routes · implemented by `src/components/product/invent.jsx > InlineVideo`

**`features.invent-signals`** — Invent signals demo: framed scripted canvas of a specialist agent team reacting to signals, with a mascot badge.

· The invent landing only. · appears on 1 routes · implemented by `src/components/product/invent.jsx > SignalsDemo`

**`features.invent-embed`** — Invent embed demo: grain frame of linked and unlinked app cards plus a dashed add card.

· The invent landing only. · appears on 1 routes · implemented by `src/components/product/invent.jsx > EmbedDemo`

**`features.slack-two-up`** — Slack two-up feature: two numbered hairline cells beside media.

· The Slack landing only. · appears on 1 routes · implemented by `src/components/product/slack.jsx > TwoUpFeature`

**`features.slack-split-explainer`** — Slack split explainer: two paragraphs beside three stat cells on a hairline grid.

· The Slack landing only. · appears on 1 routes · implemented by `src/components/product/slack.jsx > SplitExplainer`

**`features.sdg-framework`** — Self-driving GTM framework: two-column header, a four-cell "highway" track with level pins, and four level cards with illustration, unlock and example boxes.

· The self-driving GTM manifesto only. · appears on 1 routes · implemented by `src/pages/product-legacy/SelfDrivingGtm.jsx > Framework`

**`features.sdg-dimensions`** — Self-driving GTM dimensions: three-column square cards with icon tile, L1-vs-L4 compare grid and a red cost strip.

· The self-driving GTM manifesto only. · appears on 1 routes · implemented by `src/pages/product-legacy/SelfDrivingGtm.jsx > Dimensions`

**`features.launch-swiper`** — Launch swiper: dark section with pill, h2 and body above a centred one-per-view swiper of large rounded launch cards.

· The Agent Drop microsite only. · appears on 1 routes · implemented by `src/pages/product-legacy/AgentDrop.jsx > Launches`

**`features.legacy-sticky-stack`** — Legacy sticky stack section: heading over scroll-scaled cards that stack under a sticky top offset.

· The AI-ops home clone only (the SEO agent landing embeds the same StickyStack primitive inside its features-list block). · appears on 1 routes · implemented by `src/pages/product-legacy/AiOps.jsx (StackBody in src/components/product-legacy/shared.jsx > StickyStack)`

**`features.legacy-feature-compare`** — Legacy features-list block in one row: pill/heading over a backdrop, on the SEO variant a sticky stack of six step cards, then a row of five or six icon features and two compare cards of four rows each.

· Legacy agent landings only. · appears on 2 routes · implemented by `src/pages/product-legacy/AgentLanding.jsx (LHeading + IconRow + CompareCards)`

**`features.legacy-bento-cards`** — Legacy bento cards (layout361): pill and heading over a two-plus-one (or five-card) bento of image cards.

· Legacy agent landings and the multi-agents page. · appears on 3 routes · implemented by `src/components/product-legacy/shared.jsx > BentoCards`

**`features.legacy-what-it-does`** — What-it-does block: heading and body beside four benefit cards.

· Legacy agent landings only. · appears on 2 routes · implemented by `src/pages/product-legacy/AgentLanding.jsx > WhatItDoes`

**`features.sdr-roi-stats`** — SDR ROI stats: five animated counters with labels.

· SDR landings only (placed after the before/after block on the outbound variant). · appears on 2 routes · implemented by `src/pages/product-legacy/SDRLanding.jsx > Roi`

**`features.sdr-before-after`** — SDR before/after: three pairs of before and after cards joined by arrows.

· SDR landings only. · appears on 2 routes · implemented by `src/pages/product-legacy/SDRLanding.jsx > BeforeAfter`

**`features.sdr-outbound-features`** — SDR outbound features: centred pill and accented h2 over a two-by-two feature grid.

· SDR landings only. · appears on 2 routes · implemented by `src/pages/product-legacy/SDRLanding.jsx > OutboundFeatures`

**`features.sdr-how-it-works`** — SDR how-it-works: starry background, standard heading and four numbered steps.

· SDR landings only. · appears on 2 routes · implemented by `src/pages/product-legacy/SDRLanding.jsx > Steps`

**`features.sdr-team-player`** — SDR team-player: heading and two cards of four points each.

· SDR landings only. · appears on 2 routes · implemented by `src/pages/product-legacy/SDRLanding.jsx > TeamPlayer`

**`features.legacy-layout-rows`** — Legacy layout rows: two alternating text/image rows (1.25fr/1fr then reversed).

· The schedule-work page only. · appears on 1 routes · implemented by `src/pages/product-legacy/ScheduleWork.jsx > LayoutRow`

**`features.legacy-feature-bento`** — Legacy feature bento: six-cell grid of icon features.

· The schedule-work page only. · appears on 1 routes · implemented by `src/pages/product-legacy/ScheduleWork.jsx > FeatureBento`

**`features.legacy-product-cards`** — Legacy dark product cards: three dark tinted cards linking to products.

· The schedule-work page only. · appears on 1 routes · implemented by `src/pages/product-legacy/ScheduleWork.jsx > ProductCards`

**`features.legacy-all-features`** — Legacy all-features grid: h3 and body over a four-column grid of eight feature items.

· Legacy use-case pages only. · appears on 2 routes · implemented by `src/pages/product-legacy/UseCaseLegacy.jsx > AllFeatures`

**`features.legacy-team`** — Legacy team split row: image beside a large two-part h3, three check rows and five plus-icon items.

· Legacy use-case pages only. · appears on 2 routes · implemented by `src/pages/product-legacy/UseCaseLegacy.jsx > Team`

**`features.template-slider`** — Template slider: centred one-per-view swiper of four pastel template cards with round prev/next buttons.

· The AI-ops home clone only. · appears on 1 routes · implemented by `src/pages/product-legacy/AiOps.jsx > TemplateSlider`

**`features.key-features-sticky`** — Key features: four sticky frosted cards, each with a looping product video bleeding right.

· The AI-ops home clone only. · appears on 1 routes · implemented by `src/pages/product-legacy/AiOps.jsx > KeyFeatures`

**`features.scale-your-team`** — Scale-your-team: two h2s (one with typed rotating text), a rising hero image, a three-column list of six items and two buttons.

· The AI-ops home clone only. · appears on 1 routes · implemented by `src/pages/product-legacy/AiOps.jsx > ScaleTeam`

**`features.api-bento`** — API bento: pill and h2 over a two-plus-two grid of four bordered image cards.

· The API page only. · appears on 1 routes · implemented by `src/pages/product-legacy/B6.jsx > ApiPage (bento Row)`

**`features.pattern-tabs`** — Multi-agent pattern tabs: centred pill tabs switching a product mock of an agent-team pattern (violet, pink, blue).

· The multi-agents page only. · appears on 1 routes · implemented by `src/pages/product-legacy/B6.jsx > PatternTabs`

**`features.template-tabs`** — Multi-agent template tabs: four category tabs, each pane a horizontal row of six template cards with creator chip and tag.

· The multi-agents page only. · appears on 1 routes · implemented by `src/pages/product-legacy/B6.jsx > TemplateTabs`

### CONTENT

_Substantive reading content: articles, FAQs, legal text, event and story bodies._

**`content.learn-more`** — LearnMore resource cards: three to four linked cards to guides, blog and academy content.

· Homepage and the invent landing. · appears on 2 routes · implemented by `src/components/LearnMore.jsx`

**`content.faq-accordion`** — FAQ accordion: heading block (h2, short body, optional inline link) over a square-cornered, hairline-divided accordion with 32px plus/minus discs; single-open by default (multi-open on the FAQ page); emits FAQPage JSON-LD.

· Pricing, partners, comparison pages, the FAQ page, the integrations index, the agents landing, feature details and workforce. · appears on 14 routes · implemented by `src/components/content/FAQSection.jsx (parallel copies: src/components/company/shared.jsx > FAQ, src/components/product/lib.jsx > FAQSection, src/components/catalog/sections.jsx > Faq)`

**`content.about-story`** — About story: centred pill, then a two-column split of a square photo and an h3 with prose, list and inline links.

· The about page only. · appears on 1 routes · implemented by `src/pages/company/AboutUs.jsx > Story`

**`content.careers-about`** — Careers about statement: a large paragraph revealed word by word on scroll, with supporting stats.

· The careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > CareersAbout`

**`content.careers-values`** — Careers values: a six-cell hairline grid of company values.

· The careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > CareersValues`

**`content.story-article`** — Customer story article: meta bar (logo plus pill tags), story prose with pull quotes, and a share row.

· Every customer story detail page. · appears on 6 routes · implemented by `src/components/company/customers.jsx > StoryArticle`

**`content.legal-doc`** — Legal document: title, a sticky contents sidebar with IntersectionObserver scrollspy, and a prose body of paragraphs, lists and tables; no motion.

· The three legal pages (privacy, terms, data security). · appears on 3 routes · implemented by `src/pages/company/Legal.jsx`

**`content.competitor-comparison`** — Enterprise competitor comparison: a static feature-by-vendor table with check/cross cells.

· The enterprise page only. · appears on 1 routes · implemented by `src/components/company/enterprise.jsx > CompetitorComparison`

**`content.post-header`** — Post header: back link, reading-time pill and date, h1, and optional author row and cover image.

· Blog posts and changelog note posts. · appears on 14 routes · implemented by `src/pages/content/Article.jsx > PostHeader`

**`content.article-with-aside`** — Article body with aside: a sticky contents aside with scrollspy (and share buttons on blog posts) beside the prose column.

· Blog posts and learn/prompt-engineering guides. · appears on 16 routes · implemented by `src/components/content/ArticleAside.jsx + src/components/content/Prose.jsx`

**`content.prose-body`** — Plain prose column with no aside, contents or share controls.

· Topic explainers and changelog note posts. · appears on 5 routes · implemented by `src/components/content/Prose.jsx`

**`content.related-posts`** — Related posts: bordered-top section with three blog cards (same category first).

· Blog posts only. · appears on 12 routes · implemented by `src/pages/content/Article.jsx > BlogArticle`

**`content.event-register`** — Event registration row: sticky left column (eyebrow, accented h1, lead, date bar, registration or recording form) and right column (speaker cards, takeaways list).

· Every event detail page. · appears on 6 routes · implemented by `src/pages/content/EventDetail.jsx (with src/components/content/EventForm.jsx)`

**`content.comparison-table`** — Comparison table: dashed-rule capability table, Lumenfold vs one competitor.

· Every comparison page. · appears on 4 routes · implemented by `src/components/content/comparison.jsx > CompareTable`

**`content.changelog-feed`** — Changelog feed: h1 and intro, then dated entries with a sticky date/summary column, anchored h2s, a cover image, body and optional link to the full note post.

· The changelog page only. · appears on 1 routes · implemented by `src/pages/content/Changelog.jsx`

**`content.integration-setup`** — Integration setup steps: heading and numbered setup rows with a CTA.

· Every integration detail page. · appears on 120 routes · implemented by `src/pages/catalog/IntegrationDetail.jsx (#setup)`

**`content.toc-article`** — Legacy TOC article: radial-tinted band with a working sticky table of contents over the h2s beside a rich-text column.

· LLM-model and industry SEO articles. · appears on 12 routes · implemented by `src/components/catalog/legacy.jsx > Toc + ArticleBody`

**`content.competitor-picker-table`** — Competitor picker table: comparison table whose competitor column is chosen from a popover picker.

· The agents landing only. · appears on 1 routes · implemented by `src/components/catalog/agents.jsx > CompetitorTable`

**`content.longform-article`** — Long-form manifesto article: hero-mark SVG, h1 and lede, then ten sections with quote cards, stat rows and diagram figures.

· The specialist-agents article only. · appears on 1 routes · implemented by `src/pages/product-legacy/SpecialistAgents.jsx`

**`content.legacy-faq`** — Legacy FAQ: decorative line art and an accordion whose plus icon rotates; rebuilt on Lumenfold tokens but kept distinct from the DS FAQ accordion.

· The schedule-work page, the AI-ops home clone and the agents-at-work hub. · appears on 3 routes · implemented by `src/components/product-legacy/shared.jsx > FAQ`

**`content.legacy-statement`** — Legacy statement (layout484): a short centred h2 with a pill.

· The AI-ops home clone only. · appears on 1 routes · implemented by `src/pages/product-legacy/AiOps.jsx (statement Row)`

**`content.folder-scroll`** — Folder scroll: stacked dark "folder" sections with edge-shadow tabs carrying a teaser, video blocks, an input demo, a testimonial and a logo marquee.

· The Agent Drop microsite only. · appears on 1 routes · implemented by `src/pages/product-legacy/AgentDrop.jsx > Folder sections + marquee`

**`content.watch-now`** — Watch now: h2 and a featured click-to-play video with pixel accents.

· The agents-at-work hub only. · appears on 1 routes · implemented by `src/pages/product-legacy/AgentsAtWork.jsx > Watch`

**`content.speaker-session-hub`** — Speaker and session hub: wandering cursor avatars over a speaker card grid, three photo sliders and a click-to-play session video grid.

· The agents-at-work hub only. · appears on 1 routes · implemented by `src/pages/product-legacy/AgentsAtWork.jsx > Cursors + Speakers + Slider + Sessions`

**`content.academy-lesson-body`** — Dark academy lesson body: sticky lesson sidebar, 16:9 video, dark rich text, prev/next row and a lessons list.

· Academy lesson pages. · appears on 8 routes · implemented by `src/components/academy/lesson.jsx`

**`content.not-found`** — Not-found message: h1, one line of copy and a back-to-home button.

· The catch-all route only. · appears on 1 routes · implemented by `src/App.jsx > NotFound`

### CATALOG

_Browsable collections: card grids, filtered lists, related rails._

**`catalog.use-case-grid`** — UseCases card grid: segmented category tabs over a grid of use-case cards with hover media.

· Homepage, the agents landing and the invent landing. · appears on 3 routes · implemented by `src/components/UseCases.jsx`

**`catalog.story-grid`** — Customer story card grid: photo, logo, title and pill tags per story.

· The customers index only. · appears on 1 routes · implemented by `src/components/company/customers.jsx > StoryGrid`

**`catalog.blog-filter-grid`** — Blog filter grid: category pill toggles that hide non-matching cards client-side, over the blog card grid.

· The blog index only. · appears on 1 routes · implemented by `src/pages/content/ListingGrid.jsx > BlogIndex`

**`catalog.text-card-grid`** — Text-only card grid: title and description cards, two columns (learn) or three (topics).

· The learn and topics indexes. · appears on 2 routes · implemented by `src/pages/content/ListingGrid.jsx > TextIndex`

**`catalog.hub-row-list`** — Hub row list: section heading and wide content rows (upcoming events, or the featured resource with cover).

· The events and resources hubs. · appears on 2 routes · implemented by `src/components/content/parts.jsx > ContentRow + HubSectionHeading`

**`catalog.hub-card-grid`** — Hub card grid: tinted section with heading and an auto-fit grid of content cards (past events, resource library).

· The events and resources hubs. · appears on 2 routes · implemented by `src/components/content/parts.jsx > ContentCard`

**`catalog.comparison-index`** — Comparison index: h1, body and a bordered list of competitor rows with glyph and arrow.

· The comparison index only. · appears on 1 routes · implemented by `src/pages/content/Comparison.jsx > ComparisonIndex`

**`catalog.integrations-filter-grid`** — Integrations filter grid: search input, category select, reset and result count over a logo-tile card grid with load-more and empty state; deep-linkable by category.

· The integrations index only. · appears on 1 routes · implemented by `src/pages/catalog/IntegrationsIndex.jsx > Catalog`

**`catalog.integration-actions`** — Integration actions and triggers: heading and capped definition rows of actions and triggers, with an "and N more" tail; rendered only when the item has any.

· Every integration detail page (conditionally). · appears on 120 routes · implemented by `src/pages/catalog/IntegrationDetail.jsx > Group`

**`catalog.related-rail`** — Related use-cases rail: the use-case card grid restricted to sibling agents in the same function, in that function palette.

· Every use-case detail page. · appears on 56 routes · implemented by `src/components/catalog/usecase.jsx > RelatedRail`

**`catalog.workflow-card-list`** — Workflow card list: hidden h1 and a two-column list of grain-glyph cards with eyebrow, title and description; no filters.

· The workflows index only. · appears on 1 routes · implemented by `src/pages/catalog/Workflows.jsx`

**`catalog.more-features`** — MoreFeatures: heading and three link cards to other feature pages.

· The four feature detail pages. · appears on 4 routes · implemented by `src/components/product/lib.jsx > MoreFeatures`

**`catalog.tools-list`** — Tools text list: centred h1 and intro over a two-column list of bordered title-and-description links.

· The tools page only. · appears on 1 routes · implemented by `src/pages/product/Tools.jsx`

**`catalog.feature-catalog`** — Feature catalog: fourteen category sections with sticky headings, each listing feature rows (some with a logo cluster).

· The features catalog page only. · appears on 1 routes · implemented by `src/components/product/catalog.jsx > FeatureCatalog`

**`catalog.slack-use-cases`** — Slack use-case hairline grid of ten cells.

· The Slack landing only. · appears on 1 routes · implemented by `src/components/product/slack.jsx > UseCaseGrid`

### CONVERSION

_Calls to action and forms: grain CTAs, scripted CTAs, demo/contact/apply forms._

**`conversion.grain-cta`** — ClosingCTA grain panel: rounded violet (or function-palette) grain card with six floating glass coins, centred h2 with optional indigo highlight, body and a pill button pair.

· Closes most DS-shell pages: contact, partners, enterprise, hubs, guides, text indexes, the FAQ page, comparisons, the integrations index and details, and the built system-A product pages (see matrix). · appears on 145 routes · implemented by `src/components/content/ClosingCTA.jsx (parallel copies: src/components/company/shared.jsx > GrainCTA, src/components/product/lib.jsx > ClosingCTA, src/components/catalog/sections.jsx > ClosingCTA/CtaTile)`

**`conversion.tasks-cta`** — TasksCTA: full-width scripted CTA where a three-column checklist ticks off, blurs out and is replaced by an h2 and a large button, looping.

· Customer stories, the agents landing and the GTM landing. · appears on 8 routes · implemented by `src/components/catalog/agents.jsx > TasksCTA (parallel copies: src/components/company/customers.jsx > TasksCTA, src/components/product/gtm.jsx > TasksCTA)`

**`conversion.careers-roles`** — Open roles list (#jobs): grouped job rows standing in for the third-party jobs embed.

· The careers page only. · appears on 1 routes · implemented by `src/components/company/careers.jsx > CareersRoles`

**`conversion.demo-form`** — Book-a-demo split: native form under a two-line h1 on the left, auto-advancing customer video/quote carousel on the right.

· The book-a-demo page only. · appears on 1 routes · implemented by `src/pages/company/BookDemo.jsx > DemoHero`

**`conversion.support-form`** — Contact-support split: form under an h1 on the left, an illustrated support-thread card on the right (shown first on small screens).

· The contact-support page only. · appears on 1 routes · implemented by `src/pages/company/ContactSupport.jsx > ContactHero`

**`conversion.partner-apply`** — Partner application (#apply): centred heading and a native form.

· The partners page only. · appears on 1 routes · implemented by `src/pages/company/Partners.jsx > Apply`

**`conversion.blog-footer-cta`** — Blog footer CTA: centred h2, body and two buttons at the end of a post.

· Blog posts only. · appears on 12 routes · implemented by `src/pages/content/Article.jsx > BlogArticle (.blog-footer-cta)`

**`conversion.legacy-footer-cta`** — Legacy footer CTA (W.CTA / B.7): white bordered rounded card with stars background, purple glow, two mascots, a balanced two-line heading with indigo span, body, two small buttons and a fine-print row.

· The workflows index, SEO articles, the legacy product pages and the product one-offs (dark variant on Agent Drop). · appears on 23 routes · implemented by `src/components/catalog/legacy.jsx > WCta (parallel copy: src/components/product-legacy/shared.jsx > FooterCTA)`

**`conversion.email-capture`** — Email capture CTA: h3 with an inline email input and arrow submit, with success and error states.

· Workflow detail pages only. · appears on 12 routes · implemented by `src/pages/catalog/WorkflowDetail.jsx > EmailCta`

**`conversion.invent-get-started`** — Invent get-started panel: grain card where the mascot springs in above text and one pill CTA.

· The invent landing only. · appears on 1 routes · implemented by `src/components/product/invent.jsx > GetStarted`

**`conversion.slack-programmatic-cta`** — Slack programmatic CTA: hairline-grid band pitching API/programmatic access with a button.

· The Slack landing only. · appears on 1 routes · implemented by `src/components/product/slack.jsx > ProgrammaticCTA`

**`conversion.slack-final-cta`** — Slack final CTA band (add-to-Slack style) closing the page.

· The Slack landing only. · appears on 1 routes · implemented by `src/components/product/slack.jsx > FinalCTA`

**`conversion.sdg-final-cta`** — Self-driving GTM final CTA: large centred h2, a bordered checklist box, button block, clarifier and trust strip.

· The self-driving GTM manifesto only. · appears on 1 routes · implemented by `src/pages/product-legacy/SelfDrivingGtm.jsx > Final`

**`conversion.sdr-timeline-cta`** — SDR timeline CTA: four-row timeline inside the CTA wrapper, followed by the footer-CTA mascots.

· SDR landings only. · appears on 2 routes · implemented by `src/pages/product-legacy/SDRLanding.jsx > Timeline inside src/components/product-legacy/shared.jsx > FooterCTA`

**`conversion.legacy-next-steps`** — Legacy next steps: h2 and three white cards, each a heading and a button.

· The schedule-work page and the agents-at-work hub. · appears on 2 routes · implemented by `src/components/product-legacy/shared.jsx > NextSteps`

**`conversion.start-button-row`** — Bare centred start-building button in its own row, closing the page.

· The agents-at-work hub only. · appears on 1 routes · implemented by `src/pages/product-legacy/AgentsAtWork.jsx (final Row)`

**`conversion.waitlist-form`** — BDR waitlist form page: copy and four bullets on the left, a six-field form card with consent on the right.

· The BDR waitlist page only. · appears on 1 routes · implemented by `src/pages/product-legacy/BdrWaitlist.jsx > WaitlistForm (first Row)`
