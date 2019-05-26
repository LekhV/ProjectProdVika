// eslint-disable-next-line no-unused-vars
import React, {Component} from "react"
import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"
// eslint-disable-next-line no-unused-vars
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from "react-native"
import { w, baseUrl } from "../utils/constans"
import { WHITE,NAVY_BLUE, LIGHT_BLUE, GRAY } from "../utils/colorConstans"
export default  class ScreenRegistry extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: "",
        }
    }

    onClickListenerSignUp ()  {
        if( this.state.userName.length > 0 && this.state.password.length > 0 ){
            this.callSignUp()
            this.props.navigation.navigate("Cards")
        }else{
            Alert.alert("Please enter UserName or Password")
        }
    }

    callSignUp () {
        axios.post(baseUrl + "api/register/",
            {
                "username": this.state.userName,
                "password": this.state.password
            })
            .then(function (response) {
                Alert.alert("Sign Up successfully ")
                // eslint-disable-next-line no-console
                console.log("response.data.token", response.data.token)
                AsyncStorage.setItem("", response.data.token)

            })
            .catch(function (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }


    onClickListenerSignIn ()  {
        if( this.state.userName.length > 0 && this.state.password.length > 0 ){
            this.callSignIn()
            this.props.navigation.navigate("Cards")
        }else{
            Alert.alert("Please enter UserName or Password")
        }
    }

    callSignIn () {
        axios.post("http://smktesting.herokuapp.com/api/login/",
            {
                "username": this.state.userName,
                "password": this.state.password
            })
            .then(function (response) {
                Alert.alert("Sign In successfully ")
                // eslint-disable-next-line no-console
                console.log("response.data.token", response.data.token)
                AsyncStorage.setItem("Storage_Token", response.data.token)
            })
            .catch(function (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>Login to App</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter UserName"
                    onChangeText={(userName) => this.setState({userName})}/>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry/>
                <View>
                    <TouchableOpacity
                        style={styles.userButton}
                        onPress={() => this.onClickListenerSignUp()}>
                        <Text style={styles.buttontext}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.userButton}
                        onPress = {() => this.onClickListenerSignIn()}>
                        <Text style={styles.buttontext}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.userButton}
                        onPress = {() => this.props.navigation.navigate("Cards")}>
                        <Text style={styles.buttontext}>Without registering</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: NAVY_BLUE,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        color: WHITE,
        fontFamily: "IndieFlower"
    },
    instructions: {
        textAlign: "center",
        color: GRAY,
        marginBottom: 5,
        fontFamily: "Raleway-Medium"
    },
    input: {
        width: "90%",
        backgroundColor: WHITE,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    },
    userButton: {
        backgroundColor: LIGHT_BLUE,
        padding: 10,
        width: w -20,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10
    },

    buttontext: {
        fontSize: 16,
        color: WHITE,
    }
})
