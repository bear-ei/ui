import {cloneElement, type FC} from 'react'
import {Image, Text, View, type ViewStyle} from 'react-native'

import type {RenderAvatarProps} from './Avatar.interface'

import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, toTypographySize, RADIUS, SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'
import {toPlatformUnit} from '../../utils'

export const RenderAvatar: FC<RenderAvatarProps> = ({
	accessibilityLabel,
	backgroundColor,
	defaultSource,
	id,
	initialsText,
	radius = RADIUS.FULL,
	size = DENSITY_SIZE.MEDIUM,
	source,
	style,
	svgElement,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses, shapeClasses, typographyClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const isSVG = !!svgElement
	const avatarStyle = [
		{
			...(backgroundColor && {backgroundColor}),
			...(typeof size === 'number' && {height: toPlatformUnit(size), width: toPlatformUnit(size)})
		} as ViewStyle,
		style
	]

	return (
		<View
			{...containerProps}
			accessibilityLabel={accessibilityLabel ?? (initialsText || 'A')}
			accessibilityRole='image'
			accessible={true}
			className={classNames(
				'pointer-events-none relative overflow-hidden bg-[--color-primary-container]',
				densityInlineClasses(size),
				shapeClasses(SHAPE.ALL)(radius)
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
							className={classNames(
								'text-[--color-on-primary-container]',
								typographyClasses(TYPOGRAPHY.TITLE)(
									typeof size === 'number' ? TYPOGRAPHY_SIZE.MEDIUM : toTypographySize(size)
								)
							)}
							ellipsizeMode='tail'
							numberOfLines={1}
							testID={`avatar__labelText--${id}`}
						>
							{initialsText?.[0] || 'A'}
						</Text>
					}
				</View>
			)}
		</View>
	)
}
