import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {TouchableBase} from './Touchable-base.component'
import type {RenderTouchableProps, TouchableProps} from './Touchable.interface'
import {Container, Main, RippleLayout, TouchableContent} from './Touchable.styles'

const renderTouchable = ({
	backgroundUnderlay,
	children,
	elevationUnderlay,
	interactionHandlers,
	mainAlignSelf,
	rippleElements,
	shape,
	testID,
	...contentProps
}: RenderTouchableProps) => (
	<Container testID={`touchable--${testID}`}>
		<TouchableContent
			{...contentProps}
			{...interactionHandlers}
			enableFocusRing={false}
			testID={`touchable__touchableContent--${testID}`}
		>
			<Main
				alignSelf={mainAlignSelf}
				shape={shape}
				testID={`touchable__main--${testID}`}
			>
				{children}
				<RippleLayout
					shape={shape}
					testID={testID}
				>
					{rippleElements}
				</RippleLayout>

				{backgroundUnderlay}
				{elevationUnderlay}
			</Main>
		</TouchableContent>
	</Container>
)

const TouchableWithRef = forwardRef<View, TouchableProps>((props, ref) => (
	<TouchableBase
		{...props}
		ref={ref}
		renderTouchable={renderTouchable}
	/>
))

export const Touchable: FC<TouchableProps> = TouchableWithRef
