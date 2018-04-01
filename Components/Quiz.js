import React from 'react'
import { NavigationActions } from 'react-navigation'
import { View,Text,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Animated } from 'react-native'
import { white,orange,purple,red,green,blue } from '../lib/colors'
import SubmitButton from './SubmitButton'
import ActionButton from './ActionButton'
import { connect }  from 'react-redux'
import { Info } from './Info'
class Quiz extends React.Component{
    state={
        questionNumber:0,
        showQuestion:false,
        correct:0,
        incorrect:0,
        animation: new Animated.Value(0.5)
    }

    showAnswer=()=>{
        this.setState(prevState=>{
            return{
                showQuestion:!prevState.showQuestion
            }
        })
    }

    submitAnswer = (answer)=>{
        this.handleAnimation()
        const { questionNumber } = this.state
        const deck = this.props.navigation.state.params.entryId
        const decks = this.props.decks
        const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()
        console.log(decks[deck].questions[questionNumber].question)
        if(answer.trim()===correct.trim()){
            this.setState({correct: this.state.correct + 1})
        }else{
            this.setState({incorrect:this.state.incorrect+1})
        }

        this.setState({questionNumber:this.state.questionNumber+1,showQuestion:false})

    }

    handleAnimation = () =>{
        Animated.spring(this.state.animation,{
            toValue:1.5,
            friction:2,
            tension:360,
            duration:1000
        }).start(()=>{
            Animated.spring(this.state.animation,{
                toValue:1,
                duration:100
            }).start()
        })
    }

    tryAgain=()=>{
        this.setState({
            questionNumber:0,
            showQuestion:false,
            correct:0,
            incorrect:0
        })
    }

    goBack=()=>{
        this.props.navigation.dispatch(NavigationActions.back({key:null}))
    }

    
    render(){
        const questionNumber = this.state.questionNumber
        const decks = this.props.decks
        const deck = this.props.navigation.state.params.entryId
        const number = this.state.questionNumber+1

        const animatedStyle={
            transform:[
            {scale: this.state.animation}
            ]
        }

    
        if(questionNumber === decks[deck].questions.length){
            return(
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Animated.View style={animatedStyle}>
                        <Text>You got {this.state.correct} out of {decks[deck].questions.length}!</Text>
                        </Animated.View>
                        <ActionButton styles={styles}  text={'Try Again'} color={red} onPress={this.tryAgain}/>
                        <ActionButton styles={styles}  text={'Go Back'} color={green} onPress={this.goBack}/>
                       
                    </View>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.questions}>{number}/{decks[deck].questions.length}</Text>
                    {!this.state.showQuestion?<Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>:
                    <Text style={styles.mainText}>{decks[deck].questions[questionNumber].answer}</Text>
                    }

                    {!this.state.showQuestion?<Info style={styles.answer} text={'Show Answer'} onPress={this.showAnswer}></Info>
                        : <Info style={styles.answer} text={'Show Question'} onPress={this.showAnswer}></Info>
                    }

                    <ActionButton color={green} styles={styles}  text={'Correct'} onPress={()=>this.submitAnswer('true')}/>
                    <ActionButton color={red} styles={styles}  text={'Incorrect'} onPress={()=>this.submitAnswer('false')}/>
                </View>
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
    iosBtn:{
        padding:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        height:45,
        margin:5,
        width:160
    },
    SubmitBtnText:{
        color:white,
        fontSize:25,
        textAlign:'center',
    },
    questions:{
        top:0,
        alignSelf:'flex-start',
        left:0,
        color:white,
        fontSize:20,
        margin:5,
        position:'absolute'
    },
    answer:{
        color:white,
        fontSize:20,
        margin:20,

    },
    card:{
        flex:1,
        justifyContent:'space-around',
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
    mainText:{
        fontSize:40,
        color:white,
        marginTop:40,
        textAlign:'center'

    },
   
})

function mapStateToProps(decks){
    return{
        decks
    }
}

export default connect(mapStateToProps)(Quiz)