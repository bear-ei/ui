import {FC, forwardRef, isValidElement, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Skeleton} from '../../Skeleton'
import {Touchable} from '../../Touchable'
import {ActiveAnimatedType, Underlay} from '../../Underlay'
import {ListAfterAffordance} from '../List-after-affordance/List-after-affordance.component'
import {ListItemBase, handleListItemPropsEqual} from './List-item-base.component'
import {ListItemProps, RenderListItemProps} from './List-item.interface'
import {
    BeforeAffordanceContainer,
    Container,
    Content,
    HeadlineText,
    Leading,
    ListAfterAffordanceContainer,
    Main,
    MainInner,
    SupportingText,
    Trailing
} from './List-item.style'

const AnimatedContent = Animated.createAnimatedComponent(Content)
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
    densityScale,
    disabled,
    enableUnderlay,
    enableUnderlayActive,
    eventName,
    headline,
    id,
    itemKey,
    itemShape,
    leading,
    minSkeletonDuration,
    onCancel,
    onConfirm,
    onStateEvent,
    panResponder,
    skeletonElement,
    supporting,
    supportingTextNumberOfLines,
    trailingElement,
    trailingTrigger,
    trailingVisible,
    type,
    underlayColor,
    ...mainProps
}: RenderListItemProps) => {
    const supportingTextShow = !!supporting
    const underlayProps = type &&
        ['select', 'multiselect'].includes(type) &&
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
            densityScale={densityScale}
            shape={itemShape}
            testID={`listItem--${id}`}
        >
            <Skeleton
                content={skeletonElement}
                duration={minSkeletonDuration}
            >
                {beforeAffordance && (
                    <BeforeAffordanceContainer testID={`listItem__beforeAffordanceContainer--${id}`}>
                        {beforeAffordance}
                    </BeforeAffordanceContainer>
                )}

                <AnimatedContent
                    style={[contentStyle, contentAnimatedStyle]}
                    testID={`listItem_content--${id}`}
                >
                    <Touchable
                        {...onStateEvent}
                        disabled={disabled}
                        enableTouchableRipple={type === 'standard' ? enableUnderlay : false}
                        horizontalStretch={true}
                        underlayColor={underlayColor}
                    >
                        <Main
                            {...mainProps}
                            densityScale={densityScale}
                            supportingTextNumberOfLines={supportingTextNumberOfLines}
                            supportingTextShow={supportingTextShow}
                            testID={`listItem__main--${id}`}
                        >
                            {leading && (
                                <Leading
                                    densityScale={densityScale}
                                    supportingTextNumberOfLines={supportingTextNumberOfLines}
                                    testID={`listItem__leading--${id}`}
                                >
                                    {leading}
                                </Leading>
                            )}

                            <MainInner
                                pointerEvents='none'
                                supportingTextShow={supportingTextShow}
                                testID={`listItem__mainInner--${id}`}
                            >
                                {headline &&
                                    (isValidElement(headline) ? headline : (
                                        <HeadlineText
                                            ellipsizeMode='tail'
                                            numberOfLines={1}
                                            size='large'
                                            testID={`listItem__headline--${id}`}
                                            type='body'
                                        >
                                            {headline}
                                        </HeadlineText>
                                    ))}

                                {supporting &&
                                    (isValidElement(supporting) ? supporting : (
                                        <SupportingText
                                            ellipsizeMode='tail'
                                            numberOfLines={supportingTextNumberOfLines}
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
                                    densityScale={densityScale}
                                    supportingTextNumberOfLines={supportingTextNumberOfLines}
                                    testID={`listItem__trailing--${id}`}
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
                                    shape={itemShape}
                                    underlayColor={underlayColor}
                                />
                            )}
                        </Main>
                    </Touchable>
                </AnimatedContent>

                {afterAffordance && (
                    <ListAfterAffordanceContainer testID={`listItem__afterAffordanceContainer--${id}`}>
                        {typeof afterAffordance === 'boolean' ?
                            <ListAfterAffordance
                                itemKey={itemKey}
                                onCancel={onCancel}
                                onConfirm={onConfirm}
                                primaryButtonProps={afterAffordancePrimaryButtonProps}
                                secondaryButtonProps={afterAffordanceSecondaryButtonProps}
                                visible={afterAffordanceVisible}
                            />
                        :   afterAffordance}
                    </ListAfterAffordanceContainer>
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
