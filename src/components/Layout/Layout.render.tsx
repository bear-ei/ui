import {forwardRef, useMemo} from 'react'
import type {View} from 'react-native'

import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DURATION, EASING} from '../../theme'
import {LayoutAnimated} from '../Layout-animated'

import type {RenderLayoutProps} from './Layout.interface'

export const RenderLayout = forwardRef<View, RenderLayoutProps>(
	({children, id, testID, layoutType, className, ...containerProps}, ref) => {
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
				className={classesName('flex flex-1 self-stretch bg-[--color-surface-container]', className, {
					['flex-row']: layoutType === LAYOUT.HORIZONTAL,
					['flex-col']: layoutType === LAYOUT.VERTICAL
				})}
				entry={entry}
				exit={exit}
				ref={ref}
				testID={testID ?? `layout--${id}`}
			>
				{children}
			</LayoutAnimated>
		)
	}
)

RenderLayout.displayName = 'RenderLayout'
