import { useState } from "react";
import { ExternalLink, ZoomIn, X, ImageOff } from "lucide-react";

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|bmp)(\?.*)?$/i;

function isImageUrl(url) {
  return IMAGE_EXTENSIONS.test(url);
}

export default function LayoutPreview({ layoutUrl }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!layoutUrl) return null;

  const isImage = isImageUrl(layoutUrl) && !imgError;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Макет</p>

      {isImage ? (
        <>
          <div
            className="relative group cursor-zoom-in rounded-lg overflow-hidden border border-border bg-muted/30 inline-block max-w-full"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={layoutUrl}
              alt="Макет замовлення"
              onError={() => setImgError(true)}
              className="max-h-48 max-w-full object-contain block"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white" />
            </div>
          </div>

          <a
            href={layoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Відкрити у новій вкладці
          </a>

          {/* Lightbox */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={layoutUrl}
                alt="Макет замовлення"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </>
      ) : (
        <a
          href={layoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/40 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Переглянути макет
        </a>
      )}
    </div>
  );
}