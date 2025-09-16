import React from 'react';
import TypographyRichText from './atoms/TypographyRichText';

interface GenericInfoFormProps {
  payload?: {
    title?: string;
    content?: string;
  };
}

const GenericInfoForm: React.FC<GenericInfoFormProps> = ({ payload }) => {
  if (!payload) return null;

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg">
      {payload.title && (
        <h3 className="font-bold mb-4 text-white text-lg">
          {payload.title}
        </h3>
      )}
      {payload.content && (
        <div className="text-gray-300">
          <TypographyRichText 
            content={payload.content}
            variant="spacious"
          />
        </div>
      )}
    </div>
  );
};

export default GenericInfoForm;
