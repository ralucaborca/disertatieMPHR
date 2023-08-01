import { View, Text } from "react-native";
import React from "react";

const Header = (props) => {
    return (
        <View style={{marginLeft:15}}>
            <Text style={{fontWeight:'bold', fontSize:28, marginTop:100, alignSelf:"center",
        height: 150,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        backgroundColor:'#00e4d0',
        shadowColos: '#000',
        elevation: 25}}>
                {props.name}
            </Text>
        </View>
    )
}

export default Header;