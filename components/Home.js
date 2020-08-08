import React from 'react';
import {Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import iconresto from '../icons/iconresto1.png'
import restoran from '../icons/restoran.jpg'
import BasicFlatListData from './BasicFlatListData';

const HomeScreen = ({navigation}) => {
    return (
        <ImageBackground source={restoran} style={{flex: 1, padding: 40}}>
            <View style={{flex: 1, backgroundColor :'white', borderRadius: 25}}>
                <View style={{alignItems: 'center'}}>
                <Image source={iconresto} style={{width: 200, height: 200}}/>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate(BasicFlatListData)}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{
                            padding: 10,
                            margin: 5,
                            backgroundColor: 'black',
                            borderRadius: 15,
                            color : 'white',
                            textAlign: 'center',
                            width: 300,
                        }}>
                            Special Menu
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const Stack = createStackNavigator();
const Home = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="BasicFlatListData" component={BasicFlatListData} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Home;