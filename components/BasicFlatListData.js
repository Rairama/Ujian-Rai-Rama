import React, {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button, Alert, Platform, TouchableHighlight} from 'react-native';
import Header from '../components/header';
import Swipeout from 'react-native-swipeout';
import flatListData from '../data/flatListData';
import AddModal from './AddModal';
import EditModal from './EditModal';
import 'react-native-gesture-handler';

class FlatListItem extends Component{

    constructor(props){
        super(props);
        this.state={
            show:false,
            activeRowkey: null,
            numberOfRefresh: 0
    };
}
refreshFlatListItem = () => {
    this.setState((prevState) => {
        return{
            numberOfRefresh: prevState.numberOfRefresh + 1
        };
    });
}

    render(){

        const swipeSetting = {
            autoClose: true,
            onClose: (secId, rowId, direction)=>{
                if(this.state.activeRowkey !=null){
                this.setState({activeRowkey: null});
                }
            },

            onOpen: (secId, rowId, direction)=>{
                this.setState({activeRowkey: this.props.item.key});
        },

        right: [
            {
                onPress: () => {
                    // alert("update");
                    this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index],this);
                },
                text: 'Edit', type: 'primary'
            },
            {

                onPress: () => {
                    const deletingRow = this.state.activeRowkey;
                    Alert.alert(
                        'Warning',
                        'Hey bruh, Are you sure?',
                    [
                        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'Yes', onPress: () => {
                            flatListData.splice(this.props.index, 1);
                            this.props.parentFlatList.refreshFlatList(deletingRow); 
                        }},
                    ],
                    {cancelable: true}
                    )
                },
                text: 'Delete', type: 'delete'
            }
        ],
        rowId: this.props.index,
        sectionId: 1
    };

        return(
            <Swipeout {...swipeSetting}>
                <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>

            <View style={{
                marginTop: 15,
                marginHorizontal: 15,
                flex: 1,
                flexDirection: 'row',
                backgroundColor: this.props.index % 2 == 0 ? '#40E0D0': '#008B8B',
                borderRadius: 15
                // backgroundColor :'skyblue'
            }}>

                <Image
                source={{uri:this.props.item.imageUrl}}
                style={{width: 100, height: 100, margin: 5, borderRadius: 80}}>
                </Image>

<View style={{
    flex: 1,
    flexDirection: 'column',
    height: 100
}}>

    <Text style={styles.flatListItem}>{this.props.item.name}</Text>

    <TouchableOpacity 
    onPress={() => {this.setState({show:true})}}>
    <View>
        <Text style={{
            padding: 10,
            margin: 5,
            backgroundColor:'#30336b',
            borderRadius: 10,
            color: 'white',
            textAlign: 'center',
            width: 150,
        }}>
            Selengkapnya!
        </Text>
    </View>
    <Modal
    transparent={true}
    visible={this.state.show}
    >
    <View style={{backgroundColor: '#000000aa', flex: 1}}>
    <View style={{backgroundColor: '#95afc0', margin:50,padding:40,borderRadius:10, flex:1}}>
        
    <Text style={{textAlign : "justify", fontSize: 15, color:'black'}}>{this.props.item.description}</Text>

        <Button title="close" onPress={() => {this.setState({show:false})}}/>
        </View>
        </View>
        </Modal>
    </TouchableOpacity>
    </View>
            </View>
            <View>
           
            
            </View>
            </View>
            </Swipeout>

 
        )
    }
}

const styles = StyleSheet.create({
flatListItem:{
    color: '#000000',
    padding: 10,
    fontSize: 20,
    paddingHorizontal: 25,
    paddingVertical : 10
} 
});

export default class BasicFlatListData extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            deletedRowkey: null,
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }

    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowkey:activeKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }

    _onPressAdd(){
        // alert("Berhasil Ditambahkan");
        this.refs.addModal.showAddModal();
    }

    render (){
        return (
            <View style={{flex:1, marginTop: Platform.OS === 'android' ? 0 : 0}}>
                <Header/>
                    <View
                    style={{
                        backgroundColor: '#57606f',
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <TouchableHighlight
                            style={{marginRight: 10}}
                            underlayColor='#18dcff'
                            onPress={this._onPressAdd}
                            >
                        <Image
                        style={{width: 35, height: 35}}
                        source={require('../icons/icon.png')}
                        />
                        </TouchableHighlight>
                    </View>
                <FlatList
                ref={"flatList"}
                data={flatListData}
                renderItem={({item, index}) => {
                    return (
                        <FlatListItem item={item} index={index} parentFlatList={this}>
                            
                        </FlatListItem>
                    );
                }}
                >
                </FlatList>
                <AddModal ref={'addModal'} parentFlatList={this}>

                </AddModal>
                <EditModal ref={'editModal'} parentFlatList={this}>

                </EditModal>
            </View>
        )
    }
}