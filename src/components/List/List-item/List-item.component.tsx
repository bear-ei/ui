import {FC, forwardRef, isValidElement, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Divider} from '../../Divider'
import {Skeleton} from '../../Skeleton'
import {Touchable} from '../../Touchable'
import {ActiveAnimatedType, Underlay} from '../../Underlay'
import {ListAfterAffordance} from '../List-after-affordance/List-after-affordance.component'
import {handleListItemPropsEqual, ListItemBase} from './List-item-base.component'
import {ListItemProps, RenderListItemProps} from './List-item.interface'
import {
        AfterAffordanceContainer,
        BeforeAffordanceContainer,
        Container,
        Content,
        DividerContainer,
        HeadlineText,
        Leading,
        Main,
        MainInner,
        SupportingText,
        Trailing
} from './List-item.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedHeadlineText = Animated.createAnimatedComponent(HeadlineText)
const render = ({
        active,
        activeColor,
        afterAffordance,
        afterAffordancePrimaryButtonProps,
        afterAffordanceSecondaryButtonProps,
        afterAffordanceVisible,
        beforeAffordance,
        contentAnimatedStyle,
        contentStyle,
        disabled,
        divider,
        enableUnderlay,
        enableUnderlayActive,
        eventName,
        headline,
        headlineTextAnimatedStyle,
        id,
        itemKey,
        leadingElement,
        onCancel,
        onConfirm,
        onStateEvent,
        panResponder,
        ref,
        selectType,
        shape,
        skeletonDuration,
        skeletonElement,
        supporting,
        supportingTextNumberOfLines,
        testID,
        trailingElement,
        trailingTrigger,
        trailingVisible,
        type,
        underlayColor,
        ...mainProps
}: RenderListItemProps) => {
        const supportingTextShow = !!supporting
        const trailingShow = !!trailingElement
        const underlayProps = selectType &&
                ['select', 'multiselect'].includes(selectType) &&
                enableUnderlayActive && {
                        active,
                        activeAnimatedType: 'fade' as ActiveAnimatedType,
                        activeColor
                }

        return (
                <Container
                        {...panResponder?.panHandlers}
                        accessibilityLabel={typeof headline === 'string' ? headline : 'headline'}
                        accessibilityRole='list'
                        shape={shape}
                        testID={testID ?? `listItem--${id}`}
                        type={type}
                >
                        <Skeleton
                                containerLayout='horizontal'
                                content={skeletonDuration ? skeletonElement : undefined}
                                duration={skeletonDuration}
                        >
                                {beforeAffordance && (
                                        <BeforeAffordanceContainer
                                                testID={`listItem__beforeAffordanceContainer--${id}`}
                                        >
                                                {beforeAffordance}
                                        </BeforeAffordanceContainer>
                                )}

                                <AnimatedContent
                                        style={[contentStyle, contentAnimatedStyle]}
                                        testID={`listItem_content--${id}`}
                                        type={type}
                                >
                                        <Touchable
                                                {...onStateEvent}
                                                disabled={disabled}
                                                enableTouchableRipple={!enableUnderlayActive ? enableUnderlay : false}
                                                ref={ref}
                                                underlayColor={underlayColor}
                                        >
                                                <Main
                                                        {...mainProps}
                                                        supportingTextNumberOfLines={supportingTextNumberOfLines}
                                                        supportingTextShow={supportingTextShow}
                                                        testID={`listItem__main--${id}`}
                                                        type={type}
                                                >
                                                        {leadingElement && (
                                                                <Leading
                                                                        supportingTextNumberOfLines={
                                                                                supportingTextNumberOfLines
                                                                        }
                                                                        testID={`listItem__leading--${id}`}
                                                                        type={type}
                                                                >
                                                                        {leadingElement}
                                                                </Leading>
                                                        )}

                                                        <MainInner
                                                                leadingShow={!!leadingElement}
                                                                pointerEvents='none'
                                                                supportingTextShow={supportingTextShow}
                                                                testID={`listItem__mainInner--${id}`}
                                                                trailingShow={trailingShow}
                                                                type={type}
                                                        >
                                                                {headline &&
                                                                        (isValidElement(headline) ? headline : (
                                                                                <AnimatedHeadlineText
                                                                                        ellipsizeMode='tail'
                                                                                        numberOfLines={1}
                                                                                        size='large'
                                                                                        style={[
                                                                                                headlineTextAnimatedStyle
                                                                                        ]}
                                                                                        testID={`listItem__headline--${id}`}
                                                                                        type='body'
                                                                                >
                                                                                        {headline}
                                                                                </AnimatedHeadlineText>
                                                                        ))}

                                                                {supporting &&
                                                                        (isValidElement(supporting) ? supporting : (
                                                                                <SupportingText
                                                                                        ellipsizeMode='tail'
                                                                                        numberOfLines={
                                                                                                supportingTextNumberOfLines
                                                                                        }
                                                                                        size='medium'
                                                                                        testID={`listItem__supportingText--${id}`}
                                                                                        type='body'
                                                                                >
                                                                                        {supporting}
                                                                                </SupportingText>
                                                                        ))}
                                                        </MainInner>

                                                        {trailingElement && (
                                                                <Trailing
                                                                        defaultVisible={!trailingTrigger}
                                                                        supportingTextNumberOfLines={
                                                                                supportingTextNumberOfLines
                                                                        }
                                                                        testID={`listItem__trailing--${id}`}
                                                                        trailingShow={trailingShow}
                                                                        type={type}
                                                                        unmount={true}
                                                                        visible={trailingVisible}
                                                                >
                                                                        {trailingElement}
                                                                </Trailing>
                                                        )}

                                                        {enableUnderlay && (
                                                                <Underlay
                                                                        {...underlayProps}
                                                                        activeAnimatedType='scaleX'
                                                                        eventName={eventName}
                                                                        underlayColor={underlayColor}
                                                                />
                                                        )}
                                                </Main>
                                        </Touchable>
                                </AnimatedContent>

                                {afterAffordance && (
                                        <AfterAffordanceContainer testID={`listItem__afterAffordanceContainer--${id}`}>
                                                {typeof afterAffordance === 'boolean' ?
                                                        <ListAfterAffordance
                                                                itemKey={itemKey}
                                                                onCancel={onCancel}
                                                                onConfirm={onConfirm}
                                                                primaryButtonProps={afterAffordancePrimaryButtonProps}
                                                                secondaryButtonProps={
                                                                        afterAffordanceSecondaryButtonProps
                                                                }
                                                                visible={afterAffordanceVisible}
                                                        />
                                                :       afterAffordance}
                                        </AfterAffordanceContainer>
                                )}

                                {divider && (
                                        <DividerContainer testID={`listItem__divider--${id}`}>
                                                <Divider
                                                        layout='horizontal'
                                                        size='large'
                                                />
                                        </DividerContainer>
                                )}
                        </Skeleton>
                </Container>
        )
}

const ForwardRefListItem = forwardRef<View, ListItemProps>((props, ref) => (
        <ListItemBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const ListItem = memo(ForwardRefListItem, (prevProps, nextProps) =>
        handleListItemPropsEqual(prevProps)(nextProps)
) as FC<ListItemProps>
