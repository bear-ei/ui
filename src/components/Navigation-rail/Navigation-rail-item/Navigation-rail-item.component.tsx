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
        animatedType,
        eventName,
        iconElement,
        labelText,
        labelTextAnimatedStyle,
        onStateEvent,
        ref,
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
                >
                        <TouchableContent
                                {...onStateEvent}
                                enableFocusRing={false}
                                ref={ref}
                        >
                                <Header
                                        pointerEvents='none'
                                        type={type}
                                >
                                        <IconContainer>
                                                <Icon
                                                        hidden={false}
                                                        visible={!active}
                                                >
                                                        {iconElement}
                                                </Icon>

                                                <Icon
                                                        hidden={false}
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
                                        <Label
                                                animatedType='collapseY'
                                                pointerEvents='none'
                                                scale={false}
                                                visible={animatedType === 'collapse' ? active : true}
                                        >
                                                <AnimatedLabelText
                                                        active={active}
                                                        ellipsizeMode='tail'
                                                        numberOfLines={1}
                                                        size='medium'
                                                        style={[labelTextAnimatedStyle]}
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
