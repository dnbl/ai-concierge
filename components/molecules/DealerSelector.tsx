import React from 'react';
import { Dealer } from '../../types';
import EnhancedSelect from '../atoms/EnhancedSelect';
import FormField from '../atoms/FormField';

export interface DealerSelectorProps {
  dealers: Dealer[];
  selectedDealerId?: string;
  onSelect: (dealerId: string) => void;
  error?: string;
  className?: string;
}

const DealerSelector: React.FC<DealerSelectorProps> = ({
  dealers,
  selectedDealerId,
  onSelect,
  error,
  className = ''
}) => {
  const dealerOptions = dealers.map(dealer => ({
    value: dealer.id,
    label: `${dealer.name} - ${dealer.location} (${dealer.distance})`,
    metadata: dealer
  }));

  return (
    <FormField
      label="Preferred Dealer"
      error={error}
      required
      helpText="Select the most convenient location for your service"
      className={className}
    >
      <EnhancedSelect
        value={selectedDealerId || ''}
        onChange={onSelect}
        options={dealerOptions}
        placeholder="Choose a dealer location"
        error={!!error}
        aria-label="Select preferred dealer"
      />
    </FormField>
  );
};

export default DealerSelector;



