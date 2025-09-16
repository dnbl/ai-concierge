import React from 'react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Icon from '../atoms/Icon';
import { Vehicle } from '../../types';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
  showActions?: boolean;
  onViewDetails?: () => void;
  onBookService?: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onClick,
  showActions = false,
  onViewDetails,
  onBookService,
}) => {
  return (
    <Card 
      className="hover:bg-gray-700/70 transition-all duration-200 cursor-pointer"
      onClick={onClick}
      padding="md"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src={vehicle.imageUrl} 
            alt={vehicle.model} 
            className="w-20 h-20 object-cover rounded-lg bg-gray-600"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iIzM3NDE1MSIvPgo8dGV4dCB4PSI0MCIgeT0iNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNFPC90ZXh0Pgo8L3N2Zz4K';
            }}
          />
          <Badge 
            variant="info" 
            size="sm" 
            className="absolute -top-1 -right-1"
          >
            <Icon name="car" size="sm" />
          </Badge>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg truncate">
            {vehicle.model}
          </h3>
          <p className="text-xs text-gray-400 font-mono tracking-wider truncate">
            VIN: {vehicle.vin}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="success" size="sm">
              Active
            </Badge>
            <Badge variant="default" size="sm">
              Electric
            </Badge>
          </div>
        </div>
        
        {showActions && (
          <div className="flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.();
              }}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              View Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookService?.();
              }}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              Book Service
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VehicleCard;

