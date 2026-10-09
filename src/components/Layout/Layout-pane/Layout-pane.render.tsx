import {forwardRef, useMemo} from 'react'
import {View, type ViewStyle} from 'react-native'
import {LAYOUT} from '../../../constants'
import {useTheme} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import {LayoutAnimated} from '../../Layout-animated'
import type {RenderLayoutPaneProps} from './Layout-pane.interface'

export const RenderLayoutPane = forwardRef<View, RenderLayoutPaneProps>(
	({children, id, layoutType, style, testID, className, ...containerProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const layoutPaneStyle = {flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'} as ViewStyle
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
					'flex min-w-[--density-layout-sidebar] flex-1 flex-col self-stretch bg-[--color-surface]',
					className
				)}
				entry={entry}
				exit={exit}
				ref={ref}
				style={[style, layoutPaneStyle]}
				testID={testID ?? `layoutPane--${id}`}
			>
				{children}
			</LayoutAnimated>
		)
	}
)

RenderLayoutPane.displayName = 'RenderLayoutPane'
