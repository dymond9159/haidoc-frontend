import TOSSection from "@/components/tos-section"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "HaiDoc | Privacy Policy",
  description: "Privacy Policy for HaiDoc",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="text-gray-700 leading-relaxed antialiased">
      <TOSSection title="1. Introduction">
        <p className="mb-4">
          Welcome to HaiDoc's Privacy Policy. This Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you use our healthcare platform and services.
        </p>
        <p className="mb-6">
          We respect your privacy and are committed to protecting your personal and medical information. Please read
          this Privacy Policy carefully to understand our practices regarding your information and how we will treat it.
        </p>
      </TOSSection>

      <TOSSection title="2. Information We Collect">
        <p className="mb-3">We collect several types of information from and about users of our platform, including:</p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>
            <strong className="font-medium">Personal Information:</strong> This includes your name, email address,
            postal address, phone number, date of birth, gender, and other identifiers by which you may be contacted
            online or offline.
          </li>
          <li>
            <strong className="font-medium">Medical Information:</strong> This includes your medical history, current
            medications, allergies, symptoms, diagnoses, treatment plans, and other health-related information you
            provide or that is generated through your use of our services.
          </li>
          <li>
            <strong className="font-medium">Payment Information:</strong> This includes your credit card details,
            billing address, and other financial information necessary to process payments.
          </li>
          <li>
            <strong className="font-medium">Technical Information:</strong> This includes your IP address, browser type
            and version, time zone setting, browser plug-in types and versions, operating system and platform, and other
            technology on the devices you use to access our platform.
          </li>
          <li>
            <strong className="font-medium">Usage Information:</strong> This includes information about how you use our
            platform, such as the pages you visit, the time and duration of your visits, and the links you click.
          </li>
        </ul>
      </TOSSection>

      <TOSSection title="3. How We Collect Information">
        <p className="mb-3">We collect information from you when you:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Register for an account</li>
          <li>Fill out forms on our platform</li>
          <li>Communicate with healthcare providers through our platform</li>
          <li>Make payments through our platform</li>
          <li>Use our platform's features</li>
          <li>Respond to surveys or questionnaires</li>
          <li>Contact our customer support</li>
        </ul>
        <p className="mb-6">
          We also collect information through cookies and similar technologies. Please see our{" "}
          {/* Assuming you might have a separate Cookie Policy page */}
          <Link href="/cookie-policy" className="text-blue-600 hover:underline">
            Cookie Policy
          </Link>{" "}
          for more information.
        </p>
      </TOSSection>

      <TOSSection title="4. How We Use Your Information">
        <p className="mb-3">We use your information for various purposes, including to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Provide, maintain, and improve our platform and services</li>
          <li>Process and fulfill your requests for medical consultations, prescriptions, and medication deliveries</li>
          <li>Facilitate communication between you and healthcare providers</li>
          <li>Process payments and manage your account</li>
          <li>Send you administrative messages, updates, and security alerts</li>
          <li>Personalize your experience on our platform</li>
          <li>Analyze usage patterns and improve our platform</li>
          <li>Comply with legal obligations</li>
          <li>Protect the rights, property, or safety of HaiDoc, our users, or others</li>
        </ul>
      </TOSSection>

      <TOSSection title="5. How We Share Your Information">
        <p className="mb-3">We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-3 mb-4">
          <li>
            <strong className="font-medium">Healthcare Providers:</strong> We share your medical information with the
            healthcare providers you consult with through our platform to facilitate your care.
          </li>
          <li>
            <strong className="font-medium">Pharmacies:</strong> We share your prescription information with pharmacies
            to fulfill your medication orders.
          </li>
          <li>
            <strong className="font-medium">Service Providers:</strong> We share your information with third-party
            service providers who perform services on our behalf, such as payment processing, data analysis, email
            delivery, and customer service.
          </li>
          <li>
            <strong className="font-medium">Legal Authorities:</strong> We may disclose your information if required to
            do so by law or in response to valid requests by public authorities.
          </li>
          <li>
            <strong className="font-medium">Business Transfers:</strong> We may share your information in connection
            with a merger, acquisition, or sale of all or a portion of our assets.
          </li>
        </ul>
        <p className="mb-6 italic">We do not sell your personal or medical information to third parties.</p>
      </TOSSection>

      <TOSSection title="6. Data Security">
        <p className="mb-6">
          We implement appropriate technical and organizational measures to protect your information from unauthorized
          access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or
          electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </TOSSection>

      <TOSSection title="7. Your Rights">
        <p className="mb-3">
          Depending on your location, you may have certain rights regarding your information, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>The right to access your information</li>
          <li>The right to correct inaccurate information</li>
          <li>The right to delete your information</li>
          <li>The right to restrict or object to processing</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>
        <p className="mb-6">
          To exercise these rights, please contact us using the information provided in the "Contact Us" section.
        </p>
      </TOSSection>

      <TOSSection title="8. Children's Privacy">
        <p className="mb-6">
          Our platform is not intended for children under the age of 18. We do not knowingly collect personal
          information from children under 18. If you are a parent or guardian and believe that your child has provided
          us with personal information, please contact us, and we will delete such information from our systems.
        </p>
      </TOSSection>

      <TOSSection title="9. Changes to This Privacy Policy">
        <p className="mb-6">
          We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last
          Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are
          protecting your information.
        </p>
      </TOSSection>

      <TOSSection title="10. Contact Us">
        <p className="mb-3">
          If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us
          at:
        </p>
        <div className="space-y-1">
          <p>
            <strong className="font-medium">Email:</strong>{" "}
            <Link href="mailto:privacy@hai-doc.com" className="text-blue-600 hover:underline">
              privacy@hai-doc.com
            </Link>
          </p>
          <p>
            <strong className="font-medium">Phone:</strong> +258 123 456 789
          </p>
          <p>
            <strong className="font-medium">Address:</strong> Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de
            Maputo, Moçambique
          </p>
        </div>
      </TOSSection>
    </div>
  )
}
