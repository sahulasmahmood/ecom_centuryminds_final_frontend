"use client";

import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";
import { IconMapPin, IconPhone, IconMail } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-muted-foreground">
            We are here to help you light up your celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-sm p-8 text-center hover:border-primary/50 transition-colors group">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
              <IconPhone
                size={24}
                className="text-primary group-hover:text-primary-foreground transition-colors"
              />
            </div>
            <h3 className="font-bold text-foreground mb-2 uppercase tracking-wide">
              Call Us
            </h3>
            <p className="text-muted-foreground mb-1">1800-SKY-SPARK</p>
            <p className="text-muted-foreground text-xs">Mon-Sat, 9am-9pm</p>
          </div>
          <div className="bg-card border border-border rounded-sm p-8 text-center hover:border-primary/50 transition-colors group">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
              <IconMail
                size={24}
                className="text-primary group-hover:text-primary-foreground transition-colors"
              />
            </div>
            <h3 className="font-bold text-foreground mb-2 uppercase tracking-wide">
              Email Us
            </h3>
            <p className="text-muted-foreground mb-1">support@skyspark.com</p>
            <p className="text-muted-foreground text-xs">
              We reply within 24 hrs
            </p>
          </div>
          <div className="bg-card border border-border rounded-sm p-8 text-center hover:border-primary/50 transition-colors group">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
              <IconMapPin
                size={24}
                className="text-primary group-hover:text-primary-foreground transition-colors"
              />
            </div>
            <h3 className="font-bold text-foreground mb-2 uppercase tracking-wide">
              Visit Us
            </h3>
            <p className="text-muted-foreground mb-1">
              123 Firework Lane, Sivakasi
            </p>
            <p className="text-muted-foreground text-xs">Tamil Nadu 626123</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-card border border-border rounded-sm p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight relative z-10">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted border border-border rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground text-sm transition-colors placeholder:text-muted-foreground"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted border border-border rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground text-sm transition-colors placeholder:text-muted-foreground"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-muted border border-border rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground text-sm transition-colors placeholder:text-muted-foreground"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-muted border border-border rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground text-sm transition-colors placeholder:text-muted-foreground resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer01 />
      <Footer02 />
    </div>
  );
}
