import {forwardRef, useMemo} from 'react'
import {View} from 'react-native'
import {ALIGNMENT} from '../../constants'
import {useTheme} from '../../hooks'
import {AnimatedText} from '../Animated-component'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderSupportingTextProps} from './Supporting-text.interface'
import {DENSITY_SIZE, DENSITY_TYPE, DURATION, EASING, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'

export const RenderSupportingText = forwardRef<View, RenderSupportingTextProps>(
	(
		{
			alignment = ALIGNMENT.START,
			children,
			className,
			id,
			size = DENSITY_SIZE.MEDIUM,
			textAnimatedStyle,
			visible = true,
			...props
		},
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName, typographyClasses} = token.classes
		const densityInsetClasses = densityClasses()(DENSITY_TYPE.INSET)
		const layoutAnimatedTimingOptions = useMemo(() => ({duration: DURATION.SHORT_2, easing: EASING.STANDARD}), [])

		return (
			<LayoutAnimated
				{...props}
				className={classesName('min-h-[--typography-body-small-height]', densityInsetClasses(size), className)}
				contentSize={{height: token.typography[TYPOGRAPHY.BODY][TYPOGRAPHY_SIZE.SMALL].height}}
				entry={layoutAnimatedTimingOptions}
				exit={layoutAnimatedTimingOptions}
				ref={ref}
				testID={`supportingText__layoutAnimated--${id}`}
				visible={visible}
			>
				<AnimatedText
					className={classesName(
						{
							['text-center']: alignment === ALIGNMENT.CENTER,
							['text-end']: alignment === ALIGNMENT.END,
							['text-start']: alignment === ALIGNMENT.START
						},
						typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.SMALL)()
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
