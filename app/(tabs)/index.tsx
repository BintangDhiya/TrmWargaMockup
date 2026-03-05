import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MENU_ITEMS = [
    { id: '1', title: 'Building Mgt', icon: 'office-building' },
    { id: '2', title: 'Helpdesk', icon: 'tools' },
    { id: '3', title: 'Deposit', icon: 'cash' },
    { id: '4', title: 'Package', icon: 'package-variant-closed' },
    { id: '5', title: 'Facility Rsv', icon: 'calendar-clock' },
    { id: '6', title: 'News', icon: 'newspaper' },
];

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View style={styles.container}>

            {/* --- BAGIAN HEADER ATAS --- */}
            <View style={[styles.header, { paddingTop: insets.top + 5 }]}>
                <View>
                    <Text style={styles.greeting}>Halo, Penghuni!</Text>
                    <Text style={styles.subGreeting}>Semoga harimu menyenangkan</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.push('/notification')}
                    >
                        <Ionicons name="notifications-outline" size={24} color="#0F5B44" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.push('/(tabs)/profile')}
                    >
                        <Ionicons name="person-circle-outline" size={30} color="#0F5B44" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- BAGIAN MENU TENGAH --- */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.gridContainer}>
                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <View style={styles.menuIconContainer}>
                                <MaterialCommunityIcons name={item.icon as any} size={32} color="#0F5B44" />
                            </View>
                            <Text style={styles.menuText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    greeting: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    subGreeting: { fontSize: 12, color: '#757575', marginTop: 2 },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
    iconButton: { marginLeft: 15 },
    scrollContent: { padding: 20 },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    menuItem: { width: '30%', alignItems: 'center', marginBottom: 20 },
    menuIconContainer: {
        width: 60, height: 60, borderRadius: 15, backgroundColor: '#FFFFFF',
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, marginBottom: 8,
    },
    menuText: { fontSize: 12, color: '#333', textAlign: 'center', fontWeight: '500' },
});