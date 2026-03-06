import React from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA DEPOSIT ---
const DEPOSIT_DATA = [
    {
        id: '1',
        requestNo: 'DEP/26/04/0012',
        typeRequest: 'Deposit Renovasi Unit',
        requestDate: '15 Apr 2026',
        status: 'Pending', // Menunggu persetujuan
    },
    {
        id: '2',
        requestNo: 'DEP/26/04/0008',
        typeRequest: 'Deposit Sewa Ruang Serbaguna',
        requestDate: '10 Apr 2026',
        status: 'Approved', // Sudah disetujui & dibayar
    },
    {
        id: '3',
        requestNo: 'DEP/26/03/0045',
        typeRequest: 'Deposit Fitting Out',
        requestDate: '01 Mar 2026',
        status: 'Refunded', // Sudah dikembalikan ke penghuni
    },
    {
        id: '4',
        requestNo: 'DEP/26/02/0021',
        typeRequest: 'Deposit Pindah Keluar (Move Out)',
        requestDate: '15 Feb 2026',
        status: 'Rejected', // Ditolak
    },
];

export default function DepositScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Fungsi untuk menentukan warna badge berdasarkan status
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Pending': return { bg: '#FFF3E0', text: '#E65100' }; // Oranye
            case 'Approved': return { bg: '#E3F2FD', text: '#1565C0' }; // Biru
            case 'Refunded': return { bg: '#E8F5E9', text: '#2E7D32' }; // Hijau
            case 'Rejected': return { bg: '#FFEBEE', text: '#C62828' }; // Merah
            default: return { bg: '#F5F5F5', text: '#757575' }; // Abu-abu
        }
    };

    const renderDepositCard = ({ item }: { item: typeof DEPOSIT_DATA[0] }) => {
        const statusStyle = getStatusStyle(item.status);

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                        <MaterialCommunityIcons name="cash-refund" size={24} color="#0F5B44" />
                        <Text style={styles.requestNo}>{item.requestNo}</Text>
                    </View>

                    {/* Badge Status Dinamis */}
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardBody}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Type Request</Text>
                        <Text style={styles.detailValue}>{item.typeRequest}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Request Date</Text>
                        <Text style={styles.detailValue}>{item.requestDate}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            {/* --- HEADER --- */}
            <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Deposit Info</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* --- DAFTAR DEPOSIT --- */}
            <FlatList
                data={DEPOSIT_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderDepositCard}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    requestNo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 8,
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginLeft: 10,
    },
    statusText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    divider: { height: 1, backgroundColor: '#E8EAE8', marginBottom: 12 },
    cardBody: { gap: 8 },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: '#A9A9A9',
    },
    detailValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333333',
        flexShrink: 1,
        textAlign: 'right',
    },
});