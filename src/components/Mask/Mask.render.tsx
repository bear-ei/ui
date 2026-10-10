import {forwardRef, useMemo} from 'react'
import {Pressable, View, type ViewStyle} from 'react-native'
import {useTheme} from '../../hooks'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'
import type {RenderMaskProps} from './Mask.interface'
import {DURATION, EASING, hexToRGBA} from '../../theme'

export const RenderMask = forwardRef<View, RenderMaskProps>(
	(
		{backgroundColor, className, id, interactionHandlers, opacity = 0.2, style, testID, visible, ...containerProps},
		ref
	) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const entryAnimatedTimingOptions = useMemo(() => ({duration: DURATION.MEDIUM_0, easing: EASING.STANDARD}), [])
		const exitAnimatedTimingOptions = useMemo(() => ({duration: DURATION.SHORT_3, easing: EASING.STANDARD}), [])
		const maskStyle = {
			backgroundColor: hexToRGBA(backgroundColor ?? token.scheme.scrim)(opacity)
		} as ViewStyle

		return (
			<LayoutAnimated
				{...containerProps}
				accessibilityElementsHidden={true}
				importantForAccessibility='no-hide-descendants'
				animatedType={LAYOUT_ANIMATED.FADE}
				entry={entryAnimatedTimingOptions}
				exit={exitAnimatedTimingOptions}
				visible={visible}
				className={classesName(
					'absolute bottom-0 left-0 right-0 top-0 cursor-default',
					{['z-40']: visible},
					className
				)}
				ref={ref}
				testID={testID ?? `mask--${id}`}
				style={[style, maskStyle]}
			>
				<Pressable
					{...interactionHandlers}
					className='flex-1 outline-none'
					testID={`mask__content--${id}`}
				/>
			</LayoutAnimated>
		)
	}
)

RenderMask.displayName = 'RenderMask'
