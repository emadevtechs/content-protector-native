import { usePreventScreenCapture } from 'expo-screen-capture';
import React, {useState, useEffect } from 'react';  
import { StyleSheet, Dimensions, ScrollView, Linking, FlatList, Alert,
  TouchableOpacity,
  Modal,
  View,
  TouchableHighlight,
  ActivityIndicator } from 'react-native';
import { Block, theme,Text } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { actions } from '../reducer/redux-saga/modules/friends';
import { UserCard } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const Users = (props) => {

  usePreventScreenCapture();
  const navigation = useNavigation();
  const[isLogin,setIsLogin] = useState(false);
  const[usersList,setUsersList] = useState(null);
  const[userDetails,setUserDetail] = useState(null);
  const[ModalOpen,setModalOpen] = useState(false);
  const[selectedItem,setSelectedItem] = useState(null);
  const[isFrnd,setIsFrnd] = useState(false);
  const[isFrndLoading,setIsFrndLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getUserDetails() {
      let data = await getData();
      if(data && data.id){
        setUserDetail(data)
        setIsLogin(false)
        props.getUsersList();
      }else{
        setIsLogin(true)
        navigation.navigate('Login')
      }
    }
    getUserDetails();
  },[isFocused]);

  useEffect(() => {
    if(props && props.users_list){
      setUsersList(props.users_list)
    }
  },[props && props.users_list]);

  useEffect(() => {
    if(props){
      setIsFrndLoading(props.isFrndLoading)
    }
  },[props && props.isFrndLoading]);

  useEffect(() => {
    if(props){
      setIsFrnd(props.isFriend)
    }
  },[props && props.isFriend]);

  // console.log('user list', usersList);

  const onItemPress = (item) => {
    setSelectedItem(item);
    props.findIsFriend({friend_name: item.name, user_id: userDetails.id })
    setModalOpen(true)
  }

  const onFrndPress = () => {
    setModalOpen(false);
    isFrnd ? props.setUnFriend({friend_name: selectedItem.name,user_id: userDetails.id}) : props.setAddFriend({friend_email: selectedItem.email, friend_name: selectedItem.name,user_id: userDetails.id})
  }


  const renderItem = ({ item }) => {
      return (<Block flex row>
        <UserCard
          item={item}
          onItemCall={onItemPress}
          style={{ marginRight: theme.SIZES.BASE }}
        />
      </Block>)
  };

  const renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        {isLogin ?
      <Text> You Need to Login/Register First</Text>
      :
        <Block flex>
          {usersList && <FlatList
            data={usersList}
            renderItem={renderItem}
            // numColumns={2}
          />}
        </Block>
        }
      </ScrollView>
    )
  }

    return (
      <Block flex center style={styles.home}>
        {renderArticles()}
        <Modal
        animationType="slide"
        transparent={true}
        visible={ModalOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {isFrndLoading ?
             <ActivityIndicator size="large" />
             :
             <>
            <Text style={styles.modalText}>{selectedItem && selectedItem.name}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                onFrndPress()
              }}>
              <Text style={styles.textStyle}>{isFrnd ? "Remove Friend" : "Add Friend" }</Text>
            </TouchableHighlight></>}
          </View>
        </View>
      </Modal>
      </Block>
    );
}

const mapStateToProps = (state) => {
  console.log('state.post.my_posts',state.post.my_posts)
  return {
    users_list: state.friend.users_list,
    isFriend: state.friend.isFriend,
    isFrndLoading: state.friend.isFrndLoading,
  };
};


export default connect(
  mapStateToProps,
  {
    getUsersList: actions.getUsersList,
    findIsFriend: actions.findIsFriend,
    setAddFriend: actions.setAddFriend,
    setUnFriend: actions.setUnFriend,

  },
)(Users);

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 160,
    width: width - 60,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
});

// export default Home;
