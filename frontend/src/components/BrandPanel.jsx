import React from 'react';
import { Heading, Text } from '@radix-ui/themes';
import './BrandPanel.css';

export default function BrandPanel() {
  return (
    <div className="brand-panel">
      <div className="brand-content">
        <Heading size="8" as="h1" className="brand-title">
          Welcome to Opponion
        </Heading>
        <Text size="5" className="brand-subtitle">
          Share your opinions. Influence ideas. Connect with minds that matter.
        </Text>
      </div>
    </div>
  );
}
