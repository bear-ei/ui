import {nanoid} from 'nanoid'
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
                const {containerAnimatedStyle} = useSearchListAnimated({visible, containerLayout})
                const emitId = useMemo(() => nanoid(), [])
                const id = useId()
                const renderSearchListRender = useCallback(
                        () =>
                                render({
                                        ...renderProps,
                                        containerAnimatedStyle,
                                        containerLayout,
                                        id,
                                        ref: ref as RenderListProps['ref']
                                }),
                        [containerAnimatedStyle, containerLayout, id, ref, render, renderProps]
                )

                const onSearchListEmit = useMemo(
                        () => handleSearchListEmit(emitId)(renderSearchListRender),
                        [emitId, renderSearchListRender]
                )

                useEffect(() => {
                        onSearchListEmit(visible)
                }, [onSearchListEmit, visible])

                useEffect(() => () => handleSearchListUnmount(emitId), [emitId])

                return <></>
        }
)
