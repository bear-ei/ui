import {SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {cloneElement, forwardRef, useMemo, type ForwardedRef} from 'react'
import type {ViewStyle} from 'react-native'
import {ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import {COMPONENT_STATUS, LAYOUT} from '../Common'
import {VirtualListItem, type RenderVirtualListItemInfo} from './Virtual-list-item'
import type {RenderVirtualListItemOptions, RenderVirtualListProps} from './Virtual-list.interface'
import {
	Container,
	Content,
	ContentLayout,
	EmptyContentLayout,
	LoadingContentLayout,
	SupportingText
} from './Virtual-list.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
export const RenderVirtualListItem = <T,>({
	data,
	id,
	onLoadEnd,
	renderItem,
	startIndex = 0,
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
					index={index}
					item={item as Record<string, unknown>}
					key={`${((item as Record<string, unknown>)?.indexKey as string) ?? index}`}
					onLoadEnd={onLoadEnd}
					startIndex={startIndex}
					testID={`virtualList__virtualListItem--${id}`}
					renderItem={
						renderItem as (
							options: RenderVirtualListItemInfo<Record<string, unknown>>
						) => React.JSX.Element
					}
				/>
			))}
		</>
	)
}

export const RenderVirtualListInner = <T,>(
	{
		contentAnimatedStyle,
		contentSize,
		emptyElement,
		emptyList,
		id,
		interactionHandlers,
		itemElements,
		containerLayout,
		loading,
		loadingElement,
		scrollEventThrottle = 50,
		status,
		testID,
		layout,
		...containerProps
	}: RenderVirtualListProps<T>,
	ref: React.ForwardedRef<ScrollView>
) => {
	const {onLayout} = interactionHandlers
	const isContentVisible = !loading && !emptyList && typeof emptyList === 'boolean'
	const isEmptyContentVisible = !loading && emptyList && status === COMPONENT_STATUS.SUCCEEDED
	const isLayoutCompleted =
		typeof containerLayout?.height === 'number' && (containerLayout.height > 0 || containerLayout.width > 0)

	const scrollViewContentStyle = useMemo(
		() =>
			({
				...(layout === LAYOUT.VERTICAL && {minHeight: contentSize}),
				...(layout === LAYOUT.HORIZONTAL && {minWidth: contentSize}),
				alignSelf: 'stretch',
				flex: 1
			}) as ViewStyle,
		[contentSize, layout]
	)

	return (
		<Container
			testID={testID ?? `virtualList--${id}`}
			onLayout={onLayout}
		>
			{isLayoutCompleted && (
				<ContentLayout
					testID={`virtualList__contentLayout--${id}`}
					visible={isContentVisible}
				>
					<AnimatedScrollView
						{...containerProps}
						contentContainerStyle={scrollViewContentStyle}
						horizontal={layout === LAYOUT.HORIZONTAL}
						ref={ref}
						scrollEventThrottle={scrollEventThrottle}
						testID={`virtualList__animatedScrollView--${id}`}
					>
						<AnimatedContent
							style={contentAnimatedStyle}
							testID={`virtualList__animatedContent--${id}`}
						>
							{itemElements}
						</AnimatedContent>
					</AnimatedScrollView>
				</ContentLayout>
			)}

			<EmptyContentLayout
				lazy={true}
				testID={`virtualList__emptyContentLayout--${id}`}
				visible={isEmptyContentVisible}
			>
				{emptyElement ?? (
					<SupportingText
						size={SIZE.MEDIUM}
						testID={`virtualList__supportingText--${id}`}
						type={TYPOGRAPHY.BODY}
					>
						No data
					</SupportingText>
				)}
			</EmptyContentLayout>

			<LoadingContentLayout
				lazy={true}
				testID={`virtualList__loadingContentLayout--${id}`}
				visible={loading}
			>
				{loadingElement ?
					cloneElement(loadingElement, {loading})
				:	<SupportingText
						size={SIZE.MEDIUM}
						testID={`virtualList__supportingText--${id}`}
						type={TYPOGRAPHY.BODY}
					>
						Loading
					</SupportingText>
				}
			</LoadingContentLayout>
		</Container>
	)
}

export const RenderVirtualList = forwardRef(RenderVirtualListInner) as <T>(
	props: RenderVirtualListProps<T> & {ref?: ForwardedRef<ScrollView>}
) => ReturnType<typeof RenderVirtualListInner>
