'use client';

import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import HomeDeluxelogo from "./assets/home-deluxe-logo.png";
import DreamHomeLogo from "./assets/dream-home-innovation-logo.jpeg"
import { CompanyNames } from "./main";

function PageTemplate({ children, title, company }: Readonly<{
    children: React.ReactNode,
    title: string,
    company: CompanyNames,
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
            height: "85%"
        }
    })

    return (
        <Page
            size="A4"
            orientation="portrait"
            style={styleSheet.pageStyle}>
            <PageHeader
                title={title}
                company={company}
            />
            <View style={styleSheet.contentWrapper}>
                {children}
            </View>
            <PageFooter />
        </Page>
    )
}

function PageHeader({ title, company }: {
    title: string,
    company: CompanyNames,
}) {

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
                // src={ProudiLogo.src}
                src={company === "home-deluxe" ? HomeDeluxelogo.src : DreamHomeLogo.src}
                style={{
                    width: '130px'
                }}
            />
            <Text
                style={{
                    fontWeight: "900"
                }}
            >{title}</Text>
        </View>
    )
}

function PageFooter() {

    const styleSheet = StyleSheet.create({
        footerContainer: {
            width: '100%',
            padding: '10px 20px',
            backgroundColor: "#555e59"
        },
        footerText: {
            fontSize: '8px',
            color: "#ffffff",
            textAlign: "center"
        }
    })

    return (
        <View style={styleSheet.footerContainer}>
            <Text style={styleSheet.footerText}>
                {
                    `Proudi Trading FZE | Al Sajaa Industrial, Sharjah – Behind Emirates Road, Office / Warehouse No. 1 Sharjah, United Arab Emirates
Phone: +971 56 43 05 251 | Ph: Phone: +971 67 15 0164 | Web mail: info@proudi.ae | Email: proudisolarsolution@gmail.com`
                }
            </Text>
        </View>
    )
}

export default PageTemplate;