import {forwardRef, useMemo} from 'react'
import {View} from 'react-native'
import {LAYOUT} from '../../../constants'
import {useTheme} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import {LayoutAnimated} from '../../Layout-animated'
import type {RenderLayoutPaneProps} from './Layout-pane.interface'

export const RenderLayoutPane = forwardRef<View, RenderLayoutPaneProps>(
	({children, id, layoutType, testID, className, ...containerProps}, ref) => {
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
					'flex min-w-[--density-layout-sidebar] flex-1 self-stretch bg-[--color-surface]',
					className,
					{
						['flex-row']: layoutType === LAYOUT.HORIZONTAL,
						['flex-col']: layoutType === LAYOUT.VERTICAL
					}
				)}
				entry={entry}
				exit={exit}
				ref={ref}
				testID={testID ?? `layoutPane--${id}`}
			>
				{children}
			</LayoutAnimated>
		)
	}
)

RenderLayoutPane.displayName = 'RenderLayoutPane'
