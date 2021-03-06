import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { blue, mustard } from '../utils/colors'

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
      title: deckTitle
    }
  }
  render() {
    const { deck, numCards } = this.props
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.numQuestions}>{deck.questions.length} cards</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: blue }]}
            onPress={() =>
              this.props.navigation.navigate('NewCard', {
                deckTitle: deck.title
              })
            }
          >
            <Text style={styles.addCardButtonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={numCards === 0}
            style={[
              styles.button,
              { backgroundColor: numCards === 0 ? 'gray' : mustard }
            ]}
            onPress={() => {
              this.props.navigation.navigate('Quiz', {
                deckTitle: deck.title
              })
            }}
          >
            <Text style={styles.addCardButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 50
  },
  numQuestions: {
    color: '#767676',
    fontSize: 30
  },
  button: {
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    borderRadius: 7,
    marginRight: 60,
    marginLeft: 60
  },
  addCardButtonText: {
    color: 'white',
    fontSize: 25
  }
})

function mapStateToProps(state, props) {
  const { deckTitle } = props.navigation.state.params
  return {
    deck: state[deckTitle],
    numCards: state[deckTitle].questions.length
  }
}

export default connect(mapStateToProps)(IndividualDeck)
