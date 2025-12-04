import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExampleContactSection } from "@/components/ExampleContactSection";
import pineconeLogo from "@/assets/pinecone-logo.png";
import tursoLogo from "@/assets/turso-logo.png";
import qdrantLogo from "@/assets/qdrant-logo.png";
import hedgehogImage from "@/assets/hedgehog-new.webp";
import silasImage from "@/assets/silas.png";
import pabloImage from "@/assets/pablo.jpeg";
import daurianHedgehog from "@/assets/hedgehog-daurian.jpg";
import brandtsHedgehog from "@/assets/hedgehog-brandts.jpg";
import longEaredHedgehog from "@/assets/hedgehog-long-eared.png";

function useHedgehogVariant() {
  const [variant, setVariant] = useState<"daurian" | "long_eared" | "brandts">("daurian");

  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).posthog) return;
    const ph = (window as any).posthog;

    const updateVariant = () => {
      const value = ph.getFeatureFlag("hedgehog_variant");
      if (value === "daurian" || value === "long_eared" || value === "brandts") {
        setVariant(value);
      } else {
        setVariant("daurian");
      }
    };

    ph.onFeatureFlags(updateVariant);
    updateVariant();

    return () => {
      if (typeof ph.offFeatureFlags === "function") {
        ph.offFeatureFlags(updateVariant);
      }
    };
  }, []);

  return variant;
}

