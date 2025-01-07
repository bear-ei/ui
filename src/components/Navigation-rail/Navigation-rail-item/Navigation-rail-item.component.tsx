import {FC, forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Underlay} from '../../Underlay'
import {NavigationRailItemBase} from './Navigation-rail-item-base.component'
import {handleNavigationRailItemPropsEqual} from './Navigation-rail-item-handle'
import {NavigationRailItemProps, RenderNavigationRailItemProps} from './Navigation-rail-item.interface'
import {Container, Header, Icon, IconContainer, Label, LabelText, TouchableContent} from './Navigation-rail-item.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
        active,
        activeIconElement,
        eventName,
        iconElement,
        id,
        labelText,
        labelTextAnimatedStyle,
        onStateEvent,
        ref,
        testID,
        theme,
        type,
        ...containerProps
}: RenderNavigationRailItemProps) => {
        const activeColor = theme.token.scheme.secondaryContainer
        const underlayColor = theme.token.scheme.onSurface

        return (
                <Container
                        {...containerProps}
                        accessibilityLabel={labelText}
                        accessibilityRole='tab'
                        testID={testID ?? `navigationRailItem--${id}`}
                >
                        <TouchableContent
                                {...onStateEvent}
                                enableFocusRing={false}
                                ref={ref}
                                testID={`navigationRailItem__content--${id}`}
                        >
                                <Header
                                        pointerEvents='none'
                                        testID={`navigationRailItem__header--${id}`}
                                        type={type}
                                >
                                        <IconContainer testID={`navigationRailItem__iconContainer--${id}`}>
                                                <Icon
                                                        hidden={false}
                                                        testID={`navigationRailItem__icon--${id}`}
                                                        visible={!active}
                                                >
                                                        {iconElement}
                                                </Icon>

                                                <Icon
                                                        hidden={false}
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
                                                testID={`navigationRailItem__underlay--${id}`}
                                                underlayColor={underlayColor}
                                        />
                                </Header>

                                {type === 'segment' && (
                                        <Label
                                                animatedType='collapseY'
                                                hidden={false}
                                                pointerEvents='none'
                                                scale={false}
                                                testID={`navigationRailItem__label--${id}`}
                                                visible={active}
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
                                        </Label>
                                )}
                        </TouchableContent>
                </Container>
        )
}

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
