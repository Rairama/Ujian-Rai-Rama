import React, {component, Component} from 'react';
import {AppRegistry, FlatList, Text, StyleSheet, View, Image, Dimensions, Platform, TextInput, Alert} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';
import flatLisData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class EditModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            foodName: '',
            foodDescription: '',
            foodImage: ''
        };
    }

    showEditModal = (editingFood, flatListItem) => {
        // console.log('editingFood = ${JSON.stringify(editingFood)}');
        this.setState({
            key: editingFood.key,
            foodName: editingFood.name,
            foodDescription: editingFood.description,
            flatListItem: flatListItem
        });
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
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280,
                    backgroundColor: '#dff9fb'
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal Ditutup Bruh")
                }}>
                    <Text style={{
                        fontSize: 16,
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
                    onChangeText={(text) => this.setState({foodName: text})}
                    placeholder= "Tambahkan Makanan Baru"
                    value={this.state.foodName}
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
                    onChangeText={(text) => this.setState({foodDescription: text})}
                    placeholder= "Tambahkan Deksripsi"
                    value={this.state.foodDescription}
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
                    onChangeText={(text) => this.setState({foodImage: text})}
                    placeholder= "Tambahkan image"
                    value={this.state.foodImage}
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
                        if(this.state.foodName.length == 0 || this.state.foodDescription.length == 0){
                            alert("Form belum diinput");
                            return;
                        }
                        // const newKey = this.generateKey(24);
                        // const newFood = {
                        //     key: newKey,
                        //     name: this.state.foodName,
                        //     imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/18/ef/ba/ec/baso-super-88.jpg",
                        //     description: this.state.foodDescription
                        // };
                        // flatListData.push(newFood);
                        // this.props.parentFlatList.refreshFlatList(newKey);
                        var foundIndex = flatListData.findIndex(item => this.state.key == item.key);
                        if (foundIndex < 0){
                            return;
                        }
                        flatListData[foundIndex].name = this.state.foodName;
                        flatListData[foundIndex].description = this.state.foodDescription;
                        flatListData[foundIndex].imageUrl = this.state.foodImage;
                        this.state.flatListItem.refreshFlatListItem();
                        this.refs.myModal.close();
                    }}
                    >
                        save

                    </Button>
                    </Modal>
        )
    }
}