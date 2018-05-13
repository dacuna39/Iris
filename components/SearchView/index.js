/*
 *  SearchView
 *  component that has the search bar, appears on intial load
 *  Author: Diego Acuna Ortega
 * 
 */

import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, Button, Alert } from 'react-native';

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
        var query = this.queryString + "&q=";
    
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
                
                for (var i=0; i < results.totalHits && i < 100; i++){ //max 30 results
                    searchObjects.push(results.hits[i]);
                }
                //console.log("searchObjects", searchObjects);

                this.setState({ resultObjects: searchObjects });
            }
            else {
                alert("No results found");
            }
        })
        .catch((error) => alert("An error occurred, please try again later"));
        
    }//end searchImage

    renderImages = () => {
        return this.state.resultObjects.map((img) => {
            if (img != undefined){
                return (
                    <Image key={img.id} source={{uri: img.previewURL}} />
                );
            } 
        });
    }

    render() {

        if (this.state.resultObjects.length == 0){ //return initial search prompt
            return (
                <View style={styles.bodyElement}>
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
            );
        }

        else { //found results
            return (
                <View style={styles.bodyElement}>
                    <Text> Found {this.state.resultObjects.length} results for {this.state.searchText} </Text>
                    <ScrollView>
                        {this.renderImages()}
                    </ScrollView>

                    <Button onPress={() => {this.setState({resultObjects: []}) }} title="   Back   "/>
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
