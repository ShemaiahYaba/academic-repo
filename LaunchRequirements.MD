# Academic Repository MVP (Supabase + Algolia)

---

## 1. User Authentication & Authorization

- **Platform:** Supabase Auth
- **Description:** Handles user registration, login, and authentication.
- Supports email/password login as well as OAuth providers like Google or GitHub.
- Implements role-based access control with at least three roles:
  - **Admin:** Full control over the platform, including user management and content moderation.
  - **Author (Uploader):** Can upload and manage their own academic papers and versions.
  - **Reader:** Can browse, search, view, and download papers.
- Secure API access is handled through JWT tokens issued by Supabase.

---

## 2. Database & Storage

- **Platform:** Supabase PostgreSQL (database) and Supabase Storage (file storage)
- **Description:**
  - Store all paper metadata in PostgreSQL tables, including:
    - Paper ID (unique identifier)
    - Title
    - Authors (linked to an authors table)
    - Abstract
    - Keywords
    - Publication date
    - Department or discipline
    - DOI (Digital Object Identifier)
    - Version number and version notes (for versioning support)
  - Each version of a paper is stored as a separate row, linked by the Paper ID.
  - PDFs are uploaded and securely stored in Supabase Storage buckets.
  - Audit logs track who uploaded or modified papers and when.

---

## 3. DOI Management

- **Platform:** External services (Zenodo, CrossRef) or placeholder for MVP
- **Description:**
  - Assign a unique DOI to each paper or paper version.
  - DOI links to the paper metadata and version information.
  - Initial MVP may generate mock or placeholder DOIs (e.g., UUIDs) until full DOI integration is implemented.
  - When integrated, the system can automate DOI registration via APIs of services like Zenodo or CrossRef.

---

## 4. Search & Filtering

- **Platform:** Algolia
- **Description:**
  - All paper metadata is indexed in Algolia for fast and feature-rich search capabilities.
  - Sync updates from Supabase to Algolia in real-time using Supabase Edge Functions or backend hooks.
  - Search supports keyword matching on titles, abstracts, authors, and keywords.
  - Faceted search allows users to filter results by discipline, author, publication year, or version.
  - Algolia provides typo tolerance, relevance ranking, and synonym support out of the box.
  - Frontend uses Algolia InstantSearch libraries for building user-friendly search interfaces.

---

## 5. Document Viewing & Download

- **Platform:** Frontend + Supabase Storage
- **Description:**
  - Users can preview PDFs directly in the browser using libraries like PDF.js.
  - Secure download links are generated with time-limited access tokens from Supabase Storage to prevent unauthorized access.
  - Versioned PDFs are clearly associated with their metadata and DOI.

---

## 6. Citation Generator

- **Platform:** Frontend JavaScript (e.g., Citation.js)
- **Description:**
  - Automatically generate formatted citations for each paper version.
  - Supports common citation styles: APA, MLA, Chicago.
  - Users can copy citations or export them in formats like BibTeX and RIS for reference managers.
  - Citation data is generated dynamically from the paper’s metadata and DOI.

---

## 7. Statistics Tracking

- **Platform:** Supabase database + optional analytics services
- **Description:**
  - Track metrics such as paper views and downloads per version.
  - Store logs in PostgreSQL tables to enable querying and reporting.
  - Admin dashboard provides insights into usage patterns and popularity.
  - Optionally integrate privacy-friendly analytics tools like Umami or Plausible for site-wide traffic metrics.

---

## 8. Admin Panel

- **Platform:** Custom frontend integrated with Supabase backend
- **Description:**
  - Admins can manage users and assign roles.
  - Review and approve or reject paper uploads and new versions.
  - Moderate flagged or inappropriate content.
  - View aggregated statistics on platform usage and submissions.

---

## 9. Mobile-Responsive UI

- **Platform:** React or Next.js frontend framework
- **Description:**
  - Responsive design that adapts seamlessly to mobile phones, tablets, and desktop browsers.
  - Ensures accessibility and a smooth user experience across devices.
  - Intuitive navigation for search, upload, and management features.

---

## Tech Stack Summary

| Feature            | Technology                        | Description                                          |
| ------------------ | --------------------------------- | ---------------------------------------------------- |
| Backend & DB       | Supabase (PostgreSQL + Auth)      | Managed backend with database and authentication     |
| File Storage       | Supabase Storage                  | Secure storage for uploaded PDFs                     |
| Search             | Algolia                           | Managed search service for fast and relevant search  |
| DOI Management     | Zenodo / CrossRef / Mock DOI      | External DOI registration or placeholder during MVP  |
| Frontend           | React / Next.js                   | Modern web framework for building the user interface |
| PDF Viewer         | PDF.js                            | Browser-based PDF preview                            |
| Citation Generator | Citation.js                       | Client-side citation formatting and export           |
| Analytics          | Supabase logs / Umami / Plausible | Usage and site analytics                             |
| Hosting            | Vercel                            | Frontend hosting with global CDN                     |

---

## High-Level Workflow

1. User signs up or logs in using Supabase Auth.
2. Author uploads a new paper or a new version, including PDF and metadata.
3. System generates or assigns a DOI to the paper/version.
4. Paper metadata syncs automatically to Algolia for indexing.
5. Users search and filter papers via a responsive UI powered by Algolia.
6. Users preview and download PDFs securely from Supabase Storage.
7. Citation data for each paper is generated on demand for users.
8. Views and downloads are logged for reporting and stats.
9. Admins manage users, moderate content, and track platform analytics.

---

## Cost Considerations

| Service        | Cost Factors                         | Notes                                    |
| -------------- | ------------------------------------ | ---------------------------------------- |
| Supabase       | Database size, auth usage, storage   | Generous free tier; scales with usage    |
| Algolia        | Number of records and search queries | Free tier available; pricing scales up   |
| DOI Providers  | Usually free for open research       | Zenodo is free; CrossRef may charge fees |
| Vercel Hosting | Bandwidth and usage                  | Free tier suitable for MVP               |
| Analytics      | Tool choice and traffic volume       | Umami and Plausible offer low-cost plans |

---
