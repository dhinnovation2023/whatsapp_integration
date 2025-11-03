import Heading from '@/components/ui-elements/heading'
import ListItems from '@/components/ui-elements/list-items'
import Paragraph from '@/components/ui-elements/paragraph'
import BasicLayout from '@/layouts/basic-layout'
import Link from 'next/link'
import React from 'react'

const PrivacyPolicyPage = () => {
    return (
        <BasicLayout>

            <div
                className='space-y-[15px]'
            >
                <h1
                    className='text-2xl font-bold font-jost'
                >Privacy Policy</h1>

                <Paragraph>
                    Effective Date: November 3, 2025
                </Paragraph>

                <Paragraph>
                    At etihadsouq.ae (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), your privacy is important to us. This Privacy Policy explains how we collect, use, and protect information when you use our website and related services that connect to Facebook or other Meta products.
                </Paragraph>

                <Heading>
                    1. Information We Collect
                </Heading>

                <Paragraph>
                    When you use our website or log in through Facebook, we may collect the following information (depending on your permissions):
                </Paragraph>

                <ListItems
                    listItems={
                        [
                            "Your name",
                            "Email address",
                            "Profile picture",
                            "Public profile information",
                        ]
                    }
                />

                <Paragraph>
                    We may also collect non-personal information such as browser type, device information, and interaction data to improve our services.
                </Paragraph>

                <Heading>
                    2. How We Use Your Information
                </Heading>

                <Paragraph>
                    We use the information we collect to:
                </Paragraph>

                <ListItems
                    listItems={
                        [
                            "Provide and personalize your experience on etihadsouq.ae",
                            "Enable login and authentication via Facebook",
                            "Communicate with you regarding your account or inquiries",
                            "Improve our products, services, and user experience",
                        ]
                    }
                />

                <Paragraph>
                    We do not sell, rent, or share your personal information with third parties, except as required by law or to operate our services.
                </Paragraph>

                <Heading>
                    3. Data Storage and Security
                </Heading>

                <Paragraph>
                    We take reasonable measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no online system is completely secure, and we cannot guarantee absolute security.
                </Paragraph>

                <Heading>
                    4. Data Retention and Deletion
                </Heading>

                <Paragraph>
                    We retain your data only as long as necessary to provide our services. You may request deletion of your personal data or Facebook-linked information at any time by contacting us at <Link className='text-theme-primary' href={"mailto:info@etihadsouq.ae"}>info@etihadsouq.ae</Link>
                </Paragraph>

                <Heading>
                    5. Third-Party Services
                </Heading>

                <Paragraph>
                    Our website may contain links to third-party sites or services. We are not responsible for the privacy practices or content of these third parties.
                </Paragraph>

                <Heading>
                    6. Changes to This Policy
                </Heading>

                <Paragraph>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                </Paragraph>

                <Heading>
                    7. Contact Us
                </Heading>

                <Paragraph>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
                </Paragraph>

                <Paragraph>
                    <span
                        className='block'
                    >Email: <Link className='text-theme-primary' href={"mailto:info@etihadsouq.ae"}>info@etihadsouq.ae</Link></span>
                    <span
                        className='block'
                    >Website: <Link className='text-theme-primary' href={"https://www.etihadsouq.ae"}>https://www.etihadsouq.ae</Link></span>
                </Paragraph>

            </div>

        </BasicLayout>
    )
}

export default PrivacyPolicyPage