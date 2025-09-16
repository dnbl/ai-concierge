import React from 'react';
import QuickActionButton from '../atoms/QuickActionButton';

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

interface QuickActionGridProps {
  actions: QuickAction[];
  columns?: 2 | 3 | 4;
  variant?: 'grid' | 'list' | 'carousel';
  className?: string;
}

const QuickActionGrid: React.FC<QuickActionGridProps> = ({
  actions,
  columns = 3,
  variant = 'grid',
  className = ''
}) => {
  const gridColsClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  const renderGrid = () => (
    <div className={`grid gap-4 ${gridColsClasses[columns]} ${className}`}>
      {actions.map((action) => (
        <QuickActionButton
          key={action.id}
          icon={action.icon}
          label={action.label}
          description={action.description}
          onClick={action.onClick}
          disabled={action.disabled}
          variant="secondary"
          size="md"
        />
      ))}
    </div>
  );

  const renderList = () => (
    <div className={`space-y-3 ${className}`}>
      {actions.map((action) => (
        <div
          key={action.id}
          className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          onClick={action.onClick}
        >
          <div className="h-8 w-8 text-cyan-400 mr-4">
            {action.icon}
          </div>
          <div className="flex-1">
            <div className="font-medium text-white text-sm">
              {action.label}
            </div>
            <div className="text-xs text-gray-400">
              {action.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCarousel = () => (
    <div className={`flex space-x-4 overflow-x-auto pb-2 ${className}`}>
      {actions.map((action) => (
        <div key={action.id} className="flex-shrink-0">
          <QuickActionButton
            icon={action.icon}
            label={action.label}
            description={action.description}
            onClick={action.onClick}
            disabled={action.disabled}
            variant="secondary"
            size="sm"
            className="w-32"
          />
        </div>
      ))}
    </div>
  );

  switch (variant) {
    case 'list':
      return renderList();
    case 'carousel':
      return renderCarousel();
    default:
      return renderGrid();
  }
};

export default QuickActionGrid;



