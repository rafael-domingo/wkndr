import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View, Text } from 'react-native';
import SearchCard from '../Cards/SearchCard';
import { Modalize } from 'react-native-modalize';

export default function SearchCardContainer({ results }) {
    const [modal, setModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState(null);
    const modalizeRef = React.useRef();
    const handleModalContent = (content) => {
        
        setModalContent(content)
        setModal(true)
        modalizeRef.current?.open('top')
        console.log('modal')
    }

    return (
        <View style={styles.container}>
            {
                results.map((item, index) => {
                    return (
                        <SearchCard location={item} handleModalContent={handleModalContent}/>
                    )
                })
            }
               <Modalize                
                ref={modalizeRef}
                // alwaysOpen={300}
                modalHeight={250}
                onPositionChange={(position) => {
                    console.log('position change')
                    // if (position !== 'top') {
                    //     setModal(false);
                    // }
                }}
            >                  
            {
                modalContent !== null && (
                    <Text style={{fontSize: 20}}>{modalContent.name}</Text>                             
                )
            }
                
            </Modalize>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        height: 300,
        width: Dimensions.get('window').width,
        flexWrap: 'wrap'
        // position: 'absolute',
        // bottom: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
        
    }
})