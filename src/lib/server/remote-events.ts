// *IMPORTANT* DO NOT MODIFY THIS FILE OR ANY OF ITS METHODS
import Storage from './storage';

// Define the Event type
export interface Event {
    id: number; // Unique identifier for the event
    title: string;
    description?: string;
    date: string; // ISO 8601 format (e.g., '2025-01-01T12:00:00Z')
}

// Initialize Storage for events (using the same file for persistence)
const eventStorage = new Storage<Event>('data/events.json');

// Helper function to simulate random delays
function simulateDelay<T>(result: T): Promise<T> {
    const delay = Math.random() * (3000 - 500) + 500; // Random delay between 0.5 and 3 seconds
    return new Promise(resolve => setTimeout(() => resolve(result), delay));
}

/**
 * Get all events (simulates a remote fetch).
 */
export function fetchAllEvents(): Promise<Event[]> {
    const events = eventStorage.read();
    return simulateDelay(events);
}

/**
 * Get a single event by ID (simulates a remote fetch).
 */
export function fetchEventById(id: number): Promise<Event | undefined> {
    const events = eventStorage.read();
    const event = events.find(e => e.id === id);
    return simulateDelay(event);
}

/**
 * Add a new event (simulates a remote creation).
 */
export function createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    const events = eventStorage.read();

    // Generate a new ID (simple increment based on the max existing ID)
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;

    const newEvent: Event = { id: newId, ...event };
    eventStorage.add(newEvent);

    return simulateDelay(newEvent);
}

/**
 * Update an existing event by ID (simulates a remote update).
 */
export function updateEventById(id: number, updatedEvent: Partial<Omit<Event, 'id'>>): Promise<Event | null> {
    const events = eventStorage.read();
    const index = events.findIndex(event => event.id === id);

    if (index === -1) {
        return simulateDelay(null); // Event not found
    }

    // Merge the updates with the existing event
    const updated = { ...events[index], ...updatedEvent };
    events[index] = updated;

    eventStorage.write(events);
    return simulateDelay(updated);
}

/**
 * Delete an event by ID (simulates a remote deletion).
 */
export function deleteEventById(id: number): Promise<boolean> {
    const events = eventStorage.read();
    const filteredEvents = events.filter(event => event.id !== id);

    if (events.length === filteredEvents.length) {
        return simulateDelay(false); // No event found to delete
    }

    eventStorage.write(filteredEvents);
    return simulateDelay(true);
}
