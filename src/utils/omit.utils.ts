export const omit = <T extends Record<string, unknown>, K extends keyof T>(object: T) => {
	const result = {...object}

	return (keys: K[]) => {
		keys.forEach(key => {
			if (key in result) {
				delete result[key]
			}
		})

		return result
	}
}
