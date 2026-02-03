import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-white/5">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <IconChevronRight size={16} className="text-gray-600" />
              <span className="text-white font-medium">Cookie Policy</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-card border border-white/10 rounded-sm p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Cookie Policy
              </h1>
              <p className="text-gray-400 mb-8">
                Last updated: December 16, 2024
              </p>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    What Are Cookies
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Cookies are small text files that are placed on your
                    computer or mobile device when you visit our SkySpark
                    website. They are widely used to make websites work more
                    efficiently and provide information to the owners of the
                    site.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    How We Use Cookies
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We use cookies for several reasons:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
                    <li>To enable certain functions of the website</li>
                    <li>To provide analytics and track website usage</li>
                    <li>To store your preferences and settings</li>
                    <li>To remember your shopping cart items</li>
                    <li>To keep you logged in during your visit</li>
                    <li>To personalize your fireworks shopping experience</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Types of Cookies We Use
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Essential Cookies
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      These cookies are necessary for the SkySpark website to
                      function properly. They enable basic functions like page
                      navigation, access to secure areas, and shopping cart
                      functionality.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Analytics Cookies
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      These cookies help us understand how visitors interact
                      with our website by collecting and reporting information
                      anonymously. This helps us improve our fireworks catalog
                      and user experience.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Functionality Cookies
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      These cookies allow the website to remember choices you
                      make (such as your preferred fireworks categories or
                      region) and provide enhanced, personalized features.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Marketing Cookies
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      These cookies track your visit to our website and the
                      pages you have visited. We use this information to make
                      our website and advertising more relevant to your
                      interests.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Managing Cookies
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    You can control and manage cookies in various ways. Please
                    note that removing or blocking cookies can impact your user
                    experience and may affect your ability to purchase fireworks
                    online.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Most browsers automatically accept cookies, but you can
                    modify your browser settings to decline cookies if you
                    prefer. Instructions for managing cookies can be found in
                    your browser&apos;s help section.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Third-Party Cookies
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We may also use third-party services such as Google
                    Analytics, payment processors, and social media plugins that
                    may set their own cookies. These third parties have their
                    own privacy policies and cookie policies.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Updates to This Policy
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We may update this Cookie Policy from time to time to
                    reflect changes in our practices or applicable laws. Please
                    revisit this page regularly to stay informed about our use
                    of cookies.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you have any questions about our use of cookies, please
                    contact us:
                  </p>
                  <div className="bg-card border border-white/10 rounded-sm p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-semibold">Email:</span>
                      <span className="text-gray-300">
                        privacy@skyspark.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-semibold">Phone:</span>
                      <span className="text-gray-300">+91 8148559768</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-semibold">
                        Address:
                      </span>
                      <span className="text-gray-300">
                        3/267-A2, Sivakasi – Sattur Rd,
                        <br />
                        near Sri Sangam Mahal,
                        <br />
                        Chinnakarampatti, Sivakasi,
                        <br />
                        Tamil Nadu 626189
                      </span>
                    </div>
                  </div>
                </section>
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
