import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Skeleton} from '../Skeleton'

describe('Skeleton', () => {
	it('should render skeleton placeholder when skeleton and visible', () => {
		const {getByTestId} = renderWithTheme(
			<Skeleton
				skeleton={<Text testID='skeleton-placeholder'>loading</Text>}
				duration={300}
			>
				<Text>loaded content</Text>
			</Skeleton>
		)

		expect(getByTestId('skeleton__contentItemLayoutAnimatedVisible--test-id')).toBeTruthy()
		expect(getByTestId('skeleton-placeholder')).toBeTruthy()
	})
})
