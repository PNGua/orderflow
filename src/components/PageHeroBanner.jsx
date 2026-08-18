import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Full-width teal "plaque" banner with breadcrumb, title and description.
 * Reusable page hero used across landing pages.
 *
 * Props:
 *  - breadcrumb: array of { label, to? } — last item is rendered as current
 *  - title: string
 *  - description: string
 */
export default function PageHeroBanner({ breadcrumb = [], title, description }) {
  return (
    <section className="bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-12 lg:py-16">
        {breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1 text-xs text-white/80 flex-wrap mb-4">
            {breadcrumb.map((item, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <React.Fragment key={idx}>
                  {item.to && !isLast ? (
                    <Link to={item.to} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'text-white font-medium' : ''}>{item.label}</span>
                  )}
                  {!isLast && <ChevronRight className="w-3 h-3 text-white/70" />}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
          {title}
        </h1>

        {description && (
          <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}