import {forwardRef} from 'react'
import {View} from 'react-native'
import {ALIGNMENT} from '../../constants'
import {useTheme} from '../../hooks'
import {AnimatedText} from '../Animated-component'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderSupportingTextProps} from './Supporting-text.interface'
import {DENSITY_TYPE, SIZE, TYPOGRAPHY} from '../../theme'

export const RenderSupportingText = forwardRef<View, RenderSupportingTextProps>(
	(
		{
			alignment = ALIGNMENT.START,
			children,
			className,
			id,
			size = SIZE.MEDIUM,
			textAnimatedStyle,
			visible = true,
			...props
		},
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName, typographyClasses} = token.classes
		const densityInsetClasses = densityClasses()(DENSITY_TYPE.INSET)

		return (
			<LayoutAnimated
				{...props}
				visible={visible}
				className={classesName('min-h-[--typography-body-medium-height]', densityInsetClasses(size), className)}
				contentSize={{height: token.typography[TYPOGRAPHY.BODY][SIZE.SMALL].height}}
				testID={`supportingText__layoutAnimated--${id}`}
				ref={ref}
			>
				<AnimatedText
					className={classesName(
						{
							['text-center']: alignment === ALIGNMENT.CENTER,
							['text-end']: alignment === ALIGNMENT.END,
							['text-start']: alignment === ALIGNMENT.START
						},
						typographyClasses(TYPOGRAPHY.BODY)(SIZE.SMALL)()
					)}
					style={[textAnimatedStyle]}
					testID={`supportingText__animatedText--${id}`}
				>
					{children}
				</AnimatedText>
			</LayoutAnimated>
		)
	}
)

RenderSupportingText.displayName = 'RenderSupportingText'
