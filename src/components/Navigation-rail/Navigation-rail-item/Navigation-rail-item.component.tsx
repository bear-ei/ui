import {FC, forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Underlay} from '../../Underlay'
import {NavigationRailItemBase, handleNavigationRailItemPropsEqual} from './Navigation-rail-item-base.component'
import {NavigationRailItemProps, RenderNavigationRailItemProps} from './Navigation-rail-item.interface'
import {Container, Header, Icon, IconContainer, Label, LabelText, TouchableContent} from './Navigation-rail-item.styles'

const AnimatedLabel = Animated.createAnimatedComponent(Label)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
    active,
    activeColor,
    activeIconElement,
    eventName,
    iconElement,
    id,
    labelAnimatedStyle,
    labelText,
    labelTextAnimatedStyle,
    onStateEvent,
    type,
    underlayColor,
    ...containerProps
}: RenderNavigationRailItemProps) => (
    <Container
        {...containerProps}
        accessibilityLabel={labelText}
        accessibilityRole='tab'
        testID={`navigationRailItem--${id}`}
    >
        <TouchableContent
            {...onStateEvent}
            testID={`navigationRailItem__content--${id}`}
        >
            <Header
                testID={`navigationRailItem__header--${id}`}
                type={type}
            >
                <IconContainer testID={`navigationRailItem__iconContainer--${id}`}>
                    <Icon
                        testID={`navigationRailItem__icon--${id}`}
                        visible={!active}
                    >
                        {iconElement}
                    </Icon>

                    <Icon
                        testID={`navigationRailItem__icon--${id}`}
                        visible={active}
                    >
                        {activeIconElement}
                    </Icon>
                </IconContainer>

                <Underlay
                    active={active}
                    activeAnimatedType={type === 'block' ? 'scale' : 'scaleX'}
                    activeColor={activeColor}
                    activeShape='full'
                    eventName={eventName}
                    shape={type === 'block' ? 'full' : 'large'}
                    underlayColor={underlayColor}
                />
            </Header>

            {type === 'segment' && (
                <AnimatedLabel
                    style={[labelAnimatedStyle]}
                    testID={`navigationRailItem__label--${id}`}
                >
                    <AnimatedLabelText
                        active={active}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        size='medium'
                        style={[labelTextAnimatedStyle]}
                        testID={`navigationRailItem__labelText--${id}`}
                        type='label'
                    >
                        {labelText}
                    </AnimatedLabelText>
                </AnimatedLabel>
            )}
        </TouchableContent>
    </Container>
)

const ForwardRefNavigationRailItem = forwardRef<View, NavigationRailItemProps>((props, ref) => (
    <NavigationRailItemBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const NavigationRailItem = memo(ForwardRefNavigationRailItem, (prevProps, nextProps) =>
    handleNavigationRailItemPropsEqual(prevProps)(nextProps)
) as FC<NavigationRailItemProps>
