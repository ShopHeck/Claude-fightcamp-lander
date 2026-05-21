export function FlameLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5c1.6 3 4.2 4.5 4.2 8a4.2 4.2 0 0 1-4.2 4.2 4.2 4.2 0 0 1-4.2-4.2c0-2.2 1.4-3.4 2.6-5.1.7-1 1-2 1.6-2.9Z" />
      <path d="M7.4 14.2C6.5 15.4 6 16.8 6 18.3A6 6 0 0 0 12 21a6 6 0 0 0 6-5.6c-.1-1.4-.6-2.7-1.5-3.8" />
    </svg>
  );
}
