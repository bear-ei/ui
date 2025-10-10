import type {Meta} from '@storybook/react'
import {Menu} from './Menu.component'

// export const Select = () => {
//         const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
//         const style = {
//                 height: 800,
//                 width: 800,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center'
//         } as StyleProp<ViewStyle>

//         const containerStyle = {width: 48, height: 48} as StyleProp<ViewStyle>
//         const data = useMemo(
//                 () =>
//                         Array.from({length: 2}, (_, index) => ({
//                                 indexKey: `Title${index + 1}`,
//                                 headline: `Title${index + 1}`,
//                                 leading: <></>,
//                                 extraData: []
//                         })),
//                 []
//         )

//         const onActiveKey = (key?: string) => setActiveKey(key)

//         return (
//                 <View style={[style]}>
//                         <View style={containerStyle}>
//                                 <Menu
//                                         activeKey={activeKey}
//                                         afterAffordance={true}
//                                         data={data}
//                                         listType={LIST_TYPE.LABEL}
//                                         loading={true}
//                                         onActive={onActiveKey}
//                                         selectType={LIST_SELECT_TYPE.SINGLE}
//                                 >
//                                         <IconButton type={ICON_BUTTON_TYPE.STANDARD} />
//                                 </Menu>
//                         </View>
//                 </View>
//         )
// }

export default {
        title: 'components/Menu',
        component: <></>
} as Meta<typeof Menu>
