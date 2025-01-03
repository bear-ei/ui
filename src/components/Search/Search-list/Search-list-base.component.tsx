import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {ListData, RenderListProps, VirtualListComponent} from '../../List'
import {handleSearchListEmit, handleSearchListUnmount} from './Search-list-handle'
import {SearchListBaseProps} from './Search-list.interface'
import {useSearchListAnimated} from './use-search-list-animated.hook'

/**
 * TODO:
 */
export const SearchListBase = forwardRef<VirtualListComponent<ListData>, SearchListBaseProps>(
        ({containerLayout, render, visible, ...renderProps}, ref) => {
                const id = useId()
                const {containerAnimatedStyle} = useSearchListAnimated({visible, containerLayout})
                const renderSearchListRender = useCallback(
                        () =>
                                render({
                                        ...renderProps,
                                        containerAnimatedStyle,
                                        id,
                                        ref: ref as RenderListProps['ref'],
                                        containerLayout
                                }),
                        [containerAnimatedStyle, containerLayout, id, ref, render, renderProps]
                )

                const onSearchListEmit = useMemo(
                        () => handleSearchListEmit(id)(renderSearchListRender),
                        [id, renderSearchListRender]
                )

                useEffect(() => {
                        onSearchListEmit(visible)
                }, [onSearchListEmit, visible])

                useEffect(() => () => handleSearchListUnmount(id), [id])

                return <></>
        }
)
