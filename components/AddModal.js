import React, {component, Component} from 'react';
import {AppRegistry, FlatList, Text, StyleSheet, View, Image, Dimensions, Platform, TextInput, Alert} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class AddModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            newFoodName: '',
            newFoodDescription: '',
            newFoodImage: ''
        };
    }

    showAddModal = () => {
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    }

    render(){
        return (
            <Modal
            ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'android' ? 30 : 0,
                    shadowRadius: 20,
                    width: screen.width - 80,
                    height: 300,
                    backgroundColor: '#dff9fb'
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal Ditutup Bruh")
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>Kriteria Makanan</Text>
                    <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'black',
                        marginHorizontal: 30,
                        marginTop: 20,
                        marginBottom: 20,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({newFoodName: text})}
                    placeholder= "Tambahkan Makanan Baru"
                    value={this.state.newFoodName}
                    />

                    <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'black',
                        marginHorizontal: 30,
                        marginTop: 20,
                        marginBottom: 20,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({newFoodDescription: text})}
                    placeholder= "Tambahkan deskripsi"
                    value={this.state.newFoodDescription}
                    />

                    <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'black',
                        marginHorizontal: 30,
                        marginTop: 20,
                        marginBottom: 20,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({newFoodImage: text})}
                    placeholder= "Tambahkan image"
                    value={this.state.newFoodImage}
                    />

                    <Button style={{
                        fontSize: 15, color: 'white'
                    }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'skyblue'
                    }}
                    onPress={() => {
                        if(this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0){
                            alert("Form belum diinput");
                            return;
                        }
                        const newKey = this.generateKey(24);
                        const newFood = {
                            key: newKey,
                            name: this.state.newFoodName,
                            imageUrl: this.state.newFoodImage,
                            description: this.state.newFoodDescription
                        };
                        flatListData.push(newFood);
                        this.props.parentFlatList.refreshFlatList(newKey);
                        this.refs.myModal.close();
                    }}
                    >
                        save

                    </Button>
                    </Modal>
        )
    }
}