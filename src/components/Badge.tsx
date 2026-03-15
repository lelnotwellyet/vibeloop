import React from 'react';
import './Badge.css';

interface Props {
  type: 'Senior' | 'Junior';
}

export default function Badge({ type }: Props) {
  return (
    <span className={`badge badge-${type.toLowerCase()}`}>{type}</span>
  );
}
