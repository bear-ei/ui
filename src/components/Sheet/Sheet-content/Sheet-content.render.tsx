import {AnimatedView} from '@/components/Animated-component'
import {Button, BUTTON_TYPE, type ButtonProps} from '@/components/Button'
import {Divider} from '@/components/Divider'
import {ICON_BUTTON_TYPE, IconButton} from '@/components/Icon-button'
import {LAYOUT_ANIMATED, LayoutAnimated} from '@/components/Layout-animated'
import {useTheme} from '@/hooks'
import {shapeClasses, typographyClasses} from '@/utils'
import {DURATION, EASING, SHAPE, SIZE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {ArrowLeft, ArrowRight, X} from 'lucide-react-native'
import {forwardRef, type FC} from 'react'
import {Text, View, type ViewStyle} from 'react-native'
import {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from '../Sheet.enum'
import type {
        RenderSheetContentLeadingProps,
        RenderSheetContentProps,
        RenderSheetContentTrailingProps
} from './Sheet-content.interface'

export const RenderSheetContentLeading: FC<RenderSheetContentLeadingProps> = ({
        back,
        headlineLeading,
        id,
        onBack,
        position
}) =>
        headlineLeading ??
        (back ?
                <IconButton
                        size={SIZE.SMALL}
                        icon={position === SIDE_SHEET_POSITION.HORIZONTAL_START ? <ArrowRight /> : <ArrowLeft />}
                        onPressOut={onBack}
                        testID={`sheet__backIconButton--${id}`}
                        type={ICON_BUTTON_TYPE.STANDARD}
                />
        :       undefined)

export const RenderSheetContentTrailing: FC<RenderSheetContentTrailingProps> = ({
        close,
        headlineTrailing,
        id,
        onClose
}) =>
        headlineTrailing ??
        (close ?
                <IconButton
                        icon={<X />}
                        onPressOut={onClose}
                        size={SIZE.SMALL}
                        testID={`sheet__closeIconButton--${id}`}
                        type={ICON_BUTTON_TYPE.STANDARD}
                />
        :       undefined)

/**
 * TODO: Add visible animation for modal layer types.
 */
export const RenderSheetContent = forwardRef<View, RenderSheetContentProps>(
        (
                {
                        containerAnimatedStyle,
                        content,
                        footerVisible,
                        headlineText,
                        id,
                        leadingElement,
                        onCancel,
                        onConfirm,
                        position,
                        primaryButton,
                        primaryButtonProps,
                        secondaryButton,
                        secondaryButtonProps,
                        shape,
                        style,
                        testID,
                        trailingElement,
                        type,
                        ...contentProps
                },
                ref
        ) => {
                const theme = useTheme()
                const footerLayoutAnimatedContentSize = {height: theme.token.spacing.extraSmall * 20}
                const positionShape =
                        position === SIDE_SHEET_POSITION.HORIZONTAL_START ? SHAPE.LARGE_END : SHAPE.LARGE_START

                const sheetShape = shape ?? (type === SIDE_SHEET_TYPE.SIDEBAR ? SHAPE.LARGE : positionShape)
                const {style: primaryButtonStyle} = primaryButtonProps ?? ({} as ButtonProps)
                const {style: secondaryButtonStyle} = secondaryButtonProps ?? ({} as ButtonProps)
                const buttonTabIndex = footerVisible ? 0 : -1

                return (
                        <AnimatedView
                                accessibilityRole='alert'
                                accessible={true}
                                className={clsx('flex flex-1 flex-row self-stretch overflow-hidden', {
                                        ['justify-start']:
                                                type === SIDE_SHEET_TYPE.MODAL &&
                                                position === SIDE_SHEET_POSITION.HORIZONTAL_START,
                                        ['justify-end']:
                                                type === SIDE_SHEET_TYPE.MODAL &&
                                                position === SIDE_SHEET_POSITION.HORIZONTAL_END,
                                        ['min-w-64']: type === SIDE_SHEET_TYPE.SIDEBAR
                                })}
                                style={[containerAnimatedStyle]}
                                testID={testID ?? `sheetContent--${id}`}
                        >
                                <View
                                        {...contentProps}
                                        className={clsx(
                                                'relative flex flex-1 flex-col overflow-hidden bg-[--color-surface-container-low]',
                                                {
                                                        ['m-w-80']: type === SIDE_SHEET_TYPE.MODAL,
                                                        ['m-w-64']: type === SIDE_SHEET_TYPE.SIDEBAR
                                                },
                                                shapeClasses(sheetShape)
                                        )}
                                        ref={ref}
                                        style={[style]}
                                        testID={`sheetContent__content--${id}`}
                                >
                                        <View
                                                className={clsx(
                                                        'flex flex-row items-center gap-1 self-stretch pb-4 pr-1 pt-4',
                                                        {
                                                                ['pl-4']: !!leadingElement,
                                                                ['pl-6']: !leadingElement,
                                                                ['pr-4']: !!trailingElement,
                                                                ['pr-6']: !trailingElement
                                                        }
                                                )}
                                                testID={`sheetContent__header--${id}`}
                                        >
                                                {leadingElement && (
                                                        <View
                                                                className='flex flex-col items-center justify-center overflow-hidden'
                                                                testID={`sheetContent__leading--${id}`}
                                                        >
                                                                {leadingElement}
                                                        </View>
                                                )}

                                                <View
                                                        className='flex h-8 flex-1 flex-row items-center'
                                                        testID={`sheetContent__headlineLayout--${id}`}
                                                >
                                                        <Text
                                                                className={clsx(
                                                                        'select-none text-center',
                                                                        typographyClasses(TYPOGRAPHY.TITLE)(
                                                                                TYPOGRAPHY_SIZE.LARGE
                                                                        )({
                                                                                colorClasses:
                                                                                        'color-[--color-on-surface-variant]'
                                                                        })
                                                                )}
                                                                numberOfLines={1}
                                                                testID={`sheetContent__headerText--${id}`}
                                                        >
                                                                {headlineText}
                                                        </Text>
                                                </View>

                                                {trailingElement && (
                                                        <View
                                                                className='flex flex-col items-center justify-center overflow-hidden'
                                                                testID={`sheetContent__trailing--${id}`}
                                                        >
                                                                {trailingElement}
                                                        </View>
                                                )}
                                        </View>

                                        <View
                                                className='flex-1 self-stretch'
                                                testID={`sheetContent__main--${id}`}
                                        >
                                                {content}
                                        </View>

                                        <LayoutAnimated
                                                animatedType={LAYOUT_ANIMATED.COLLAPSE_Y}
                                                className='absolute bottom-0 left-0 right-0 origin-bottom'
                                                contentSize={footerLayoutAnimatedContentSize}
                                                entry={{
                                                        duration: DURATION.MEDIUM_3,
                                                        easing: EASING.EMPHASIZED_DECELERATE
                                                }}
                                                exit={{
                                                        duration: DURATION.SHORT_3,
                                                        easing: EASING.EMPHASIZED_ACCELERATE
                                                }}
                                                testID={`sheetContent__footerLayout--${id}`}
                                                translate={true}
                                                visible={footerVisible}
                                        >
                                                <View
                                                        className='m-h-20 m-w-20'
                                                        testID={`sheetContent__footerLayout--${id}`}
                                                >
                                                        <Divider
                                                                size={SIZE.LARGE}
                                                                testID={`sheetContent__divider--${id}`}
                                                        />

                                                        <View
                                                                className={
                                                                        'flex flex-row gap-2 bg-[--color-surface-container-low] pb-6 pl-6 pr-6 pt-4'
                                                                }
                                                                testID={`sheetContent__footer--${id}`}
                                                        >
                                                                <View
                                                                        className='m-h-10 min-w-24'
                                                                        style={[primaryButtonStyle as ViewStyle]}
                                                                        testID={`sheetContent__primaryButton--${id}`}
                                                                >
                                                                        {primaryButton ?? (
                                                                                <Button
                                                                                        {...{
                                                                                                labelText: 'Confirm',
                                                                                                ...primaryButtonProps
                                                                                        }}
                                                                                        onPressOut={onConfirm}
                                                                                        stretch={true}
                                                                                        tabIndex={buttonTabIndex}
                                                                                        testID={`sheetContent__confirmButton--${id}`}
                                                                                        type={BUTTON_TYPE.FILLED}
                                                                                />
                                                                        )}
                                                                </View>

                                                                <View
                                                                        className='m-h-10 min-w-24'
                                                                        style={[secondaryButtonStyle as ViewStyle]}
                                                                        testID={`sheetContent__secondaryButton--${id}`}
                                                                >
                                                                        {secondaryButton ?? (
                                                                                <Button
                                                                                        {...{
                                                                                                labelText: 'Cancel',
                                                                                                ...secondaryButtonProps
                                                                                        }}
                                                                                        onPressOut={onCancel}
                                                                                        stretch={true}
                                                                                        tabIndex={buttonTabIndex}
                                                                                        testID={`sheetContent__cancelButton--${id}`}
                                                                                        type={BUTTON_TYPE.OUTLINED}
                                                                                />
                                                                        )}
                                                                </View>
                                                        </View>
                                                </View>
                                        </LayoutAnimated>
                                </View>
                        </AnimatedView>
                )
        }
)

RenderSheetContent.displayName = 'RenderSheetContent'
