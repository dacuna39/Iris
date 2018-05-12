/*
 *  App.js
 *  The master app that contains all of the components
 *  Author: Diego Acuna Ortega
 * 
 */

import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

import Header from './components/Header';
import Footer from './components/Footer';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.pixabayAPIKey = "8964609-fec68bc2775d3e80f5269372c"; //account key to use pixabay's database
    this.queryString = "https://pixabay.com/api/?key=" + this.pixabayAPIKey;

    this.state = {
      searchText: "",
    };
  }

  // example pixabay search request:
  // https://pixabay.com/api/?key=8964609-fec68bc2775d3e80f5269372c&q=yellow+flowers&image_type=photo
  // full docs at https://pixabay.com/api/docs/

  createQueryString = () => { //adds query(q) and any other desired parameters into the url

    var query = this.queryString + "&q="

    //gets all search terms into the query string
    var searchTerms = this.state.searchText.split(" ");
    for (var i=0; i < searchTerms.length; i++){
      query += searchTerms[i];

      if (searchTerms[i+1] != undefined){
        query += "+";
      }
    }

    alert(query);
    return query
  }

  searchImage = () => {

    var requestURL = this.createQueryString();

    fetch(requestURL, {
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',	
			}
    })
    .then(response => { //checks if get was successful

			if (response.status == 200){
        alert("success!");
        
			} else {
				alert("An error occurred, please try again later");
				//console.log('formPayload: ' + JSON.stringify(formPayload));
			}
		})
    
  }//end searchImage

  render() {
    return (
      <View style={styles.container}>

        <Header />
      
        <View style={styles.body}>
          <Text style={styles.h1}> Welcome to IRIS! </Text>
          <Text style={styles.h2}> Search for images on the web! </Text>

          <TextInput
            style={styles.textInput}
            placeholder="Search Here"
            onChangeText={(text) => this.setState({searchText: text})}
            />

          <Button onPress={this.searchImage} title="Search" />
          <Text> </Text>
          <Text> Powered by the Pixabay API </Text>
        </View>

        <Footer />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  body: {
    width: '100%',
    height: '80%',
    flexDirection: 'column', //sets primary row
    justifyContent: "center", //sets spacing of primary row
    alignItems: 'center', //sets spacing of secondary row
  },
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 20,
  },
  textInput: {
    width: "60%",
    height: 40,
    fontSize: 16,
    textAlign: "center",
  },
});
