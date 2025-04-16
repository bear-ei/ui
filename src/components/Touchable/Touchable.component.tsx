import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {TouchableBase} from './Touchable-base.component'
import type {RenderTouchableProps, TouchableProps} from './Touchable.interface'
import {Container, Main, RippleLayout, TouchableContent} from './Touchable.styles'

const render = ({
	backgroundUnderlay,
	children,
	elevationUnderlay,
	id,
	interactionHandlers,
	mainAlignSelf,
	rippleElements,
	shape,
	testID,
	...contentProps
}: RenderTouchableProps) => (
	<Container testID={testID ?? `touchable--${id}`}>
		<TouchableContent
			{...contentProps}
			{...interactionHandlers}
			enableFocusRing={false}
			testID={`touchable__touchableContent--${id}`}
		>
			<Main
				alignSelf={mainAlignSelf}
				shape={shape}
				testID={`touchable__main--${id}`}
			>
				{children}
				<RippleLayout
					shape={shape}
					testID={`touchable__rippleLayout--${id}`}
				>
					{rippleElements}
				</RippleLayout>

				{backgroundUnderlay}
				{elevationUnderlay}
			</Main>
		</TouchableContent>
	</Container>
)

const ForwardRefTouchable = forwardRef<View, TouchableProps>((props, ref) => (
	<TouchableBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const Touchable: FC<TouchableProps> = ForwardRefTouchable
