# StudyHub – Study Material Sharing & Peer Doubt Solving Portal

StudyHub is a complete, full-stack college academic collaboration portal designed for university students to share study materials, download verified handwritten lecture notes and past question papers, ask academic doubts, answer peers' questions with step-by-step solutions, upvote helpful contributions, bookmark resources, and build their recognized academic standing.

---

## 1. Project Overview

StudyHub addresses the challenge of fragmented student study groups by providing a single, modern academic portal that brings together:
- **Study Materials Repository**: High-yield handwritten notes, university question papers, lab manuals, and cheat sheets with real file downloads.
- **Peer Doubt Board**: Discussion threads with upvoting, question filtering (Answered/Unanswered), accepted answers, and nested replies.
- **Student Dashboard**: Live academic statistics, recent uploads, asked doubts, answer stats, and subject-tailored recommendations.
- **Bookmarks & Saved Center**: Multi-tab organization for bookmarked materials, questions, and solutions.
- **Academic Moderation**: Dedicated moderator/admin console to review reported content, dismiss reports, or delete violations.
- **Visual Identity**: Professional college education visual identity using Deep Navy (`#0B2A5B`), Primary Blue (`#1557A6`), Bright Blue (`#2878D4`), Light Sky Blue (`#EAF4FF`), and Cyan Accent (`#18B7C9`), completely free of generic AI slop or purple gradients.

---

## 2. Features

### Public Features:
1. **Interactive Hero Section**: Deep navy to primary blue gradient container with a clean wave transition, typography hierarchy, and collaborative learning artwork.
2. **Featured Curriculum Modules**: 4 primary pillars (Share Study Materials, Ask a Doubt, Help Your Peers, Save & Organize).
3. **Materials Directory**: Search by title, subject, degree course, description, or tags with multi-parameter filter panel (Course, Semester, Category, File Type) and sorting (Newest, Most Downloaded, Most Viewed, Most Relevant).
4. **Real File Download Engine**: Instant browser download of genuine uploaded files or verified academic resource files.
5. **Doubt Board**: Question cards showing answer count, views, upvotes, and status indicators.
6. **Detailed Question Discussion**: Peer answers list, markdown/code formatting, answer upvotes, nested replies, inline answer editing, and question author's ability to accept a solution (`✓ Accepted Answer`).
7. **Ask a Doubt Form**: Complete validation, degree and semester pickers, keyword tags, and optional attachment upload.
8. **Student Community & Leaderboard**: Dynamically computed rankings based on uploads, accepted answers, and upvote karma.

### Authenticated Features:
9. **Student Dashboard**: Time-aware greeting, real non-mock statistics (Materials Uploaded, Doubts Asked, Answers Posted, Helpful Votes), recent activity feed, and recommendations.
10. **File Upload Hub**: Real drag-and-drop file upload with progress bar, validation for allowed file formats (PDF, PPT, DOC, ZIP up to 50MB), and instant database synchronization.
11. **Saved Resources Manager**: Categorized tabbed view for Saved Materials, Saved Doubts, and Saved Answers with one-click un-bookmarking.
12. **Student Profile**: Editable profile (name, college, degree, semester, bio), activity stats, and history tabs.
13. **Real-Time Notification Center**: Interactive notification drop-down and dedicated center with unread count badges and "Mark all as read" functionality.
14. **Quick Demo Switcher**: Instant 1-click test user switcher in navbar (Aarav - B.Tech student, Priya - BCA student, Prof. Sen - Admin Moderator) for seamless testing.

### Moderation & Security:
15. **Content Reporting**: Students can flag inaccurate or abusive content directly to the academic board.
16. **Admin Dashboard**: Role-based access control allowing administrators to review reported items, delete inappropriate materials/doubts, and view registered students.

---

## 3. Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React icons
- **Backend / Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth (with zero-friction local persistent fallback for instant out-of-the-box evaluation)
- **Storage**: Supabase Storage / Browser Object URL streaming
- **Typography**: Plus Jakarta Sans, JetBrains Mono

---

## 4. Folder Structure

