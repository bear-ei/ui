import {textSearch} from './text-search.utils'

interface Item {
	name: string
	description: string
	category: string
}

const items: Item[] = [
	{name: 'Apple', description: 'A sweet fruit', category: 'Fruit'},
	{name: 'Banana', description: 'A yellow fruit', category: 'Fruit'},
	{name: 'Carrot', description: 'A root vegetable', category: 'Vegetable'},
	{name: 'Date', description: 'A sweet fruit', category: 'Fruit'}
]

describe('textSearch', () => {
	it('should return an empty array when data is empty', () => {
		const search = textSearch<Item>([])

		expect(search(['name'])('apple')).toEqual([])
	})

	it('should return an empty array when keys are empty', () => {
		const search = textSearch<Item>(items)

		expect(search([])('apple')).toEqual([])
	})

	it('should return all items when searchText is empty', () => {
		const search = textSearch<Item>(items)

		expect(search(['name'])('')).toEqual(items)
	})

	it('should return items matching a single key', () => {
		const search = textSearch<Item>(items)

		expect(search(['name'])('apple')).toEqual([items[0]])
	})

	it('should return items matching multiple keys', () => {
		const search = textSearch<Item>(items)

		expect(search(['name', 'description'])('sweet')).toEqual([items[0], items[3]])
	})

	it('should perform case-insensitive search', () => {
		const search = textSearch<Item>(items)

		expect(search(['name'])('APPLE')).toEqual([items[0]])
	})

	it('should return an empty array when no items match', () => {
		const search = textSearch<Item>(items)

		expect(search(['name'])('orange')).toEqual([])
	})
})
