import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA RESERVASI ---
const RESERVATION_DATA = [
    {
        id: '1',
        facilityName: 'BBQ Area Tower A',
        startDate: '20 Apr 2026',
        startTime: '16:00',
        endTime: '20:00',
        status: 'process', // Sedang diajukan/berjalan
    },
    {
        id: '2',
        facilityName: 'Lapangan Tenis',
        startDate: '22 Apr 2026',
        startTime: '08:00',
        endTime: '10:00',
        status: 'process',
    },
    {
        id: '3',
        facilityName: 'Ruang Rapat Utama',
        startDate: '10 Apr 2026',
        startTime: '13:00',
        endTime: '15:00',
        status: 'done', // Sudah selesai
    },
    {
        id: '4',
        facilityName: 'Ruang Karaoke',
        startDate: '05 Apr 2026',
        startTime: '19:00',
        endTime: '21:00',
        status: 'done',
    },
];

export default function FacilityScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State untuk mengatur tab yang aktif ('process' atau 'done')
    const [activeTab, setActiveTab] = useState<'process' | 'done'>('process');

    // Filter data berdasarkan tab yang sedang dipilih
    const filteredData = RESERVATION_DATA.filter(item => item.status === activeTab);

    const renderReservationCard = ({ item }: { item: typeof RESERVATION_DATA[0] }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <MaterialCommunityIcons name="calendar-clock" size={20} color="#0F5B44" />
                <Text style={styles.facilityName}>{item.facilityName}</Text>

                {/* Badge Status */}
                <View style={[styles.statusBadge, item.status === 'done' ? styles.badgeDone : styles.badgeProcess]}>
                    <Text style={styles.statusText}>
                        {item.status === 'process' ? 'Process' : 'Done'}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBody}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Start Date</Text>
                    <Text style={styles.detailValue}>{item.startDate}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Start Time</Text>
                    <Text style={styles.detailValue}>{item.startTime}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>End Time</Text>
                    <Text style={styles.detailValue}>{item.endTime}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            {/* --- HEADER --- */}
            <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Facility Reservation</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* --- TOP TABS --- */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'process' ? styles.activeTabButton : null]}
                    onPress={() => setActiveTab('process')}
                >
                    <Text style={[styles.tabText, activeTab === 'process' ? styles.activeTabText : null]}>Process</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'done' ? styles.activeTabButton : null]}
                    onPress={() => setActiveTab('done')}
                >
                    <Text style={[styles.tabText, activeTab === 'done' ? styles.activeTabText : null]}>Done</Text>
                </TouchableOpacity>
            </View>

            {/* --- DAFTAR RESERVASI --- */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderReservationCard}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                // Tampilan jika data kosong
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Tidak ada data reservasi.</Text>
                }
            />

            {/* --- TOMBOL CHOOSE FACILITY (NEW RESERVATION) --- */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.newReservationButton}
                    onPress={() => alert('Membuka form pemesanan fasilitas...')}
                >
                    <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" style={styles.addIcon} />
                    <Text style={styles.newReservationButtonText}>Choose Facility</Text>
                </TouchableOpacity>
            </View>

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

    // Tab Styling
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EAE8',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
    },
    activeTabButton: {
        borderBottomWidth: 3,
        borderBottomColor: '#0F5B44', // Garis hijau tua penanda aktif
    },
    tabText: {
        fontSize: 14,
        color: '#757575',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#0F5B44',
        fontWeight: 'bold',
    },

    // List Styling
    listContainer: { padding: 16 },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E8EAE8',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    facilityName: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeProcess: { backgroundColor: '#FFF3E0' }, // Latar oranye muda
    badgeDone: { backgroundColor: '#E8F5E9' }, // Latar hijau muda
    statusText: { fontSize: 10, fontWeight: 'bold', color: '#555555' },
    divider: { height: 1, backgroundColor: '#E8EAE8', marginBottom: 12 },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        alignItems: 'flex-start',
    },
    detailLabel: {
        fontSize: 11,
        color: '#A9A9A9',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333333',
    },
    emptyText: {
        textAlign: 'center',
        color: '#A9A9A9',
        marginTop: 30,
    },

    // Bottom Button Styling
    bottomNav: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E8EAE8',
    },
    newReservationButton: {
        backgroundColor: '#0F5B44',
        paddingVertical: 15,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: { marginRight: 8 },
    newReservationButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});