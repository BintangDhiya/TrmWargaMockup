import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA PAKET ---
const PACKAGE_DATA = [
    {
        id: '1',
        courier: 'JNE / J&T',
        receiptNo: 'JP1234567890',
        arriveDate: '15 Apr 2026, 14:30',
        location: 'Lobby Tower A',
        status: 'received', // Paket ada di lobby
    },
    {
        id: '2',
        courier: 'GoSend / GrabExpress',
        receiptNo: 'GOS-987654321',
        arriveDate: '14 Apr 2026, 10:15',
        location: 'Pos Satpam Depan',
        status: 'received',
    },
    {
        id: '3',
        courier: 'Shopee Express',
        receiptNo: 'SPX1122334455',
        arriveDate: '10 Apr 2026, 16:00',
        location: 'Lobby Tower A',
        status: 'confirmed', // Paket sudah diambil penghuni
    },
    {
        id: '4',
        courier: 'SiCepat',
        receiptNo: '000999888777',
        arriveDate: '02 Apr 2026, 11:20',
        location: 'Lobby Tower A',
        status: 'confirmed',
    },
];

export default function PackageScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State untuk Tab
    const [activeTab, setActiveTab] = useState<'received' | 'confirmed'>('received');

    // Filter data berdasarkan tab aktif
    const filteredData = PACKAGE_DATA.filter(item => item.status === activeTab);

    const renderPackageCard = ({ item }: { item: typeof PACKAGE_DATA[0] }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                    <MaterialCommunityIcons
                        name={item.status === 'received' ? "package-variant-closed" : "package-variant"}
                        size={24}
                        color="#0F5B44"
                    />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.courierName}>{item.courier}</Text>
                    <Text style={styles.receiptNo}>Resi: {item.receiptNo}</Text>
                </View>

                {/* Tombol Konfirmasi (Hanya muncul jika statusnya 'received') */}
                {item.status === 'received' ? (
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => alert(`Mengonfirmasi pengambilan paket: ${item.receiptNo}`)}
                    >
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.badgeDone}>
                        <Text style={styles.badgeDoneText}>Taken</Text>
                    </View>
                )}
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBody}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Arrive Date</Text>
                    <Text style={styles.detailValue}>{item.arriveDate}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Location</Text>
                    <Text style={styles.detailValue}>{item.location}</Text>
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
                <Text style={styles.headerTitle}>Package Info</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* --- TOP TABS --- */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'received' ? styles.activeTabButton : null]}
                    onPress={() => setActiveTab('received')}
                >
                    <Text style={[styles.tabText, activeTab === 'received' ? styles.activeTabText : null]}>Received</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'confirmed' ? styles.activeTabButton : null]}
                    onPress={() => setActiveTab('confirmed')}
                >
                    <Text style={[styles.tabText, activeTab === 'confirmed' ? styles.activeTabText : null]}>Confirmed</Text>
                </TouchableOpacity>
            </View>

            {/* --- DAFTAR PAKET --- */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderPackageCard}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Tidak ada data paket.</Text>
                }
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
        borderBottomColor: '#0F5B44',
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

    // List & Card Styling
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
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    courierName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 2,
    },
    receiptNo: {
        fontSize: 12,
        color: '#757575',
    },
    confirmButton: {
        backgroundColor: '#0F5B44',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    badgeDone: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    badgeDoneText: {
        color: '#A9A9A9',
        fontSize: 12,
        fontWeight: 'bold',
    },
    divider: { height: 1, backgroundColor: '#E8EAE8', marginBottom: 12 },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        alignItems: 'flex-start',
        flex: 1,
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
});