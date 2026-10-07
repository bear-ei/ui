import {cloneElement, forwardRef} from 'react'
import {Image, Text, View, type ViewStyle} from 'react-native'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, RADIUS, SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'
import {platformValue} from '../../utils'
import type {RenderAvatarProps} from './Avatar.interface'

export const RenderAvatar = forwardRef<View, RenderAvatarProps>(
	(
		{
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
		},
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName, shapeClasses, typographyClasses} = token.classes
		const densityInlineClasses = densityClasses()(DENSITY_TYPE.INLINE)
		const isSVG = !!svgElement
		const avatarStyle = {
			...(backgroundColor && {backgroundColor}),
			...(typeof size === 'number' && {width: platformValue(size), height: platformValue(size)})
		} as ViewStyle

		return (
			<View
				{...containerProps}
				accessibilityLabel={accessibilityLabel ?? labelText}
				accessibilityRole='image'
				accessible={true}
				className={classesName(
					'pointer-events-none relative overflow-hidden bg-[--color-primary-container]',
					densityInlineClasses(size),
					shapeClasses(radius)(SHAPE.ALL)
				)}
				ref={ref}
				style={[avatarStyle, style]}
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
								className='h-full w-full'
								defaultSource={defaultSource ?? {}}
								resizeMode='cover'
								source={source ?? {}}
								testID={`avatar__image--${id}`}
							/>
						:	<Text
								className={classesName(
									'text-[--color-on-primary-container]',
									typographyClasses(TYPOGRAPHY.TITLE)(
										typeof size === 'number' ?
											TYPOGRAPHY_SIZE.MEDIUM
										:	token.typography.densitySizeMapTypographySize(size)
									)()
								)}
								ellipsizeMode='tail'
								numberOfLines={1}
								testID={`avatar__labelText--${id}`}
							>
								{labelText}
							</Text>
						}
					</View>
				)}
			</View>
		)
	}
)

RenderAvatar.displayName = 'RenderAvatar'
