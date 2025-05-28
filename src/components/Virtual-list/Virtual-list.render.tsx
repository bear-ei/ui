import {SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {ViewStyle} from 'react-native'
import {ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import {COMPONENT_STATUS} from '../Common'
import {VirtualListItem, type RenderVirtualListItemInfo} from './Virtual-list-item'
import type {RenderVirtualListItemOptions, RenderVirtualListProps, VirtualListData} from './Virtual-list.interface'
import {
	Container,
	Content,
	ContentLayout,
	EmptyContentLayout,
	LoadingContentLayout,
	SupportingText
} from './Virtual-list.styles'

export const renderVirtualListItem =
	<T,>({onLoadEnd, renderItem, startIndex = 0, id, ...virtualListItemProps}: RenderVirtualListItemOptions<T>) =>
	(data?: VirtualListData[]) => {
		if (data?.length === 0) {
			onLoadEnd?.()

			return
		}

		return data?.map((item, index) => (
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
		))
	}

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
export const renderVirtualList = <T,>({
	contentAnimatedStyle,
	contentSize,
	emptyElement,
	emptyList,
	id,
	interactionHandlers,
	itemElements,
	layout,
	loading,
	loadingElement,
	scrollEventThrottle = 50,
	status,
	testID,
	...containerProps
}: RenderVirtualListProps<T>) => {
	const {onLayout} = interactionHandlers
	const contentLayoutAnimatedStyle = {position: 'relative'} as ViewStyle
	const isContentVisible = !loading && !emptyList && typeof emptyList === 'boolean'
	const isEmptyContentVisible = !loading && emptyList && status === COMPONENT_STATUS.SUCCEEDED
	const isLayoutCompleted = typeof layout?.height === 'number' && layout.height > 0
	const isLoadingVisible = loading
	const scrollViewContentStyle = {flex: 1, alignSelf: 'stretch', minHeight: contentSize} as ViewStyle
	const emptyContentLayoutAnimatedStyle = {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	} as ViewStyle

	const layoutAnimatedContentSize = {height: layout.height, width: layout.width}

	return (
		<Container
			testID={testID ?? `virtualList--${id}`}
			onLayout={onLayout}
		>
			{isLayoutCompleted && (
				<AnimatedScrollView
					{...containerProps}
					contentContainerStyle={scrollViewContentStyle}
					scrollEventThrottle={scrollEventThrottle}
					testID={`virtualList__animatedScrollView--${id}`}
				>
					<AnimatedContent
						style={contentAnimatedStyle}
						testID={`virtualList__animatedContent--${id}`}
					>
						<ContentLayout
							contentSize={layoutAnimatedContentSize}
							contentStyle={contentLayoutAnimatedStyle}
							testID={`virtualList__contentLayout--${id}`}
							visible={isContentVisible}
						>
							{itemElements}
						</ContentLayout>

						<EmptyContentLayout
							contentSize={layoutAnimatedContentSize}
							contentStyle={emptyContentLayoutAnimatedStyle}
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
							contentSize={layoutAnimatedContentSize}
							contentStyle={emptyContentLayoutAnimatedStyle}
							testID={`virtualList__loadingContentLayout--${id}`}
							visible={isLoadingVisible}
						>
							{loadingElement ?? (
								<SupportingText
									size={SIZE.MEDIUM}
									testID={`virtualList__supportingText--${id}`}
									type={TYPOGRAPHY.BODY}
								>
									Loading
								</SupportingText>
							)}
						</LoadingContentLayout>
					</AnimatedContent>
				</AnimatedScrollView>
			)}
		</Container>
	)
}
