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
import { contactWaUrl } from "@/lib/whatsapp";

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

  function handleSubmit(channel: "whatsapp" | "mail") {
    if (!validate()) return;
    setState("sending");

    if (channel === "whatsapp") {
      window.open(contactWaUrl(form.name, form.phone, form.message), "_blank", "noopener,noreferrer");
    } else {
      const subject = encodeURIComponent(`Enquiry from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }

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
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm">
                {field("name", "Your Name", "text", "e.g. Priya Sharma")}
                {field("phone", "Phone Number", "tel", "10-digit mobile number")}
                {field("message", "Your Message", "text", "How can we help you?", true)}

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button
                    variant="cta"
                    className="min-h-[44px] flex-1"
                    disabled={state === "sending"}
                    onClick={() => handleSubmit("whatsapp")}
                  >
                    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Send on WhatsApp
                  </Button>
                  <Button
                    variant="forestOutline"
                    className="min-h-[44px] flex-1"
                    disabled={state === "sending"}
                    onClick={() => handleSubmit("mail")}
                  >
                    <Mail className="size-4" />
                    Send by Email
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* ── Contact info ── */}
          <div className="flex flex-col gap-6">
            <SectionHeading align="left" title="Find Us" eyebrow="Contact details" />

            <div className="flex flex-col gap-4">
              {[
                { icon: Phone,   label: "Phone",    value: CONTACT_PHONE   },
                { icon: Mail,    label: "Email",    value: CONTACT_EMAIL   },
                { icon: MapPin,  label: "Address",  value: CONTACT_ADDRESS },
                { icon: Clock,   label: "Hours",    value: BUSINESS_HOURS  },
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
