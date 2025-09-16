import React from 'react';

interface SkipLink {
  href: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
  className?: string;
}

const defaultLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#chat-input', label: 'Skip to chat input' }
];

const SkipLinks: React.FC<SkipLinksProps> = ({
  links = defaultLinks,
  className = ''
}) => {
  return (
    <div className={`skip-links ${className}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="
            sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
            bg-blue-600 text-white px-4 py-2 rounded-md z-50
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-all duration-200
          "
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;