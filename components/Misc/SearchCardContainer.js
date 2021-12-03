import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import SearchCard from '../Cards/SearchCard';
import { Modalize } from 'react-native-modalize';
import { Yelp } from '../../util/Yelp';
import SearchDetailCard from '../Cards/SearchDetailCard';

export default function SearchCardContainer({ results, handleScrollEnabled, handleAddLocation, handleDeleteLocation, cameraAnimation, setCamera, camera, fitMarkers, handleCallout, animateToRegion, handleChangeMarker, tripDestinations }) {
    const [modal, setModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState(null);
    const [detailState, setDetailState] = React.useState();
    const modalizeRef = React.useRef();
    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState();
    const handleModalContent = (content, index) => {     
        animateToRegion(content.coordinates)
        setModalContent(content)               
        setIndex(index)
        // cameraAnimation(content.coordinates)
        Yelp.detail(content.id)
        .then(response => {
            setDetailState(response)
            setLoading(false)            
        })
        modalizeRef.current?.open('top')        
    }

    const addLocation = () => {
        handleAddLocation(modalContent)       
        handleChangeMarker('selected', index) 
    }

    const deleteLocation = (wkndrId) => {
        handleDeleteLocation(wkndrId)
        handleChangeMarker('unselected', index)
    }

    return (
        <View style={styles.container}>
           
            <View style={{height: 300, bottom: 20, flexWrap: 'wrap', width: Dimensions.get('window').width}}>
            {
                results.map((item, index) => {
                    return (
                        <SearchCard key={index} location={item} handleModalContent={handleModalContent} handleCallout={handleCallout} index={index}/>
                    )
                })
            }
            </View>
          
               <Modalize                
                ref={modalizeRef}                
                modalHeight={600}     
                handlePosition={"inside"}
                handleStyle={{top: 115, opacity: 1, backgroundColor: 'white'}}                   
                scrollViewProps={{
                    scrollEnabled: false
                }}   
                withOverlay={false}                                                      
                modalStyle={{padding: 5, backgroundColor: 'rgba(0,0,0,0)',}}    
                onOpen={() => {
                    handleScrollEnabled(false)
                    setModal(true)                   
                    setCamera(true) 
                    // cameraAnimation(modalContent.coordinates)
                }}
                onClosed={() => {
                    setLoading(true)
                    setDetailState(undefined)
                    handleScrollEnabled(true)
                    setModal(false)
                    setCamera(false)
                    fitMarkers()
                }}
               
            >                  
            {
                modalContent !== null && (  
                    <SearchDetailCard 
                        addLocation={addLocation}
                        deleteLocation={deleteLocation}
                        modal={modal}
                        modalContent={modalContent}
                        loading={loading}
                        detailState={detailState}
                        tripDestinations={tripDestinations}
                    />                                 
                )
            }
                
            </Modalize>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {     
        height: 600,
        width: Dimensions.get('window').width,
        flexWrap: 'wrap',        
        justifyContent: 'flex-end',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
        
    },
    image: {
        // flex: 1,
        height: 500,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',      
        borderRadius: 20, 
        overflow: 'hidden',           

        
    },  
    text: {
        color: 'white',
        fontFamily: 'System',     
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30
    },
    addressText: {
        fontWeight: '300',
        fontSize: 18,
    },
    timeText: {
        textAlign: 'right',
        fontSize: 18
    },
    pricingText: {
        textAlign: 'right',
        fontSize: 12
    },
})