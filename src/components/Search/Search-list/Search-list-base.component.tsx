import {nanoid} from 'nanoid'
import {forwardRef, useCallback, useEffect, useMemo} from 'react'
import {ListData, RenderListProps, VirtualListComponent} from '../../List'
import {handleSearchListEmit, handleSearchListUnmount} from './Search-list-handle'
import {SearchListBaseProps} from './Search-list.interface'
import {useSearchListAnimated} from './use-search-list-animated.hook'

/**
 * TODO:
 */
export const SearchListBase = forwardRef<VirtualListComponent<ListData>, SearchListBaseProps>(
        ({containerLayout, render, visible, ...renderProps}, ref) => {
                const {containerAnimatedStyle} = useSearchListAnimated({visible, containerLayout})
                const id = useMemo(() => nanoid(), [])
                const renderSearchListRender = useCallback(
                        () =>
                                render({
                                        ...renderProps,
                                        containerAnimatedStyle,
                                        ref: ref as RenderListProps['ref'],
                                        containerLayout
                                }),
                        [containerAnimatedStyle, containerLayout, ref, render, renderProps]
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
