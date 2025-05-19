import TOSSection from "@/components/tos-section"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "HaiDoc | Terms of Service",
  description: "Terms of Service for HaiDoc",
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed antialiased">
      <TOSSection title="1. Introduction">
        <p className="mb-6">
          Welcome to HaiDoc. These Terms of Service ("Terms") govern your access to and use of the HaiDoc platform and
          services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree to
          these Terms, you may not access or use our platform.
        </p>
      </TOSSection>

      <TOSSection title="2. Definitions">
        <p className="mb-3">In these Terms:</p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>
            <strong className="font-medium text-gray-800">"HaiDoc," "we," "us,"</strong> and{" "}
            <strong className="font-medium text-gray-800">"our"</strong> refer to HaiDoc and its subsidiaries and
            affiliates.
          </li>
          <li>
            <strong className="font-medium text-gray-800">"Platform"</strong> refers to the HaiDoc website, mobile
            application, and other online services.
          </li>
          <li>
            <strong className="font-medium text-gray-800">"Services"</strong> refers to the healthcare services,
            including telemedicine consultations, prescription services, and medication delivery, provided through our
            platform.
          </li>
          <li>
            <strong className="font-medium text-gray-800">"User," "you,"</strong> and{" "}
            <strong className="font-medium text-gray-800">"your"</strong> refer to any individual or entity that
            accesses or uses our platform.
          </li>
          <li>
            <strong className="font-medium text-gray-800">"Healthcare Provider"</strong> refers to the doctors,
            pharmacists, and other healthcare professionals who provide services through our platform.
          </li>
        </ul>
      </TOSSection>

      <TOSSection title="3. Eligibility">
        <p className="mb-4">
          You must be at least 18 years old to use our platform. By using our platform, you represent and warrant that
          you are at least 18 years old and have the legal capacity to enter into these Terms.
        </p>
        <p className="mb-6">
          If you are using our platform on behalf of a minor, you represent and warrant that you are the minor's parent
          or legal guardian and have the authority to agree to these Terms on the minor's behalf.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Account Registration</h2>
        <p className="mb-4">
          To use certain features of our platform, you may need to create an account. When you create an account, you
          must provide accurate, current, and complete information. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities that occur under your account.
        </p>
        <p className="mb-6">
          You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We
          will not be liable for any loss or damage arising from your failure to protect your account credentials.
        </p>
      </TOSSection>

      <TOSSection title="5. Healthcare Services">
        <p className="mb-4">
          Our platform connects users with healthcare providers who provide telemedicine consultations, prescriptions,
          and other healthcare services. The healthcare providers are independent professionals and are solely
          responsible for the healthcare services they provide.
        </p>
        <p className="mb-4">
          <strong className="font-medium text-gray-800">
            HaiDoc does not provide medical advice, diagnosis, or treatment.
          </strong>{" "}
          The information provided on our platform is for informational purposes only and is not a substitute for
          professional medical advice, diagnosis, or treatment.
        </p>
        <p className="mb-3">You acknowledge and agree that:</p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>Telemedicine consultations have limitations and may not be appropriate for all medical conditions.</li>
          <li>In case of emergency, you should call emergency services or go to the nearest emergency room.</li>
          <li>
            The healthcare providers may refuse to provide services if they determine that telemedicine is not
            appropriate for your condition.
          </li>
          <li>
            You are responsible for providing accurate and complete information about your medical history, symptoms,
            and current medications.
          </li>
          <li>You are responsible for following the healthcare provider's advice and treatment plan.</li>
        </ul>
      </TOSSection>

      <TOSSection title="6. Prescription Services">
        <p className="mb-4">
          Our platform may facilitate the issuance of prescriptions by healthcare providers. The decision to issue a
          prescription is solely at the discretion of the healthcare provider.
        </p>
        <p className="mb-3">You acknowledge and agree that:</p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>Prescriptions are issued based on the information you provide during the consultation.</li>
          <li>
            The healthcare provider may refuse to issue a prescription if they determine it is not medically
            appropriate.
          </li>
          <li>You are responsible for using prescribed medications as directed by the healthcare provider.</li>
          <li>
            You are responsible for informing the healthcare provider of any allergies, adverse reactions, or other
            relevant medical information.
          </li>
        </ul>
      </TOSSection>

      <TOSSection title="7. Medication Delivery">
        <p className="mb-4">
          Our platform may facilitate the delivery of prescribed medications. The availability of medication delivery
          depends on your location and the availability of partner pharmacies.
        </p>
        <p className="mb-3">You acknowledge and agree that:</p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>
            Medication delivery times are estimates and may vary based on factors such as location, weather, and
            traffic.
          </li>
          <li>You are responsible for being available to receive the medication at the delivery address.</li>
          <li>You are responsible for inspecting the medication upon delivery and reporting any issues.</li>
          <li>
            You are responsible for storing and using the medication as directed by the healthcare provider and as
            indicated on the medication label.
          </li>
        </ul>
      </TOSSection>

      <TOSSection title="8. Payments">
        <p className="mb-4">
          You agree to pay all fees and charges associated with your use of our platform and services. All fees are
          non-refundable unless otherwise specified.
        </p>
        <p className="mb-6">
          We use third-party payment processors to process payments. By providing your payment information, you
          authorize us and our payment processors to charge your payment method for the fees and charges associated with
          your use of our platform and services.
        </p>
      </TOSSection>

      <TOSSection title="9. Intellectual Property">
        <p className="mb-6">
          Our platform and its content, features, and functionality are owned by HaiDoc and are protected by copyright,
          trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative
          works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on
          our platform without our prior written consent.
        </p>
      </TOSSection>

      <TOSSection title="10. User Content">
        <p className="mb-4">
          You retain ownership of any content you submit, post, or display on or through our platform ("User Content").
          By submitting, posting, or displaying User Content on or through our platform, you grant us a worldwide,
          non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative
          works from, distribute, perform, and display such User Content in connection with providing and promoting our
          platform and services.
        </p>
        <p className="mb-3">You represent and warrant that:</p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>You own or have the necessary rights to the User Content you submit.</li>
          <li>
            The User Content does not infringe on the intellectual property rights or other rights of any third party.
          </li>
          <li>The User Content does not violate any applicable law or regulation.</li>
        </ul>
      </TOSSection>

      <TOSSection title="11. Prohibited Conduct">
        <p className="mb-3">You agree not to:</p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>Use our platform in any way that violates any applicable law or regulation.</li>
          <li>
            Use our platform to impersonate any person or entity or falsely state or otherwise misrepresent your
            affiliation with a person or entity.
          </li>
          <li>
            Interfere with or disrupt the operation of our platform or the servers or networks used to make our platform
            available.
          </li>
          <li>
            Attempt to gain unauthorized access to any portion of our platform or any other systems or networks
            connected to our platform.
          </li>
          <li>
            Use any robot, spider, or other automatic device, process, or means to access our platform for any purpose.
          </li>
          <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other harmful material to our platform.</li>
          <li>Use our platform to transmit any unsolicited advertising or promotional material.</li>
        </ul>
      </TOSSection>

      <TOSSection title="12. Termination">
        <p className="mb-4">
          We may terminate or suspend your access to our platform immediately, without prior notice or liability, for
          any reason, including if you breach these Terms.
        </p>
        <p className="mb-6">
          Upon termination, your right to use our platform will immediately cease. All provisions of these Terms that by
          their nature should survive termination shall survive termination, including, without limitation, ownership
          provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
      </TOSSection>

      <TOSSection title="13. Disclaimer of Warranties">
        <p className="mb-4">
          Our platform and services are provided on an "as is" and "as available" basis, without any warranties of any
          kind, either express or implied. We disclaim all warranties, including, but not limited to, implied warranties
          of merchantability, fitness for a particular purpose, and non-infringement.
        </p>
        <p className="mb-6">
          We do not warrant that our platform will be uninterrupted, timely, secure, or error-free, or that any defects
          will be corrected. We do not warrant that the results that may be obtained from the use of our platform will
          be accurate or reliable.
        </p>
      </TOSSection>

      <TOSSection title="14. Limitation of Liability">
        <p className="mb-6">
          In no event shall HaiDoc, its directors, employees, partners, agents, suppliers, or affiliates be liable for
          any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of
          profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability
          to access or use our platform or services.
        </p>
      </TOSSection>

      <TOSSection title="15. Indemnification">
        <p className="mb-6">
          You agree to indemnify, defend, and hold harmless HaiDoc, its directors, employees, partners, agents,
          suppliers, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs,
          expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these
          Terms or your use of our platform.
        </p>
      </TOSSection>

      <TOSSection title="16. Governing Law">
        <p className="mb-6">
          These Terms shall be governed by and construed in accordance with the laws of Mozambique, without regard to
          its conflict of law provisions.
        </p>
      </TOSSection>

      <TOSSection title="17. Dispute Resolution">
        <p className="mb-6">
          Any dispute arising out of or relating to these Terms or your use of our platform shall be resolved through
          binding arbitration in accordance with the rules of the Arbitration Association of Mozambique. The arbitration
          shall be conducted in Maputo, Mozambique, in the Portuguese language.
        </p>
      </TOSSection>

      <TOSSection title="18. Changes to These Terms">
        <p className="mb-6">
          We may update these Terms from time to time. The updated version will be indicated by an updated "Last
          Updated" date. We encourage you to review these Terms periodically to stay informed about any changes.
        </p>
        <p className="text-sm text-gray-500 mb-6">Last Updated: [Date]</p>
      </TOSSection>

      <TOSSection title="19. Contact Us">
        <p className="mb-3">If you have any questions or concerns about these Terms, please contact us at:</p>
        <div className="space-y-1">
          <p>
            <strong className="font-medium text-gray-800">Email:</strong>{" "}
            <Link href="mailto:legal@hai-doc.com" className="text-blue-600 hover:underline">
              legal@hai-doc.com
            </Link>
          </p>
          <p>
            <strong className="font-medium text-gray-800">Phone:</strong> +258 123 456 789
          </p>
          <p>
            <strong className="font-medium text-gray-800">Address:</strong> Rua do Dão, nº49, 2º Andar, Bairro Central,
            Cidade de Maputo, Moçambique
          </p>
        </div>
      </TOSSection>
    </div>
  )
}
