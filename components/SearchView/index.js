/*
 *  SearchView
 *  component that has the search bar, appears on intial load
 *  Author: Diego Acuna Ortega
 * 
 */

import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, Button, FlatList } from 'react-native';

export default class SearchView extends React.Component {

    constructor(props){
        super(props);
    
        this.pixabayAPIKey = "8964609-fec68bc2775d3e80f5269372c"; //account key to use pixabay's database
        this.queryString = "https://pixabay.com/api/?key=" + this.pixabayAPIKey;
    
        this.state = {
          searchText: "",
          resultObjects: [],
        };
    }
    
    // example pixabay search request:
    // https://pixabay.com/api/?key=8964609-fec68bc2775d3e80f5269372c&q=yellow+flowers&image_type=photo
    // full docs at https://pixabay.com/api/docs/
    
    createQueryString = () => { //adds query(q) and any other desired parameters into the url   
        var query = this.queryString + "&per_page=100&q=";
    
        //gets all search terms into the query string
        var searchTerms = this.state.searchText.split(" ");
        for (var i=0; i < searchTerms.length; i++){
            query += searchTerms[i];
    
            if (searchTerms[i+1] != undefined){
                query += "+";
            }
        }
        //alert(query);
        return query
    }
    
    searchImage = () => {   
        var requestURL = this.createQueryString();
        var searchObjects = [];
    
        fetch(requestURL, { //get request
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',	
            }
        })
        .then(response => { //checks if get was successful
            if (response.status == 200){
                return response.json();
            } else {
                alert("Could not access the Pixabay server");
                return null;
            }
        })
        .then(results => { //handles results
            if (results != null && results.totalHits > 0){ //totalHits is # of accessible image urls from pixabay
                for (var i=0; i < results.hits.length; i++){ //length of hits is determined by per_page param in request
                    if (results.hits[i] != undefined){
                        searchObjects.push(results.hits[i]);
                    }
                }

                this.setState({ resultObjects: searchObjects }, () => console.log("resultObjects ", this.state.resultObjects.length));
            }
            else {
                alert("No results found");
            }
        })
        .catch((error) => alert(error));
        
    }//end searchImage

    render() {

        if (this.state.resultObjects.length == 0){ //return initial search prompt
            return (
                <View style={styles.bodyElement}>
                    <Text style={styles.h1}> Welcome to IRIS! </Text>
                    <Text style={styles.h2}> Search for images on the web! </Text>
        
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search Here"
                        value={this.state.searchText}
                        onChangeText={(text) => this.setState({searchText: text})}
                    />
        
                    <Button onPress={this.searchImage} title="Search" />
                    <Text> </Text>
                    <Text> Powered by the Pixabay API </Text>
                    <Image source={require('Iris/components/Images/pixabayLogo.png')} 
                        style={{width: 160, height: 31}} />
                </View>
            );
        }

        else { //found results
            return (
                <View style={styles.bodyElement}>
                    <Text style={styles.h2}> Results for {this.state.searchText} </Text>

                    <FlatList
                        contentContainerStyle={styles.imageContainer}
                        data={this.state.resultObjects}
                        renderItem={({item}) => <Image key={item.id}
                                                    style={{width:item.webformatWidth/2, height:item.webformatHeight/2}}
                                                    //style={{flex:1, alignSelf: 'stretch'}}
                                                    source={{uri:item.webformatURL}
                                                } />
                        }
                    />

                    <Button onPress={() => {this.setState({resultObjects: []}) }} title="   Back   "/>
                    <Text></Text>
                </View>
            );
        }//end else
        
    }//end render
}

const styles = StyleSheet.create({
    bodyElement: {
      width: '100%',
      height: '80%',
      flexDirection: 'column', //sets primary row
      justifyContent: 'center', //sets spacing of primary row
      alignItems: 'center', //sets spacing of secondary row
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',       
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
