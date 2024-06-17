import { describe, it, expect } from 'vitest';
import { configV1, defaultConfigV1 } from './v1';

describe('default configuration', () => {
	it('is valid', () => {
		const result = configV1.safeParse(defaultConfigV1);

		expect(result.success).toBe(true);
	});
});
