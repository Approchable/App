import CategoryItem from "../CategoryItem";
import { HeaderText } from "../Texts";
import {View, Text} from 'react-native';

export function Interests({user,width}) {
    return (
        <> 
        <View style={{ flex:0, flexDirection: 'row', alignItems: "center", justifyContent:"space-between"}}>
        <HeaderText content="Interests" moreStyles={{fontSize: 18}} />
        <Text style={{fontSize: 16,color: '#44BFBA', fontWeight: "500",}}>Add</Text>
        </View>    
         
        <View style={{flexWrap: 'wrap', flexDirection: 'row', marginLeft: -5}}>
          {user.interests.map((person, index) => ( 
            <CategoryItem
              key={index}
              content={person}
              width={width}
              onPress={() => null}
              moreStyles={{
                backgroundColor: 'white',
                borderRadius: 5,
                height: 50,
                margin: 5,
                width: null,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#E5E5E5', 
              }}
            />
          ))}
        </View>
        </>

    );
  }