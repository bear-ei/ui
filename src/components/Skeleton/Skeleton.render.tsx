import {type FC} from 'react'

import type {RenderSkeletonProps} from './Skeleton.interface'

import {ORIENTATION} from '../../constants'
import {useTheme} from '../../hooks'
import {ENTRY_EXIT} from '../../theme'
import {AnimatedView} from '../Animated'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../Layout-animated'

export const RenderSkeleton: FC<RenderSkeletonProps> = ({
	children,
	className,
	containerAnimatedStyle,
	id,
	orientation = ORIENTATION.HORIZONTAL,
	ref,
	skeleton,
	style,
	visible,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classNames} = token.classes
	const isSkeletonVisible = !!(skeleton && visible)
	const {entry, exit} = ENTRY_EXIT.SHORT

	const animatedViewStyle = [style, containerAnimatedStyle]

	return (
		<>
			{skeleton && (
				<LayoutAnimated
					animation={LAYOUT_ANIMATION.FADE}
					className='absolute bottom-0 left-0 right-0 top-0'
					entry={entry}
					exit={exit}
					lazyMount={true}
					testID={`skeleton__contentItemLayoutVisible--${id}`}
					unmountOnHide={true}
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
						className={classNames(
							'flex min-h-[--density-inline-x-small] min-w-[--density-inline-x-small]',
							{
								['flex-col justify-center']: orientation === ORIENTATION.VERTICAL,
								['flex-row items-center']: orientation === ORIENTATION.HORIZONTAL
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
				animation={LAYOUT_ANIMATION.FADE}
				className='absolute bottom-0 left-0 right-0 top-0'
				entry={entry}
				exit={exit}
				lazyMount={true}
				ref={ref}
				testID={`skeleton__contentItemLayoutNotVisible--${id}`}
				visible={!isSkeletonVisible}
			>
				{children}
			</LayoutAnimated>
		</>
	)
}