function HedgehogFeatureFlagBanner() {
  const variant = useHedgehogVariant();

  let title = "";
  let body = "";
  let imageSrc: string = daurianHedgehog;

  if (variant === "long_eared") {
    imageSrc = longEaredHedgehog;
    title = "You rolled Long-eared 🦔";
    body =
      "PostHog's feature flag put you in the Long-eared cohort (Hemiechinus, house favourite). Come back and you might bump into Daurian or Brandt's instead.";
  } else if (variant === "brandts") {
    imageSrc = brandtsHedgehog;
    title = "Brandt's hedgehog, rare spawn 🦔";
    body =
      "This page is running a PostHog feature flag. Today you got Brandt's; next visit you might see Daurian or Long-eared instead.";
  } else {
    // daurian or fallback
    imageSrc = daurianHedgehog;
    title = "Daurian hedgehog says hi 🦔";
    body =
      "Feature-flag roulette picked Daurian for you. Refresh or come back later if you want to hunt the Long-eared or Brandt's variants.";
  }

  let styleVariant: "control" | "highlighted" = "control";

  if (typeof window !== "undefined" && (window as any).posthog) {
    const flagValue = (window as any).posthog.getFeatureFlag("loud-hedgehogs");
    if (flagValue === "highlighted") {
      styleVariant = "highlighted";
    }
  }

  const baseCardClasses =
    "flex items-center gap-4 max-w-xl w-full rounded-2xl border px-5 py-4 shadow-sm transition-colors";

  const controlClasses = "border-border/60 bg-card/95";
  const highlightedClasses =
    "border-purple-500/80 bg-purple-50/90 dark:bg-purple-950/40 shadow-lg shadow-purple-500/30";

  const cardClasses =
    styleVariant === "highlighted"
      ? `${baseCardClasses} ${highlightedClasses}`
      : `${baseCardClasses} ${controlClasses}`;

  return (
    <div className="mt-8 mb-4 flex justify-center">
      <div className={cardClasses}>
        <img src={imageSrc} alt="Hedgehog" className="w-20 h-20 rounded-2xl object-cover border border-border" />
        <div className="space-y-2">
          {styleVariant === "highlighted" && (
            <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/70 dark:text-purple-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase mb-1">
              EXPERIMENT VARIANT: LOUD HEDGEHOG
            </span>
          )}
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-primary">
            This is a feature flags test!!
          </p>
          <p className="text-xs font-semibold text-foreground/90">{title}</p>
          <p className="text-[11px] leading-snug text-muted-foreground">{body}</p>
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("pre-pmf");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">Outbound</h1>
            <nav className="hidden md:flex gap-6 text-sm">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("icp-to-segment")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Segment
              </button>
              <button
                onClick={() => scrollToSection("why-this")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Why
              </button>
              <button
                onClick={() => scrollToSection("why-not")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Other Slices
              </button>
              <button
                onClick={() => scrollToSection("who-to-call")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Selected Accounts
              </button>
              <button
                onClick={() => scrollToSection("validation")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Validation
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[900px] mx-auto px-6">
        {/* Hero Section - Combined with ICP */}
        <section id="hero" className="py-24">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">Proposed outbound campaign</h1>
          </div>

          <div className="max-w-[800px] mx-auto space-y-8">
            <div id="icp-to-segment" className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-border rounded-lg bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-3">PostHog's ICP</h3>
                <p className="text-sm text-muted-foreground">
                  High growth, product led B2B companies where engineers drive product decisions.
                </p>
              </div>

              <div className="p-6 border border-primary rounded-lg bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-3">My starting segment</h3>
                <p className="text-sm text-muted-foreground">
                  VC backed devtools and AI infra companies, Seed to Series C, roughly 20 to 250 people, with a PLG
                  motion and a fragmented analytics and experimentation stack.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <p className="text-sm text-foreground/90 leading-relaxed">
                I took PostHog's existing playbook and outlined a sharp starting point. Despite the fact that my grandpa
                was a bicycle engineer, I am not here to reinvent the wheel. But just know that I can. I can.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <HedgehogFeatureFlagBanner />
            </div>
          </div>
        </section>

        {/* Chosen Starting Segment */}
        <section id="chosen-segment" className="py-16 relative">
          <h2 className="text-3xl font-bold text-foreground mb-6">Chosen starting segment</h2>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6 relative z-10">
            <p className="text-lg text-foreground font-medium leading-relaxed">
              VC backed devtools and AI infrastructure startups. Seed to Series C. Roughly 20 to 250 employees. Product
              led. Engineers own analytics, feature flags and rollout. Already using a fragmented stack. Think Mixpanel
              or Amplitude plus FullStory or LogRocket plus LaunchDarkly plus a survey tool. They know this is getting
              expensive and messy.
            </p>
          </div>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span className="text-foreground/80">Selling mainly to developers or data teams.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span className="text-foreground/80">Free tier or trial. Docs and API are front and center.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span className="text-foreground/80">Engineers own analytics, feature flags and rollout.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span className="text-foreground/80">
                Using a fragmented stack. For example: Mixpanel or Amplitude, plus FullStory or Hotjar or LogRocket,
                plus LaunchDarkly or Flagsmith, plus one more survey or feedback tool.
              </span>
            </li>
          </ul>
        </section>

        {/* Why This Segment */}
        <section id="why-this" className="py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Why this segment is the best starting point</h2>
          <p className="text-lg text-muted-foreground mb-8">This is where I'd start sniffing for signal.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-4">Acute pain</CardTitle>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      They feel tool sprawl. Four to five vendors for one product workflow.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">Costs grow fast with usage based pricing.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Data is split across tools. Simple questions need custom code.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Already spend more than 50k per year on these tools combined.
                    </span>
                  </li>
                </ul>
              </CardHeader>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-4">Real buyer interest</CardTitle>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Engineers can start a trial without approval. If they like it, they'll tell their boss.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      They're heavy users of events and experiments. High expansion ceiling.
                    </span>
                  </li>
                </ul>
              </CardHeader>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-4">Fast outbound cycles</CardTitle>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Engineers will try a new tool if it's clearly better. No spray and pray needed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Early stage contracts often have lighter procurement.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Clear external signals to build lists. Dev focused copy, funding stage, public mentions of
                      competitor tools.
                    </span>
                  </li>
                </ul>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Why Not Other Slices */}
        <section id="why-not" className="py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Why I wouldn't anchor the first outbound play on other slices
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Other segments are fine. I'd still talk to them. I just wouldn't build the very first outbound experiment
            around them.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pre-pmf">Pre PMF startups</TabsTrigger>
              <TabsTrigger value="midmarket">Later stage mid market</TabsTrigger>
              <TabsTrigger value="nontechnical">Non technical buyers</TabsTrigger>
            </TabsList>

            <TabsContent value="pre-pmf" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Pros</h4>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/80 list-disc list-inside">
                    <li>Very fast decisions.</li>
                    <li>Curious about new tools.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why not first</h4>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/80 list-disc list-inside">
                    <li>High churn. Frequent pivots.</li>
                    <li>Small event volumes. Limited expansion.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="midmarket" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Pros</h4>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/80 list-disc list-inside">
                    <li>Larger budgets.</li>
                    <li>Many processes that need analytics.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why not first</h4>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/80 list-disc list-inside">
                    <li>Slower sales cycles. More stakeholders.</li>
                    <li>Often locked in with existing analytics vendors.</li>
                    <li>More procurement friction for a first outbound motion.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nontechnical" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Pros</h4>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/80 list-disc list-inside">
                    <li>Also need analytics and growth tooling.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why not first</h4>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/80 list-disc list-inside">
                    <li>Less aligned with PostHog's developer first product and open source roots.</li>
                    <li>More overlap with tools that sell mainly to marketing and growth teams.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Selected Accounts section */}
        <section id="who-to-call" className="py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Selected Accounts</h2>
          <p className="text-lg text-muted-foreground mb-8">Three companies that fit this segment perfectly</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-center mb-4 h-24">
                  <img src={pineconeLogo} alt="Pinecone logo" className="max-h-full max-w-full object-contain" />
                </div>
                <CardTitle className="text-xl font-semibold">Pinecone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Managed vector database for AI search and retrieval.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">AI infra, product led and very usage driven.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">Developers are the main buyers and users.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Needs strong analytics and experiments around signups and usage.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-center mb-4 h-24">
                  <img src={tursoLogo} alt="Turso logo" className="max-h-full max-w-full object-contain" />
                </div>
                <CardTitle className="text-xl font-semibold">Turso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Edge-hosted SQLite database for modern SaaS backends.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Developer-first database with a freemium, self-serve motion.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Global traffic and lots of queries, perfect for funnels and cohorts.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Great candidate for a unified Product OS story instead of multiple tools.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-center mb-4 h-24">
                  <img src={qdrantLogo} alt="Qdrant logo" className="max-h-full max-w-full object-contain" />
                </div>
                <CardTitle className="text-xl font-semibold">Qdrant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Open-source vector database and cloud for AI search.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      AI infra for teams building search and RAG experiences.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Events and experiments matter when you change models or ranking.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-foreground/80">
                      Lives in the same 'stacky' world as Mixpanel, feature flags and replay.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Example Contact Section */}
        <ExampleContactSection />

        {/* Example Email Section */}
        <section id="example-email" className="py-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Example first email to Silas</h2>

          <div className="border border-border bg-card p-8 rounded-lg space-y-5">
            <p className="text-foreground leading-relaxed">
              Silas, do you ever change retrieval or ranking, then need three tools to see what happened?
            </p>
            <p className="text-foreground leading-relaxed">
              It's Dmytro at PostHog. We put flags, experiments and analytics in one place. It's free to try, with demo
              and pricing open on the site, no need to talk to sales.
            </p>
            <p className="text-foreground leading-relaxed">
              Believe it or not, I am not trying to book a "sHorT cAll tO sHoW yuO mORe". I'll send a couple of short AI
              infra examples close to Pinecone. If it looks interesting, give PostHog a spin; I'm curious what you'll
              think.
            </p>
            <p className="text-foreground leading-relaxed">Dmytro</p>
          </div>
        </section>

        {/* Follow-up Plan Section */}
        <section id="follow-up-plan" className="py-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">How I'd continue the outreach</h2>
          <p className="text-base text-muted-foreground mb-8">
            Light-touch sequence over 3 weeks. Touches are more spaced-out than typical cold sequences to keep this as
            un-outboundy as possible and protect the brand.
          </p>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {/* Step 2 - Call #1 */}
            <AccordionItem value="step-2" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 2 – Call #1 (Day2)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">First gentle call just to see if the topic is relevant at all.</p>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Call notes:</p>
                  <ul className="space-y-1 ml-6 list-disc">
                    <li>Permission-based opener.</li>
                    <li>Personalised hook: "Hey Silas, calling about your work on retrieval inference at Pinecone."</li>
                    <li>Ask permission: "Got a few minutes, or am I unlucky with the time?"</li>
                    <li>If it's a bad time, ask when it's better and back off.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 3 - LinkedIn Connection */}
            <AccordionItem value="step-3" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 3 – LinkedIn connection request (Day4)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">Send a simple connection request with NO note.</p>
                <ul className="space-y-1 ml-6 list-disc text-sm">
                  <li>Blank connects usually convert better than long pitches in the invite.</li>
                  <li>The first email already gives context; LinkedIn is just a light extra touch.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Step 4 - Call #2 */}
            <AccordionItem value="step-4" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 4 – Call #2 (Day7)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">Second attempt at a quick conversation, still low pressure.</p>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Call notes:</p>
                  <ul className="space-y-1 ml-6 list-disc">
                    <li>Permission-based opener.</li>
                    <li>Personalised hook: "Hey Silas, calling about your work on retrieval inference at Pinecone."</li>
                    <li>Ask permission: "Got a few minutes, or am I unlucky with the time?"</li>
                    <li>If it's a bad time, ask when it's better and back off.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 5 - Email #2 (Exa Example) */}
            <AccordionItem value="step-5" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 5 – Email #2: one relevant example (Day9)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">
                  Short bump email with one concrete example from another AI search product. No pitch deck, just a
                  useful story.
                </p>
                <div className="border border-border bg-card p-6 rounded-lg space-y-4 mt-4">
                  <p className="text-sm leading-relaxed">Silas,</p>
                  <p className="text-sm leading-relaxed">
                    Exa is a search API for AI products. They used PostHog to pull feature flags, product analytics and
                    session replay into one place, instead of juggling a scattered stack – so they can see exactly how
                    search changes affect real users.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Their story's here if you're curious:{" "}
                    <a
                      href="https://posthog.com/customers/exa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://posthog.com/customers/exa
                    </a>
                  </p>
                  <p className="text-sm leading-relaxed">
                    If you ever want a Pinecone-flavoured version of this setup, I'm happy to sketch it out for you to
                    try.
                  </p>
                  <p className="text-sm leading-relaxed">Dmytro</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 6 - Call #3 */}
            <AccordionItem value="step-6" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 6 – Call #3 (Day10)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">Third call attempt, mainly to sanity check if it makes sense to keep trying.</p>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Call notes:</p>
                  <ul className="space-y-1 ml-6 list-disc">
                    <li>Permission-based opener.</li>
                    <li>Personalised hook: "Hey Silas, calling about your work on retrieval inference at Pinecone."</li>
                    <li>Ask permission: "Got a few minutes, or am I unlucky with the time?"</li>
                    <li>If it's a bad time, ask when it's better and back off.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 7 - LinkedIn DM */}
            <AccordionItem value="step-7" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 7 – LinkedIn DM (Day14)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">One short message referencing the example, still no meeting ask.</p>
                <div className="border border-border bg-card p-6 rounded-lg mt-4">
                  <p className="text-sm leading-relaxed">
                    Thanks for connecting, Silas. I sent a quick example of how another AI search team uses PostHog to
                    see the impact of changes. If that ever feels relevant, I can sketch a Pinecone version and send it
                    as a Loom. No meetings required.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 8 - Call #4 */}
            <AccordionItem value="step-8" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 8 – Call #4 (Day14)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">Final serious call attempt before going playful and then closing out.</p>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Call notes:</p>
                  <ul className="space-y-1 ml-6 list-disc">
                    <li>Permission-based opener.</li>
                    <li>Personalised hook: "Hey Silas, calling about your work on retrieval inference at Pinecone."</li>
                    <li>Ask permission: "Got a few minutes, or am I unlucky with the time?"</li>
                    <li>If it's a bad time, ask when it's better and back off.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 9 - Email #3 (Pablo Meme) */}
            <AccordionItem value="step-9" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 9 – Email #3: Pablo follow-up (Day17)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">
                  Playful nudge using the classic "Pablo waiting" meme. This is intentionally minimal to keep it human
                  and non-pushy.
                </p>
                <div className="space-y-3 mt-4">
                  <p className="text-sm font-medium">Body:</p>
                  <p className="text-sm mb-3">
                    ONLY the Pablo Escobar "waiting" meme image (no written copy in the body).
                  </p>
                  <div className="border border-border bg-card p-6 rounded-lg flex justify-center">
                    <img
                      src={pabloImage}
                      alt="Pablo Escobar waiting alone – me waiting to see if you'll try PostHog."
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 10 - Call #5 */}
            <AccordionItem value="step-10" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 10 – Call #5 (Day20)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">One final quick call to either get a clear "not now" or a small next step.</p>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Call notes:</p>
                  <ul className="space-y-1 ml-6 list-disc">
                    <li>Permission-based opener.</li>
                    <li>Personalised hook: "Hey Silas, calling about your work on retrieval inference at Pinecone."</li>
                    <li>Ask permission: "Got a few minutes, or am I unlucky with the time?"</li>
                    <li>If it's a bad time, ask when it's better and back off.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 11 - Email #4 (Breakup) */}
            <AccordionItem value="step-11" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                Step 11 – Email #4: breakup (Day24)
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <p className="text-sm">Respectful breakup email to close the loop while keeping the door open.</p>
                <div className="border border-border bg-muted/30 p-6 rounded-lg mt-4">
                  <p className="text-sm italic text-muted-foreground">
                    [Breakup email copy goes here – I'll write this myself later. The idea: thank him for the attention
                    so far, say you'll stop reaching out, and leave the door open if this ever becomes a priority.]
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Validation Section */}
        <section id="validation" className="py-16 pb-24">
          <h2 className="text-3xl font-bold text-foreground mb-6">How I'd validate this in 60 days</h2>
          <p className="text-lg text-muted-foreground mb-8">
            I would treat the first 60 days as a structured experiment with a clear input and a clear output.
          </p>

          <div className="space-y-8">
            <div>
              <p className="font-semibold text-foreground mb-4">1. Build a list of 50 companies in this segment.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-3">
                2. Run three outbound messaging angles as problem statements:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">•</span>
                  <span className="text-sm text-foreground/80">
                    <strong>Problem 1:</strong> Teams are drowning in separate tools for analytics, feature flags and
                    session replay and want one stack that engineers actually like.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">•</span>
                  <span className="text-sm text-foreground/80">
                    <strong>Problem 2:</strong> Product and growth teams cannot move fast enough because experiments,
                    flags and analytics all live in different places.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">•</span>
                  <span className="text-sm text-foreground/80">
                    <strong>Problem 3:</strong> AI and infra products struggle to see how changes in models or pricing
                    affect real user behavior across the funnel.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-3">3. Measure what matters,namely:</p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">•</span>
                  <span className="text-sm text-foreground/80">conversion to active workspaces or trials.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">•</span>
                  <span className="text-sm text-foreground/80">
                    conversion to paid customers / pipeline for the sales team.
                  </span>
                </li>
              </ul>
              <p className="text-sm text-foreground/80 mt-4 ml-6">
                My goal in these 60 days is to prove that this segment can reliably move from outbound touch to active
                PostHog usage, and that the Product OS story resonates.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-3">4. Decide what to do next:</p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">•</span>
                  <span className="text-sm text-foreground/80">
                    If this segment converts well and likes the Product OS story, scale it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">•</span>
                  <span className="text-sm text-foreground/80">
                    In parallel, test one adjacent PLG vertical that looks similar in structure.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Start where PostHog has a clear unfair advantage. Expand to adjacent segments once the first playbook is
            working.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Index;
