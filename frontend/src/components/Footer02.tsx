"use client";

export default function Footer02() {
  return (
    <div className="bg-background border-t border-border py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} SkySpark Fireworks. All rights
          reserved.
        </p>
        <div className="flex gap-4">
          {["Visa", "Mastercard", "UPI", "NetBanking"].map((method) => (
            <span
              key={method}
              className="bg-muted px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider text-muted-foreground"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
