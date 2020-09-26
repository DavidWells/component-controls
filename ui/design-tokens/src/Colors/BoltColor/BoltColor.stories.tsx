import React from 'react';
import { BoltColor, BoltColorPalette } from './BoltColor';
import { ColorProps } from '../../types';

export default {
  title: 'Design Tokens/Colors/BoltColor',
  component: BoltColor,
};

export const overview = ({ name, color }: ColorProps) => (
  <BoltColor name={name} color={color} />
);

overview.controls = {
  name: { type: 'text', value: 'Brand' },
  color: {
    type: 'object',
    value: {
      value: { type: 'color', value: '#2270ee' },
      varName: { type: 'text', value: 'var(--bolt-color-navy)' },
    },
  },
};

export const palette = () => (
  <BoltColorPalette
    palette={{
      Navy: { value: '#001f5f', varName: 'var(--bolt-color-navy)' },
      Teal: { value: '#10a5ac', varName: 'var(--bolt-color-teal)' },
      Orange: { value: '#f76923', varName: 'var(--bolt-color-orange)' },
      Yellow: { value: '#ffc836', varName: 'var(--bolt-color-yellow)' },
      Wine: { value: '#661d34', varName: 'var(--bolt-color-wine)' },
      Pink: { value: '#e63690', varName: 'var(--bolt-color-pink)' },
      Berry: { value: '#ac1361', varName: 'var(--bolt-color-berry)' },
      Violet: { value: '#5f67b9', varName: 'var(--bolt-color-violet)' },
      Gray: { value: '#8d8e99', varName: 'var(--bolt-color-gray)' },
      Black: { value: '#151619', varName: 'var(--bolt-color-black)' },
      White: { value: '#ffffff', varName: 'var(--bolt-color-white)' },
    }}
  />
);
