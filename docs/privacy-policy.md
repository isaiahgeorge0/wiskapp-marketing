# Privacy Policy

**Last updated: 18 June 2026**

---

## 1. Who we are

WISK ("**WISK**," "**we**," "**us**," or "**our**") is a business command centre platform operated by **Isaiah George Creative**, based in the United Kingdom.

This Privacy Policy explains how we collect, use, store, and protect your personal data when you use WISK, including our website (wiskapp.com), our application (app.wiskapp.com), and any related services (together, the "**Service**").

We are the data controller for the personal data described in this policy. If you have any questions about this policy or how we handle your data, you can contact us at:

**hello@wiskapp.com**

---

## 2. What data we collect

We collect the following categories of personal data:

### 2.1 Account information

When you sign up for WISK, we collect:

- Your name
- Your email address
- A password (stored securely as a salted hash — we never store or have access to your plain-text password)
- Your theme and display preferences

### 2.2 Business data you provide

WISK is a tool for managing your business. As part of using it, you may input:

- Project details (names, clients, deadlines, notes, values)
- Tasks and to-do items
- Goals and progress data
- Leads and pipeline information (names, emails, phone numbers, notes)
- Content plans and calendar entries
- Ideas and notes
- Any other information you choose to enter into the Service

This data belongs to you. We do not use it for any purpose other than providing the Service to you, as described in this policy.

### 2.3 Information from integrations (optional)

If you choose to connect third-party integrations (for example, Vercel or GitHub for project monitoring, or — for users on applicable plans — email accounts via Gmail or Outlook), we will access and store the data necessary to provide that integration. This may include:

- API tokens or OAuth credentials (stored encrypted — see Section 6)
- Project/deployment metadata (for Vercel/GitHub integrations)
- Email metadata and content (only for users who explicitly connect an email integration, and only to power the features they have enabled)

You can disconnect any integration at any time from your account settings, which will stop further data collection and remove stored credentials.

### 2.4 Technical and usage data

We automatically collect certain technical information when you use the Service, including:

- IP address
- Browser type and version
- Device type and operating system
- Pages visited and features used
- Timestamps of activity

This data is collected via standard hosting and analytics tools (see Section 5) and is used to operate, secure, and improve the Service.

### 2.5 Communications

If you contact us (for support, feedback, or otherwise), we collect the content of your communications and any information you provide within them.

---

## 3. How we use your data

We use your personal data for the following purposes:

