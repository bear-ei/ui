import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Button} from '../../Button'
import {Divider} from '../../Divider'
import {SideSheetContentBase} from './Side-sheet-content-base.component'
import {RenderSideSheetContentProps, SideSheetContentProps} from './Side-sheet-content.interface'
import {
    Container,
    Content,
    Footer,
    FooterContainer,
    Header,
    HeaderText,
    HeaderTextContainer,
    Leading,
    Main,
    PrimaryButton,
    SecondaryButton,
    Trailing
} from './Side-sheet-content.style'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedFooterContainer = Animated.createAnimatedComponent(FooterContainer)
const render = ({
    containerAnimatedStyle,
    content,
    contentAnimatedStyle,
    densityScale,
    footerAnimatedStyle,
    headlineText,
    id,
    leading,
    onCancel,
    onConfirm,
    primaryButton,
    primaryButtonProps,
    secondaryButton,
    secondaryButtonProps,
    shape,
    sheetPosition,
    style,
    trailing,
    type,
    ...innerProps
}: RenderSideSheetContentProps) => {
    const sheetShape = shape ?? (sheetPosition === 'horizontalStart' ? 'largeEnd' : 'largeStart')

    return (
        <AnimatedContainer
            sheetPosition={sheetPosition}
            style={[containerAnimatedStyle]}
            testID={`sideSideSheetContent--${id}`}
            type={type}
        >
            <AnimatedContent
                {...innerProps}
                accessibilityRole='alert'
                densityScale={densityScale}
                shape={sheetShape}
                style={[style, contentAnimatedStyle]}
                testID={`sideSideSheetContent__content--${id}`}
            >
                <Header
                    leadingShow={!!leading}
                    testID={`sideSideSheetContent__header--${id}`}
                    trailingShow={!!trailing}
                >
                    {leading && <Leading testID={`sideSideSheetContent__leading--${id}`}>{leading}</Leading>}

                    <HeaderTextContainer testID={`sideSideSheetContent__headerTextContainer--${id}`}>
                        <HeaderText
                            size='large'
                            testID={`sideSideSheetContent__headerText--${id}`}
                            type='title'
                            numberOfLines={1}
                        >
                            {headlineText}
                        </HeaderText>
                    </HeaderTextContainer>

                    {trailing && <Trailing testID={`sideSideSheetContent__trailing--${id}`}>{trailing}</Trailing>}
                </Header>

                <Main testID={`sideSideSheetContent__main--${id}`}>{content}</Main>
                <AnimatedFooterContainer
                    style={[footerAnimatedStyle]}
                    testID={`sideSideSheetContent__footerContainer--${id}`}
                >
                    <Divider
                        horizontalStretch={true}
                        size='large'
                    />

                    <Footer testID={`sideSideSheetContent__footer--${id}`}>
                        <PrimaryButton testID={`sideSideSheetContent__primaryButton--${id}`}>
                            {primaryButton ?? (
                                <Button
                                    {...{labelText: 'Confirm', ...primaryButtonProps}}
                                    horizontalStretch={true}
                                    onPressOut={onConfirm}
                                    type='filled'
                                />
                            )}
                        </PrimaryButton>

                        <SecondaryButton testID={`sideSideSheetContent__secondaryButton--${id}`}>
                            {secondaryButton ?? (
                                <Button
                                    {...{labelText: 'Cancel', ...secondaryButtonProps}}
                                    horizontalStretch={true}
                                    onPressOut={onCancel}
                                    type='outlined'
                                />
                            )}
                        </SecondaryButton>
                    </Footer>
                </AnimatedFooterContainer>
            </AnimatedContent>
        </AnimatedContainer>
    )
}

const ForwardRefSideSheetContent = forwardRef<View, SideSheetContentProps>((props, ref) => (
    <SideSheetContentBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const SideSheetContent: FC<SideSheetContentProps> = ForwardRefSideSheetContent
