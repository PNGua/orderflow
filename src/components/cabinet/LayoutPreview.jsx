import { useState } from "react";
import { ExternalLink, ZoomIn, X, ChevronLeft, ChevronRight, FileText, FileImage, FileArchive, File } from "lucide-react";

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|bmp)(\?.*)?$/i;
const PDF_EXTENSIONS = /\.pdf(\?.*)?$/i;
const ARCHIVE_EXTENSIONS = /\.(zip|rar|7z|tar|gz)(\?.*)?$/i;
const VECTOR_EXTENSIONS = /\.(ai|eps|cdr|psd|psb)(\?.*)?$/i;

function getUrlType(url) {
  const u = url.trim();
  if (IMAGE_EXTENSIONS.test(u)) return "image";
  if (PDF_EXTENSIONS.test(u)) return "pdf";
  if (ARCHIVE_EXTENSIONS.test(u)) return "archive";
  if (VECTOR_EXTENSIONS.test(u)) return "vector";
  return "link";
}

function getFileName(url) {
  try {
    const parts = url.split(/[/?#]/);
    const name = parts.filter(Boolean).pop();
    return decodeURIComponent(name || "Файл");
  } catch {
    return "Файл";
  }
}

function parseUrls(layoutUrl) {
  if (!layoutUrl) return [];
  return layoutUrl.split(/[\n,]+/).map((u) => u.trim()).filter(Boolean);
}

function FileIcon({ type }) {
  if (type === "image") return <FileImage className="w-5 h-5 text-primary" />;
  if (type === "pdf") return <FileText className="w-5 h-5 text-red-500" />;
  if (type === "archive") return <FileArchive className="w-5 h-5 text-amber-500" />;
  return <File className="w-5 h-5 text-muted-foreground" />;
}

function Lightbox({ urls, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const canPrev = idx > 0;
  const canNext = idx < urls.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
      {urls.length > 1 && (
        <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">{idx + 1} / {urls.length}</span>
      )}
      {canPrev && (
        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}>
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canNext && (
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      <img src={urls[idx]} alt={`Макет ${idx + 1}`} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function ImageItem({ url, index, onOpenLightbox }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (imgError) {
    return <FileItem url={url} index={index} type="link" />;
  }

  return (
    <div className="relative">
      <div
        className="relative group cursor-zoom-in rounded-lg overflow-hidden border border-border bg-muted/30 w-20 h-20 shrink-0"
        onClick={() => onOpenLightbox(index)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={url}
          alt={`Макет ${index + 1}`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
        <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5">
          #{index + 1}
        </span>
      </div>

      {/* Hover preview popup */}
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-40 pointer-events-none">
          <div className="bg-white border border-border rounded-xl shadow-2xl p-1.5">
            <img
              src={url}
              alt={`Макет ${index + 1} preview`}
              className="w-48 h-48 object-contain rounded-lg"
            />
          </div>
          <div className="w-2.5 h-2.5 bg-white border-b border-r border-border rotate-45 mx-auto -mt-1.5" />
        </div>
      )}
    </div>
  );
}

function FileItem({ url, index, type }) {
  const name = getFileName(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/30 text-foreground text-xs font-medium hover:bg-muted hover:border-primary/40 transition-colors shrink-0 max-w-[160px]"
    >
      <FileIcon type={type} />
      <span className="truncate">{name}</span>
      <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
    </a>
  );
}

export default function LayoutPreview({ layoutUrl }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const urls = parseUrls(layoutUrl);
  if (urls.length === 0) return null;

  const imageUrls = urls.filter((u) => getUrlType(u) === "image");

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Макети {urls.length > 1 && <span className="normal-case font-normal">({urls.length})</span>}
      </p>

      <div className="flex flex-wrap gap-2 items-end">
        {urls.map((url, i) => {
          const type = getUrlType(url);
          if (type === "image") {
            return (
              <ImageItem
                key={i}
                url={url}
                index={i}
                onOpenLightbox={() => {
                  const imageIdx = imageUrls.indexOf(url);
                  setLightboxIdx(imageIdx >= 0 ? imageIdx : 0);
                }}
              />
            );
          }
          return <FileItem key={i} url={url} index={i} type={type} />;
        })}
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