| Purpose | Legal basis (UK GDPR) |
|---|---|
| To create and manage your account | Performance of a contract |
| To provide the core features of WISK (projects, tasks, goals, leads, content, calendar) | Performance of a contract |
| To send essential account emails (password resets, account setup, access notifications) | Performance of a contract / Legitimate interests |
| To send marketing or product update communications, where you have agreed to receive them | Consent |
| To generate AI-powered features (such as Winston's digests and insights), for users with access to these features | Performance of a contract / Consent (for optional AI features) |
| To monitor, maintain, and secure the Service | Legitimate interests |
| To analyse usage and improve WISK | Legitimate interests |
| To comply with legal obligations | Legal obligation |

### 3.1 AI features

WISK includes AI-powered features (collectively, "**Winston**"), such as automated weekly digests and conversational assistance. Where you use these features, relevant business data from your account (such as project, task, goal, lead, and content information) is sent to our AI provider, **Anthropic** (operator of the Claude API), to generate responses and summaries.

- This data is sent for the sole purpose of generating the requested output and is not used by Anthropic to train their models, in accordance with Anthropic's API data usage policies.
- AI features are only generated for accounts where this functionality has been enabled.
- You can find more about Anthropic's data handling at their privacy policy: https://www.anthropic.com/legal/privacy

We do not currently use AI features to make any decision that produces legal effects or similarly significantly affects you, within the meaning of UK GDPR Article 22.

---

## 4. Who we share your data with

We do not sell your personal data. We share data only with the following categories of recipients, where necessary to operate the Service:

### 4.1 Sub-processors

We use the following third-party services to operate WISK. Each acts as a data processor on our behalf and is bound by data protection obligations.

| Provider | Purpose | Data location |
|---|---|---|
| **Supabase** | Database, authentication, and file storage | EU (London, eu-west-2) |
| **Vercel** | Application hosting and infrastructure | Global (Vercel's standard hosting regions) |
| **Resend** | Sending transactional emails (password resets, account notifications, confirmations) | EU/US (per Resend's infrastructure) |
| **Anthropic** | AI processing for Winston features (only for accounts with AI features enabled) | Per Anthropic's API infrastructure |
| **GitHub** | Scheduled background jobs (e.g. weekly digest generation) — does not receive personal data beyond what is necessary to trigger these jobs | N/A |

We review our sub-processors periodically and will update this table if our stack changes. Material changes that affect how your data is processed will be communicated to you.

### 4.2 Legal disclosures

We may disclose your data if required to do so by law, regulation, legal process, or governmental request, or where disclosure is necessary to protect the rights, property, or safety of WISK, our users, or others.

### 4.3 Business transfers

If WISK is involved in a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction. We will notify you before your data becomes subject to a different privacy policy.

---

## 5. Cookies and analytics

WISK uses minimal cookies and similar technologies, primarily for:

- **Authentication** — to keep you securely signed in (essential, cannot be disabled without losing access to your account)
- **Preferences** — to remember settings such as theme (dark/light mode)
- **Analytics** — we use Vercel Analytics and Vercel Speed Insights to understand site performance and usage patterns. These tools are designed to be privacy-friendly and do not use cookies to track individuals across sites.

We do not use third-party advertising cookies or trackers.

---

## 6. How we protect your data

We take the security of your data seriously. Measures include:

- **Encryption in transit** — all data is transmitted over HTTPS/TLS.
- **Encryption at rest for sensitive credentials** — integration tokens (e.g. for Vercel, GitHub, or email integrations) are encrypted using AES-256-GCM before being stored.
- **Row Level Security** — our database enforces access controls so that your data is only accessible to your account, enforced at the database level.
- **Password security** — passwords are never stored in plain text. They are hashed using industry-standard methods via our authentication provider (Supabase Auth).
- **Access controls** — administrative access to user data is restricted and logged.

No method of transmission or storage is 100% secure, but we are committed to using commercially reasonable means to protect your data and to notifying you and the relevant authorities in the event of a data breach affecting your personal data, as required by law.

---

## 7. Data retention

We retain your personal data for as long as your account is active, or as needed to provide you with the Service.

If you delete your account, we will delete or anonymise your personal data within a reasonable period, except where we are required to retain certain data for legal, accounting, or security purposes (for example, records of access requests or billing history, where applicable).

Business data you have entered into WISK (projects, tasks, leads, content, etc.) is deleted along with your account.

---

## 8. International data transfers

Our primary database is hosted in the United Kingdom (London). Some of our sub-processors (see Section 4.1) may process data outside the UK, including in the United States.

Where personal data is transferred outside the UK, we ensure appropriate safeguards are in place, such as the UK's International Data Transfer Agreement (IDTA), the EU Standard Contractual Clauses (as incorporated into UK law), or transfers to countries deemed to provide adequate protection by the UK government.

---

## 9. Your rights

Under UK GDPR, you have the following rights in relation to your personal data:

- **Right of access** — request a copy of the personal data we hold about you.
- **Right to rectification** — request correction of inaccurate or incomplete data.
- **Right to erasure** — request deletion of your personal data, subject to certain exceptions.
- **Right to restrict processing** — request that we limit how we use your data in certain circumstances.
- **Right to data portability** — request a copy of your data in a structured, commonly used, machine-readable format.
- **Right to object** — object to processing based on legitimate interests, or to direct marketing at any time.
- **Right to withdraw consent** — where processing is based on consent, withdraw it at any time.

To exercise any of these rights, contact us at **hello@wiskapp.com**. We will respond within one month, as required by law.

You also have the right to lodge a complaint with the UK's data protection authority, the **Information Commissioner's Office (ICO)**, at https://ico.org.uk, although we would appreciate the opportunity to address your concerns directly first.

---

## 10. Children's privacy

WISK is intended for use by individuals aged 18 and over. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us at hello@wiskapp.com and we will take steps to delete it.

---

## 11. Changes to this policy

We may update this Privacy Policy from time to time to reflect changes in our practices, the Service, or legal requirements. We will update the "Last updated" date at the top of this policy and, where changes are material, notify you via email or an in-app notice.

---

## 12. Contact us

If you have any questions, concerns, or requests relating to this Privacy Policy or your personal data, please contact:

**Isaiah George Creative**
Email: hello@wiskapp.com
Website: https://wiskapp.com
