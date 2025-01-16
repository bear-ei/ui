import {FC, forwardRef, isValidElement, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ShapeType} from '../../Common'
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
        trailingElement,
        trailingTriggerEvenName,
        trailingVisible,
        type,
        theme,
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
                        activeAnimatedType: 'scaleX' as ActiveAnimatedType,
                        activeColor,
                        activeShape: 'full' as ShapeType
                }

        return (
                <Container
                        {...panResponder?.panHandlers}
                        shape={shape}
                        type={type}
                >
                        <Skeleton
                                containerLayout='horizontal'
                                duration={skeletonDuration}
                                skeleton={skeletonDuration ? skeletonElement : undefined}
                        >
                                {beforeAffordance && (
                                        <BeforeAffordanceContainer>{beforeAffordance}</BeforeAffordanceContainer>
                                )}

                                <AnimatedContent
                                        accessibilityLabel={typeof headline === 'string' ? headline : 'headline'}
                                        accessibilityRole='list'
                                        style={[contentStyle, contentAnimatedStyle]}
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
                                                        type={type}
                                                >
                                                        {leadingElement && (
                                                                <Leading
                                                                        supportingTextNumberOfLines={
                                                                                supportingTextNumberOfLines
                                                                        }
                                                                        type={type}
                                                                >
                                                                        {leadingElement}
                                                                </Leading>
                                                        )}

                                                        <MainInner
                                                                leadingShow={!!leadingElement}
                                                                pointerEvents='none'
                                                                supportingTextShow={supportingTextShow}
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
                                                                        trailingShow={trailingShow}
                                                                        type={type}
                                                                        unmount={true}
                                                                        visible={trailingVisible}
                                                                >
                                                                        {trailingElement}
                                                                </TrailingLayoutAnimated>
                                                        )}

                                                        {enableUnderlay && (
                                                                <Underlay
                                                                        {...underlayProps}
                                                                        eventName={eventName}
                                                                        underlayColor={underlayColor}
                                                                />
                                                        )}
                                                </Main>
                                        </Touchable>
                                </AnimatedContent>

                                {afterAffordance && (
                                        <AfterAffordanceContainer>
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
                                        <DividerContainer>
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
