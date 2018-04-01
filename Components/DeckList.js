import React,{Component} from 'react'
import { View,Text,StyleSheet,ScrollView} from 'react-native'
import { getData,getDecks } from '../lib/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions/index'
import { orange,white,green ,blue} from '../lib/colors'
import { Content,Container,Button } from 'native-base'
class DeckList extends Component{
    componentDidMount=async()=>{
       let decks =  await getDecks()
        this.props.receiveAllDecks(decks)
        
    }
    render(){
    
        const { decks } = this.props

        console.log(this.props)
        return(
            <Container>
            {/* <ScrollView style={styles.container}> */}
                <Content>
                {Object.keys(decks).map((deck)=>{
                    const { title,questions } = decks[deck]
                    return(
                        <View key={deck} style={styles.card}>
                            <Text style={styles.cardText}>{title}</Text>
                            <Text style={styles.subText}>Cards: {questions.length}</Text>
                            <Button block success onPress={()=>this.props.navigation.navigate('DeckView',{entryId:deck})} style={{alignSelf:'stretch',margin:20}}>
                                <Text style={{color:white}}>View Deck</Text>
                            </Button>
                        </View>
                    )
                })}
                </Content>
            {/* </ScrollView> */}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,

        padding:5,
        alignSelf:'stretch'
    },
    card:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
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
    cardText:{
        fontSize:30,
        color:white,
        
    },
    subText:{
        fontSize:20,
        color:white
    },
    cardBtn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

function mapDispatchToProps(dispatch){
    return{
        receiveAllDecks:(decks)=>dispatch(receiveDecks(decks))
    }
}

function mapStateToProps(decks){
    return { 
        decks
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeckList)