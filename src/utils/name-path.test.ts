import {namePath} from './name-path.utils'

describe('namePath', () => {
	it('should return the array if name is an array', () => {
		const result = namePath(['a', 'b'])

		expect(result).toEqual(['a', 'b'])
	})

	it('should return an array with the name if name is a string', () => {
		const result = namePath('a')

		expect(result).toEqual(['a'])
	})

	it('should return undefined if name is undefined', () => {
		const result = namePath(undefined)

		expect(result).toBeUndefined()
	})
})
