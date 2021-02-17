

import React from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import UsersMap from './Components/UsersMap'



import FetchLocation from './Components/FetchLocation'

export default class App extends React.Component{
  render(){
  state={
    userLocation : null,
    usersPlaces : []
  }
   const getLocationHandler = () => {
    Geolocation.getCurrentPosition(
      position =>{
        this.setState({
          userLocation:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
          
        });
        fetch("https://winter-sensor-299907-default-rtdb.firebaseio.com/places.json", {
          method:"POST",
          body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          })
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
      },err =>console.log(err)
    )}
    const getUserPlacesHandler = () =>{
      fetch('https://winter-sensor-299907-default-rtdb.firebaseio.com/')
      .then(res=>res.json())
      .then(parsedRes=>{
        const placeArray = [];
        for(const key in parsedRes) {
          placeArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id : key
          })
        }
        this.setState({
          usersPlaces : placeArray
        })
      })
      .catch(err=>console.log(err))
    }
  
    return(
      <View style={styles.container}>
        <View style={{marginBottom:20}}>
          <Button title="Get User Location" onPress={getUserPlacesHandler} />
        </View>
      <FetchLocation  onGetLocation={getLocationHandler} />
      <UsersMap userLocation={state.userLocation} usersPlaces={state.usersPlaces}/>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
      
   
      
  }
})

