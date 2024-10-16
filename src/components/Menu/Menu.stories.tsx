import {Meta, StoryObj} from '@storybook/react'
import {useMemo, useState} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Icon} from '../Icon'
import {Skeleton} from '../Skeleton'
import {Menu} from './Menu.component'
import {MenuProps} from './Menu.interface'

const renderMenuSkeleton = () => {
    const {Square, Rectangular, Circle} = Skeleton
    const containerStyle = {
        paddingLeft: 16,
        flex: 1,
        gap: 12,
        paddingRight: 28
    } as StyleProp<ViewStyle>

    const rectangularStyle = {flex: 1} as StyleProp<ViewStyle>

    return (
        <Rectangular
            height={56}
            style={[containerStyle]}
        >
            <Square
                width={24}
                height={24}
            />

            <Rectangular
                height={48}
                style={[rectangularStyle]}
            />

            <Circle
                width={40}
                height={40}
            />
        </Rectangular>
    )
}

export const Headline: StoryObj<MenuProps> = {
    args: {
        defaultActiveKey: 'TitleB',
        activeKey: 'TitleA',
        data: [
            {
                leading: <Icon />,
                indexKey: 'TitleA',
                headline: 'TitleA',
                trailing: <Icon />
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

export const HeadlineDensityScale: StoryObj<MenuProps> = {
    args: {
        activeKey: 'TitleA',
        afterAffordance: true,
        defaultActiveKey: 'TitleB',
        densityScale: -4,
        itemSize: 40,
        itemShape: 'extraSmall',
        data: [
            {
                headline: 'TitleA',
                indexKey: 'TitleA'
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
    const style = {height: 800, width: '100%'} as StyleProp<ViewStyle>
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
    const skeleton = useMemo(() => renderMenuSkeleton(), [])

    return (
        <View style={[style]}>
            <Menu
                data={data}
                selectType='select'
                skeletonElement={skeleton}
                activeKey={activeKey}
                onActive={onActiveKey}
                afterAffordance={true}
                loading={true}
            />
        </View>
    )
}

export const Multiselect = () => {
    const [activeKeys, setActiveKeys] = useState<string[] | undefined>(undefined)
    const style = {height: 800, width: '100%'} as StyleProp<ViewStyle>
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
    const skeleton = useMemo(() => renderMenuSkeleton(), [])

    return (
        <View style={[style]}>
            <Menu
                activeKeys={activeKeys}
                afterAffordance={true}
                data={data}
                onActives={onActiveKeys}
                skeletonElement={skeleton}
                selectType='multiselect'
            />
        </View>
    )
}

export default {
    title: 'components/Menu',
    component: Menu
} as Meta<typeof Menu>
