import { fetchEventById, updateEventById, deleteEventById } from '$lib/server/cached-events';
import { isFutureDate } from '$lib/utils/validate-date';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

function parseEventId(raw: string): number {
	const id = parseInt(raw, 10);

	if (isNaN(id)) {
		error(400, 'Invalid event ID');
	}

	return id;
}

export const load: PageServerLoad = ({ params }) => {
	const id = parseEventId(params.eventId);

	return {
		event: fetchEventById(id).then((event) => {
			if (!event) {
				error(404, `Event ${id} not found`);
			}
			return event;
		})
	};
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = parseEventId(params.eventId);
		const formData = await request.formData();

		const title = formData.get('title')?.toString().trim();
		const description = formData.get('description')?.toString().trim();
		const date = formData.get('date')?.toString();

		if (!title || !date) {
			return fail(400, {
				error: 'Title and date are required.',
				title,
				description,
				date
			});
		}

		if (!isFutureDate(date)) {
			return fail(400, {
				error: 'Event date must be in the future.',
				title,
				description,
				date
			});
		}

		const updated = await updateEventById(id, { title, description, date });
		if (!updated) error(404, 'Event not found');

		redirect(303, `/${id}`);
	},

	delete: async ({ params }) => {
		const id = parseEventId(params.eventId);
		const deleted = await deleteEventById(id);
		if (!deleted) error(404, 'Event not found');
		redirect(303, '/');
	}
};
