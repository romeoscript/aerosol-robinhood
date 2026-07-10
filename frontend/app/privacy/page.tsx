"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#11173d] to-[#000051] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: January 15, 2025</p>
        </div>

        {/* Content */}
        <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to EasyPay (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our decentralized application 
                built on Robinhood Chain, an Ethereum Layer-2 network. Please read this privacy policy carefully.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By using our application, you consent to the data practices described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-white mb-3">2.1 Blockchain Data</h3>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Wallet addresses and public keys</li>
                <li>Transaction history and blockchain interactions</li>
                <li>Smart contract interactions and program calls</li>
                <li>Network fees and transaction costs</li>
              </ul>

              <h3 className="text-xl font-medium text-white mb-3">2.2 User-Provided Information</h3>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Twitter/X account information (if connected)</li>
                <li>Profile pictures and usernames</li>
                <li>Communication preferences</li>
                <li>Support requests and feedback</li>
              </ul>

              <h3 className="text-xl font-medium text-white mb-3">2.3 Technical Information</h3>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Usage patterns and application performance</li>
                <li>Error logs and debugging information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Provide and maintain our decentralized application services</li>
                <li>Process blockchain transactions and smart contract interactions</li>
                <li>Display your wallet balance and transaction history</li>
                <li>Connect your social media accounts for enhanced features</li>
                <li>Improve our application performance and user experience</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Ensure security and prevent fraudulent activities</li>
                <li>Comply with legal obligations and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li><strong>Blockchain Transparency:</strong> All transactions are recorded on the public Robinhood Chain</li>
                <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our application</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing your information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Secure wallet integration using industry-standard protocols</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Monitoring and logging of security events</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Opt out of certain data processing activities</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Third-Party Services</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our application integrates with various third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li><strong>Robinhood Chain:</strong> For transaction processing and data storage</li>
                <li><strong>Privy:</strong> For wallet connection and authentication</li>
                <li><strong>Twitter/X API:</strong> For social media integration</li>
                <li><strong>Helius API:</strong> For blockchain data retrieval</li>
                <li><strong>Supabase:</strong> For application data storage</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Provide our services and maintain your account</li>
                <li>Comply with legal obligations and regulatory requirements</li>
                <li>Resolve disputes and enforce our agreements</li>
                <li>Improve our services and develop new features</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Blockchain data is permanent and cannot be deleted from the Robinhood Chain network.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information in accordance 
                with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you are a parent or guardian 
                and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-300">
                  <strong>Email:</strong> privacy@easypay.app<br />
                  <strong>Website:</strong> https://easypay.app<br />
                  <strong>Address:</strong> [Your Business Address]
                </p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}
