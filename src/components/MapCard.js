
import {
    Text,
    View,
    Image,

  } from "react-native";
const MapCard = ({marker}) => {
  return ( 
    <>
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16, fontWeight: "600", color: "#030E01" }}>{marker.headline}</Text>
                <View>
                  <Image source={require('../assets/images/assets/ArrowRight.png')} />
                </View>
              </View>

              <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, color: "#030E01", marginBottom: 5 }}>{marker.description}</Text>

              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                <View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
                  <Image style={{ marginRight:5 }} source={require('../assets/images/assets/MapPin.png')} />
                  <Text>{marker.addressResult}</Text>
                </View>

                <View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
                  <Image style={{ marginRight:5 }} source={require('../assets/images/assets/Clock.png')} />
                  <Text>{(marker.duration / 60) > 20 ? `${(marker.duration / 60)} mins drive` : `${(marker.duration / 60)} mins walk`}</Text>
                </View>
              </View>
    </>
  )
}

export default MapCard;