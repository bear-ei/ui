import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {AvatarBase} from './Avatar-base.component'
import type {AvatarProps, RenderAvatarProps} from './Avatar.interface'
import {Container, Content, Image, LabelText} from './Avatar.styles'

const renderAvatar = ({
	accessibilityLabel,
	backgroundColor,
	defaultSource,
	density,
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
		testID={`avatar--${testID}`}
	>
		<Content
			backgroundColor={backgroundColor}
			density={density}
			shape={shape}
			size={size}
			testID={`avatar__content--${testID}`}
		>
			{source || defaultSource ?
				<Image
					defaultSource={defaultSource ?? {}}
					resizeMode='cover'
					source={source ?? {}}
					testID={`avatar__image--${testID}`}
				/>
			:	<LabelText
					ellipsizeMode='tail'
					numberOfLines={1}
					size={SIZE.MEDIUM}
					testID={`avatar__labelText--${testID}`}
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

export const Avatar: FC<AvatarProps> = AvatarWithRef
