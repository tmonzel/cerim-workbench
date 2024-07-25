export function validateRequirements(
	requirements: Record<string, number>,
	attributes: Record<string, number>
): string[] {
	const invalidAttributes = [];

	for (const [t, n] of Object.entries(requirements)) {
		if (typeof attributes[t] === 'number' && attributes[t] < n) {
			invalidAttributes.push(t);
		}
	}

	return invalidAttributes;
}
