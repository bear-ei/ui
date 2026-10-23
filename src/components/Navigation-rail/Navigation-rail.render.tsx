import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderNavigationRailItemOptions, RenderNavigationRailProps} from './Navigation-rail.interface'

import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, densityClasses} from '../../theme'
import {NavigationRailItem} from './Navigation-rail-item'
import {NAVIGATION_DESTINATION_POSITION} from './Navigation-rail.enum'

export const RenderNavigationRailItems: FC<RenderNavigationRailItemOptions> = ({
	data,
	id,
	...renderNavigationRailItemProps
}) =>
	data?.map(({indexKey, ...props}) => (
		<NavigationRailItem
			{...props}
			{...renderNavigationRailItemProps}
			indexKey={indexKey}
			key={indexKey}
			testID={`navigationRail__navigationRailItem--${id}`}
		/>
	))

export const RenderNavigationRail: FC<RenderNavigationRailProps> = ({
	destinationPosition,
	fabElement,
	id,
	itemElements,
	menuElement,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.VERTICAL)

	return (
		<View
			{...containerProps}
			className={classesName(
				'flex w-[--density-layout-navigation] flex-1 flex-col items-center self-stretch',
				densityInsetClasses(DENSITY_SIZE.XX_LARGE)
			)}
			testID={testID ?? `navigationRail--${id}`}
		>
			{menuElement && (
				<View
					className={classesName(
						'mb-[--density-spacing-medium] flex items-center justify-center overflow-hidden',
						densityControlClasses(DENSITY_SIZE.MEDIUM)
					)}
					testID={`navigationRail__menu--${id}`}
				>
					{menuElement}
				</View>
			)}

			{fabElement && (
				<View
					className={classesName(
						'mb-[--density-spacing-x-large] overflow-hidden',
						densityControlClasses(DENSITY_SIZE.XX_LARGE)
					)}
					testID={`navigationRail__fab--${id}`}
				>
					{fabElement}
				</View>
			)}

			<View
				className={classesName(
					'flex flex-1 flex-col items-center gap-[--density-spacing-medium] self-stretch',
					{
						['justify-center']: destinationPosition === NAVIGATION_DESTINATION_POSITION.CENTER,
						['justify-end']: destinationPosition === NAVIGATION_DESTINATION_POSITION.BOTTOM,
						['justify-start']: destinationPosition === NAVIGATION_DESTINATION_POSITION.TOP
					}
				)}
				testID={`navigationRail__destination--${id}`}
			>
				{itemElements}
			</View>
		</View>
	)
}
