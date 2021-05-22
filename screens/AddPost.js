import { usePreventScreenCapture } from 'expo-screen-capture';
import React,{ useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, FlatList, ActivityIndicator, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, MaterialIcons, Feather  } from '@expo/vector-icons';
// import EditScreenInfo from '../components/EditScreenInfo';
// import {  } from '../components/Themed';
import { Button, Icon, Input } from "../components";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actions } from '../reducer/redux-saga/modules/post';
import { actions as frndactions } from '../reducer/redux-saga/modules/friends';

const { width, height} = Dimensions.get('window');

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}


const NewPost = (props) => {

    usePreventScreenCapture();
  const navigation = useNavigation();

  const [file, useFile] = useState(null);
  const[isLogin,setIsLogin] = useState(false);
  const[FrndsList,setFrndsList] = useState(null);
  const[userDetails,setUserDetail] = useState(null);
  const[addUsers,setaddUsers] = useState(false);
  const[selectedCheck,setselectedCheck] = useState(null);
  const[selectedEmail,setselectedEmail] = useState(null);
  const[isLoading,setIsLoading] = useState(false);
  const[state,setState] = useState({
    is_text: false,
    text: null,
  })

  useEffect(() => {
    async function getUserDetails() {
      let data = await getData();
      if(data && data.id){
        setUserDetail(data)
        setIsLogin(false)
        props.getMyFrndsList(data.id);
      }else{
        setIsLogin(true)
      }
    }
    getUserDetails();
  },[]);

  useEffect(() => {
    if(props && props.my_frnds_list){
      setFrndsList(props.my_frnds_list);
    }
  },[props && props.my_frnds_list])

  const postCloudinary = () => {
    if(file){
        setIsLoading(true)
      let url = "https://api.cloudinary.com/v1_1/dev-techs/auto/upload";
      console.log(file, '.............../////file')
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "myupload");
      console.log("fomdaa", formData)
      async function haicall() {
        await fetch(url, {
          body: formData,
          headers: {
            'content-type':'multipart/form-data'
          },
          method: 'POST'
        })
          .then(async response => {
            let data = await response.json();
            if (data.secure_url) {             
              uploadForm(data)
            }
          })
          .catch(err => {
            setIsLoading(false);
            console.log('Cannot upload////////', err);
          });  
      }      
      haicall();
    }else{
        Alert.alert("Insert Fields First")
    }
  }

  const uploadForm = (data) => {
    console.log('Upload successful///',data);
    let users = selectedEmail && Object.values(selectedEmail);
    let name = users ? userDetails.email +","+ users.toString() : userDetails.email
    let value = {
      file_name: data.original_filename,
      file_url: data.url,
      file_type: data.resource_type,
      file_id: data.public_id,
      accessor_names: name,
      is_text: false,
      text: null
    }
    props.createMyPost(value);
    setIsLoading(false);
    navigation.navigate("Home")
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {

      if (response.type == 'success') {
    
        let { name, size, uri } = response;
        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType
        };
        useFile(fileToUpload);
      }
    
    
    });
}

const updateselectedList = (index, value, email) => {
  setselectedCheck({...selectedCheck, [index]: value});
  if(value === true){
    setselectedEmail({...selectedEmail, [index]: email})
  }else{
    let key = index;
    const{[key]: foo, ...newObj} = selectedEmail;
    setselectedEmail(newObj);
  }
}


const submitPost = () => {
  if(state.is_text){
      if(state.text && state.text.length > 10){
          setIsLoading(true)
          let users = selectedEmail && Object.values(selectedEmail);
          let name = users ? userDetails.email +","+ users.toString() : userDetails.email
          console.log('user ////',users)
          let data = {
            filename: null,
            file_url: null,
            file_type: "Text",
            file_id: null,
            accessor_names: name,
            is_text: true,
            text: state.text
          }
          props.createMyPost(data);
          navigation.navigate("Home")
      }else{
          Alert.alert("Petition Should be length greater than 10")
      }
  }else{
    console.log('else condition')
    postCloudinary()
  }
}

const renderItem = ({ item, index }) => (
  <View style={styles.boxstyle}>
      <CheckBox
          disabled={false}
          value={selectedCheck && selectedCheck[index]}
          onValueChange={(newValue) => updateselectedList(index,newValue, item.friend_email)}
        />
      <View style={{marginLeft: 20,justifyContent: 'center'}}>
        <Text style={styles.title}>{item.friend_name}</Text>
      </View>
  </View>
);

  return (
    <View style={styles.container}>
    {/* <View style={styles.headerWrapper}> 
    <View style={styles.headerStyle}>
        <View style={{position: 'absolute', left: 0, backgroundColor: 'grey',}}>
        <Feather name="chevron-left" size={24} onPress={() => navigation.goBack()} color="black" />
        </View>
        <Text style={styles.heading}> Add Post </Text>  
    </View>
    </View> */}
    {isLoading ?
      <ActivityIndicator size="large" color="#000" />:
    <>
    <View style={{marginTop: 50}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CheckBox
        disabled={false}
        value={state.is_text}
        onValueChange={(newValue) => setState({...state, is_text: newValue})}
      />
      <Text style={{fontSize: 20}}>Text Only</Text>
      </View>
      {state.is_text ?
      <Input
      borderless
      placeholder="Enter Text Here"
      value={state.text}
      onChangeText={(data) => setState({...state, text: data  })}
      multiline={true}
      style={styles.input}
      numberOfLines={10}
    />:
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.borderStyle}>
        {file && <Text style={{marginBottom: 20}}>{file && file.name}</Text>}
        <TouchableOpacity
          style={{width: width/ 2, backgroundColor: 'skyblue', height: 50,alignItems: 'center', justifyContent: 'center'}}
          onPress={pickDocument}
        >
          <Text>Select Document</Text>
          </TouchableOpacity>
        </View>
      </View>
      }
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop:40}}>
        <CheckBox
          disabled={false}
          value={addUsers}
          onValueChange={(newValue) => setaddUsers(newValue)}
        />
        <Text style={{fontSize: 20}}>Add Users</Text>
      </View>
      {addUsers && FrndsList && FrndsList.length > 0 &&
          <FlatList
          data={FrndsList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
    } 
    </View>
    <View style={{position: 'absolute', bottom: 30, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{width: width/ 2, backgroundColor: 'skyblue', height: 50,alignItems: 'center', justifyContent: 'center', borderRadius: 20}}
        onPress={() => submitPost()}
      >
        <Text>Submit Post</Text>
      </TouchableOpacity>
    </View>
    </>}
  </View>
  );
  }

const mapStateToProps = (state) => {
  console.log('is frnd///////',state.friend.my_frnds_list)
  return {
    my_frnds_list: state.friend.my_frnds_list,
  };
};


export default connect(
  mapStateToProps,
  {
    getMyFrndsList: frndactions.getMyFrndsList,
    createMyPost: actions.createMyPost,
  },
)(NewPost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 100,
    width: width,
    backgroundColor: 'grey',
  },
  heading: {
    fontSize: 28
  },
  input: {
    marginTop: 30,
    marginBottom: 30,
  },
  borderStyle: {
    borderWidth: 0.5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    width: width - 50,
  },
  boxstyle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    height: 80,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop:10,
    marginBottom: 10
  }
});
