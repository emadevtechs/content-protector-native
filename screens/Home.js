import { usePreventScreenCapture } from 'expo-screen-capture';
import React, {useState, useEffect } from 'react';  
import { StyleSheet, Dimensions, ScrollView, Linking, FlatList } from 'react-native';
import { Block, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actions } from '../reducer/redux-saga/modules/post';
import { Card } from '../components';
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

const Home = (props) => {
  usePreventScreenCapture();
  const navigation = useNavigation();
  const[isLogin,setIsLogin] = useState(false);
  const[Myposts,setMyPosts] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getUserDetails() {
      let data = await getData();
      console.log('user details', data);
      if(data && data.id){
        setIsLogin(false)
        props.getMyPosts(data.email);
      }else{
        navigation.navigate("Login")
      }
    }
    getUserDetails();
  },[isFocused]);

  useEffect(()=> {
    if(props && props.my_posts){
      setMyPosts(props.my_posts);
    }
  },[props && props.my_posts]);

  const linkPress = (url) => {
    Linking.openURL(url);
  }

  const renderItems = ({item}) => {
    return(
      <Block flex row>
        <Card item={item} style={{ marginRight: theme.SIZES.BASE }} />
      </Block>
    )
  }

  const renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {Myposts && <FlatList
            data={Myposts}
            renderItem={renderItems}
            numColumns={2}
          />}
        </Block>
      </ScrollView>
    )
  }

    return (
      <Block flex center style={styles.home}>
        {renderArticles()}
      </Block>
    );
}

const mapStateToProps = (state) => {
  console.log('state.post.my_posts',state.post.my_posts)
  return {
    my_posts: state.post.my_posts,
  };
};


export default connect(
  mapStateToProps,
  {
    getMyPosts: actions.getMyPosts,
  },
)(Home);

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

// export default Home;
