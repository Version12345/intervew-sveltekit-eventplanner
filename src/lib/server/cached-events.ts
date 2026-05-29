/**
 * A simple caching layer for event data. This is not a general-purpose cache.
 * It is designed specifically to optimize the data access patterns of our event planner app, and
 * is not intended to be reusable as-is in other contexts. 
 * 
 * In production, you would likely want a more robust caching solution with features like TTLs, cache invalidation, 
 * and better error handling. However, this simple implementation serves to demonstrate the concept of caching 
 * in the context of a SvelteKit app.
 */
import * as remote from './remote-events';
import type { Event } from './remote-events';
export type { Event };

let listCache: Promise<Event[]> | null = null;

const itemCache = new Map<number, Promise<Event | undefined>>();

export function fetchAllEvents(): Promise<Event[]> {
	return (listCache ??= remote.fetchAllEvents());
}

export function fetchEventById(id: number): Promise<Event | undefined> {
	let cached = itemCache.get(id);
	if (!cached) {
		cached = remote.fetchEventById(id);
		itemCache.set(id, cached);
	}
	return cached;
}

export async function createEvent(input: Omit<Event, 'id'>): Promise<Event> {
	const created = await remote.createEvent(input);
	listCache = null;
	itemCache.set(created.id, Promise.resolve(created));

	return created;
}

export async function updateEventById(
	id: number,
	patch: Partial<Omit<Event, 'id'>>
): Promise<Event | null> {
	const updated = await remote.updateEventById(id, patch);
	listCache = null;

	if (updated) {
		itemCache.set(id, Promise.resolve(updated));
	} else {
		itemCache.delete(id);
	}

	return updated;
}

export async function deleteEventById(id: number): Promise<boolean> {
	const ok = await remote.deleteEventById(id);

	if (ok) {
		listCache = null;
		itemCache.delete(id);
	}

	return ok;
}
