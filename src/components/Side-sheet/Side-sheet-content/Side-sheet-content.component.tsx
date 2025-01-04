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
        FooterContent,
        Header,
        HeaderText,
        HeadlineContainer,
        Leading,
        Main,
        PrimaryButton,
        SecondaryButton,
        Trailing
} from './Side-sheet-content.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)

/**
 * TODO: Add visible animation for modal layer types.
 */
const render = ({
        containerAnimatedStyle,
        content,
        footerVisible,
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
        testID,
        trailing,
        type,
        ...innerProps
}: RenderSideSheetContentProps) => {
        const sheetShape = shape ?? (sheetPosition === 'horizontalStart' ? 'largeEnd' : 'largeStart')

        return (
                <AnimatedContainer
                        sheetPosition={sheetPosition}
                        style={[containerAnimatedStyle]}
                        testID={testID ?? `sideSideSheetContent--${id}`}
                        type={type}
                >
                        <Content
                                {...innerProps}
                                accessibilityRole='alert'
                                shape={sheetShape}
                                style={[style]}
                                testID={`sideSideSheetContent__content--${id}`}
                                type={type}
                        >
                                <Header
                                        leadingShow={!!leading}
                                        testID={`sideSideSheetContent__header--${id}`}
                                        trailingShow={!!trailing}
                                >
                                        {leading && (
                                                <Leading testID={`sideSideSheetContent__leading--${id}`}>
                                                        {leading}
                                                </Leading>
                                        )}

                                        <HeadlineContainer testID={`sideSideSheetContent__headlineContainer--${id}`}>
                                                <HeaderText
                                                        numberOfLines={1}
                                                        size='large'
                                                        testID={`sideSideSheetContent__headerText--${id}`}
                                                        type='title'
                                                >
                                                        {headlineText}
                                                </HeaderText>
                                        </HeadlineContainer>

                                        {trailing && (
                                                <Trailing testID={`sideSideSheetContent__trailing--${id}`}>
                                                        {trailing}
                                                </Trailing>
                                        )}
                                </Header>

                                <Main testID={`sideSideSheetContent__main--${id}`}>{content}</Main>
                                <FooterContainer
                                        animatedType='collapseY'
                                        entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                                        exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                                        testID={`sideSideSheetContent__footerContainer--${id}`}
                                        visible={footerVisible}
                                >
                                        <FooterContent testID={`sideSideSheetContent__content--${id}`}>
                                                <Divider
                                                        size='large'
                                                        testID={`sideSideSheetContent__divider--${id}`}
                                                />

                                                <Footer
                                                        testID={`sideSideSheetContent__footer--${id}`}
                                                        type={type}
                                                >
                                                        <PrimaryButton
                                                                testID={`sideSideSheetContent__primaryButton--${id}`}
                                                        >
                                                                {primaryButton ?? (
                                                                        <Button
                                                                                {...{
                                                                                        labelText: 'Confirm',
                                                                                        ...primaryButtonProps
                                                                                }}
                                                                                onPressOut={onConfirm}
                                                                                testID={`sideSideSheetContent__confirmButton--${id}`}
                                                                                type='filled'
                                                                        />
                                                                )}
                                                        </PrimaryButton>

                                                        <SecondaryButton
                                                                testID={`sideSideSheetContent__secondaryButton--${id}`}
                                                        >
                                                                {secondaryButton ?? (
                                                                        <Button
                                                                                {...{
                                                                                        labelText: 'Cancel',
                                                                                        ...secondaryButtonProps
                                                                                }}
                                                                                onPressOut={onCancel}
                                                                                type='outlined'
                                                                                testID={`sideSideSheetContent__cancelButton--${id}`}
                                                                        />
                                                                )}
                                                        </SecondaryButton>
                                                </Footer>
                                        </FooterContent>
                                </FooterContainer>
                        </Content>
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
