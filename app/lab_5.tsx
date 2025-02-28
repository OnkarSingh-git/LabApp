import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CallAPI from './components/CallAPI';

const Lab5: React.FC = () => {
  const [showCallAPI, setShowCallAPI] = useState<boolean>(false);
  const handleSubmit = () => {
    setShowCallAPI(!showCallAPI);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lab 5: API Call with useEffect</Text>
      <Button title={showCallAPI ? 'Hide' : 'Submit'} onPress={handleSubmit} />
      {showCallAPI && <CallAPI />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
});

export default Lab5;
