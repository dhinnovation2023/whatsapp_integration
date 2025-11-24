'use client';

import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import ProudiLogo from "./assets/logo.png";

function PageTemplate({ children }: Readonly<{
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
            fontSize: '9px',
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            height: "85%"
        }
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
            padding: '10px 20px',
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f7f7f7",
        }
    })

    return (
        <View style={styleSheet.headerContainer}>
            {/* eslint-disable-next-line */}
            <Image
                src={ProudiLogo.src}
                style={{
                    width: '80px'
                }}
            />
            <Text
                style={{
                    fontWeight: "900"
                }}
            >Warranty Certificate</Text>
        </View>
    )
}

function PageFooter() {

    const styleSheet = StyleSheet.create({
        footerContainer: {
            width: '100%',
            padding: '10px 20px',
            backgroundColor: "#fccc00"
        },
        footerText: {
            fontSize: '10px'
        }
    })

    return (
        <View style={styleSheet.footerContainer}>
            <Text style={styleSheet.footerText}>
                Issued by: Proudi Trading FZE Al Sajaa Industrial, Sharjah – Behind Emirates Road,
                Office/Warehouse No. 1 Phone: +971 56 43 05 251 | Email: info@proudi.ae Office: SRTI Freezone,
                Sharjah, United Arab Emirates Phone: +971 67 15 0164 | Email: proudisolarsolution@gmail.com
            </Text>
        </View>
    )
}

export default PageTemplate;