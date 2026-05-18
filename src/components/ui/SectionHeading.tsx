import React from 'react'

type SectionHeadingProps = {
  label?: string
  heading: string
  subheading?: string
}

export default function SectionHeading({ label, heading, subheading }: SectionHeadingProps) {
  return (
    <div>
      {label && <div className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow mb-3">{label}</div>}
      <h2 className="text-4xl md:text-5xl font-unbounded font-black uppercase text-white leading-tight">{heading}</h2>
      {subheading && <p className="text-lg text-yellow mt-2 font-semibold">{subheading}</p>}
    </div>
  )
}
