import {FC, forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Underlay} from '../../Underlay'
import {NavigationDrawerItemBase, handleNavigationDrawerItemPropsEqual} from './Navigation-drawer-item-base.component'
import {NavigationDrawerItemProps, RenderNavigationDrawerItemProps} from './Navigation-drawer-item.interface'
import {
        Container,
        Content,
        Icon,
        IconContainer,
        Label,
        LabelText,
        TouchableContent
} from './Navigation-drawer-item.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
        active,
        activeColor,
        activeIconElement,
        eventName,
        iconElement,
        id,
        labelText,
        labelTextAnimatedStyle,
        onStateEvent,
        underlayColor,
        ...containerProps
}: RenderNavigationDrawerItemProps) => (
        <Container
                {...containerProps}
                accessibilityLabel={labelText}
                accessibilityRole='tab'
                testID={`navigationDrawerItem--${id}`}
        >
                <TouchableContent
                        {...onStateEvent}
                        testID={`navigationDrawerItem__content--${id}`}
                >
                        <Content testID={`navigationDrawerItem__content--${id}`}>
                                <IconContainer testID={`navigationDrawerItem__iconContainer--${id}`}>
                                        <Icon
                                                testID={`navigationDrawerItem__icon--${id}`}
                                                visible={!active}
                                        >
                                                {iconElement}
                                        </Icon>

                                        <Icon
                                                testID={`navigationDrawerItem__icon--${id}`}
                                                visible={active}
                                        >
                                                {activeIconElement}
                                        </Icon>
                                </IconContainer>

                                <Label>
                                        <AnimatedLabelText
                                                active={active}
                                                ellipsizeMode='tail'
                                                numberOfLines={1}
                                                size='large'
                                                style={[labelTextAnimatedStyle]}
                                                testID={`navigationDrawerItem__labelText--${id}`}
                                                type='label'
                                        >
                                                {labelText}
                                        </AnimatedLabelText>
                                </Label>

                                <Underlay
                                        active={active}
                                        activeAnimatedType='scaleX'
                                        activeColor={activeColor}
                                        activeShape='full'
                                        eventName={eventName}
                                        shape='full'
                                        underlayColor={underlayColor}
                                />
                        </Content>
                </TouchableContent>
        </Container>
)

const ForwardRefNavigationDrawerItem = forwardRef<View, NavigationDrawerItemProps>((props, ref) => (
        <NavigationDrawerItemBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const NavigationDrawerItem = memo(ForwardRefNavigationDrawerItem, (prevProps, nextProps) =>
        handleNavigationDrawerItemPropsEqual(prevProps)(nextProps)
) as FC<NavigationDrawerItemProps>
