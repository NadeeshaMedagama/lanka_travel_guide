import { describe, it, expect } from 'vitest';
import { toRadians, calculateDistance } from './distance';

describe('toRadians', () => {
  it('converts 180 degrees to π radians', () => {
    expect(toRadians(180)).toBeCloseTo(Math.PI, 5);
  });
  it('converts 0 degrees to 0', () => {
    expect(toRadians(0)).toBe(0);
  });
});

describe('calculateDistance (Haversine)', () => {
  it('returns 0.0 for identical coordinates', () => {
    expect(calculateDistance(6.9271, 79.8612, 6.9271, 79.8612)).toBe('0.0');
  });

  it('computes ~94 km between Colombo and Kandy', () => {
    const km = parseFloat(calculateDistance(6.9271, 79.8612, 7.2906, 80.6337));
    expect(km).toBeGreaterThan(90);
    expect(km).toBeLessThan(99);
  });

  it('returns a string rounded to one decimal place', () => {
    const result = calculateDistance(6.9271, 79.8612, 7.2906, 80.6337);
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^\d+\.\d$/);
  });
});
