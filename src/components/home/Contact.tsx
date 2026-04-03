import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";

const contactDetails = {
  email: "stephenthomasvincent17@gmail.com",
  phone: "07846102759",
  addressLines: ["Unit 3", "1 High Street", "Leigh", "WN72AD"],
  mapQuery: "Unit 3, 1 High Street, Leigh, WN72AD",
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white min-h-screen snap-start pt-38 lg:pt-42 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mx-auto ">
          <div className="mx-auto  text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Contact
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Get in touch
            </h2>
            <p className="mx-auto lg:mx-0 mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Have a question before booking? Send us a message and we will get
              back to you as soon as possible.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className=" bg-white p-6 shadow-xl sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl">
                    Studio details
                  </h3>

                  <div className="mt-6 space-y-5 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <div className="mt-1 space-y-1">
                          {contactDetails.addressLines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a
                          href={`tel:${contactDetails.phone}`}
                          className="mt-1 block hover:text-foreground"
                        >
                          {contactDetails.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a
                          href={`mailto:${contactDetails.email}`}
                          className="mt-1 block break-all hover:text-foreground"
                        >
                          {contactDetails.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl">
                    Send a message
                  </h3>

                  <form
                    className="mt-8 space-y-5"
                    action={`mailto:${contactDetails.email}`}
                    method="post"
                    encType="text/plain"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="Name"
                          type="text"
                          required
                          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-foreground/30"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="Email"
                          type="email"
                          required
                          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-foreground/30"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="Subject"
                        type="text"
                        required
                        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-foreground/30"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="Message"
                        required
                        rows={6}
                        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-foreground/30"
                        placeholder="Write your message here"
                      />
                    </div>

                    <Button
                      asChild
                      className="rounded-full bg-black px-8 py-5 text-white hover:bg-black/90"
                    >
                      <button type="submit">Send Message</button>
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            <div className="overflow-hidden  bg-white shadow-xl">
              <iframe
                title="Studio location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contactDetails.mapQuery)}&output=embed`}
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
