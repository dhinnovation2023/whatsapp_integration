import Heading from '@/components/ui-elements/heading'
import ListItems from '@/components/ui-elements/list-items'
import Paragraph from '@/components/ui-elements/paragraph'
import BasicLayout from '@/layouts/basic-layout'
import Link from 'next/link'
import React from 'react'

const TermsOfServices = () => {
    return (
        <BasicLayout>

            <div
                className='space-y-[15px]'
            >
                <h1
                    className='text-2xl font-bold font-jost'
                >Terms of Service</h1>

                <Paragraph>
                    <b>Last Updated</b>: November 6, 2025
                </Paragraph>

                <Paragraph>
                    Welcome to EtihadSouq.ae (“the Site”, “we”, “us”, or “our”). By accessing or using this website, you agree to comply with and be bound by the following Terms of Service (“Terms”). Please read them carefully before using the Site.
                </Paragraph>

                <Paragraph>
                    If you do not agree with any part of these Terms, you must not access or use the Site.
                </Paragraph>

                <Heading>
                    1. Purpose of the Site
                </Heading>

                <Paragraph>
                    EtihadSouq.ae is a personal-use platform created and managed by the owner for testing, development, and integration of WhatsApp communication features through the official Meta API.
                </Paragraph>

                <Paragraph>
                    This platform is not a public service, marketplace, or commercial communication platform. Any functionality is intended solely for private, non-commercial, and experimental use.
                </Paragraph>

                <Paragraph>
                    2. Use of the Site
                </Paragraph>

                <Paragraph>
                    You agree to use the Site only for lawful and authorized purposes.
                </Paragraph>

                <Paragraph>
                    You must not:
                </Paragraph>

                <ListItems
                    listItems={
                        [
                            "Use the Site to send spam, unsolicited messages, or promotional material.",
                            "Attempt to exploit, harm, or access unauthorized systems or data.",
                            "Reverse engineer, copy, or misuse any API or data connected to Meta (WhatsApp).",
                            "Violate Meta’s policies, terms, or developer guidelines.",
                        ]
                    }
                />

                <Paragraph>
                    Any violation may result in immediate termination of access.
                </Paragraph>

                <Heading>
                    3. Meta (WhatsApp) API Integration
                </Heading>

                <Paragraph>
                    EtihadSouq.ae uses the official Meta API for WhatsApp-related communication features. By using these features, you agree to comply with all applicable Meta Terms of Service, WhatsApp Business Policies, and API usage guidelines.
                </Paragraph>

                <Paragraph>
                    EtihadSouq.ae does not store or share chat data beyond what is necessary for the functioning of the integrated tools.
                </Paragraph>

                <Heading>
                    4. Data and Privacy
                </Heading>

                <Paragraph>
                    While this platform is for personal use, some basic data (such as phone numbers, chat messages, and timestamps) may be processed to enable WhatsApp communication. We do not sell, distribute, or publicly share any data collected through this Site. For more information, please refer to our Privacy Policy (if available).
                </Paragraph>

                <Heading>
                    5. Intellectual Property
                </Heading>

                <Paragraph>
                    All logos, names, and content on this Site are the property of EtihadSouq.ae or its respective owners. Meta, WhatsApp, and their logos are trademarks of Meta Platforms, Inc. and are used here only for integration reference.
                </Paragraph>

                <Heading>
                    6. Disclaimer of Warranties
                </Heading>

                <Paragraph>
                    The Site and its features are provided “as is” and “as available”, without any warranties of any kind, express or implied.
                </Paragraph>

                <Paragraph>
                    EtihadSouq.ae does not guarantee uninterrupted or error-free service and is not responsible for any technical issues, data loss, or service downtime.
                </Paragraph>

                <Heading>
                    7. Limitation of Liability
                </Heading>

                <Paragraph>
                    To the maximum extent permitted by law, EtihadSouq.ae and its owner shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this Site or its integrations.
                </Paragraph>

                <Heading>
                    8. Changes to These Terms
                </Heading>

                <Paragraph>
                    We may update or modify these Terms from time to time. The latest version will always be available on this page, with the updated date clearly shown.
                </Paragraph>
                
                <Heading>
                    9. Contact Information
                </Heading>

                <Paragraph>
                    If you have any questions or concerns about these Terms, please contact:
                </Paragraph>

                <Paragraph>
                    <Link href={"mailto:info@etihadsouq.ae"}>info@etihadsouq.ae</Link>
                </Paragraph>

                <Paragraph>
                    <Link href={"https://etihadsouq.ae/"}>etihadsouq.ae</Link>
                </Paragraph>

            </div>
        </BasicLayout>
    )
}

export default TermsOfServices