import { createEvent } from '$lib/server/cached-events';
import { isFutureDate } from '$lib/utils/validate-date';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
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

		const newEvent = await createEvent({ title, description, date });
		redirect(303, `/${newEvent.id}`);
	}
};