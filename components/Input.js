import React from 'react';
import {View,StyleSheet,Text,TextInput } from 'react-native';


const Input = ({label,value,onChangeText,placeholder,secureTextEntry}) => {
return (
<View>
<Text style={styles.label}>{label}</Text>
<TextInput
autoCorrect={false}
onChangeText={onChangeText}
placeholder={placeholder}
style = {styles.input}
editable = {true}
maxLength = {40}
secureTextEntry={secureTextEntry}
value={value}

/>

</View>

)
}

const styles = StyleSheet.create({
    container : {
        marginTop : 10,
        width : '100%',
        borderColor: '#eee',
        borderBottomWidth : 2 ,
   
    },
    label:{
        padding:5,
        paddingBottom: 0 ,
        color : '#333',
        fontSize : 17,
        fontWeight: '700',
        width: '100%',
    },
    input:{
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2 ,
        marginTop:10,
        color : '#333',
        fontSize : 18,
        width: '100%',
        backgroundColor:'#e1e1e1e1',
        borderRadius:5,
        height : 40 , 
       
       
    }


})


export { Input };