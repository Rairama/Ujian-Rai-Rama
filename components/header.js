import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Header(){
    return(
<View style={styles.header}>
    <Text style={styles.title}>Menu Makan</Text>
</View>
    )
}
const styles = StyleSheet.create({
header: {
    height: 80,
    paddingTop: 20,
    backgroundColor: '#2f3542',
    borderWidth: 3,
    borderRadius: 70,
    borderColor: '#7ed6df',
    margin: 8
},
title: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
}
});