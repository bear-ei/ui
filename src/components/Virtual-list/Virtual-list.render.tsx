import {cloneElement, type FC} from 'react'
import {Text, View, type ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'

import type {RenderVirtualListItemsProps, RenderVirtualListProps} from './Virtual-list.interface'

import {COMPONENT_STATUS, ORIENTATION} from '../../constants'
import {useTheme} from '../../hooks'
import {ENTRY_EXIT, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'
import {toPlatformUnit} from '../../utils'
import {AnimatedView} from '../Animated'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../Layout-animated'
import {VirtualListItem} from './Virtual-list-item'

export const RenderVirtualListItems = ({
	containerLayout,
	data,
	draggable,
	id,
	onLoadEnd,
	renderItem,
	...virtualListItemProps
}: RenderVirtualListItemsProps) => {
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
					key={item.itemKey}
					renderItem={renderItem}
					testID={`virtualList__virtualListItem--${id}`}
				/>
			))}
		</>
	)
}

export const RenderVirtualList: FC<RenderVirtualListProps> = ({
	containerLayout,
	contentAnimatedStyle,
	contentSize = 0,
	emptyElement,
	emptyList,
	id,
	interactionHandlers,
	itemElements,
	loading,
	loadingElement,
	orientation,
	scrollEventThrottle = 30,
	status,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {typographyClasses} = token.classes
	const typographyBodyClasses = typographyClasses(TYPOGRAPHY.BODY, {
		colorClasses: 'color-[--color-on-surface-variant]'
	})

	const {onLayout} = interactionHandlers
	const isContentVisible = !loading && !emptyList && typeof emptyList === 'boolean'
	const isEmptyContentVisible = !loading && emptyList && status === COMPONENT_STATUS.SUCCEEDED
	const {height = 0, width = 0} = containerLayout
	const isLayoutCompleted = height > 0 || width > 0
	const contentContainerStyle = {
		...(orientation === ORIENTATION.VERTICAL && {minHeight: toPlatformUnit(contentSize)}),
		...(orientation === ORIENTATION.HORIZONTAL && {minWidth: toPlatformUnit(contentSize)}),
		alignSelf: 'stretch',
		flex: 1
	} as ViewStyle

	const {entry, exit} = ENTRY_EXIT.SHORT

	return (
		<View
			className='relative flex-1 self-stretch'
			onLayout={onLayout}
			testID={testID ?? `virtualList--${id}`}
		>
			{isLayoutCompleted && (
				<LayoutAnimated
					animation={LAYOUT_ANIMATION.FADE}
					className='absolute bottom-0 left-0 right-0 top-0'
					entry={entry}
					exit={exit}
					testID={`virtualList__contentLayout--${id}`}
					visible={isContentVisible}
				>
					<Animated.ScrollView
						{...containerProps}
						contentContainerStyle={contentContainerStyle}
						horizontal={orientation === ORIENTATION.HORIZONTAL}
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
				animation={LAYOUT_ANIMATION.FADE}
				className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
				entry={entry}
				exit={exit}
				lazyMount={true}
				testID={`virtualList__emptyContentLayout--${id}`}
				visible={isEmptyContentVisible}
			>
				{emptyElement ?? (
					<Text
						className={typographyBodyClasses(TYPOGRAPHY_SIZE.MEDIUM)}
						testID={`virtualList__supportingText--${id}`}
					>
						No data
					</Text>
				)}
			</LayoutAnimated>

			<LayoutAnimated
				animation={LAYOUT_ANIMATION.FADE}
				className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
				entry={entry}
				exit={exit}
				lazyMount={true}
				testID={`virtualList__loadingContentLayout--${id}`}
				visible={loading}
			>
				{loadingElement ?
					cloneElement(loadingElement, {loading})
				:	<Text
						className={typographyBodyClasses(TYPOGRAPHY_SIZE.MEDIUM)}
						testID={`virtualList__supportingText--${id}`}
					>
						Loading
					</Text>
				}
			</LayoutAnimated>
		</View>
	)
}
