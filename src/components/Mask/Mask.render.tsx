import {forwardRef, useMemo} from 'react'
import {Pressable, View} from 'react-native'
import {useTheme} from '../../hooks'
import {DURATION, EASING, hexToRGBA} from '../../theme'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'
import type {RenderMaskProps} from './Mask.interface'

export const RenderMask = forwardRef<View, RenderMaskProps>(
	(
		{
			backgroundColor,
			className,
			defaultVisible,
			id,
			interactionHandlers,
			opacity = 0.2,
			style,
			testID,
			visible,
			...containerProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const {entry, exit} = useMemo(
			() => ({
				entry: {duration: DURATION.MEDIUM_0, easing: EASING.STANDARD_DECELERATE},
				exit: {duration: DURATION.SHORT_3, easing: EASING.STANDARD_ACCELERATE}
			}),
			[]
		)

		const maskStyle = useMemo(
			() => [style, {backgroundColor: hexToRGBA(backgroundColor ?? token.scheme.scrim)(opacity)}],
			[style, backgroundColor, opacity, token.scheme.scrim]
		)

		return (
			<LayoutAnimated
				{...containerProps}
				accessibilityElementsHidden={true}
				importantForAccessibility='no-hide-descendants'
				animatedType={LAYOUT_ANIMATED.FADE}
				entry={entry}
				exit={exit}
				defaultVisible={defaultVisible}
				visible={visible}
				className={classesName('absolute bottom-0 left-0 right-0 top-0 cursor-default', className, {
					['z-40']: visible ?? defaultVisible
				})}
				ref={ref}
				testID={testID ?? `mask--${id}`}
				style={maskStyle}
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
