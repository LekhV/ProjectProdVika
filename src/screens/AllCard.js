// eslint-disable-next-line no-unused-vars
import React, {Component} from "react"
// eslint-disable-next-line no-unused-vars
import { StyleSheet, View, ScrollView} from "react-native"
import { baseUrl } from "../utils/constans"
import  ImageCard  from "../components/ImageCard"

export default class AllCard extends Component {
    static navigationOptions = {
        title: "All Product"
    }
    state = {
        data: []
    }


    componentDidMount = async() => {
        try {
            const response = await fetch(baseUrl + "api/products/")
            const data =  await response.json ()
            this.setState({ data })
            //const value = await AsyncStorage.getItem("Storage_Token")
            //console.log("Storage_Token::value", value)
        }catch(e) {
            throw e
        }
    }
    render() {
        const { data} = this.state
        const { container} = styles
        const { navigation} = this.props
        // eslint-disable-next-line no-console
        console.log("data", data)
        return (
            <View>
                <ScrollView>
                    <View style={container}>
                        { data.map(item => (
                            <ImageCard
                                data = {item}
                                key={item.id}
                                onPress={() => navigation.navigate("Detail", ({item}))}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create ({
    container: {
        marginTop: 30,
        alignItems: "center",
        marginBottom: 100
    }
})