"use client";
import React from "react";

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  image: string;
};

export function TestimonialsColumn({
  testimonials,
  className,
  animationClass = "testimonials-col-medium",
}: {
  testimonials: Testimonial[];
  className?: string;
  animationClass?: string;
}) {
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <div className={`flex flex-col gap-5 pb-5 ${animationClass}`}>
        {/* Duplicate for seamless loop */}
        {[0, 1].map((copy) => (
          <React.Fragment key={copy}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-7 w-full"
                style={{
                  maxWidth: 459,
                  borderRadius: 12,
                  border: "1px solid rgba(107,21,53,0.1)",
                  background: "#fffefb",
                  boxShadow: "rgba(107,21,53,0.04) 0px 4px 18px, rgba(107,21,53,0.027) 0px 2px 7.8px, rgba(107,21,53,0.02) 0px 0.8px 2.9px, rgba(107,21,53,0.01) 0px 0.175px 1px",
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#c8a84b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                {/* Review text */}
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#36342e" }}>
                  &ldquo;{text}&rdquo;
                </p>
                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt={name}
                    className="rounded-full object-cover shrink-0"
                    style={{ width: 36, height: 36 }}
                  />
                  <div>
                    <p className="text-sm font-semibold leading-tight" style={{ color: "#201515" }}>
                      {name}
                    </p>
                    <p className="text-xs leading-tight mt-0.5" style={{ color: "#939084" }}>
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
