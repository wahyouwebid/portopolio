'use client';

import { motion } from 'framer-motion';
import { Shield, Mail } from 'lucide-react';

const lastUpdated = 'May 24, 2026';
const developerName = 'Ujang Wahyu';
const developerEmail = 'wahyouwebid@gmail.com';
const websiteUrl = 'https://wahyou.web.id';

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `This Privacy Policy describes how ${developerName} ("I", "me", or "my") collects, uses, and shares information when you use my mobile applications ("App") and website ("${websiteUrl}"). By using the App or website, you agree to the collection and use of information in accordance with this policy.`,
  },
  {
    id: 'information-collected',
    title: '2. Information I Collect',
    content: `I may collect the following types of information:`,
    list: [
      '<strong>Personal Information:</strong> When you contact me or register within the App, I may collect your name, email address, and other information you voluntarily provide.',
      '<strong>Usage Data:</strong> I automatically collect information about how you interact with the App, including pages or screens viewed, time spent, crash reports, and device information (device type, operating system version, unique device identifiers).',
      '<strong>Log Data:</strong> When you use the App, in case of errors, I collect data and information on your device called Log Data. This may include your device IP address, device name, operating system version, app configuration at the time of error, time and date of use, and other statistics.',
      '<strong>Cookies and Tracking:</strong> The website may use cookies and similar tracking technologies to improve your experience. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.',
    ],
  },
  {
    id: 'how-i-use',
    title: '3. How I Use Your Information',
    content: `I use the collected information for the following purposes:`,
    list: [
      'To provide, maintain, and improve the App and website',
      'To notify you about changes to the App or website',
      'To allow you to participate in interactive features when you choose to do so',
      'To provide customer support and respond to your inquiries',
      'To monitor the usage of the App and website',
      'To detect, prevent, and address technical issues',
      'To analyze usage patterns and improve user experience',
    ],
  },
  {
    id: 'data-sharing',
    title: '4. Sharing of Information',
    content: `I do not sell, trade, or rent your personal information to third parties. I may share your information only in the following circumstances:`,
    list: [
      '<strong>Service Providers:</strong> I may employ third-party companies and individuals to facilitate the App, provide the service on my behalf, or assist in analyzing how the App is used (e.g., Firebase by Google for analytics and crash reporting). These third parties have access to your information only to perform these tasks and are obligated not to disclose or use it for any other purpose.',
      '<strong>Legal Requirements:</strong> I may disclose your information if required to do so by law or in response to valid requests by public authorities.',
      '<strong>Business Transfers:</strong> If I am involved in a merger, acquisition, or asset sale, your information may be transferred.',
    ],
  },
  {
    id: 'third-party-services',
    title: '5. Third-Party Services',
    content: `The App may use third-party services that have their own privacy policies. Links to the privacy policies of third-party service providers used in the App:`,
    list: [
      '<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">Google Play Services</a>',
      '<a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">Firebase (Google Analytics for Firebase)</a>',
      '<a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">Firebase Crashlytics</a>',
    ],
  },
  {
    id: 'data-retention',
    title: '6. Data Retention',
    content: `I will retain your personal information only for as long as necessary for the purposes set out in this Privacy Policy. I will retain and use your information to the extent necessary to comply with legal obligations, resolve disputes, and enforce agreements. Usage data is generally retained for a shorter period, except when used to strengthen security or improve functionality.`,
  },
  {
    id: 'data-deletion',
    title: '7. Data Deletion',
    content: `You have the right to request deletion of your personal data. To request deletion of your data:`,
    list: [
      `Send an email to <a href="mailto:${developerEmail}" class="text-indigo-400 hover:underline">${developerEmail}</a> with the subject "Data Deletion Request"`,
      'Include your name and the email address associated with your account',
      'I will process your request within 30 days and confirm deletion',
    ],
    extra: 'Please note that some information may be retained as required by law or for legitimate business purposes.',
  },
  {
    id: 'security',
    title: '8. Security',
    content: `I value your trust in providing your personal information and strive to use commercially acceptable means to protect it. However, no method of transmission over the Internet or electronic storage is 100% secure. While I strive to use industry-standard security measures to protect your information, I cannot guarantee its absolute security.`,
  },
  {
    id: 'childrens-privacy',
    title: "9. Children's Privacy",
    content: `The App and website are not directed at children under the age of 13. I do not knowingly collect personally identifiable information from children under 13. If I discover that a child under 13 has provided me with personal information, I will delete it immediately. If you are a parent or guardian and you are aware that your child has provided personal information, please contact me so I can take action.`,
  },
  {
    id: 'user-rights',
    title: '10. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:`,
    list: [
      '<strong>Access:</strong> You can request a copy of the personal data I hold about you.',
      '<strong>Correction:</strong> You can request correction of inaccurate data.',
      '<strong>Deletion:</strong> You can request deletion of your personal data.',
      '<strong>Opt-out:</strong> You can opt out of analytics tracking by adjusting your device settings or uninstalling the App.',
      '<strong>Portability:</strong> You can request a copy of your data in a machine-readable format.',
    ],
  },
  {
    id: 'changes',
    title: '11. Changes to This Privacy Policy',
    content: `I may update this Privacy Policy from time to time. I will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes are effective immediately after they are posted on this page.`,
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    content: `If you have any questions or concerns about this Privacy Policy or my data practices, please contact me:`,
    list: [
      `<strong>Email:</strong> <a href="mailto:${developerEmail}" class="text-indigo-400 hover:underline">${developerEmail}</a>`,
      `<strong>Website:</strong> <a href="${websiteUrl}" class="text-indigo-400 hover:underline">${websiteUrl}</a>`,
    ],
  },
];

export default function PrivacyPolicyClient() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-wider">
              Legal
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-base">
            Last updated: <span className="text-slate-300">{lastUpdated}</span>
          </p>
          <div className="mt-6 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
            <p className="text-slate-300 text-sm leading-relaxed">
              This Privacy Policy applies to the mobile applications developed by{' '}
              <strong className="text-white">{developerName}</strong> and the portfolio website at{' '}
              <a href={websiteUrl} className="text-indigo-400 hover:underline">
                {websiteUrl}
              </a>
              . Please read this policy carefully to understand how your information is handled.
            </p>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 p-6 rounded-2xl glass border border-white/[0.06]"
        >
          <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Table of Contents
          </h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.04 }}
              className="scroll-mt-28"
            >
              <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
              <p
                className="text-slate-400 leading-relaxed mb-3"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
              {section.list && (
                <ul className="space-y-2 ml-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              )}
              {section.extra && (
                <p className="text-slate-500 text-sm mt-3 italic">{section.extra}</p>
              )}
            </motion.section>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-indigo-500/5 to-violet-500/5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <p className="text-white font-medium text-sm mb-1">Have questions about this policy?</p>
            <p className="text-slate-400 text-sm">
              Feel free to reach out at{' '}
              <a href={`mailto:${developerEmail}`} className="text-indigo-400 hover:underline">
                {developerEmail}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
