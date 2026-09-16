import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — Vayuvega",
  description: "What the Vayuvega Help Portal does with the information you share.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-bold tracking-[0.25em] text-kasavu">PRIVACY</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl">What We Do With Your Report</h1>

        <div className="mt-8 space-y-6 text-mist leading-relaxed">
          <p>
            When you report a grievance through the chat, we ask for your name, age, location, email, and a
            description of what happened. That&apos;s the whole list — nothing else is collected in the background.
          </p>
          <p>
            Those details are sent directly by email to the person monitoring this portal, once, the moment you
            submit. They&apos;re not stored in a database, not logged anywhere on our servers, and not shared with
            any third party, advertiser, or analytics service.
          </p>
          <p>
            Your email address is used only to reply to you about the report you filed, and only if a reply is
            necessary. We won&apos;t add you to a mailing list or contact you for anything else.
          </p>
          <p>
            If a submission fails to send, the error is logged without your name, email, or message — only that a
            failure happened, so it can be fixed without exposing what you told us.
          </p>
          <p>
            This is a small portal built and operated by one person. If you have concerns about something you
            submitted, the chat on this site is the fastest way to reach us.
          </p>
        </div>
      </div>
    </div>
  );
}
