import {textSearch} from './text-search.utils'

describe('textSearch', () => {
	type Data = {name: string; age: number; tags?: string[]}

	const data: Data[] = [
		{name: 'Alice', age: 25, tags: ['student', 'gamer']},
		{name: 'Bob', age: 30, tags: ['engineer']},
		{name: 'Charlie', age: 22, tags: ['student']},
		{name: 'David', age: 35},
		{name: 'Eve', age: 40, tags: undefined}
	]

	it('should find by a string key (case-insensitive)', () => {
		const search = textSearch(data)(['name'])

		expect(search('alice')).toEqual([data[0]])
		expect(search('BOB')).toEqual([data[1]])
		expect(search('char')).toEqual([data[2]])
	})

	it('should find by a number key', () => {
		const search = textSearch(data)(['age'])

		expect(search('2')).toEqual([data[0], data[2]])
		expect(search('30')).toEqual([data[1]])
	})

	it('should find by multiple keys', () => {
		const search = textSearch(data)(['name', 'age'])

		expect(search('alice')).toEqual([data[0]])
		expect(search('35')).toEqual([data[3]])
		expect(search('eve')).toEqual([data[4]])
	})

	it('should handle undefined or missing keys gracefully', () => {
		const search = textSearch(data)(['tags'])

		expect(search('student')).toEqual([data[0], data[2]])
		expect(search('engineer')).toEqual([data[1]])
		expect(search('gamer')).toEqual([data[0]])
		expect(search('teacher')).toEqual([])
		expect(search(' ')).toEqual([])
	})

	it('should return empty array if no match', () => {
		const search = textSearch(data)(['name'])

		expect(search('zzzz')).toEqual([])
	})

	it('should work with empty data array', () => {
		const search = textSearch<Data>([])(['name'])

		expect(search('alice')).toEqual([])
	})

	it('should work with empty keys array', () => {
		const search = textSearch(data)([])

		expect(search('alice')).toEqual([])
	})

	it('should handle non-string values in fields', () => {
		const data2 = [
			{value: 123, flag: true},
			{value: false, flag: false}
		]
		const search = textSearch(data2)(['value', 'flag'])

		expect(search('123')).toEqual([data2[0]])
		expect(search('true')).toEqual([data2[0]])
		expect(search('false')).toEqual([data2[1]])
	})
})
