/**
 * Global Loading Indicator
 * Shown by Next.js during route transitions.
 */

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}
