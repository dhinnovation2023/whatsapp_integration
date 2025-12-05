'use client';

import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import ProudiLogo from "./assets/logo.png";
import SealSignatureImage from "./assets/prodi-seal-with-sign.png";

function QuotationPageTemplate({ children }: Readonly<{
    children: React.ReactNode,
}>) {

    const styleSheet = StyleSheet.create({
        pageStyle: {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-between"
        },
        contentWrapper: {
            padding: '15px 25px',
            fontSize: '11px',
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            height: "360px",
        },
    })

    return (
        <Page
            size="A4"
            orientation="portrait"
            style={styleSheet.pageStyle}>
            <PageHeader />
            <View style={styleSheet.contentWrapper}>
                {children}
            </View>
            <PageFooter />
        </Page>
    )
}

function PageHeader() {

    const styleSheet = StyleSheet.create({
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#ffffff",
        }
    })

    return (
        <View style={styleSheet.headerContainer}>
            <View
                style={{
                    padding: "8px 20px"
                }}
            >
                {/* eslint-disable-next-line */}
                <Image
                    src={ProudiLogo.src}
                    style={{
                        width: '80px'
                    }}
                />
            </View>
            <View
                style={{
                    width: "100%",
                    backgroundColor: "#FFAD00",
                    padding: "0 20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}
            >
                <Text
                    style={{
                        backgroundColor: "white",
                        padding: "0 10px",
                        maxWidth: "180px",
                        fontSize: "25px",
                        fontWeight: "800",
                        border: "1px solid white",
                        textTransform: "uppercase"
                    }}
                >Quotation</Text>
            </View>
        </View>
    )
}

function PageFooter() {

    const styleSheet = StyleSheet.create({
        footerContainer: {
            width: '100%',
            padding: '10px 20px',
            backgroundColor: "#000000"
        },
        footerText: {
            fontSize: '8px',
            color: "#ffffff",
            textAlign: "center"
        }
    })

    return (
        <View>

            <View
                style={{
                    padding: "0 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px"
                }}
            >
                <Text
                    style={[
                        {
                            fontSize: "10px"
                        }
                    ]}
                >Bank Details</Text>

                <View>
                    {
                        [
                            {
                                label: "NAME:",
                                value: "PROUDI TRADING (FZE)",
                            },
                            {
                                label: "BANK NAME:",
                                value: "MASHREQ BANK",
                            },
                            {
                                label: "IBAN NO:",
                                value: "AE820330000019100954469",
                            },
                            {
                                label: "ACCOUNT NO:",
                                value: "019100954469",
                            },
                            {
                                label: "SWIFT CODE:",
                                value: "BOMLAEAD",
                            },
                            {
                                label: "ACCOUNT CIF NUMBER:",
                                value: "014118309",
                            },
                            {
                                label: "MASHREQ BANK PSC, UAE, DUBAI",
                                value: "",
                            },
                            {
                                label: "ACCOUNT TYPE:",
                                value: "CURRENT ACCOUNT",
                            }
                        ].map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    {
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "3px",
                                        fontSize: "9px"
                                    },
                                ]}
                            >
                                <Text
                                    style={{ fontWeight: "800" }}
                                >{item.label}</Text>
                                <Text>{item.value}</Text>
                            </View>
                        ))
                    }
                </View>

            </View>

            <View
                style={{
                    padding: "15px 20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                }}
            >
                <View>
                    {/* eslint-disable-next-line */}
                    <Image
                        src={SealSignatureImage.src}
                        style={{
                            width: "120px",
                        }}
                    />

                    <Text
                        style={{
                            fontSize: "10px",
                            fontWeight: "800",
                        }}
                    >For PROUDI SOLAR SOLUTION</Text>
                </View>

                <View>
                    <Text
                        style={{
                            fontSize: "10px",
                            fontWeight: "800",
                        }}
                    >Customer name and signature</Text>
                </View>

            </View>

            <View style={styleSheet.footerContainer}>
                <Text style={styleSheet.footerText}>
                    {
                        `Proudi Trading FZE | Al Sajaa Industrial, Sharjah – Behind Emirates Road, Office / Warehouse No. 1 Sharjah, United Arab Emirates
Phone: +971 56 43 05 251 | Ph: Phone: +971 67 15 0164 | Web mail: info@proudi.ae | Email: proudisolarsolution@gmail.com`
                    }
                </Text>
            </View>
        </View>
    )
}

export default QuotationPageTemplate;