import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderAvatarProps} from './Avatar.interface'
import {Container, Content, Image, LabelText} from './Avatar.styles'

export const RenderAvatar = forwardRef<View, RenderAvatarProps>(
	(
		{
			accessibilityLabel,
			backgroundColor,
			defaultSource,
			density,
			id,
			labelText,
			shape = SHAPE.FULL,
			size,
			source,
			testID,
			...containerProps
		},
		ref
	) => (
		<Container
			{...containerProps}
			accessibilityLabel={accessibilityLabel ?? labelText}
			accessibilityRole='image'
			accessible={true}
			ref={ref}
			shape={shape}
			testID={testID ?? `avatar--${testID}`}
		>
			<Content
				backgroundColor={backgroundColor}
				density={density}
				shape={shape}
				size={size}
				testID={`avatar__content--${id}`}
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
)
