import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Details from './Details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: [],
    }
  }

  componentWillMount() {
    fetch('http://localhost:3000/alaskan-airports')
      .then(res => res.json())
      .then(airports => this.setState({ airports }))
      .catch(console.error);
  }

  render() {
    const { airports } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={airports}
          keyExtractor={(x, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.LocationID}
              style={styles.listItem}
              onPress={() => this.props.navigation.navigate('Details', { airports, airport: item })}
            >
              <Text>{item.LocationID}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    padding: 40,
  }
});

export default StackNavigator({
  App: {
    screen: App,
  },
  Details: {
    screen: Details,
  }
});
