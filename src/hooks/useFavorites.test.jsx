import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useFavorites from './useFavorites';

const SAMPLE = { id: 1, name: 'Sigiriya Rock Fortress', category: 'Historical' };

describe('useFavorites', () => {
  beforeEach(() => localStorage.clear());

  it('starts empty', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('adds an attraction when toggled on', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggleFavorite(SAMPLE));
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.isFavorite(1)).toBe(true);
  });

  it('removes an attraction when toggled off again', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggleFavorite(SAMPLE));
    act(() => result.current.toggleFavorite(SAMPLE));
    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('persists favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggleFavorite(SAMPLE));
    const stored = JSON.parse(localStorage.getItem('lkg_favorites_v1'));
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(1);
  });

  it('rehydrates favorites from localStorage on mount', () => {
    localStorage.setItem('lkg_favorites_v1', JSON.stringify([SAMPLE]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.isFavorite(1)).toBe(true);
  });
});
