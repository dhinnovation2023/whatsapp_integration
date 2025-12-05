import { QuotationsModelInterface } from '@/models/accounting/quotation'
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { QuotationPDFCustomProductInterface } from '.';

const QuotationPDFProductTable = ({ products }: {
    products: QuotationPDFCustomProductInterface[],
}) => {

    const styles = StyleSheet.create({
        table: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            borderWidth: 1,
            borderColor: "#c9cdd3",
        },
        row: {
            flexDirection: "row",
        },
        evenRow: {
            backgroundColor: "#f2f2f2",
        },
        cell: {
            width: "200px",
            padding: 10,
            fontSize: 10,
        },
        cellFirst: {
            minWidth: "50%",
        },
        lastCell: {
            borderRightWidth: 0,
        },
        header: {
            backgroundColor: "#2c2c2c",
            fontWeight: "bold",
            color: "#ffffff"
        },
    });


    return (
        <View>

            <View
                style={[
                    styles.table
                ]}>

                {/* Header */}
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.cell, styles.cellFirst]}>Product</Text>
                    <Text style={styles.cell}>Qty</Text>
                    <Text style={styles.cell}>Price</Text>
                    <Text style={[styles.cell, styles.lastCell]}>Total</Text>
                </View>

                {/* Rows */}
                {products.map((product, index) => (
                    <View style={
                        [
                            styles.row, 
                            (index + 2) % 2 === 1 ? styles.evenRow : {},
                        ]
                    } key={index}>
                        <Text style={[styles.cell, styles.cellFirst]}>{product.productName}</Text>
                        <Text style={styles.cell}>{product.qty}</Text>
                        <Text style={styles.cell}>{product.price}</Text>
                        <Text style={[styles.cell, styles.lastCell]}>{product.total}</Text>
                    </View>
                ))}

            </View>

        </View>
    )
}

export default QuotationPDFProductTable