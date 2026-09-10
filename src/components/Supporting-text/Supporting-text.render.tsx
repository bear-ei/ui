import {ALIGNMENT} from '@/constants'
import {useTheme} from '@/hooks'
import {classesName, typographyClasses} from '@/utils'
import {SIZE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {AnimatedText} from '../Animated-component'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderSupportingTextProps} from './Supporting-text.interface'

export const RenderSupportingText = forwardRef<View, RenderSupportingTextProps>(
	({id, size = SIZE.MEDIUM, children, textAnimatedStyle, className, alignment = ALIGNMENT.START, ...props}, ref) => {
		const theme = useTheme()

		return (
			<LayoutAnimated
				{...props}
				className={classesName(
					'mb-1 min-h-4',
					{
						['pl-2 pr-2']: size === SIZE.EXTRA_SMALL,
						['pl-3 pr-3']: size === SIZE.SMALL,
						['pl-4 pr-4']: size === SIZE.MEDIUM,
						['pl-5 pr-5']: size === SIZE.LARGE,
						['pl-6 pr-6']: size === SIZE.EXTRA_LARGE
					},
					className
				)}
				contentSize={{height: theme.token.spacing.medium}}
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
