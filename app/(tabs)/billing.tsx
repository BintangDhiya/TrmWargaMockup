import React from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- MOCK DATA TAGIHAN DIPERBARUI ---
const BILLING_DATA = [
    {
        id: '1',
        title: 'Iuran Pemeliharaan Lingkungan (IPL)',
        invoiceNo: 'BILL/22/04/0002',
        unit: '11/J T1',
        billedTo: 'Tsabit G',
        invoiceDate: '01-04-2022',
        dueDate: '15-04-2022',
        amount: 'Rp 850.000',
        isPaid: false,
    },
    {
        id: '2',
        title: 'Tagihan Air & Listrik',
        invoiceNo: 'BILL/22/04/0003',
        unit: '11/J T1',
        billedTo: 'Tsabit G',
        invoiceDate: '01-04-2022',
        dueDate: '15-04-2022',
        amount: 'Rp 320.000',
        isPaid: false,
    },
    {
        id: '3',
        title: 'Sinking Fund',
        invoiceNo: 'BILL/22/03/0015',
        unit: '11/J T1',
        billedTo: 'Tsabit G',
        invoiceDate: '01-03-2022',
        dueDate: '15-03-2022',
        amount: 'Rp 100.000',
        isPaid: true,
    },
];

export default function BillingScreen() {
    const router = useRouter();

    const renderBillingCard = ({ item }: { item: typeof BILLING_DATA[0] }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
                router.push({
                    pathname: '/billing-detail',
                    params: {
                        title: item.title,
                        invoiceNo: item.invoiceNo,
                        unit: item.unit,
                        billedTo: item.billedTo,
                        invoiceDate: item.invoiceDate,
                        dueDate: item.dueDate,
                        amount: item.amount,
                        isPaid: item.isPaid ? 'true' : 'false', // Ubah boolean menjadi string
                    }
                });
            }}
        >

            {/* Bagian Atas Card: Judul dan Badge Paid */}
            <View style={styles.cardHeader}>
                <View style={styles.titleContainer}>
                    <Ionicons name="receipt-outline" size={20} color="#0F5B44" />
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>

                {/* Indikator Lunas */}
                {item.isPaid && (
                    <View style={styles.paidBadge}>
                        <Text style={styles.paidText}>PAID</Text>
                    </View>
                )}
            </View>

            <View style={styles.divider} />

            {/* Bagian Bawah Card: Detail Invoice Baru */}
            <View style={styles.cardBody}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Invoice No</Text>
                    <Text style={styles.detailValue}>{item.invoiceNo}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Unit</Text>
                    <Text style={styles.detailValue}>{item.unit}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Billed To</Text>
                    <Text style={styles.detailValue}>{item.billedTo}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Invoice Date</Text>
                    <Text style={styles.detailValue}>{item.invoiceDate}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Due Date</Text>
                    <Text style={[styles.detailValue, { color: item.isPaid ? '#333333' : '#D32F2F' }]}>
                        {item.dueDate}
                    </Text>
                </View>

                {/* Garis pemisah kecil untuk total */}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Tagihan</Text>
                    <Text style={styles.amountText}>{item.amount}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Billing</Text>
            </View>

            <FlatList
                data={BILLING_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderBillingCard}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

// --- BAGIAN STYLING ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F7F5',
    },
    header: {
        backgroundColor: '#0F5B44',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E8EAE8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0F5B44',
        marginLeft: 8,
        flex: 1,
    },
    paidBadge: {
        backgroundColor: '#5CB85C',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginLeft: 10,
    },
    paidText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#E8EAE8',
        marginBottom: 12,
    },
    cardBody: {
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: '#757575',
    },
    detailValue: {
        fontSize: 12,
        color: '#333333',
        fontWeight: '500',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    totalLabel: {
        fontSize: 14,
        color: '#333333',
        fontWeight: 'bold',
    },
    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F5B44', // Menggunakan warna hijau tua untuk total agar selaras
    },
});