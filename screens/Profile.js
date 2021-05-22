import { usePreventScreenCapture } from 'expo-screen-capture';
import React, {useState, useEffect } from 'react';  
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@user')
  } catch(e) {
    // error reading value
  }
}

const thumbMeasure = (width - 48 - 32) / 3;

const Profile = () => {

  usePreventScreenCapture();
  const navigation = useNavigation();
  const[isLogin,setIsLogin] = useState(false);
  const[UserDetails,setUserDetails] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getUserDetails() {
      let data = await getData();
      console.log('user details', data);
      if(data && data.id){
        setIsLogin(false)
        setUserDetails(data)
        // props.getMyPosts(data.email);
      }else{
        navigation.navigate("Login")
      }
    }
    getUserDetails();
  },[isFocused]);

  const onSignOutPress = () => {
    removeData().then(res => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      navigation.navigate("Login")
    })
  }

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {UserDetails && UserDetails.name}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      {UserDetails && UserDetails.email}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button style={{marginBottom: 100}} onPress={() =>  onSignOutPress()}>
              <Text>LOGOUT</Text>
            </Button>
          </View>
          </ImageBackground>
        </Block>
       
      </Block>
    );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
