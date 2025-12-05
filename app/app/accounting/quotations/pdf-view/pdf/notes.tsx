'use client';

import { QuotationsModelInterface } from "@/models/accounting/quotation";
import { Text, View } from "@react-pdf/renderer";

const QuotationPDFNotes = ({ notes }: {
    notes: QuotationsModelInterface["note"],
}) => {

    if (!notes) {
        return;
    }

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}
        >
            
            {notes.map((note, index) => (
                <View
                    key={index}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                    }}
                >
                    <Text
                        style={[
                            {
                                fontSize: "14px",
                                fontWeight: "800",
                            }
                        ]}
                    >{note.heading}</Text>
                    <Text
                        style={[
                            {
                                fontSize: "10px",
                            }
                        ]}
                    >{note.content}</Text>
                </View>
            ))}

        </View>
    )
}

export default QuotationPDFNotes