import { AsyncStorage } from 'react-native'

const CARDS_STORAGE = '@udacicards:cards'

const data = {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
              correctAnswer:'false'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
              correctAnswer:'false'
              
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.',
              correctAnswer:true
              
            }
          ]
        }
      }
      

      export const getData=()=>{
          return data
      }

      export function getDecks(deck){
          
          return AsyncStorage.getItem(CARDS_STORAGE)
                .then(res=>{
                    if(res === null){
                        AsyncStorage.setItem(CARDS_STORAGE,JSON.stringify(data))
                        return data
                    }else{
                        return JSON.parse(res)
                    }
                })
      }

      export function saveDeckTitle(title){
          return AsyncStorage.mergeItem(CARDS_STORAGE,JSON.stringify({
              [title]:{
                  title:title,
                  questions:[]
              }
          }))
      }

      export function addCardToDeck(name,card){
          return AsyncStorage.getItem(CARDS_STORAGE)
            .then(results=>JSON.parse(results))
            .then(results=>{
                results[name].questions.push(card)
                AsyncStorage.setItem(CARDS_STORAGE,JSON.stringify(results))
                    return results
            })
      }