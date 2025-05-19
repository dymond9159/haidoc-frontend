import TOSSection from "@/components/tos-section"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "HaiDoc | Cookie Policy",
  description: "Cookie Policy for HaiDoc",
}

export default function CookiePolicyPage() {
  return (
    <div className="text-gray-700 leading-relaxed antialiased">
      <TOSSection title="Introduction">
        <p>
          This Cookie Policy explains how HaiDoc ("we", "us", or "our") uses cookies and similar technologies on our
          website and mobile application (collectively, our "Platform"). This Cookie Policy should be read together with
          our Privacy Policy and Terms of Service.
        </p>
      </TOSSection>

      <TOSSection title="What Are Cookies?">
        <p>
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a
          website. Cookies are widely used to make websites work more efficiently and provide information to the website
          owners.
        </p>
        <p>
          Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go
          offline, while session cookies are deleted as soon as you close your web browser.
        </p>
      </TOSSection>

      <TOSSection title="Types of Cookies We Use">
        <p>We use different types of cookies for different purposes:</p>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold">Essential Cookies</h3>
            <p>
              These cookies are necessary for our Platform to function properly. They enable basic functions like page
              navigation, secure areas access, and account authentication. The Platform cannot function properly without
              these cookies.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Authentication cookies to remember your login status</li>
              <li>Security cookies to prevent fraud and protect our Platform</li>
              <li>Session cookies to maintain your session while using our Platform</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Preference Cookies</h3>
            <p>
              These cookies allow our Platform to remember choices you make and provide enhanced, personalized features.
              They may be set by us or by third-party providers whose services we have added to our Platform.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Language preference cookies to remember your preferred language</li>
              <li>Theme preference cookies to remember your preferred display settings</li>
              <li>Location cookies to provide location-based services</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our Platform by collecting and reporting
              information anonymously. They help us improve our Platform and measure the effectiveness of our marketing
              campaigns.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Google Analytics cookies to track user behavior on our Platform</li>
              <li>Performance cookies to monitor Platform performance</li>
              <li>Traffic source cookies to understand how users reach our Platform</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Marketing Cookies</h3>
            <p>
              These cookies are used to track visitors across websites. The intention is to display ads that are
              relevant and engaging for the individual user and thereby more valuable for publishers and third-party
              advertisers.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Advertising cookies to show relevant advertisements</li>
              <li>Social media cookies to enable sharing content on social media</li>
              <li>Retargeting cookies to show you products or services you've previously viewed</li>
            </ul>
          </div>
        </div>
      </TOSSection>

      <TOSSection title="Third-Party Cookies">
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
          deliver advertisements, and so on. These cookies may be placed by:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Analytics providers (such as Google Analytics)</li>
          <li>Advertising networks</li>
          <li>Social media platforms</li>
          <li>Payment processors</li>
          <li>Other third-party service providers</li>
        </ul>
      </TOSSection>

      <TOSSection title="How to Manage Cookies">
        <p>
          Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or
          to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from
          version to version.
        </p>
        <p>
          You can generally find how to manage cookies in the "Settings," "Preferences," or "Options" menu of your
          browser. You can also consult the "Help" section of your browser for more information.
        </p>
        <p>Please note that if you disable cookies, some features of our Platform may not function properly.</p>
      </TOSSection>

      <TOSSection title="Cookie Consent">
        <p>
          When you first visit our Platform, you will be shown a cookie banner requesting your consent to set cookies.
          By clicking "Accept All Cookies," you consent to our use of all cookies as described in this Cookie Policy. By
          clicking "Manage Preferences," you can select which types of cookies you consent to.
        </p>
        <p>
          You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the footer of
          our Platform.
        </p>
      </TOSSection>

      <TOSSection title="Do Not Track Signals">
        <p>
          Some browsers have a "Do Not Track" feature that signals to websites that you do not want to have your online
          activity tracked. Our Platform does not currently respond to "Do Not Track" signals.
        </p>
      </TOSSection>

      <TOSSection title="Mobile Applications">
        <p>
          When you use our mobile application, we may use similar technologies to cookies, such as local storage, to
          collect information about how you use our application. We may also use mobile analytics software to better
          understand the functionality of our mobile application on your device.
        </p>
      </TOSSection>

      <TOSSection title="Changes to This Cookie Policy">
        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
          business practices. Any changes will become effective when we post the revised Cookie Policy on our Platform.
          We encourage you to periodically review this page for the latest information on our cookie practices.
        </p>
      </TOSSection>

      <TOSSection title="Contact Us">
        <p>
          If you have any questions or concerns about this Cookie Policy or our use of cookies, please contact us at:
        </p>
        <p className="mt-2">
          Email:{" "}
          <Link href="mailto:privacy@hai-doc.com" className="text-blue-600 underline">
            privacy@hai-doc.com
          </Link>
          <br />
          Phone: +258 123 456 789
          <br />
          Address: Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique
        </p>
      </TOSSection>
    </div>
  )
}
