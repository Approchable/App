import {View, TextInput, StyleSheet} from 'react-native';
import {useRef} from 'react';

export function NormalTextField({placeholder, onChangeText, onDelete, value , moreStyles}) {
  var ref = useRef('null');
  return (
    <View style={{...styles.textInputView, ...moreStyles}}>
      <TextInput
        ref={ref}
        autoFocus={true}
        value={value}
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        paddingStyle={styles.paddingStyle}
        onKeyPress={e => {
          e.nativeEvent.key === 'Backspace' ? null : null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECEEF2',
    paddingLeft: 16,
    paddingVertical: 10,
    fontFamily: 'Poppins_400Regular',
  },
  placeholderStyle: {},
  mainView: {
    flex: 1,

    marginHorizontal: 16,
  },
  textInputView: {
    //marginVertical: 5,
  },
});
