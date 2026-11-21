import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  MAPS_EMBED_URL,
  BUSINESS_HOURS,
  OG_IMAGE_URL,
} from "@/lib/config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Sri Parvathi Ghee" },
      { name: "description", content: "Get in touch with Sri Parvathi Ghee. Order enquiries, bulk orders, and feedback welcome." },
      { property: "og:title", content: "Contact Us — Sri Parvathi Ghee" },
      { property: "og:description", content: "Reach Sri Parvathi Ghee for orders, enquiries and feedback." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
  }),
  component: Contact,
});

type FormState = "idle" | "sending" | "sent";

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [state, setState] = useState<FormState>("idle");

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit number";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Please write at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("sending");
    const subject = encodeURIComponent(`Enquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => setState("sent"), 500);
  }

  const field = (
    id: keyof typeof form,
    label: string,
    type: string = "text",
    placeholder = "",
    multiline = false,
  ) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-forest">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/40 resize-none"
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          className="h-11 rounded-lg border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-forest/40"
        />
      )}
      {errors[id] && <p className="text-xs text-destructive">{errors[id]}</p>}
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-hero py-14 md:py-20">
        <div className="container-brand max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-forest">Get in Touch</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-forest md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">
            Questions about an order, bulk enquiries, or just want to say hello — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-brand grid gap-12 md:grid-cols-2">

          {/* ── Contact form ── */}
          <div>
            <SectionHeading align="left" title="Send a Message" eyebrow="Write to us" />

            {state === "sent" ? (
              <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border bg-card p-6">
                <span className="flex size-14 items-center justify-center rounded-full bg-teal-light text-success">
                  <CheckCircle2 className="size-7" />
                </span>
                <p className="font-serif text-xl font-bold text-forest">Message sent!</p>
                <p className="text-sm text-muted-foreground">
                  Thank you, <strong>{form.name}</strong>. We'll get back to you on <strong>{form.phone}</strong> shortly.
                </p>
                <Button
                  variant="forestOutline"
                  className="min-h-[44px]"
                  onClick={() => { setForm({ name: "", phone: "", message: "" }); setState("idle"); }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm">
                {field("name", "Your Name", "text", "e.g. Priya Sharma")}
                {field("phone", "Phone Number", "tel", "10-digit mobile number")}
                {field("message", "Your Message", "text", "How can we help you?", true)}

                <Button
                  type="submit"
                  variant="cta"
                  className="min-h-[44px] w-full"
                  disabled={state === "sending"}
                >
                  <Mail className="size-4" />
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* ── Contact info ── */}
          <div className="flex flex-col gap-6">
            <SectionHeading align="left" title="Find Us" eyebrow="Contact details" />

            <div className="flex flex-col gap-4">
              {[
                { icon: Phone,   label: "Phone",   value: CONTACT_PHONE   },
                { icon: Mail,    label: "Email",   value: CONTACT_EMAIL   },
                { icon: MapPin,  label: "Address", value: CONTACT_ADDRESS },
                { icon: Clock,   label: "Hours",   value: BUSINESS_HOURS  },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/8 text-forest">
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
                    <p className="text-sm text-forest font-medium mt-0.5 leading-snug">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="overflow-hidden rounded-2xl border shadow-sm">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="240"
                loading="lazy"
                title="Sri Parvathi Ghee location map"
                className="block"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
