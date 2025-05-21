import {NamePath} from './name-path.interface'
import {namePath} from './name-path.utils'

describe('namePath', () => {
	it('should return undefined if name is undefined', () => {
		expect(namePath()).toBeUndefined()
		expect(namePath(undefined)).toBeUndefined()
	})

	it('should wrap a single key in an array', () => {
		expect(namePath('foo')).toEqual(['foo'])
		expect(namePath('123')).toEqual(['123'])
	})

	it('should return the array as is if already array', () => {
		expect(namePath(['foo', 'bar'])).toEqual(['foo', 'bar'])
		expect(namePath(['1', '2'])).toEqual(['1', '2'])
		expect(namePath(['a'])).toEqual(['a'])
	})

	it('should work for generic types', () => {
		type T = {foo: number; bar: string}
		const single: NamePath<T> = 'foo'
		const multi: NamePath<T> = ['foo', 'bar']

		expect(namePath<T>(single)).toEqual(['foo'])
		expect(namePath<T>(multi)).toEqual(['foo', 'bar'])
	})
})
