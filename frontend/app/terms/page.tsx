"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to EasyPay (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern 
                your use of our decentralized application built on Robinhood Chain, an Ethereum Layer-2 network. By accessing
                or using our services, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-300 leading-relaxed">
                If you do not agree to these Terms, please do not use our application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                EasyPay is a decentralized application that provides:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Wallet connection and management services</li>
                <li>ETH deposit and withdrawal functionality</li>
                <li>Transaction history and balance tracking</li>
                <li>Social media integration (Twitter/X)</li>
                <li>Blockchain transaction processing</li>
                <li>User profile and account management</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Our services are built on Robinhood Chain and utilize smart contracts for
                secure and transparent operations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Eligibility</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Be at least 18 years old or the age of majority in your jurisdiction</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Not be prohibited from using our services under applicable law</li>
                <li>Provide accurate and complete information when required</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. User Responsibilities</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Maintain the security of your wallet and private keys</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not engage in any fraudulent or illegal activities</li>
                <li>Not attempt to hack, disrupt, or interfere with our services</li>
                <li>Not use our services to violate any third-party rights</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Provide accurate and up-to-date information</li>
                <li>Report any security vulnerabilities or suspicious activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Blockchain and Cryptocurrency Risks</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>IMPORTANT:</strong> Using blockchain technology and cryptocurrencies involves 
                significant risks. You acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Cryptocurrency values are highly volatile and can fluctuate dramatically</li>
                <li>Blockchain transactions are irreversible and cannot be undone</li>
                <li>You may lose access to your funds if you lose your private keys</li>
                <li>Smart contracts may contain bugs or vulnerabilities</li>
                <li>Network congestion may cause delays or increased fees</li>
                <li>Regulatory changes may affect the legality of cryptocurrency use</li>
                <li>You are solely responsible for your investment decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Prohibited Activities</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You are prohibited from:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Using our services for any illegal or unauthorized purpose</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with or disrupting our services</li>
                <li>Creating multiple accounts to circumvent restrictions</li>
                <li>Using automated systems to access our services</li>
                <li>Engaging in market manipulation or fraudulent activities</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Intellectual Property Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The EasyPay application and its original content, features, and functionality are 
                owned by us and are protected by international copyright, trademark, patent, trade 
                secret, and other intellectual property laws.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You may not copy, modify, distribute, sell, or lease any part of our services or 
                included software, nor may you reverse engineer or attempt to extract the source 
                code of that software.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Disclaimers and Limitations of Liability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>DISCLAIMER:</strong> Our services are provided &quot;as is&quot; and &quot;as available&quot; 
                without warranties of any kind, either express or implied.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                To the maximum extent permitted by law, we disclaim all warranties, including but 
                not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Warranties of merchantability and fitness for a particular purpose</li>
                <li>Warranties regarding the accuracy, reliability, or completeness of our services</li>
                <li>Warranties that our services will be uninterrupted or error-free</li>
                <li>Warranties regarding the security of your data or transactions</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                In no event shall we be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Indemnification</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to defend, indemnify, and hold harmless EasyPay and its officers, directors, 
                employees, and agents from and against any claims, damages, obligations, losses, 
                liabilities, costs, or debt, and expenses (including attorneys&apos; fees) arising from:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Your use of our services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Your violation of any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Termination</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may terminate or suspend your access to our services immediately, without prior 
                notice or liability, for any reason whatsoever, including without limitation if you 
                breach these Terms.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Upon termination, your right to use our services will cease immediately. All 
                provisions of these Terms which by their nature should survive termination shall 
                survive termination, including ownership provisions, warranty disclaimers, 
                indemnity, and limitations of liability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Any disputes arising out of or relating to these Terms or our services shall be 
                resolved through binding arbitration in accordance with the rules of [Arbitration 
                Organization]. The arbitration shall be conducted in [City, State/Country].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at 
                any time. If a revision is material, we will try to provide at least 30 days notice 
                prior to any new terms taking effect.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By continuing to access or use our services after those revisions become effective, 
                you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">13. Severability</h2>
              <p className="text-gray-300 leading-relaxed">
                If any provision of these Terms is held to be invalid or unenforceable by a court, 
                the remaining provisions of these Terms will remain in effect. These Terms constitute 
                the entire agreement between us regarding our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-300">
                  <strong>Email:</strong> legal@easypay.app<br />
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
