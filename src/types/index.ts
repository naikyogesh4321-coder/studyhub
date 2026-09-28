export type CourseType =
  | 'BCA'
  | 'BBA'
  | 'B.Com'
  | 'B.Sc'
  | 'B.E / B.Tech'
  | 'MCA'
  | 'MBA'
  | 'M.Com'
  | 'Other';

export type SemesterType =
  | '1st Semester'
  | '2nd Semester'
  | '3rd Semester'
  | '4th Semester'
  | '5th Semester'
  | '6th Semester'
  | '7th Semester'
  | '8th Semester';

export type MaterialCategory =
  | 'Notes'
  | 'Question Papers'
  | 'PPT'
  | 'Assignments'
  | 'Lab Manuals'
  | 'Reference Books'
  | 'Cheat Sheets'
  | 'Other';

export type FileType = 'PDF' | 'PPT' | 'PPTX' | 'DOC' | 'DOCX' | 'ZIP';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  college: string;
  course: CourseType;
  semester: SemesterType;
  bio?: string;
  avatar_url?: string;
  role: 'student' | 'admin';
  created_at: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  subject: string;
  course: CourseType;
  semester: SemesterType;
  material_type: MaterialCategory;
  file_type: FileType;
  file_size: string;
  file_name: string;
  file_url: string;
  uploader_id: string;
  uploader_name: string;
  uploader_avatar?: string;
  uploader_college: string;
  views_count: number;
  downloads_count: number;
  tags: string[];
  created_at: string;
}

export interface Reply {
  id: string;
  answer_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  created_at: string;
}

export interface Answer {
  id: string;
  doubt_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  author_college?: string;
  content: string;
  upvotes_count: number;
  is_accepted: boolean;
  created_at: string;
  replies?: Reply[];
}

export interface Doubt {
  id: string;
  title: string;
  description: string;
  subject: string;
  course: CourseType;
  semester: SemesterType;
  tags: string[];
  author_id: string;
  author_name: string;
  author_avatar?: string;
  author_college: string;
  views_count: number;
  upvotes_count: number;
  status: 'Answered' | 'Unanswered';
  attachment_url?: string;
  attachment_name?: string;
  created_at: string;
}

export interface VoteRecord {
  id: string;
  user_id: string;
  target_id: string;
  target_type: 'doubt' | 'answer';
  created_at: string;
}

export interface BookmarkRecord {
  id: string;
  user_id: string;
  target_id: string;
  target_type: 'material' | 'doubt' | 'answer';
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'answer' | 'upvote' | 'accepted' | 'material' | 'reply' | 'system';
  link: string;
  is_read: boolean;
  created_at: string;
}

export interface ContentReport {
  id: string;
  reporter_id: string;
  reporter_name: string;
  target_id: string;
  target_type: 'material' | 'doubt' | 'answer';
  target_title: string;
  reason: string;
  details?: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
}

export interface UserStats {
  materialsUploaded: number;
  doubtsAsked: number;
  answersPosted: number;
  helpfulVotesReceived: number;
}
