import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA ORDER SHOP ---
const SHOP_ORDERS = [
    {
        id: '1',
        orderName: 'Air Mineral Galon',
        unit: '11/J T1',
        deliveryTime: '16 Apr 2026, 10:00',
        brand: 'Aqua',
        qty: 2,
        isPaid: true,
        status: 'on-progress',
    },
    {
        id: '2',
        orderName: 'Gas Elpiji 12kg',
        unit: '11/J T1',
        deliveryTime: '16 Apr 2026, 13:00',
        brand: 'Pertamina',
        qty: 1,
        isPaid: false,
        status: 'on-progress',
    },
    {
        id: '3',
        orderName: 'Laundry Pakaian',
        unit: '11/J T1',
        deliveryTime: '14 Apr 2026, 18:00',
        brand: 'CleanWash Laundry',
        qty: 5,
        isPaid: true,
        status: 'done',
    },
    {
        id: '4',
        orderName: 'Pembersihan AC',
        unit: '11/J T1',
        deliveryTime: '10 Apr 2026, 09:00',
        brand: 'KlinKlin Service',
        qty: 2,
        isPaid: true,
        status: 'done',
    },
];

export default function ShopScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State untuk Tab
    const [activeTab, setActiveTab] = useState<'on-progress' | 'done'>('on-progress');

    // Filter data berdasarkan tab aktif
    const filteredData = SHOP_ORDERS.filter(item => item.status === activeTab);

    const renderOrderCard = ({ item }: { item: typeof SHOP_ORDERS[0] }) => (
        <View style={styles.card}>

            {/* --- Bagian Atas: Judul & Status Bayar --- */}
            <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                    <MaterialCommunityIcons name="shopping-outline" size={24} color="#0D47A1" />
                </View>
                <Text style={styles.orderName}>{item.orderName}</Text>

                {/* Badge Paid / Not Paid */}
                <View style={[styles.paidBadge, item.isPaid ? styles.badgePaid : styles.badgeNotPaid]}>
                    <Text style={[styles.textPaid, item.isPaid ? styles.textPaid : styles.textNotPaid]}>
                        {item.isPaid ? 'PAID' : 'NOT PAID'}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* --- Bagian Bawah: Detail Pesanan --- */}
            <View style={styles.cardBody}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Brand</Text>
                    <Text style={styles.detailValue}>{item.brand}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Unit</Text>
                    <Text style={styles.detailValue}>{item.unit}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Delivery Time</Text>
                    <Text style={styles.detailValue}>{item.deliveryTime}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Qty</Text>
                    <Text style={styles.detailValue}>{item.qty}</Text>
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
                <Text style={styles.headerTitle}>Shop Orders</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* --- TOP TABS --- */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'on-progress' ? styles.activeTabButton : null]}
                    onPress={() => setActiveTab('on-progress')}
                >
                    <Text style={[styles.tabText, activeTab === 'on-progress' ? styles.activeTabText : null]}>On-Progress</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'done' ? styles.activeTabButton : null]}
                    onPress={() => setActiveTab('done')}
                >
                    <Text style={[styles.tabText, activeTab === 'done' ? styles.activeTabText : null]}>Done</Text>
                </TouchableOpacity>
            </View>

            {/* --- DAFTAR PESANAN --- */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderCard}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Tidak ada pesanan.</Text>
                }
            />

            {/* --- TOMBOL BAWAH --- */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.createOrderBtn}
                    onPress={() => alert('Membuka katalog toko...')}
                >
                    <Ionicons name="cart" size={20} color="#FFFFFF" style={styles.btnIcon} />
                    <Text style={styles.createOrderText}>Create Order</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

// --- STYLING (MENGGUNAKAN TEMA BIRU) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7F9' }, // Background dengan hint biru
    header: {
        backgroundColor: '#0D47A1', // Biru Tua
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    backButton: { padding: 5 },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },

    // Tabs
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EAE8',
    },
    tabButton: { flex: 1, paddingVertical: 15, alignItems: 'center' },
    activeTabButton: {
        borderBottomWidth: 3,
        borderBottomColor: '#0D47A1', // Penanda tab aktif (Biru Tua)
    },
    tabText: { fontSize: 14, color: '#757575', fontWeight: '500' },
    activeTabText: { color: '#0D47A1', fontWeight: 'bold' },

    // List & Cards
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
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#E3F2FD', // Latar icon biru muda pucat
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    orderName: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333333',
    },
    paidBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgePaid: { backgroundColor: '#E3F2FD' }, // Biru pucat
    badgeNotPaid: { backgroundColor: '#FFEBEE' }, // Merah pucat
    textPaid: { color: '#2196F3', fontSize: 10, fontWeight: 'bold' }, // Biru Terang
    textNotPaid: { color: '#D32F2F', fontSize: 10, fontWeight: 'bold' }, // Merah
    divider: { height: 1, backgroundColor: '#E8EAE8', marginBottom: 12 },
    cardBody: { gap: 8 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    detailLabel: { fontSize: 12, color: '#757575' },
    detailValue: { fontSize: 13, fontWeight: '600', color: '#333333' },
    emptyText: { textAlign: 'center', color: '#A9A9A9', marginTop: 30 },

    // Bottom Button
    bottomNav: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E8EAE8',
    },
    createOrderBtn: {
        backgroundColor: '#0D47A1', // Biru Tua
        paddingVertical: 15,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnIcon: { marginRight: 8 },
    createOrderText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});