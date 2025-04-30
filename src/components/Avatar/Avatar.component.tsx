import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {AvatarBase} from './Avatar-base.component'
import type {AvatarProps, RenderAvatarProps} from './Avatar.interface'
import {Container, Content, Image, LabelText} from './Avatar.styles'

const renderAvatar = ({
	accessibilityLabel,
	defaultSource,
	density,
	id,
	labelText,
	shape = SHAPE.FULL,
	size,
	source,
	testID,
	...containerProps
}: RenderAvatarProps) => (
	<Container
		{...containerProps}
		accessibilityLabel={labelText ? `Avatar: ${labelText}` : accessibilityLabel}
		accessibilityRole='image'
		accessible={true}
		pointerEvents='none'
		shape={shape}
		testID={testID ?? `avatar--${testID}`}
	>
		<Content
			density={density}
			size={size}
			testID={`avatar__content--${id}`}
			shape={shape}
		>
			{source || defaultSource ?
				<Image
					defaultSource={defaultSource ?? {}}
					resizeMode='cover'
					source={source ?? {}}
					testID={`avatar__image--${id}`}
				/>
			:	<LabelText
					ellipsizeMode='tail'
					numberOfLines={1}
					size={SIZE.MEDIUM}
					testID={`avatar__labelText--${id}`}
					type={TYPOGRAPHY.TITLE}
				>
					{labelText}
				</LabelText>
			}
		</Content>
	</Container>
)

const AvatarWithRef = forwardRef<View, AvatarProps>((props, ref) => (
	<AvatarBase
		{...props}
		ref={ref}
		renderAvatar={renderAvatar}
	/>
))

export const Avatar = AvatarWithRef
