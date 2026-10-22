import {useMemo, type FC} from 'react'

import type {RenderSupportingTextProps} from './Supporting-text.interface'

import {ALIGNMENT, LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, DURATION, EASING, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'
import {AnimatedText} from '../Animated'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'

export const RenderSupportingText: FC<RenderSupportingTextProps> = ({
	alignment = ALIGNMENT.START,
	children,
	className,
	id,
	size = DENSITY_SIZE.MEDIUM,
	textAnimatedStyle,
	...props
}) => {
	const {token} = useTheme()
	const {classesName, densityClasses, typographyClasses} = token.classes
	const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.HORIZONTAL)
	const {entry, exit} = useMemo(
		() => ({
			entry: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
			exit: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE}
		}),
		[]
	)

	const contentSize = useMemo(
		() => ({
			height: token.typography[TYPOGRAPHY.BODY][TYPOGRAPHY_SIZE.SMALL].height
		}),
		[token]
	)

	return (
		<LayoutAnimated
			{...props}
			animatedType={LAYOUT_ANIMATED.FADE}
			className={classesName('min-h-[--typography-body-small-height]', densityInsetClasses(size), className)}
			contentSize={contentSize}
			defaultVisible={true}
			entry={entry}
			exit={exit}

			testID={`supportingText__layoutAnimated--${id}`}
		>
			<AnimatedText
				className={classesName(
					{
						['text-center']: alignment === ALIGNMENT.CENTER,
						['text-end']: alignment === ALIGNMENT.END,
						['text-start']: alignment === ALIGNMENT.START
					},
					typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.SMALL)
				)}
				style={textAnimatedStyle}
				testID={`supportingText__animatedText--${id}`}
			>
				{children}
			</AnimatedText>
		</LayoutAnimated>
	)
}

RenderSupportingText.displayName = 'RenderSupportingText'
