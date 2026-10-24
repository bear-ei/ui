import {useMemo, type FC} from 'react'
import {Pressable} from 'react-native'

import type {RenderMaskProps} from './Mask.interface'

import {useTheme} from '../../hooks'
import {ENTRY_EXIT, hexToRGBA} from '../../theme'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'

export const RenderMask: FC<RenderMaskProps> = ({
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
}) => {
	const {token} = useTheme()
	const {classes, scheme} = token
	const {classesName} = classes
	const {entry, exit} = ENTRY_EXIT.MASK

	const maskStyle = useMemo(
		() => [style, {backgroundColor: hexToRGBA(backgroundColor ?? scheme.scrim, opacity)}],
		[style, backgroundColor, opacity, scheme.scrim]
	)

	return (
		<LayoutAnimated
			{...containerProps}
			accessibilityElementsHidden={true}
			animatedType={LAYOUT_ANIMATED.FADE}
			className={classesName('absolute bottom-0 left-0 right-0 top-0 cursor-default', className, {
				['z-40']: visible ?? defaultVisible
			})}
			defaultVisible={defaultVisible}
			entry={entry}
			exit={exit}
			importantForAccessibility='no-hide-descendants'
			style={maskStyle}
			testID={testID ?? `mask--${id}`}
			visible={visible}
		>
			<Pressable
				{...interactionHandlers}
				className='flex-1 outline-none'
				testID={`mask__content--${id}`}
			/>
		</LayoutAnimated>
	)
}
