import {Layout, Size, TypographyType} from '@bearei/material-token'
import {FC, forwardRef, isValidElement, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Divider} from '../../Divider'
import {Skeleton} from '../../Skeleton'
import {Touchable} from '../../Touchable'
import {ActiveAnimatedType, Underlay} from '../../Underlay'
import {ListAfterAffordance} from '../List-after-affordance'
import {ListType, SelectType} from '../List.enum'
import {ListItemBase} from './List-item-base.component'
import {handleListItemPropsEqual} from './List-item-handle'
import {ListItemProps, RenderListItemProps} from './List-item.interface'
import {
        AfterAffordanceLayout,
        BeforeAffordanceLayout,
        Container,
        Content,
        DividerLayout,
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
        affordanceShow,
        afterAffordance,
        afterAffordancePrimaryButtonProps,
        afterAffordanceSecondaryButtonProps,
        afterAffordanceVisible,
        beforeAffordance,
        contentAnimatedStyle,
        contentStyle,
        densityScale,
        disabled,
        divider,
        enableUnderlay,
        enableUnderlayActive,
        eventName,
        headline,
        headlineTextAnimatedStyle,
        id,
        indexKey,
        leadingElement,
        onCancel,
        onConfirm,
        panResponder,
        ref,
        selectType,
        shape,
        skeletonDuration = 150,
        skeletonElement,
        stateOnEvent,
        supporting,
        supportingTextNumberOfLines,
        testID,
        theme,
        trailingElement,
        trailingTriggerEvenName,
        trailingVisible,
        type = ListType.STANDARD,
        ...mainProps
}: RenderListItemProps) => {
        const activeColor = theme.token.scheme.secondaryContainer
        const density = densityScale ?? theme.densityScale
        const designDensity = density * theme.token.spacing.extraSmall
        const supportingTextShow = !!supporting
        const trailingShow = !!trailingElement
        const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
        const underlayProps = selectType &&
                [SelectType.SINGLE, SelectType.MULTIPLE].includes(selectType) &&
                enableUnderlayActive && {
                        active,
                        activeAnimatedType: 'fade' as ActiveAnimatedType,
                        activeColor
                }

        const contentSize = {
                [ListType.MENU]: {height: theme.adaptSize(theme.token.spacing.extraSmall * 12 + designDensity)},
                [ListType.STANDARD]: {height: theme.adaptSize(theme.token.spacing.extraSmall * 14 + designDensity)}
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
                                contentSize={contentSize[type]}
                                duration={skeletonDuration}
                                skeleton={skeletonDuration ? skeletonElement : undefined}
                                testID={`listItem__skeleton--${id}`}
                        >
                                {beforeAffordance && (
                                        <BeforeAffordanceLayout testID={`listItem__beforeAffordanceContainer--${id}`}>
                                                {beforeAffordance}
                                        </BeforeAffordanceLayout>
                                )}

                                <AnimatedContent
                                        accessibilityLabel={typeof headline === 'string' ? headline : 'headline'}
                                        accessibilityRole='list'
                                        style={[contentStyle, contentAnimatedStyle]}
                                        testID={`listItem__animatedContent--${id}`}
                                        type={type}
                                >
                                        <Touchable
                                                {...stateOnEvent}
                                                disabled={disabled}
                                                enableTouchableRipple={true}
                                                ref={ref}
                                                testID={`listItem__touchable--${id}`}
                                                underlayColor={underlayColor}
                                        >
                                                <Main
                                                        {...mainProps}
                                                        densityScale={densityScale}
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
                                                                                        size={Size.LARGE}
                                                                                        style={[
                                                                                                headlineTextAnimatedStyle
                                                                                        ]}
                                                                                        testID={`listItem__animatedHeadlineText--${id}`}
                                                                                        type={TypographyType.BODY}
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
                                                                                        size={Size.MEDIUM}
                                                                                        testID={`listItem__supportingText--${id}`}
                                                                                        type={TypographyType.BODY}
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

                                {afterAffordance && affordanceShow && (
                                        <AfterAffordanceLayout testID={`listItem__afterAffordanceLayout--${id}`}>
                                                {typeof afterAffordance === 'boolean' ?
                                                        <ListAfterAffordance
                                                                indexKey={indexKey}
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
                                        </AfterAffordanceLayout>
                                )}

                                {divider && (
                                        <DividerLayout testID={`listItem__dividerLayout--${id}`}>
                                                <Divider
                                                        layout={Layout.HORIZONTAL}
                                                        size={Size.LARGE}
                                                        testID={`listItem__divider--${id}`}
                                                />
                                        </DividerLayout>
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
