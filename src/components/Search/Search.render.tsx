import {TRIGGER_ON} from '@/constants'
import {classesName} from '@/utils'
import {SHAPE, SIZE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {TextInput} from 'react-native'
import {Menu} from '../Menu'
import {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from '../Popover'
import {SearchTextInput} from './Search-text-input'
import type {RenderSearchProps} from './Search.interface'

export const RenderSearch = forwardRef<TextInput, RenderSearchProps>(
        (
                {
                        activeKey,
                        closeTrailing,
                        data,
                        emptyElement,
                        id,
                        listVisible,
                        onActive,
                        onAnimationFinished,
                        onFocusKey,
                        onVisible,
                        size,
                        textInputPicker: isTextInputPicker,
                        ...textInputProps
                },
                ref
        ) => {
                const searchTextInputElement = (
                        <SearchTextInput
                                {...textInputProps}
                                id={id}
                                ref={ref}
                        />
                )

                return (
                        <>
                                {isTextInputPicker ?
                                        <Menu
                                                activeKey={activeKey}
                                                closeTrailing={closeTrailing}
                                                className={classesName('justify-center self-stretch', {
                                                        ['h-10']: size === SIZE.SMALL,
                                                        ['h-12']: size === SIZE.MEDIUM,
                                                        ['h-14']: size === SIZE.LARGE,
                                                        ['h-16']: size === SIZE.EXTRA_LARGE,
                                                        ['h-8']: size === SIZE.EXTRA_SMALL
                                                })}
                                                data={data}
                                                emptyElement={emptyElement}
                                                onActive={onActive}
                                                onAnimationFinished={onAnimationFinished}
                                                onFocusKey={onFocusKey}
                                                onVisible={onVisible}
                                                popoverContentPosition={POPOVER_CONTENT_POSITION.VERTICAL_END}
                                                shape={listVisible ? SHAPE.MEDIUM : SHAPE.EXTRA_LARGE}
                                                size={size}
                                                testID={`search__picker--${id}`}
                                                trailingTriggerOn={TRIGGER_ON.HOVER}
                                                triggerEvent={TRIGGER_ON.NONE}
                                                type={POPOVER_TYPE.TEXT_INPUT_PICKER}
                                                visible={listVisible}
                                        >
                                                {searchTextInputElement}
                                        </Menu>
                                :       searchTextInputElement}
                        </>
                )
        }
)

RenderSearch.displayName = 'RenderSearch'
