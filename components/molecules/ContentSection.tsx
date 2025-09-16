import React from 'react';
import TypographyRichText from '../atoms/TypographyRichText';
import Badge from '../atoms/Badge';

export interface ContentSectionProps {
  title: string;
  content: string;
  badges?: Array<{
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  }>;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  badges = [],
  className = ''
}) => {
  return (
    <div className={`content-section ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <h4 className="font-semibold text-white text-base">
          {title}
        </h4>
        {badges.map((badge, index) => (
          <Badge 
            key={index}
            variant={badge.variant || 'default'} 
            size="sm"
          >
            {badge.text}
          </Badge>
        ))}
      </div>
      
      <TypographyRichText 
        content={content}
        variant="default"
      />
    </div>
  );
};

export default ContentSection;



