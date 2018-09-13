import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

import ClienteListItem from './ClienteListItem';

const ClienteList = props => {
	const { clientes, onPressItem } = props;

	return (
		<FlatList 
			style={styles.container}
			data={clientes} 
			renderItem={({ item }) => (
				<ClienteListItem
					people={item}
					navigateToPeopleDetail={onPressItem} />
			)}
			keyExtractor={item => item.cliente} />
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5'
	},
})

export default ClienteList;