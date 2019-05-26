import React from "react"
import {StyleSheet, Image, View} from "react-native"
import { w, baseUrl, WHITE, BLACK } from "../utils/constans"


const ImageDetail = ( {data} ) => {
    const { sub, cover } = styles
    const { img } = data
    return(
        <View >
            <View style={sub}>
                <Image style={cover} source={{uri: baseUrl + "static/" + img}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sub:{
        shadowColor: BLACK,
        borderRadius: 10,
        backgroundColor: WHITE,
        shadowRadius:8,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4
    },
    cover: {
        marginHorizontal: 5,
        width: w/1.2,
        height: w * 0.8,
        borderRadius: 10
    }
})

export default ImageDetail