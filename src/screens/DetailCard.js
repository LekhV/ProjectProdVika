// eslint-disable-next-line no-unused-vars
import React, {Component} from "react"
// eslint-disable-next-line no-unused-vars
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert} from "react-native"
import axios from "axios"
// eslint-disable-next-line no-unused-vars
import "abort-controller/polyfill"
import AsyncStorage from "@react-native-community/async-storage"
import {  baseUrl } from "../utils/constans"
import { WHITE, LIGHT_BLUE, BLACK } from "../utils/colorConstans"
// eslint-disable-next-line no-unused-vars
import  ReviewCard  from "../components/ReviewCard"
import  ImageDetail  from "../components/ImageDetail"

export default class DetailCard extends Component {
    static navigationOptions = {
        title: "Detail Product"
    }
    constructor(props) {
        super(props)
        this.state = {
            textRew: "",
            reviews: [],
            idUrl: "",
            rate: ""
        }
    }
    componentDidMount (){
        const { item } = this.props.navigation.state.params
        const { id } = item
        try {
            const controller = new AbortController()
            axios.get(baseUrl + "api/reviews/" + id)
                .then(response => {
                    // eslint-disable-next-line no-console
                    console.log("response.data" , response.data)
                    const reviews = response.data
                    this.setState({ reviews })

                })
                .catch(function (error) {
                    // handle error
                    // eslint-disable-next-line no-console
                    console.log(error)
                })
                .finally(function ()
                {
                    controller.abort()
                    // always executed
                })
        }catch(e) {
            throw e
        }
    }

    urlNewReview = async() => {
        const value =  await AsyncStorage.getItem("Storage_Token")
        // eslint-disable-next-line no-console
        console.log("Storage_Token::valueT", value)
        try {
            axios.post(baseUrl + "/api/reviews/2",
                {
                    "rate": "4",
                    "text": this.state.textRew
                },
                {
                    headers: {
                        "Authorization: Token ": value,

                    }
                })
                .then(function (response) {
                    Alert.alert("Successfully ")
                    // eslint-disable-next-line no-console
                    console.log("response.data.token", response.data)
                    // AsyncStorage.setItem("Storage_Token", response.data.token)

                })
                .catch(function (error) {
                // eslint-disable-next-line no-console
                    console.log(error)
                })
        }catch(e) {
            throw e
        }
    }


    render() {
        const { item } = this.props.navigation.state.params
        const { img, title, text, id} = item
        const { container, sub, h1, h2 } = styles

        const idUrl = baseUrl + "api/reviews/" + id
        // eslint-disable-next-line no-console
        console.log("idUrl", idUrl)

        //  this.urlCall()

        const { reviews } = this.state
        // eslint-disable-next-line no-console
        console.log("reviews", reviews)
        const data = { img }
        return (
            <View style={container}>
                <ScrollView>
                    <View style={sub}>
                        <Text style={h2}>{title}</Text>
                        <ImageDetail data={data} />
                        <Text style={h1}>Product Description</Text>
                        <Text style={h2}>{text}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your review..."
                            onChangeText={(textRew) => this.setState({textRew})}
                        />
                        <TouchableOpacity style={styles.userButton}
                            onPress = {() => this.urlNewReview()}>
                            <Text style={styles.buttonText}>Submit Review</Text>
                        </TouchableOpacity>
                        <Text style={h1}>Reviews</Text>
                        { reviews.map(itemRev => (
                            <ReviewCard reviews={itemRev}
                                key={itemRev.id}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE
    },
    sub: {
        flex: 1,
        alignItems: "center",
        marginBottom: 100,
        backgroundColor: WHITE
    },
    h1: {
        fontFamily: "AvenirNext-DemiBold",
        fontSize: 20,
        marginTop: 5,
        alignItems: "center"
    },
    h2: {
        fontFamily: "AvenirNext-DemiBold",
        fontSize: 20,
        marginTop: 5,
        color: BLACK
    },
    input: {
        marginTop: 5,
        width: "90%",
        backgroundColor: WHITE,
        borderRadius: 10,
        padding: 10,
        borderColor: LIGHT_BLUE,
        borderWidth: 2,
    },
    userButton: {
        backgroundColor: LIGHT_BLUE,
        width: "90%",
        alignItems: "center",
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 16,
        color: WHITE,
    }
})

