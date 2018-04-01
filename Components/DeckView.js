import React,{Component} from 'react'
import { StyleSheet,View,Text } from 'react-native'
import { getData } from '../lib/api'
import { connect } from 'react-redux'
import { purple,white ,red,orange,blue,green} from '../lib/colors'
import ActionButton from './ActionButton'
import  { getCardsLength } from '../lib/helpers'
class DeckView extends Component{
    render(){
        const deck = this.props.navigation.state.params.entryId
        const { decks } = this.props
        const questions = decks[deck].questions
        console.log(deck)
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.mainText}>{decks[deck].title}</Text>
                    <Text style={styles.subText}>{questions?getCardsLength(questions):null}</Text>

                    <ActionButton styles={styles} text={'Add Card'} 
                    onPress={()=>this.props.navigation.navigate('AddCard',{entryId:deck})}
                    color={green} />
                    <ActionButton styles={styles} text={'Start Quiz'} 
                    onPress={()=>this.props.navigation.navigate('Quiz',{entryId:deck})}
                    color={red}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:white,
        padding:10
    },
    card:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        backgroundColor:blue,
        margin:10,
        height:200,
        borderRadius:10,
        shadowColor:'rgba(0,0,0,0.34)',
        shadowOffset:{
            width:0,
            height:3,
        },
        shadowRadius:4,
        shadowOpacity:1
    },
    iosBtn:{
        padding:10,
        borderRadius:7,
        height:45,
        margin:5,
        width:170
    },
    submitBtnText:{
        color:white,
        fontSize:20,
        textAlign:'center'
    },
    mainText:{
        fontSize:40,
        color:white
    },
    subText:{
        fontSize:20,
        color:white,
        marginBottom:160
    }
})

function mapStateToProps(decks){
    return { decks }
}
export default connect(mapStateToProps)(DeckView)