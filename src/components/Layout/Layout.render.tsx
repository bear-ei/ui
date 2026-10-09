import {forwardRef, useMemo} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderLayoutProps} from './Layout.interface'
import {DURATION, EASING} from '../../theme'

export const RenderLayout = forwardRef<View, RenderLayoutProps>(
	({children, id, style: rawStyle, testID, layoutType, className, ...containerProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const layoutStyle = {
			flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'
		} as ViewStyle

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
				className={classesName('flex flex-1 self-stretch bg-[--color-surface-container]', className)}
				entry={entry}
				exit={exit}
				ref={ref}
				style={[rawStyle, layoutStyle]}
				testID={testID ?? `layout--${id}`}
			>
				{children}
			</LayoutAnimated>
		)
	}
)

RenderLayout.displayName = 'RenderLayout'
