import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nearestThreeAirports: [],
    }
  }

  componentWillMount() {
    const { airport, airports } = this.props.navigation.state.params;
    console.log(JSON.stringify({ airport }));
    fetch('http://localhost:3000/nearest-three-alaskan-airports', {
      method: 'POST',
      body: JSON.stringify({ airport }),
    })
      .then(res => res.json())
      .then(nearestThreeAirports => {
        this.setState({ nearestThreeAirports });
      })
      .catch((err) => console.error('error', err));
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.nearestThreeAirports)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
