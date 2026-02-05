import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <IconChevronRight size={16} className="text-gray-600" />
              <span className="text-foreground font-medium">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[90rem] mx-auto bg-card border border-border rounded-sm p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-10">
              Last updated: December 16, 2024
            </p>

            <div className="prose prose-invert max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-2">
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At SkySpark, we respect your privacy and are committed to
                  protecting your personal data. This privacy policy explains
                  how we collect, use, and safeguard your information when you
                  visit our website or make a purchase of fireworks and
                  celebration supplies.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-2">
                  Information We Collect
                </h2>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Personal Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    When you create an account or make a purchase, we collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4 marker:text-primary">
                    <li>
                      Name and contact information (email, phone number,
                      address)
                    </li>
                    <li>
                      Payment information (UPI, card details, billing address)
                    </li>
                    <li>Account credentials (username, password)</li>
                    <li>
                      Proof of Age (if required by local regulations for
                      explosives)
                    </li>
                    <li>Delivery instructions and preferences</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Automatically Collected Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    When you visit our website, we automatically collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4 marker:text-primary">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on site</li>
                    <li>Location data for delivery services</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-2">
                  How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4 marker:text-primary">
                  <li>Process and fulfill your firework orders safely</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>
                    Provide customer support regarding product usage and safety
                  </li>
                  <li>Send promotional offers (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-2">
                  Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures
                  to protect your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4 marker:text-primary">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-2">
                  Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4 marker:text-primary">
                  <li>Access: Request a copy of your personal data</li>
                  <li>Correction: Update or correct inaccurate information</li>
                  <li>Deletion: Request deletion of your personal data</li>
                  <li>Opt-out: Unsubscribe from marketing communications</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To exercise these rights, please contact us at
                  privacy@skyspark.com
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-2">
                  Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your
                  experience. You can control cookies through your browser
                  settings. For more information, see our{" "}
                  <Link href="/cookie" className="text-primary hover:underline">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-2">
                  Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may update this privacy policy from time to time. We will
                  notify you of significant changes by posting the new policy on
                  this page and updating the Last updated date.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-2">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions about this privacy policy:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li>
                    <strong className="text-primary">Email:</strong>{" "}
                    privacy@skyspark.com
                  </li>
                  <li>
                    <strong className="text-primary">Phone:</strong>{" "}
                    1800-SKY-SPARK
                  </li>
                  <li>
                    <strong className="text-primary">Address:</strong> 123
                    Firework Lane, Sivakasi, Tamil Nadu 626123
                  </li>
                </ul>
              </section>

              <div className="bg-muted border-l-4 border-primary p-6 mt-8 rounded-r-sm">
                <h3 className="font-bold text-foreground mb-2 uppercase tracking-wide">
                  Your Privacy Matters
                </h3>
                <p className="text-muted-foreground">
                  We are committed to protecting your privacy and handling your
                  data responsibly. If you have any concerns or questions,
                  please reach out to us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer01 />
      <Footer02 />
    </>
  );
}
