import SectionHeading from '@/components/ui/SectionHeading'

const posts = [
  {
    category: 'ANNOUNCEMENT',
    title: 'Marut FCU Project Goes Public',
    date: 'December 2024',
    readTime: '3 min read',
    excerpt: 'After months of private development, we are opening the doors. The schematics, firmware, and all documentation are now live on GitHub.',
  },
  {
    category: 'DEVELOPMENT',
    title: 'Fixed Wing Alpha: What We Learned',
    date: 'November 2024',
    readTime: '6 min read',
    excerpt: 'Our first public alpha of the fixed wing flight mode is out. Here is a deep dive into the PID tuning challenges we faced and how we solved them.',
  },
  {
    category: 'COMMUNITY',
    title: 'How to Contribute to Marut FCU',
    date: 'October 2024',
    readTime: '4 min read',
    excerpt: 'Whether you are a firmware engineer, PCB designer, or just someone passionate about open aviation — here is how you can get involved.',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="section-padding max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <SectionHeading 
          label="LATEST UPDATES" 
          heading="FROM THE BUILD LOG" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-dark-card border border-dark-border rounded-lg p-8 flex flex-col">
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-yellow border border-yellow/30 rounded px-2 py-1 mb-4 w-fit">
              {post.category}
            </div>
            <h3 className="text-white font-bold text-lg leading-snug mb-3">{post.title}</h3>
            <div className="text-white/30 text-xs mb-4 flex gap-3">
              {post.date} &middot; {post.readTime}
            </div>
            <p className="text-white/50 text-sm leading-relaxed flex-1 mb-6">
              {post.excerpt}
            </p>
            <a href="#" className="text-yellow text-sm font-semibold uppercase tracking-wide hover:text-yellow-hover transition-colors mt-auto">
              READ MORE →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
