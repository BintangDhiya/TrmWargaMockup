import React from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA BERITA ---
const NEWS_DATA = [
    {
        id: '1',
        title: 'Jadwal Fogging Rutin Area Apartemen Bulan Ini',
        date: '15 April 2026',
        // Gambar acak dari internet sebagai placeholder
        image: 'https://picsum.photos/seed/fogging/200/200',
    },
    {
        id: '2',
        title: 'Peresmian Fasilitas Gym Baru di Tower B',
        date: '12 April 2026',
        image: 'https://picsum.photos/seed/gym/200/200',
    },
    {
        id: '3',
        title: 'Pemberitahuan: Gangguan Air Sementara',
        date: '10 April 2026',
        image: 'https://picsum.photos/seed/water/200/200',
    },
    {
        id: '4',
        title: 'Lomba Menghias Taman Antar Lantai Menyambut Kemerdekaan',
        date: '05 April 2026',
        image: 'https://picsum.photos/seed/garden/200/200',
    },
];

export default function NewsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const renderNewsItem = ({ item }: { item: typeof NEWS_DATA[0] }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => alert(`Membaca Berita: ${item.title}`)}>
            <Image source={{ uri: item.image }} style={styles.thumbnail} />

            <View style={styles.textContainer}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>

                <View style={styles.readMoreContainer}>
                    <Text style={styles.readMoreText}>Baca selengkapnya</Text>
                    <Ionicons name="arrow-forward" size={12} color="#0F5B44" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            {/* --- HEADER --- */}
            <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Berita & Info</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* --- DAFTAR BERITA --- */}
            <FlatList
                data={NEWS_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderNewsItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
}

// --- STYLING ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7F5' },
    header: {
        backgroundColor: '#0F5B44',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    backButton: { padding: 5 },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    listContainer: { padding: 16 },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E8EAE8',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    thumbnail: {
        width: 100,
        height: 100,
        backgroundColor: '#E0E0E0',
    },
    textContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 10,
        color: '#A9A9A9',
        marginBottom: 4,
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
        lineHeight: 20,
    },
    readMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    readMoreText: {
        fontSize: 12,
        color: '#0F5B44',
        fontWeight: '500',
        marginRight: 4,
    },
});