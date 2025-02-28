import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import vacationDestinations, { VacationDestination } from './constants/list_items';

const Lab4: React.FC = () => {
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([]);

  const toggleSelection = (index: number) => {
    setSelectedDestinations(prevState =>
      prevState.includes(index) ? prevState.filter(i => i !== index) : [...prevState, index]
    );
  };

  const renderDestination = ({ item, index }: { item: VacationDestination; index: number }) => (
    <TouchableOpacity onPress={() => toggleSelection(index)}>
      <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 18 }}>{item.location}</Text>
        <Text>Price: ${item.price}</Text>
        <Text>Average Temperature: {item.average_yearly_temperature}</Text>
        {selectedDestinations.includes(index) && <Text>{"\u2705"}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Choose the destinations you would like a quote for
      </Text>
      <FlatList
        data={vacationDestinations}
        renderItem={renderDestination}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Lab4;