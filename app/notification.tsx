import React from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA NOTIFIKASI ---
const NOTIFICATION_DATA = [
    {
        id: '1',
        title: 'Paket Anda Telah Tiba',
        message: 'Paket dari Tokopedia (Resi: JP123456) telah diterima oleh resepsionis di Lobby Utama.',
        date: 'Hari ini, 10:30',
        type: 'package',
        isRead: false,
    },
    {
        id: '2',
        title: 'Tagihan IPL Bulan Ini',
        message: 'Tagihan IPL dan Sinking Fund periode April 2026 telah terbit. Segera lakukan pembayaran sebelum 15 April.',
        date: 'Kemarin, 08:00',
        type: 'billing',
        isRead: false,
    },
    {
        id: '3',
        title: 'Pemeliharaan Lift Tower A',
        message: 'Akan ada pemeliharaan rutin Lift Penumpang nomor 2 pada hari Sabtu, 15 April 2026 pukul 22:00 - 04:00.',
        date: '12 Apr 2026',
        type: 'announcement',
        isRead: true,
    },
    {
        id: '4',
        title: 'Pemesanan Fasilitas Disetujui',
        message: 'Pemesanan BBQ Area untuk tanggal 20 April 2026 telah dikonfirmasi oleh Building Management.',
        date: '10 Apr 2026',
        type: 'facility',
        isRead: true,
    },
];

export default function NotificationScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const getIconName = (type: string) => {
        switch (type) {
            case 'package': return 'package-variant-closed';
            case 'billing': return 'receipt';
            case 'announcement': return 'bullhorn';
            case 'facility': return 'calendar-check';
            default: return 'bell-outline';
        }
    };

    const renderNotificationItem = ({ item }: { item: typeof NOTIFICATION_DATA[0] }) => (
        <TouchableOpacity
            // Menggunakan ternary operator (? : null) untuk menghindari error &&
            style={[styles.card, !item.isRead ? styles.unreadCard : null]}
            activeOpacity={0.7}
            onPress={() => alert(`Membuka detail notifikasi: ${item.title}`)}
        >
            <View style={[styles.iconContainer, !item.isRead ? styles.unreadIconBg : styles.readIconBg]}>
                <MaterialCommunityIcons
                    name={getIconName(item.type) as any}
                    size={24}
                    color={!item.isRead ? "#FFFFFF" : "#0F5B44"}
                />
            </View>

            <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                    <Text style={[styles.title, !item.isRead ? styles.unreadText : null]}>{item.title}</Text>
                    {/* Mengubah && menjadi ternary operator untuk indikator dot */}
                    {!item.isRead ? <View style={styles.unreadDot} /> : null}
                </View>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                <Text style={styles.date}>{item.date}</Text>
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
                <Text style={styles.headerTitle}>Notifikasi</Text>

                {/* Komentar dipindah ke atas agar tidak memicu error spasi teks */}
                {/* Jarak kosong penyeimbang */}
                <View style={{ width: 24 }} />
            </View>

            {/* --- DAFTAR NOTIFIKASI --- */}
            <FlatList
                data={NOTIFICATION_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderNotificationItem}
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
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E8EAE8',
    },
    unreadCard: {
        backgroundColor: '#F0F9F4',
        borderColor: '#CDE5D8',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    unreadIconBg: { backgroundColor: '#0F5B44' },
    readIconBg: { backgroundColor: '#E8F5E9' },
    textContainer: { flex: 1, justifyContent: 'center' },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    title: { fontSize: 14, color: '#333333', flex: 1, marginRight: 8 },
    unreadText: { fontWeight: 'bold', color: '#0F5B44' },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D32F2F' },
    message: { fontSize: 12, color: '#757575', marginBottom: 6, lineHeight: 18 },
    date: { fontSize: 10, color: '#A9A9A9' },
});