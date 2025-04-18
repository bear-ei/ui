import {namePath} from './name-path.utils'

describe('namePath', () => {
	it('returns array when given a single string key', () => {
		const result = namePath('username')

		expect(result).toEqual(['username'])
	})

	it('returns same array when given an array of keys', () => {
		const result = namePath(['user', 'name'])

		expect(result).toEqual(['user', 'name'])
	})

	it('returns undefined when no name is provided', () => {
		const result = namePath(undefined)

		expect(result).toBeUndefined()
	})
})
