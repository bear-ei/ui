jest.setTimeout(20000)
jest.mock('nanoid')
jest.mock('react', () => {
	const actualReact = jest.requireActual('react')
	return {
		...actualReact,
		useId: () => 'test-id'
	}
})

jest.mock('react-native-reanimated', () => {
	const Reanimated = jest.requireActual('react-native-reanimated/mock')
	return {
		...Reanimated,
		useSharedValue: jest.fn(() => ({value: 0})),
		useAnimatedStyle: jest.fn(() => ({})),
		interpolate: jest.fn(() => 0),
		Platform: {OS: 'ios'}
	}
})

jest.mock('react-native/Libraries/Interaction/InteractionManager', () => ({
	runAfterInteractions: (cb: any) => cb()
}))

beforeEach(() => {
	jest.clearAllMocks()
})
