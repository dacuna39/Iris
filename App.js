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
import SearchView from './components/SearchView';

export default class App extends React.Component {

	render() {
    	return (
			<View style={styles.appContainer}>

				<Header />
				<SearchView />
				<Footer />

			</View>
    	);
	}//end render
	  
}// end class app

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	bodyElement: {
		width: '100%',
		height: '80%',
		flexDirection: 'column', //sets primary row
		justifyContent: "center", //sets spacing of primary row
		alignItems: 'center', //sets spacing of secondary row
	},
});
