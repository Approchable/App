
import SkeletonContent from "react-native-skeleton-content";

const MapLoader = () => {
  return ( 
    <SkeletonContent
        containerStyle={{flex: 1, flexDirection: "row",flexWrap:"wrap", width: "100%"}}
        animationDirection="horizontalLeft"
        layout={[
        // long line
        { width: "85%", height: 25, marginBottom: 6, marginRight: "5%" },
        { width: "10%", height: 25, },
        // short line
        { width: "100%", height: 18, marginBottom: 6 },
         // short line
         { width: "100%", height: 18, marginBottom: 20 },

            { width: "30%", height: 18, marginRight: 4 },
            { width: "30%", height: 18 },

        ]}
        isLoading={true}   />
  )
}

export default MapLoader;