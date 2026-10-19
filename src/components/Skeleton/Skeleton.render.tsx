import {forwardRef, useMemo} from 'react'
import type {View} from 'react-native'
import {LAYOUT} from '../../constants'
import {AnimatedView} from '../Animated'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'
import type {RenderSkeletonProps} from './Skeleton.interface'
import {useTheme} from '../../hooks'
import {DURATION, EASING} from '../../theme'

export const RenderSkeleton = forwardRef<View, RenderSkeletonProps>(
	(
		{
			children,
			className,
			containerAnimatedStyle,
			id,
			layoutType = LAYOUT.HORIZONTAL,
			skeleton,
			style,
			visible,
			...containerProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const isSkeletonVisible = !!(skeleton && visible)
		const {entry, exit} = useMemo(
			() => ({
				entry: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
				exit: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE}
			}),
			[]
		)

		const animatedViewStyle = useMemo(() => [style, containerAnimatedStyle], [style, containerAnimatedStyle])

		return (
			<>
				{skeleton && (
					<LayoutAnimated
						animatedType={LAYOUT_ANIMATED.FADE}
						className='absolute bottom-0 left-0 right-0 top-0'
						entry={entry}
						exit={exit}
						lazy={true}
						testID={`skeleton__contentItemLayoutVisible--${id}`}
						unmount={true}
						visible={isSkeletonVisible}
					>
						{
							// containerProps (className, style, onLayout, etc.) are scoped to the
							// skeleton overlay only, not to `children`. This is intentional: the skeleton
							// is a standalone layout that should not inherit the caller's content styling.
							// If the skeleton needs different styling than the content, pass it through
							// the `skeleton` ReactNode instead of className/style on <Skeleton>.
						}
						<AnimatedView
							{...containerProps}
							className={classesName(
								'flex min-h-[--density-inline-x-small] min-w-[--density-inline-x-small]',
								{
									['flex-row items-center']: layoutType === LAYOUT.HORIZONTAL,
									['flex-col justify-center']: layoutType === LAYOUT.VERTICAL
								},
								className
							)}
							style={animatedViewStyle}
							testID={`skeleton__animatedSkeletonLayout--${id}`}
						>
							{skeleton}
						</AnimatedView>
					</LayoutAnimated>
				)}

				<LayoutAnimated
					animatedType={LAYOUT_ANIMATED.FADE}
					className='absolute bottom-0 left-0 right-0 top-0'
					entry={entry}
					exit={exit}
					lazy={true}
					ref={ref}
					testID={`skeleton__contentItemLayoutNotVisible--${id}`}
					visible={!isSkeletonVisible}
				>
					{children}
				</LayoutAnimated>
			</>
		)
	}
)

RenderSkeleton.displayName = 'RenderSkeleton'
