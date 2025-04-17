import {textSearch} from './text-search.utils'

type User = {
	id: number
	name: string
	email: string
	age: number
}

const users: User[] = [
	{id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28},
	{id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', age: 35},
	{id: 3, name: 'Charlie', email: 'charlie@company.com', age: 40}
]

describe('textSearch', () => {
	it('should match name field with partial lowercase match', () => {
		const result = textSearch(users)(['name'])('ali')
		expect(result).toEqual([users[0]])
	})

	it('should match email field with exact lowercase match', () => {
		const result = textSearch(users)(['email'])('charlie@company.com')
		expect(result).toEqual([users[2]])
	})

	it('should be case-insensitive', () => {
		const result = textSearch(users)(['name'])('BOB')
		expect(result).toEqual([users[1]])
	})

	it('should match multiple keys', () => {
		const result = textSearch(users)(['name', 'email'])('example')
		expect(result).toEqual([users[0], users[1]])
	})

	it('should return empty array if no match', () => {
		const result = textSearch(users)(['name'])('notfound')
		expect(result).toEqual([])
	})

	it('should match number fields by converting to string', () => {
		const result = textSearch(users)(['age'])('40')
		expect(result).toEqual([users[2]])
	})

	it('should return all data when search text is empty', () => {
		const result = textSearch(users)(['name', 'email'])('')
		expect(result).toEqual(users)
	})

	it('should handle empty data array', () => {
		const result = textSearch<User>([])(['name'])('bob')
		expect(result).toEqual([])
	})
})
