import React,{ Component } from 'react'
import { StyleSheet,View,Text,TextInput,Dimensions } from 'react-native'
import { Button } from 'native-base'
import { saveDeckTitle } from '../lib/api'
import {  addDeck } from '../actions/index'
import { connect } from 'react-redux'
class AddDeck extends Component{
    state={
        text:''
    }

    submitName=()=>{
        const {text}=this.state
        if(this.state.text){
            saveDeckTitle(text)
            this.props.dispatch(addDeck(text))
            this.props.navigation.navigate('DeckView',{entryId:text})
            this.setState({ text:'' })
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>New Deck Name?</Text>
                <TextInput style={styles.input} onChangeText={(text)=>this.setState({text})} value={this.state.text} />

                <Button  success onPress={()=>this.submitName()} style={styles.submitButton}>
                    <Text style={{color:'#fff',fontSize:20,textAlign:'center'}}>Add Deck</Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:Dimensions.get('window').width * 9/10,
        height:40,
        padding:10,
        borderWidth:1,
        borderColor:'#757575',
        borderRadius:8
    },
    title:{
        fontSize:30,
        color:'#333',
    },
    submitButton:{
     alignSelf:'stretch',
     margin:20,
     justifyContent:'center'
    }
})
export default connect()(AddDeck)