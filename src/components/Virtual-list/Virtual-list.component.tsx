import {SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {ForwardedRef} from 'react'
import {forwardRef} from 'react'
import type {ViewStyle} from 'react-native'
import {ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import {VirtualListBase} from './Virtual-list-base.component'
import type {RenderVirtualListProps, VirtualListProps} from './Virtual-list.interface'
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
const renderVirtualList = <T,>({
	contentAnimatedStyle,
	contentSize,
	emptyComponent,
	emptyList,
	id,
	interactionHandlers,
	itemElements,
	layout,
	loading,
	loadingComponent,
	scrollEventThrottle = 50,
	status,
	testID,
	...containerProps
}: RenderVirtualListProps<T>) => {
	const {onLayout} = interactionHandlers
	const contentLayoutAnimatedStyle = {position: 'relative'} as ViewStyle
	const isContentVisible = !loading && !emptyList && typeof emptyList === 'boolean'
	const isEmptyContentVisible = !loading && emptyList && status === 'succeeded'
	const isLayoutCompleted = typeof layout?.height === 'number' && layout.height > 0
	const isLoadingVisible = loading
	const scrollViewContentStyle = {flex: 1, alignSelf: 'stretch', minHeight: contentSize} as ViewStyle
	const emptyContentLayoutAnimatedStyle = {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	} as ViewStyle

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
							contentStyle={contentLayoutAnimatedStyle}
							testID={`virtualList__contentLayout--${id}`}
							visible={isContentVisible}
						>
							{itemElements}
						</ContentLayout>

						<EmptyContentLayout
							contentStyle={emptyContentLayoutAnimatedStyle}
							lazy={true}
							testID={`virtualList__emptyContentLayout--${id}`}
							unmount={true}
							visible={isEmptyContentVisible}
						>
							{emptyComponent ?? (
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
							contentStyle={emptyContentLayoutAnimatedStyle}
							lazy={true}
							testID={`virtualList__loadingContentLayout--${id}`}
							unmount={true}
							visible={isLoadingVisible}
						>
							{loadingComponent ?? (
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

const VirtualListInner = <T,>(props: VirtualListProps<T>, ref: ForwardedRef<Animated.ScrollView>) => (
	<VirtualListBase
		{...props}
		ref={ref}
		renderVirtualList={renderVirtualList}
	/>
)

const VirtualListWithRef = forwardRef(VirtualListInner) as <T>(
	props: VirtualListProps<T> & {ref?: ForwardedRef<Animated.ScrollView>}
) => ReturnType<typeof VirtualListInner>

export const VirtualList = VirtualListWithRef
