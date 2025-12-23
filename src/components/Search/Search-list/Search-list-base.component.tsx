import {forwardRef, useId} from 'react'
import type {ScrollView} from 'react-native'
import type {SearchListBaseProps} from './Search-list.interface'
import {RenderSearchList} from './Search-list.render'

export const SearchListBase = forwardRef<ScrollView, SearchListBaseProps>(
        ({containerLayout, ...renderSearchListProps}, ref) => {
                const id = useId()

                if (!containerLayout) {
                        return <></>
                }

                return (
                        <RenderSearchList
                                {...renderSearchListProps}
                                containerLayout={containerLayout}
                                id={id}
                                ref={ref}
                        />
                )
        }
)

SearchListBase.displayName = 'SearchListBase'