```
studyhub/
├── .env.example              # Environment variables template
├── index.html                # HTML entry point with meta tags & fonts
├── metadata.json             # AI Studio applet metadata
├── package.json              # Project dependencies
├── supabase-schema.sql       # Complete PostgreSQL schema & RLS policies
├── tsconfig.json             # TypeScript compiler configuration
├── vite.config.ts            # Vite configuration
└── src/
    ├── assets/
    │   └── images/           # Generated vector educational visual assets
    ├── components/
    │   ├── Navbar.tsx        # Top Bar Contract with Search & Notifications
    │   ├── Footer.tsx        # Clean university-style footer
    │   ├── MaterialCard.tsx  # Resource card with download & bookmark
    │   ├── DoubtCard.tsx     # Doubt card with upvotes & answers count
    │   ├── AnswerCard.tsx    # Peer solution card with accepted status & replies
    │   ├── FilterPanel.tsx   # Multi-filter sidebar (Course, Sem, Type, Format)
    │   ├── EmptyState.tsx    # Reusable empty states
    │   ├── SkeletonLoader.tsx# Loading placeholders
    │   └── ReportModal.tsx   # Content reporting modal
    ├── context/
    │   ├── AuthContext.tsx   # Authentication, session, and profile state
    │   └── DataContext.tsx   # Reactive state for materials, doubts, votes, etc.
    ├── lib/
    │   ├── supabase.ts       # Supabase client initialization
    │   └── mockData.ts       # Realistic college starter dataset
    ├── pages/
    │   ├── Home.tsx          # Hero, features, highlights, community CTA
    │   ├── Materials.tsx     # Materials catalog with live search & filters
    │   ├── MaterialDetails.tsx# Full details, preview box & download
    │   ├── Doubts.tsx        # Doubt Board with status filter & search
    │   ├── DoubtDetails.tsx  # Discussion thread, answers, accepted solutions
    │   ├── AskDoubt.tsx      # Question submission form with validation
    │   ├── UploadMaterial.tsx# Resource upload with progress & validation
    │   ├── Dashboard.tsx     # Student dashboard with live activity & metrics
    │   ├── Saved.tsx         # Saved bookmarks across materials & doubts
    │   ├── Profile.tsx       # Student profile & edit profile modal
    │   ├── Notifications.tsx # Real notifications inbox
    │   ├── Community.tsx     # Contributor leaderboard & popular materials
    │   ├── Login.tsx         # Split-layout login with demo accounts
    │   ├── Register.tsx      # Register form with password strength indicator
    │   ├── ForgotPassword.tsx# Password reset request flow
    │   └── Admin.tsx         # Moderator review & moderation dashboard
    ├── types/
    │   └── index.ts          # Core TypeScript interface definitions
    ├── App.tsx               # Main routing & state mounting
    ├── index.css             # Tailwind CSS & theme definitions
    └── main.tsx              # React DOM entry point
```

---

## 5. Supabase Setup Guide

If you wish to connect StudyHub directly to your personal Supabase cloud instance:

### Step 1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **New Project** and name it `studyhub-portal`.

### Step 2: Run the SQL Schema
1. Open your Supabase Project dashboard.
2. In the left navigation, click on **SQL Editor**.
3. Open `supabase-schema.sql` from this project.
4. Copy its entire content, paste it into the Supabase SQL editor, and click **Run**.
5. This automatically creates all tables (`profiles`, `materials`, `doubts`, `answers`, `votes`, `bookmarks`, `notifications`), triggers, and Row Level Security (RLS) policies.

### Step 3: Configure Storage Bucket
1. In Supabase, navigate to **Storage**.
2. Create a new public bucket named `studyhub-materials`.
3. In SQL editor, add storage access policies (included in `supabase-schema.sql`).

### Step 4: Add Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your Supabase API credentials:
   ```env
   VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key-here"
   ```

*(Note: If you run StudyHub without Supabase credentials, it automatically runs in offline/local persistent mode using browser storage pre-seeded with rich academic content, so all features work immediately out of the box!)*

---

## 6. How to Run Locally

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your web browser.

---

## 7. How to Test All Features

- **Explore Materials**: Go to `/materials`, type in the search bar (e.g. "Data Structures" or "Operating Systems"), apply filters (Degree: "B.E / B.Tech", Category: "Notes"), and observe real-time filtering.
- **Download Material**: Click **Download** on any material card or details page; the file will be downloaded to your local computer.
- **Ask a Doubt**: Click **+ Ask a Doubt**, fill in the title, description, subject, course, semester, and tags, then submit. You will be redirected to your new discussion thread.
- **Answer a Doubt**: On any doubt details page, write an explanation in the solution box and click **Post Answer**.
- **Upvote & Accept**: Click **Helpful** to upvote an answer. If you are the question author, click **Mark as Best Answer** to award the green accepted solution badge.
- **Upload Notes**: Navigate to `/upload`, select or drop a PDF/DOC/PPT file, enter title and subject, and click **Upload Material** to watch the progress bar and instant publishing.
- **Bookmarks**: Click the bookmark icon on any card and view it inside `/saved`.
- **Edit Profile**: Go to `/profile`, click **Edit Profile**, modify your college or bio, and save changes.
- **Test Moderator**: In the top navigation, click **Switch User** and choose **Prof. Sen (Admin)**, then click **Admin Console** to review reported items and moderate content.

---

## 8. Deployment

To build for production:
```bash
npm run build
```
The compiled static assets will be located in the `dist` folder, ready for deployment on Vercel, Netlify, Cloud Run, or GitHub Pages.
