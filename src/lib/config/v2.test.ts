import { describe, it, expect } from 'vitest';
import { configV2, defaultConfigV2 } from './v2';

describe('default configuration', () => {
	it('is valid', () => {
		const result = configV2.safeParse(defaultConfigV2);

		expect(result.success).toBe(true);
	});
});
