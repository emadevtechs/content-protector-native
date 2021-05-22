import { usePreventScreenCapture } from 'expo-screen-capture';
import React, {useState,useEffect} from 'react';  
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Alert,
  ActivityIndicator
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actions } from '../reducer/redux-saga/modules/user';

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const Register = (props) => {

  usePreventScreenCapture();
  const navigation = useNavigation();
  const[state,setState] = useState({
    name: null,
    email: null,
    password: null
  })
  const[confirm_password,setConPass] = useState(null);
  const[loading,setLoading] = useState(false);

  useEffect(() => {
    if(props && props.registerMessage){
      console.log('props.resss',props.registerMessage)
      setLoading(false)
      Alert.alert(
        'Response',
        props.registerMessage,
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: () => props.registerMessage === "Create User Successfully" ? navigateLogin() : null},
        ],
        { cancelable: false }
      )
    }
  },[props && props.registerMessage]);

  const navigateLogin = () => {
    props.clearMessage();
    navigation.navigate("Login")
  }

  const onSubmitPress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(state.name === null || state.name.length > 3){
    if (reg.test(state.email)) {
        if(state.password === confirm_password){
          console.log('hai state////', state)
          setLoading(true)
          props.createUser(state)
        }else{
          Alert.alert('Password are not same')
        }
    }else{
      Alert.alert('Enter Proper Email')
    }
  }else{
    Alert.alert("Name is Too Short")
  }
  }

    return (
      <Block flex middle>
        <StatusBar hidden />
        {loading ?
        <ActivityIndicator size="large" color="#00ff00" />
        :
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Sign Up the classic way
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Name"
                        value={state.name}
                        onChangeText={(data) => setState({...state, name: data})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        value={state.email}
                        onChangeText={(data) => setState({...state, email: data})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        value={state.password}
                        secureTextEntry={true}
                        onChangeText={(data) => setState({...state, password: data})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block>
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Confirm Password"
                        value={confirm_password}
                        onChangeText={data => setConPass(data)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" onPress={() => onSubmitPress()} style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                    <View style={{marginTop: 30,justifyContent: 'center', alignItems: 'center'}}>
                      <Text onPress={() => navigation.navigate("Login")} style={{fontSize: 15, color: 'darkblue',textDecorationLine: 'underline',}}>
                        Already have an account
                      </Text>
                    </View>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
        }
      </Block>
    );
}

const mapStateToProps = (state) => {
  return {
      registerMessage: state.user.userRegisterMessage,
  };
};


export default connect(
  mapStateToProps,
  {
    createUser: actions.createUser,
    clearMessage: actions.clearMessage
  },
)(Register);

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

// export default Register;
