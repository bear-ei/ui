import {useMemo, type FC} from 'react'

import type {RenderSupportingTextProps} from './Supporting-text.interface'

import {ALIGNMENT, ORIENTATION} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, ENTRY_EXIT, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'
import {AnimatedText} from '../Animated'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../Layout-animated'

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
	const {classNames, densityClasses, typographyClasses} = token.classes
	const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.HORIZONTAL)
	const {entry, exit} = ENTRY_EXIT.SHORT

	const contentSize = useMemo(
		() => ({
			height: token.typography[TYPOGRAPHY.BODY][TYPOGRAPHY_SIZE.SMALL].height
		}),
		[token]
	)

	return (
		<LayoutAnimated
			{...props}
			animation={LAYOUT_ANIMATION.FADE}
			className={classNames('min-h-[--typography-body-small-height]', densityInsetClasses(size), className)}
			contentSize={contentSize}
			defaultVisible={true}
			entry={entry}
			exit={exit}

			testID={`supportingText__layoutAnimated--${id}`}
		>
			<AnimatedText
				className={classNames(
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
