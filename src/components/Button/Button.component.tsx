import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {ButtonBase} from './Button-base.component'
import {ButtonProps, RenderButtonProps} from './Button.interface'
import {
        ActiveIndicatorLayoutAnimated,
        BackgroundUnderlay,
        Container,
        Content,
        IconLayout,
        LabelText,
        Main
} from './Button.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const render = ({
        backgroundUnderlayAnimatedStyle,
        disabled,
        elevation,
        eventName,
        icon,
        id,
        labelText,
        labelTextAnimatedStyle,
        loading,
        onStateEvent,
        ref,
        testID,
        type = 'filled',
        underlayColor,
        ...contentProps
}: RenderButtonProps) => {
        const activeIndicatorVisible =
                type === 'link' &&
                eventName &&
                ['focus', 'hoverIn', 'longPress', 'press', 'pressIn', 'pressOut'].includes(eventName)

        const link = type === 'link'
        const loadingEventName = link ? 'none' : 'longPress'
        const shape = link ? 'extraSmall' : 'full'
        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[backgroundUnderlayAnimatedStyle]}
                        testID={`button__animatedBackgroundUnderlay--${id}`}
                />
        )

        const elevationUnderlayElement =
                typeof elevation === 'number' ?
                        <Elevation
                                level={elevation}
                                shape={shape}
                                testID={`button__elevation--${id}`}
                        />
                :       <></>

        return (
                <Container
                        testID={testID ?? `button--${id}`}
                        type={type}
                >
                        <Touchable
                                {...onStateEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={disabled}
                                elevationUnderlay={elevationUnderlayElement}
                                hotZone={type !== 'link'}
                                ref={ref}
                                shape={shape}
                                testID={`button__touchable--${id}`}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityLabel={labelText}
                                        accessibilityRole='button'
                                        pointerEvents='none'
                                        shape={shape}
                                        testID={`button__content--${id}`}
                                        type={type}
                                >
                                        <Main
                                                iconShow={!!icon}
                                                testID={`button__main--${id}`}
                                                type={type}
                                        >
                                                {icon && !link && (
                                                        <IconLayout testID={`button__iconLayout--${id}`}>
                                                                {icon}
                                                        </IconLayout>
                                                )}

                                                <AnimatedLabelText
                                                        ellipsizeMode='tail'
                                                        numberOfLines={1}
                                                        size={link ? 'small' : 'large'}
                                                        style={[labelTextAnimatedStyle]}
                                                        testID={`button__animatedLabelText--${id}`}
                                                        type={link ? 'body' : 'label'}
                                                >
                                                        {labelText}
                                                </AnimatedLabelText>
                                        </Main>

                                        {type === 'link' && (
                                                <ActiveIndicatorLayoutAnimated
                                                        testID={`button__activeIndicatorLayoutAnimated--${id}`}
                                                        visible={activeIndicatorVisible}
                                                />
                                        )}

                                        <Underlay
                                                eventName={loading ? loadingEventName : eventName}
                                                shape={shape}
                                                testID={`button__underlay--${id}`}
                                                underlayColor={underlayColor}
                                        />
                                </Content>
                        </Touchable>
                </Container>
        )
}

const ForwardRefButton = forwardRef<View, ButtonProps>((props, ref) => (
        <ButtonBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Button: FC<ButtonProps> = ForwardRefButton
