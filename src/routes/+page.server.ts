import { fetchAllEvents } from '$lib/server/cached-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return {
        events: fetchAllEvents()
    };
};
