import {ShapeType} from '@bearei/material-token'
import {Meta, StoryObj} from '@storybook/react'
import {useMemo, useState} from 'react'
import {View, ViewStyle} from 'react-native'
import {Icon} from '../Icon'
import {Skeleton} from '../Skeleton'
import {List} from './List.component'
import {ListType, SelectType} from './List.enum'
import {ListProps} from './List.interface'

const renderListSkeleton = () => {
        const {Square, Rectangular, Circle} = Skeleton
        const containerStyle = {
                paddingLeft: 16,
                flex: 1,
                gap: 16,
                paddingRight: 28
        } as ViewStyle

        const rectangularStyle = {flex: 1} as ViewStyle

        return (
                <Rectangular
                        size={56}
                        style={[containerStyle]}
                >
                        <Square size={24} />

                        <Rectangular
                                size={48}
                                style={[rectangularStyle]}
                        />

                        <Circle size={40} />
                </Rectangular>
        )
}

export const Standard: StoryObj<ListProps> = {
        args: {
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
                data: [
                        {
                                indexKey: 'TitleA',
                                headline: 'TitleA'
                        },
                        {
                                indexKey: 'TitleB',
                                headline: 'TitleB'
                        },
                        {
                                indexKey: 'TitleC',
                                headline: 'TitleC'
                        },
                        {
                                indexKey: 'TitleD',
                                headline: 'TitleD'
                        }
                ]
        }
}

export const Menu: StoryObj<ListProps> = {
        args: {
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
                type: ListType.MENU,
                data: [
                        {
                                indexKey: 'TitleA',
                                headline: 'TitleA'
                        },
                        {
                                indexKey: 'TitleB',
                                headline: 'TitleB'
                        },
                        {
                                indexKey: 'TitleC',
                                headline: 'TitleC'
                        },
                        {
                                indexKey: 'TitleD',
                                headline: 'TitleD'
                        }
                ]
        }
}

export const Select = () => {
        const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
        const style = {height: 800, width: '100%'} as ViewStyle
        const data = useMemo(
                () =>
                        Array.from({length: 1255}, (_, index) => ({
                                indexKey: `Title${index + 1}`,
                                headline: `Title${index + 1}`,
                                leading: <Icon />,
                                extraData: []
                        })),
                []
        )

        const onActiveKey = (key?: string) => setActiveKey(key)

        return (
                <View style={[style]}>
                        <List
                                activeKey={activeKey}
                                afterAffordance={true}
                                data={data}
                                enableAutoSelect={true}
                                itemSize={56}
                                onActive={onActiveKey}
                                selectType={SelectType.SINGLE}
                                shape={ShapeType.EXTRA_SMALL}
                        />
                </View>
        )
}

export const Multiselect = () => {
        const [activeKeys, setActiveKeys] = useState<string[] | undefined>(undefined)
        const style = {height: 800, width: '100%'} as ViewStyle
        const data = useMemo(
                () =>
                        Array.from({length: 1255}, (_, index) => ({
                                indexKey: `Title${index + 1}`,
                                headline: `Title${index + 1}`,
                                leading: <Icon />,
                                extraData: []
                        })),
                []
        )

        const onActiveKeys = (keys?: string[]) => setActiveKeys(keys)
        const skeleton = useMemo(() => renderListSkeleton(), [])

        return (
                <View style={[style]}>
                        <List
                                activeKeys={activeKeys}
                                data={data}
                                itemSize={56}
                                onActives={onActiveKeys}
                                selectType={SelectType.MULTIPLE}
                                shape={ShapeType.FULL}
                                skeletonElement={skeleton}
                        />
                </View>
        )
}

export default {
        title: 'components/List',
        component: List
} as Meta<typeof List>
