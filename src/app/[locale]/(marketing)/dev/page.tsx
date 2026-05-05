import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CountUp } from "@/components/animations/count-up";
import { FadeIn } from "@/components/animations/fade-in";
import { RotatingText } from "@/components/animations/rotating-text";
import { SlideUp } from "@/components/animations/slide-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { TextReveal } from "@/components/animations/text-reveal";
import { BentoCard } from "@/components/bento/bento-card";
import { BentoGrid } from "@/components/bento/bento-grid";
import { Logo } from "@/components/brand/logo";
import { AutoplayVideo } from "@/components/media/autoplay-video";
import { BrowserMockup } from "@/components/media/browser-mockup";
import { CodeBlock } from "@/components/media/code-block";
import { DeviceMockup } from "@/components/media/device-mockup";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { Marquee } from "@/components/media/marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { isLocale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export const metadata = { title: "Component gallery — dev" };

export default async function DevGallery({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="container-default py-16 flex flex-col gap-16">
      <header className="flex flex-col gap-4">
        <div className="eyebrow">phase 1 · component gallery</div>
        <h1 className="font-display text-[var(--fs-h1)]">
          <span className="text-gradient">Components in motion</span>
        </h1>
        <p className="max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
          Visual smoke test for every primitive shipped in phase 1. This page
          is dev-only and gets removed before launch.
        </p>
      </header>

      <Section title="Brand">
        <div className="flex flex-wrap items-center gap-8">
          <Logo size="sm" />
          <Logo size="md" />
          <Logo size="lg" />
          <Logo size="xl" />
          <Logo size="md" variant="mark" />
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Request access</Button>
          <Button variant="secondary">Learn more</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="lg">
            Larger CTA <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>
            <Sparkles className="h-3 w-3" /> Default
          </Badge>
          <Badge variant="primary">
            <Zap className="h-3 w-3" /> Primary
          </Badge>
          <Badge variant="success">Live</Badge>
          <Badge variant="warning">Beta</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid max-w-xl gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="msg">Message</Label>
            <Textarea
              id="msg"
              placeholder="Tell us about your team and what you're trying to solve."
            />
          </div>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Tasks", description: "Boards, lists, timelines, automations." },
            { title: "Docs", description: "Block-based collaborative editor with AI inline." },
            { title: "Inbox", description: "Email, Slack, Teams, WhatsApp — unified." },
          ].map((c) => (
            <Card key={c.title}>
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="px-0">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="ai" className="max-w-2xl">
          <TabsList>
            <TabsTrigger value="ai">AI Co-Pilot</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
          </TabsList>
          <TabsContent value="ai">
            Co-Pilot understands your workspace context, drafts work, queues
            replies, and stays out of your way.
          </TabsContent>
          <TabsContent value="tasks">
            Boards, lists, timelines, dependencies, custom fields — and your
            Co-Pilot already knows them all.
          </TabsContent>
          <TabsContent value="docs">
            Notion-grade collaborative editor where AI is part of the cursor.
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Accordion">
        <Accordion type="single" collapsible className="max-w-2xl">
          <AccordionItem value="trial">
            <AccordionTrigger>Is there a free trial?</AccordionTrigger>
            <AccordionContent>
              No. We charge from day one. If you&apos;re not satisfied within
              30 days we refund 100%.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="seats">
            <AccordionTrigger>What if I remove a user?</AccordionTrigger>
            <AccordionContent>
              You receive prorated credit on your next invoice. No surprises.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Separator + Skeleton">
        <div className="grid max-w-2xl gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Separator />
          <p className="text-[var(--fg-muted)]">Above the line is loading state.</p>
        </div>
      </Section>

      <Section title="Animation primitives">
        <div className="flex flex-col gap-8">
          <SlideUp>
            <p className="text-[var(--fs-body-lg)]">
              <strong>SlideUp</strong> — fades and slides up on scroll-into-view.
            </p>
          </SlideUp>

          <FadeIn>
            <p className="text-[var(--fs-body-lg)]">
              <strong>FadeIn</strong> — opacity-only entrance.
            </p>
          </FadeIn>

          <Stagger className="grid gap-3">
            {["First", "Second", "Third", "Fourth"].map((label) => (
              <StaggerItem key={label}>
                <Card>
                  <CardContent className="pt-6">
                    <strong>Stagger</strong> {label}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="font-display text-[var(--fs-h2)]">
            <TextReveal>The OS of your business, with AI.</TextReveal>
          </div>

          <div className="font-display text-[var(--fs-h2)]">
            We&apos;re built for{" "}
            <span className="text-gradient">
              <RotatingText words={["legal teams", "agencies", "startups", "agencies"]} />
            </span>
            .
          </div>

          <div className="text-[var(--fs-h1)] font-display">
            <CountUp to={10} suffix="×" /> faster
          </div>
        </div>
      </Section>

      <Section title="Bento grid">
        <BentoGrid>
          <BentoCard
            size="large"
            eyebrow="AI Co-Pilot"
            title="Speak. Decide. Done."
            description="Co-Pilot understands your workspace context across tasks, docs, and inbox — and proposes the next move."
            visual={<GradientPlaceholder caption="Hero video · 16:10" />}
            visualPosition="below"
            href="/en/product/ai-copilot"
            ctaLabel="See how it works"
          />
          <BentoCard
            size="small"
            eyebrow="Speed"
            title={
              <span className="font-display text-[var(--fs-h2)]">10×</span>
            }
            description="faster organizing work for typical teams in our beta"
          />
          <BentoCard
            size="tall"
            eyebrow="Mobile"
            title="Anywhere you work"
            description="Native iOS, iPad, Android, macOS, Windows, Linux."
            visual={<GradientPlaceholder caption="iPhone mockup" />}
            visualPosition="above"
          />
          <BentoCard
            size="wide"
            eyebrow="Smart Inbox"
            title="One inbox for every channel"
            description="Email, Slack, Teams, WhatsApp — classified by AI."
            visual={<GradientPlaceholder caption="Inbox screenshot" />}
            visualPosition="side"
          />
          <BentoCard
            size="small"
            eyebrow="Pricing"
            title="$3 / seat"
            description="No tiers. No tricks."
            href="/en/pricing"
            ctaLabel="See full pricing"
          />
          <BentoCard
            size="full"
            eyebrow="Built for"
            title="Companies that value their time"
            description="Legal, marketing, healthcare, real estate, finance — and 10 more industries."
          />
        </BentoGrid>
      </Section>

      <Section title="Marquee + Mockups">
        <div className="flex flex-col gap-10">
          <Marquee className="py-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-2xl font-display tracking-tight text-[var(--fg-muted)]"
              >
                Customer {i + 1}
              </span>
            ))}
          </Marquee>
          <div className="grid gap-8 md:grid-cols-2">
            <BrowserMockup url="florioin.app/inbox">
              <GradientPlaceholder
                className="aspect-[4/3]"
                caption="Inbox demo"
              />
            </BrowserMockup>
            <div className="grid grid-cols-2 gap-4">
              <DeviceMockup variant="iphone">
                <GradientPlaceholder caption="iPhone" />
              </DeviceMockup>
              <DeviceMockup variant="ipad">
                <GradientPlaceholder caption="iPad" />
              </DeviceMockup>
            </div>
          </div>
          <DeviceMockup variant="macbook" className="max-w-2xl">
            <GradientPlaceholder caption="macOS native app" />
          </DeviceMockup>
        </div>
      </Section>

      <Section title="Video + Code">
        <div className="grid gap-6 md:grid-cols-2">
          <AutoplayVideo fallback caption="Hero demo · placeholder" />
          <CodeBlock
            filename="task.ts"
            language="ts"
            code={`// Co-Pilot understands what to do
const task = await florioin.tasks.create({
  title: "Send proposal to ACME",
  due: "tomorrow at 4pm",
  assignee: "@maria",
});`}
          />
        </div>
      </Section>

      <footer className="pt-12 text-sm text-[var(--fg-muted)]">
        <Link href={`/${locale}`} className="hover:underline">
          ← back home
        </Link>
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="eyebrow">{title}</h2>
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-subtle)] p-8">
        {children}
      </div>
    </section>
  );
}
