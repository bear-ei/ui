import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {cloneElement, forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderAvatarProps} from './Avatar.interface'
import {Container, ContentItem, Image, LabelText} from './Avatar.styles'

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
			svgElement,
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
			backgroundColor={backgroundColor}
			density={density}
			ref={ref}
			shape={shape}
			size={size}
			testID={testID ?? `avatar--${testID}`}
		>
			<ContentItem
				shape={shape}
				testID={`avatar__contentItem--img--${id}`}
				visible={!svgElement}
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
			</ContentItem>

			<ContentItem
				shape={shape}
				testID={`avatar__contentItem--svg--${id}`}
				visible={!!svgElement}
			>
				{svgElement && cloneElement(svgElement, {height: '100%', width: '100%'})}
			</ContentItem>
		</Container>
	)
)
