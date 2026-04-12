'use client'

import { useState } from 'react'

interface FAQItem { q: string; a: string }

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="max-w-2xl mx-auto px-4 pb-12">
      <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>자주 묻는 질문</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              style={{ background: 'var(--bg-sub)' }}
            >
              <span className="text-sm font-medium pr-4" style={{ color: 'var(--text)' }}>{item.q}</span>
              <span className="flex-shrink-0 text-xl font-light transition-transform duration-200"
                style={{ color: 'var(--primary)', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 pt-3 text-sm leading-relaxed" style={{ color: 'var(--text-sub)', background: '#fff' }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
