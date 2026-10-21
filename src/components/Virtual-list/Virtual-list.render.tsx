import {cloneElement, forwardRef, useMemo, type Ref} from 'react'
import {ScrollView, Text, View, type ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'

import {COMPONENT_STATUS, LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DURATION, EASING, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'
import {platformValue} from '../../utils'
import {AnimatedView} from '../Animated'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'

import {VirtualListItem} from './Virtual-list-item'
import type {
	RenderVirtualListItemInfo,
	RenderVirtualListItemOptions,
	RenderVirtualListProps
} from './Virtual-list.interface'

export const RenderVirtualListItem = <T,>({
	containerLayout,
	data,
	draggable,
	id,
	onLoadEnd,
	renderItem,
	...virtualListItemProps
}: RenderVirtualListItemOptions<T>) => {
	if (data?.length === 0) {
		onLoadEnd?.()

		return
	}

	return (
		<>
			{data?.map((item, index) => (
				<VirtualListItem
					{...virtualListItemProps}
					{...(index === data.length - 1 && {onLoadEnd})}
					{...(draggable && {containerLayout})}
					draggable={draggable}
					item={item}
					key={item.indexKey}
					testID={`virtualList__virtualListItem--${id}`}
					renderItem={
						renderItem as (options: RenderVirtualListItemInfo<Record<string, unknown>>) => React.JSX.Element
					}
				/>
			))}
		</>
	)
}

export const RenderVirtualListInner = <T,>(
	{
		containerLayout,
		contentAnimatedStyle,
		contentSize = 0,
		emptyElement,
		emptyList,
		id,
		interactionHandlers,
		itemElements,
		layoutType,
		loading,
		loadingElement,
		scrollEventThrottle = 30,
		status,
		testID,
		...containerProps
	}: RenderVirtualListProps<T>,
	ref: React.ForwardedRef<Animated.ScrollView>
) => {
	const {token} = useTheme()
	const {typographyClasses} = token.classes
	const {onLayout} = interactionHandlers
	const isContentVisible = !loading && !emptyList && typeof emptyList === 'boolean'
	const isEmptyContentVisible = !loading && emptyList && status === COMPONENT_STATUS.SUCCEEDED
	const {height = 0, width = 0} = containerLayout
	const isLayoutCompleted = height > 0 || width > 0
	const contentContainerStyle = useMemo(
		() =>
			({
				...(layoutType === LAYOUT.VERTICAL && {minHeight: platformValue(contentSize)}),
				...(layoutType === LAYOUT.HORIZONTAL && {minWidth: platformValue(contentSize)}),
				alignSelf: 'stretch',
				flex: 1
			}) as ViewStyle,
		[contentSize, layoutType]
	)

	const {entry, exit} = useMemo(
		() => ({
			entry: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
			exit: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE}
		}),
		[]
	)

	return (
		<View
			className='relative flex-1 self-stretch'
			onLayout={onLayout}
			testID={testID ?? `virtualList--${id}`}
		>
			{isLayoutCompleted && (
				<LayoutAnimated
					animatedType={LAYOUT_ANIMATED.FADE}
					className='absolute bottom-0 left-0 right-0 top-0'
					entry={entry}
					exit={exit}
					testID={`virtualList__contentLayout--${id}`}
					visible={isContentVisible}
				>
					<Animated.ScrollView
						{...containerProps}
						contentContainerStyle={contentContainerStyle}
						horizontal={layoutType === LAYOUT.HORIZONTAL}
						ref={ref}
						scrollEventThrottle={scrollEventThrottle}
						testID={`virtualList__animatedScrollView--${id}`}
					>
						<AnimatedView
							className='relative flex-1'
							style={contentAnimatedStyle}
							testID={`virtualList__animatedContent--${id}`}
						>
							{itemElements}
						</AnimatedView>
					</Animated.ScrollView>
				</LayoutAnimated>
			)}

			<LayoutAnimated
				animatedType={LAYOUT_ANIMATED.FADE}
				className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
				entry={entry}
				exit={exit}
				lazy={true}
				testID={`virtualList__emptyContentLayout--${id}`}
				visible={isEmptyContentVisible}
			>
				{emptyElement ?? (
					<Text
						className={typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.MEDIUM)({
							colorClasses: 'color-[--color-on-surface-variant]'
						})}
						testID={`virtualList__supportingText--${id}`}
					>
						No data
					</Text>
				)}
			</LayoutAnimated>

			<LayoutAnimated
				animatedType={LAYOUT_ANIMATED.FADE}
				className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
				entry={entry}
				exit={exit}
				lazy={true}
				testID={`virtualList__loadingContentLayout--${id}`}
				visible={loading}
			>
				{loadingElement ?
					cloneElement(loadingElement, {loading})
				:	<Text
						className={typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.MEDIUM)({
							colorClasses: 'color-[--color-on-surface-variant]'
						})}
						testID={`virtualList__supportingText--${id}`}
					>
						Loading
					</Text>
				}
			</LayoutAnimated>
		</View>
	)
}

export const RenderVirtualList = forwardRef(RenderVirtualListInner) as <T>(
	props: RenderVirtualListProps<T> & {ref?: Ref<ScrollView>}
) => ReturnType<typeof RenderVirtualListInner>
