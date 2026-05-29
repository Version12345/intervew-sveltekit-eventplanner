export function isFutureDate(value: string | undefined | null): boolean {
	if (!value) {
		return false;
	}

	const d = new Date(value);

	if (isNaN(d.getTime())) {
		return false;
	}

	return d.getTime() > Date.now();
}

export function formatEventDate(iso: string): string {
	const d = new Date(iso);
	if (isNaN(d.getTime())) {
		return iso;
	}
	return new Intl.DateTimeFormat('en-GB', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(d);
}

export function nowForDatetimeLocal(): string {
	const now = new Date();
	const offset = now.getTimezoneOffset() * 60_000;
	return new Date(now.getTime() - offset).toISOString().slice(0, 16);
}
