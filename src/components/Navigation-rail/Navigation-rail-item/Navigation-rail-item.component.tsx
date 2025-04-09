import {ShapeType, Size, TypographyType} from '@bearei/material-token'
import {FC, forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimatedType} from '../../Layout-animated'
import {ActiveAnimatedType, Underlay} from '../../Underlay'
import {NavigationRailAnimatedType, NavigationRailType} from '../Navigation-rail.enum'
import {NavigationRailItemBase} from './Navigation-rail-item-base.component'
import {handleNavigationRailItemPropsEqual} from './Navigation-rail-item-handle'
import {NavigationRailItemProps, RenderNavigationRailItemProps} from './Navigation-rail-item.interface'
import {
        Container,
        Header,
        IconLayout,
        IconLayoutAnimated,
        Label,
        LabelLayoutAnimated,
        LabelText,
        TouchableContent
} from './Navigation-rail-item.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
        active,
        activeIconElement,
        animatedType,
        eventName,
        iconElement,
        id,
        labelText,
        labelTextAnimatedStyle,
        ref,
        stateOnEvent,
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
                                {...stateOnEvent}
                                enableFocusRing={false}
                                ref={ref}
                                testID={`navigationRailItem__touchableContent--${id}`}
                        >
                                <Header
                                        pointerEvents='none'
                                        testID={`navigationRailItem__header--${id}`}
                                        type={type}
                                >
                                        <IconLayout testID={`navigationRailItem__iconLayout--${id}`}>
                                                <IconLayoutAnimated
                                                        testID={`navigationRailItem__iconLayoutAnimated--${id}`}
                                                        visible={!active}
                                                >
                                                        {iconElement}
                                                </IconLayoutAnimated>

                                                <IconLayoutAnimated
                                                        testID={`navigationRailItem__iconLayoutAnimated--${id}`}
                                                        visible={active}
                                                >
                                                        {activeIconElement}
                                                </IconLayoutAnimated>
                                        </IconLayout>

                                        <Underlay
                                                active={active}
                                                activeAnimatedType={
                                                        type === NavigationRailType.BLOCK ?
                                                                ActiveAnimatedType.SCALE
                                                        :       ActiveAnimatedType.SCALE_X
                                                }
                                                activeColor={activeColor}
                                                activeShape={ShapeType.FULL}
                                                eventName={eventName}
                                                shape={
                                                        type === NavigationRailType.BLOCK ?
                                                                ShapeType.FULL
                                                        :       ShapeType.LARGE
                                                }
                                                testID={`navigationRailItem__underlay--${id}`}
                                                underlayColor={underlayColor}
                                        />
                                </Header>

                                {type === NavigationRailType.SEGMENT && (
                                        <LabelLayoutAnimated
                                                animatedType={LayoutAnimatedType.COLLAPSE_Y}
                                                contentStyle={{minHeight: theme.adaptSize(theme.token.spacing.large)}}
                                                pointerEvents='none'
                                                scale={false}
                                                testID={`navigationRailItem__labelLayoutAnimated--${id}`}
                                                visible={
                                                        animatedType === NavigationRailAnimatedType.COLLAPSE ?
                                                                active
                                                        :       true
                                                }
                                        >
                                                <Label testID={`navigationRailItem__label--${id}`}>
                                                        <AnimatedLabelText
                                                                active={active}
                                                                ellipsizeMode='tail'
                                                                numberOfLines={1}
                                                                size={Size.MEDIUM}
                                                                style={[labelTextAnimatedStyle]}
                                                                testID={`navigationRailItem__animatedLabelText--${id}`}
                                                                type={TypographyType.LABEL}
                                                        >
                                                                {labelText}
                                                        </AnimatedLabelText>
                                                </Label>
                                        </LabelLayoutAnimated>
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
