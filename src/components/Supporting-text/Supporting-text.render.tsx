import {forwardRef, useMemo} from 'react'
import {View} from 'react-native'
import {ALIGNMENT, LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, DURATION, EASING, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'
import {AnimatedText} from '../Animated'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'
import type {RenderSupportingTextProps} from './Supporting-text.interface'

export const RenderSupportingText = forwardRef<View, RenderSupportingTextProps>(
	(
		{alignment = ALIGNMENT.START, children, className, id, size = DENSITY_SIZE.MEDIUM, textAnimatedStyle, ...props},
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName, typographyClasses} = token.classes
		const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET)(LAYOUT.HORIZONTAL)
		const {entry, exit} = useMemo(
			() => ({
				entry: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
				exit: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE}
			}),
			[]
		)

		return (
			<LayoutAnimated
				{...props}
				animatedType={LAYOUT_ANIMATED.FADE}
				className={classesName('min-h-[--typography-body-small-height]', densityInsetClasses(size), className)}
				contentSize={{height: token.typography[TYPOGRAPHY.BODY][TYPOGRAPHY_SIZE.SMALL].height}}
				entry={entry}
				exit={exit}
				ref={ref}
				testID={`supportingText__layoutAnimated--${id}`}
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
