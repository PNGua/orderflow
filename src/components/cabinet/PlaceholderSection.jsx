export default function PlaceholderSection({ title }) {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-10 flex items-center justify-center min-h-[200px]">
      <p className="text-muted-foreground text-sm">{title} — розділ у розробці</p>
    </div>
  );
}