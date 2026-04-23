import { useState } from "react";
import { ExternalLink, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|bmp)(\?.*)?$/i;

function isImageUrl(url) {
  return IMAGE_EXTENSIONS.test(url.trim());
}

function parseUrls(layoutUrl) {
  if (!layoutUrl) return [];
  // Split by comma, newline, or space (but not inside URLs)
  return layoutUrl
    .split(/[\n,]+/)
    .map((u) => u.trim())
    .filter(Boolean);
}

function Lightbox({ urls, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const canPrev = idx > 0;
  const canNext = idx < urls.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>

      {urls.length > 1 && (
        <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          {idx + 1} / {urls.length}
        </span>
      )}

      {canPrev && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {canNext && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <img
        src={urls[idx]}
        alt={`Макет ${idx + 1}`}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function LayoutItem({ url, index, onOpenLightbox }) {
  const [imgError, setImgError] = useState(false);
  const isImage = isImageUrl(url) && !imgError;

  if (isImage) {
    return (
      <div
        className="relative group cursor-zoom-in rounded-lg overflow-hidden border border-border bg-muted/30 w-24 h-24 shrink-0"
        onClick={() => onOpenLightbox(index)}
      >
        <img
          src={url}
          alt={`Макет ${index + 1}`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/40 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors shrink-0"
    >
      <ExternalLink className="w-4 h-4" />
      Макет {index + 1}
    </a>
  );
}

export default function LayoutPreview({ layoutUrl }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const urls = parseUrls(layoutUrl);
  if (urls.length === 0) return null;

  const imageUrls = urls.filter((u) => isImageUrl(u));

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Макети {urls.length > 1 && <span className="normal-case font-normal">({urls.length})</span>}
      </p>

      <div className="flex flex-wrap gap-2 items-start">
        {urls.map((url, i) => (
          <LayoutItem
            key={i}
            url={url}
            index={i}
            onOpenLightbox={(idx) => setLightboxIdx(idx)}
          />
        ))}
      </div>

      {lightboxIdx !== null && imageUrls.length > 0 && (
        <Lightbox
          urls={imageUrls}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </div>
  );
}