jest.mock('nanoid')
jest.mock('react', () => {
	const actualReact = jest.requireActual('react')

	return {
		...actualReact,
		useId: () => 'test-id'
	}
})
