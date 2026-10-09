import {forwardRef, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import {LayoutAnimated} from '../../Layout-animated'
import type {RenderLayoutNavigationProps} from './Layout-navigation.interface'

export const RenderLayoutNavigation = forwardRef<View, RenderLayoutNavigationProps>(
	({children, id, testID, className, ...containerProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const {entry, exit} = useMemo(
			() => ({
				entry: {duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE},
				exit: {duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}
			}),
			[]
		)

		return (
			<LayoutAnimated
				{...containerProps}
				className={classesName(
					'flex min-w-[--density-layout-navigation] max-w-[--density-layout-sidebar] flex-col self-stretch bg-[--color-surface-container]',
					className
				)}
				entry={entry}
				exit={exit}
				ref={ref}
				testID={testID ?? `layoutNavigation--${id}`}
			>
				{children}
			</LayoutAnimated>
		)
	}
)

RenderLayoutNavigation.displayName = 'RenderLayoutNavigation'
