// Contoh untuk app/(tabs)/billing.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function CSScreen() {
    return (
        <View style={styles.container}>
            <Text>Halaman CS</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});