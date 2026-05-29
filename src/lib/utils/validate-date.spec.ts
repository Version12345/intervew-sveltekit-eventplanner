import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isFutureDate, formatEventDate } from './validate-date';

describe('isFutureDate', () => {
	const FIXED = new Date('2026-06-01T12:00:00Z');

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(FIXED);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns true for a date in the future', () => {
		expect(isFutureDate('2026-06-02T12:00:00Z')).toBe(true);
	});

	it('returns false for a date in the past', () => {
		expect(isFutureDate('2026-05-31T12:00:00Z')).toBe(false);
	});

	it('returns false for a date equal to now', () => {
		expect(isFutureDate('2026-06-01T12:00:00Z')).toBe(false);
	});

	it('returns false for an invalid date string', () => {
		expect(isFutureDate('not-a-date')).toBe(false);
	});

	it('returns false for an empty / nullish value', () => {
		expect(isFutureDate('')).toBe(false);
		expect(isFutureDate(undefined)).toBe(false);
		expect(isFutureDate(null)).toBe(false);
	});

	it('returns true for a date one second in the future', () => {
		expect(isFutureDate('2026-06-01T12:00:01Z')).toBe(true);
	});
});

describe('formatEventDate', () => {
	it('formats an ISO date string into a human-readable form', () => {
		const formatted = formatEventDate('2026-06-04T14:00:00Z');

		expect(formatted).toMatch(/2026/);
		expect(formatted).toMatch(/Jun/);
	});

	it('returns the original string when the input is invalid', () => {
		expect(formatEventDate('not-a-date')).toBe('not-a-date');
	});
});
