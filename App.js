import React from 'react';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';
import DeckList from './Components/DeckList'
import { TabNavigator,StackNavigator } from 'react-navigation'
import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'
import { purple,white,orange } from './lib/colors'
import AddDeck from './Components/AddDeck'
import DeckView from './Components/DeckView'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import AddCard from './Components/AddCard'
import { Constants } from 'expo'
import Quiz from './Components/Quiz'
import { setLocalNotification } from './lib/helpers';
function MyStatusBar({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor,height:Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = TabNavigator({
  DeckList:{
    screen:DeckList,
    navigationOptions:{
      tabBarLabel:'Decks',
      tabBarIcon:({ tintColor }) => <MaterialCommunityIcons name="cards" size={30} color={tintColor}/>
    }
  },
  AddDeck:{
    screen:AddDeck,
    navigationOptions:{
      tabBarLabel:'Add Deck',
      tabBarIcon:({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor}/>
    }
  }
},{
  tabBarOptions:{
    activeTintColor:orange,
    style:{
      height:56,
      backgroundColor:white
    }
  }
})

const MainNavigator = StackNavigator({
  Home:{
    screen:Tabs,
    navigationOptions:{
      header:null
    }
  },
  DeckView:{
    screen:DeckView,
    navigationOptions:{
      title:'Deck Info',
      headerTintColor:white,
      headerStyle:{
        backgroundColor:orange
      }
    }
  },
  AddCard:{
    screen:AddCard,
    navigationOptions:{
      title:'Add Color',
      headerTintColor:white,
      headerStyle:{
        backgroundColor:orange
      }
    }
  },
  Quiz:{
    screen:Quiz,
    navigationOptions:{
      title:'Quiz',
      headerTintColor:white,
      headerStyle:{
        backgroundColor:orange
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount=()=>{
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}> 
      <View style={{flex:1}}>
        <MyStatusBar backgroundColor={orange} barStyle='light-content'/>
       <MainNavigator />
        
      </View>
      </Provider>
    );
  }
}

