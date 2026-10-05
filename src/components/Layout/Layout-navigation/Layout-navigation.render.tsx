import {forwardRef} from 'react'
import type {View} from 'react-native'
import {useTheme} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import {LayoutAnimated} from '../../Layout-animated'
import type {RenderLayoutNavigationProps} from './Layout-navigation.interface'

export const RenderLayoutNavigation = forwardRef<View, RenderLayoutNavigationProps>(
	({children, id, testID, className, ...containerProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes

		return (
			<LayoutAnimated
				{...containerProps}
				className={classesName('flex max-w-80 flex-col self-stretch bg-[--color-surface-container]', className)}
				entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
				exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
				ref={ref}
				testID={testID ?? `layoutNavigation--${id}`}
			>
				{children}
			</LayoutAnimated>
		)
	}
)

RenderLayoutNavigation.displayName = 'RenderLayoutNavigation'
