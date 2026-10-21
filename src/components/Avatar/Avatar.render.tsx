import {cloneElement, useMemo, type FC} from 'react'
import {Image, Text, View, type ViewStyle} from 'react-native'

import type {RenderAvatarProps} from './Avatar.interface'

import {useTheme} from '../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	densitySizeMapTypographySize,
	RADIUS,
	SHAPE,
	TYPOGRAPHY,
	TYPOGRAPHY_SIZE
} from '../../theme'
import {platformValue} from '../../utils'

export const RenderAvatar: FC<RenderAvatarProps> = ({
	accessibilityLabel,
	backgroundColor,
	defaultSource,
	id,
	labelText,
	radius = RADIUS.FULL,
	size = DENSITY_SIZE.MEDIUM,
	source,
	style,
	svgElement,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName, densityClasses, shapeClasses, typographyClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const isSVG = !!svgElement
	const avatarStyle = useMemo(
		() => [
			{
				...(backgroundColor && {backgroundColor}),
				...(typeof size === 'number' && {height: platformValue(size), width: platformValue(size)})
			} as ViewStyle,
			style
		],
		[backgroundColor, size, style]
	)

	return (
		<View
			{...containerProps}
			accessibilityLabel={accessibilityLabel ?? (labelText || 'A')}
			accessibilityRole='image'
			accessible={true}
			className={classesName(
				'pointer-events-none relative overflow-hidden bg-[--color-primary-container]',
				densityInlineClasses(size),
				shapeClasses(SHAPE.ALL, radius)
			)}
			style={avatarStyle}
			testID={testID ?? `avatar--${id}`}
		>
			{isSVG && (
				<View
					className='absolute bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-center'
					testID={`avatar__contentItem--svg--${id}`}
				>
					{cloneElement(svgElement, {height: '100%', width: '100%'})}
				</View>
			)}

			{!isSVG && (
				<View
					className='absolute bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-center'
					testID={`avatar__contentItem--img--${id}`}
				>
					{source || defaultSource ?
						<Image
							{...(defaultSource && {defaultSource})}
							{...(source && {source})}
							className='h-full w-full'
							resizeMode='cover'
							testID={`avatar__image--${id}`}
						/>
					:	<Text
							className={classesName(
								'text-[--color-on-primary-container]',
								typographyClasses(TYPOGRAPHY.TITLE)(
									typeof size === 'number' ?
										TYPOGRAPHY_SIZE.MEDIUM
									:	densitySizeMapTypographySize(size)
								)
							)}
							ellipsizeMode='tail'
							numberOfLines={1}
							testID={`avatar__labelText--${id}`}
						>
							{labelText?.[0] || 'A'}
						</Text>
					}
				</View>
			)}
		</View>
	)
}

RenderAvatar.displayName = 'RenderAvatar'
