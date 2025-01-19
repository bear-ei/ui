import {FC, forwardRef, isValidElement, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Divider} from '../../Divider'
import {Skeleton} from '../../Skeleton'
import {Touchable} from '../../Touchable'
import {ActiveAnimatedType, Underlay} from '../../Underlay'
import {ListAfterAffordance} from '../List-after-affordance/List-after-affordance.component'
import {ListItemBase} from './List-item-base.component'
import {handleListItemPropsEqual} from './List-item-handle'
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
        TrailingLayoutAnimated
} from './List-item.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedHeadlineText = Animated.createAnimatedComponent(HeadlineText)
const render = ({
        active,
        afterAffordanceShow,
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
        theme,
        trailingElement,
        trailingTriggerEvenName,
        trailingVisible,
        type,
        ...mainProps
}: RenderListItemProps) => {
        const activeColor = theme.token.scheme.secondaryContainer
        const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
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
                        shape={shape}
                        testID={testID ?? `listItem--${id}`}
                        type={type}
                >
                        <Skeleton
                                containerLayout='horizontal'
                                duration={skeletonDuration}
                                skeleton={skeletonDuration ? skeletonElement : undefined}
                                testID={`listItem__skeleton--${id}`}
                        >
                                {beforeAffordance && (
                                        <BeforeAffordanceContainer
                                                testID={`listItem__beforeAffordanceContainer--${id}`}
                                        >
                                                {beforeAffordance}
                                        </BeforeAffordanceContainer>
                                )}

                                <AnimatedContent
                                        accessibilityLabel={typeof headline === 'string' ? headline : 'headline'}
                                        accessibilityRole='list'
                                        style={[contentStyle, contentAnimatedStyle]}
                                        testID={`listItem__animatedContent--${id}`}
                                        type={type}
                                >
                                        <Touchable
                                                {...onStateEvent}
                                                disabled={disabled}
                                                enableTouchableRipple={true}
                                                ref={ref}
                                                testID={`listItem__touchable--${id}`}
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
                                                                        type={type}
                                                                        testID={`listItem__Leading--${id}`}
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
                                                                                        testID={`listItem__animatedHeadlineText--${id}`}
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
                                                                <TrailingLayoutAnimated
                                                                        defaultVisible={!trailingTriggerEvenName}
                                                                        supportingTextNumberOfLines={
                                                                                supportingTextNumberOfLines
                                                                        }
                                                                        testID={`listItem__trailingLayoutAnimated--${id}`}
                                                                        trailingShow={trailingShow}
                                                                        type={type}
                                                                        unmount={true}
                                                                        visible={trailingVisible}
                                                                >
                                                                        {trailingElement}
                                                                </TrailingLayoutAnimated>
                                                        )}
                                                </Main>
                                        </Touchable>

                                        {enableUnderlay && (
                                                <Underlay
                                                        {...underlayProps}
                                                        eventName={eventName}
                                                        testID={`listItem__underlay--${id}`}
                                                        underlayColor={underlayColor}
                                                />
                                        )}
                                </AnimatedContent>

                                {afterAffordance && afterAffordanceShow && (
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
                                                                testID={`listItem__listAfterAffordance--${id}`}
                                                        />
                                                :       afterAffordance}
                                        </AfterAffordanceContainer>
                                )}

                                {divider && (
                                        <DividerContainer testID={`listItem__dividerContainer--${id}`}>
                                                <Divider
                                                        layout='horizontal'
                                                        size='large'
                                                        testID={`listItem__divider--${id}`}
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
