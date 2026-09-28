import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Material,
  Doubt,
  Answer,
  BookmarkRecord,
  VoteRecord,
  NotificationItem,
  ContentReport,
  CourseType,
  SemesterType,
  MaterialCategory,
  FileType
} from '../types';
import {
  INITIAL_MATERIALS,
  INITIAL_DOUBTS,
  INITIAL_ANSWERS,
  INITIAL_NOTIFICATIONS
} from '../lib/mockData';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface UploadMaterialInput {
  title: string;
  description: string;
  subject: string;
  course: CourseType;
  semester: SemesterType;
  material_type: MaterialCategory;
  tags: string[];
  file: File;
}

interface PostDoubtInput {
  title: string;
  description: string;
  subject: string;
  course: CourseType;
  semester: SemesterType;
  tags: string[];
  attachment?: File;
}

interface DataContextType {
  // Materials
  materials: Material[];
  uploadMaterial: (input: UploadMaterialInput) => Promise<{ success: boolean; material?: Material; error?: string }>;
  deleteMaterial: (materialId: string) => Promise<{ success: boolean; error?: string }>;
  recordMaterialView: (materialId: string) => void;
  downloadMaterial: (material: Material) => void;

  // Doubts
  doubts: Doubt[];
  postDoubt: (input: PostDoubtInput) => Promise<{ success: boolean; doubt?: Doubt; error?: string }>;
  deleteDoubt: (doubtId: string) => Promise<{ success: boolean; error?: string }>;
  recordDoubtView: (doubtId: string) => void;
  toggleDoubtVote: (doubtId: string) => void;
  hasUserVotedDoubt: (doubtId: string) => boolean;

  // Answers
  answers: Answer[];
  postAnswer: (doubtId: string, content: string) => Promise<{ success: boolean; answer?: Answer; error?: string }>;
  editAnswer: (answerId: string, newContent: string) => Promise<{ success: boolean; error?: string }>;
  deleteAnswer: (answerId: string) => Promise<{ success: boolean; error?: string }>;
  toggleAnswerVote: (answerId: string) => void;
  hasUserVotedAnswer: (answerId: string) => boolean;
  markBestAnswer: (doubtId: string, answerId: string) => void;
  postReply: (answerId: string, content: string) => void;

  // Bookmarks
  bookmarks: BookmarkRecord[];
  toggleBookmark: (targetId: string, targetType: 'material' | 'doubt' | 'answer') => void;
  isBookmarked: (targetId: string) => boolean;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationAsRead: (notifId: string) => void;
  markAllNotificationsAsRead: () => void;

  // Reports
  reports: ContentReport[];
  submitReport: (targetId: string, targetType: 'material' | 'doubt' | 'answer', targetTitle: string, reason: string, details?: string) => void;
  resolveReport: (reportId: string, action: 'dismiss' | 'delete') => void;

  // Global search query helper
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MATERIALS: 'studyhub_materials_v1',
  DOUBTS: 'studyhub_doubts_v1',
  ANSWERS: 'studyhub_answers_v1',
  BOOKMARKS: 'studyhub_bookmarks_v1',
  VOTES: 'studyhub_votes_v1',
  NOTIFICATIONS: 'studyhub_notifications_v1',
  REPORTS: 'studyhub_reports_v1'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [materials, setMaterials] = useState<Material[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATERIALS);
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [doubts, setDoubts] = useState<Doubt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOUBTS);
    return saved ? JSON.parse(saved) : INITIAL_DOUBTS;
  });

  const [answers, setAnswers] = useState<Answer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    return saved ? JSON.parse(saved) : INITIAL_ANSWERS;
  });

  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return saved ? JSON.parse(saved) : [
      { id: 'bm-1', user_id: 'user-1', target_id: 'mat-1', target_type: 'material', created_at: '2026-03-01T00:00:00Z' },
      { id: 'bm-2', user_id: 'user-1', target_id: 'doubt-1', target_type: 'doubt', created_at: '2026-03-02T00:00:00Z' }
    ];
  });

  const [votes, setVotes] = useState<VoteRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VOTES);
    return saved ? JSON.parse(saved) : [
      { id: 'vt-1', user_id: 'user-1', target_id: 'doubt-1', target_type: 'doubt', created_at: '2026-03-14T00:00:00Z' },
      { id: 'vt-2', user_id: 'user-1', target_id: 'ans-1', target_type: 'answer', created_at: '2026-03-14T00:00:00Z' }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [reports, setReports] = useState<ContentReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Persist states to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(doubts));
  }, [doubts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }, [reports]);

  // Sync with Supabase if configured
  useEffect(() => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      const fetchSupabaseData = async () => {
        try {
          const { data: remoteMats } = await client.from('materials').select('*').order('created_at', { ascending: false });
          if (remoteMats && remoteMats.length > 0) setMaterials(remoteMats);

          const { data: remoteDoubts } = await client.from('doubts').select('*').order('created_at', { ascending: false });
          if (remoteDoubts && remoteDoubts.length > 0) setDoubts(remoteDoubts);

          const { data: remoteAnswers } = await client.from('answers').select('*').order('created_at', { ascending: true });
          if (remoteAnswers && remoteAnswers.length > 0) setAnswers(remoteAnswers);
        } catch {
          // Keep local state
        }
      };
      fetchSupabaseData();
    }
  }, []);

  // Material Actions
  const uploadMaterial = async (input: UploadMaterialInput): Promise<{ success: boolean; material?: Material; error?: string }> => {
    if (!user) {
      return { success: false, error: 'You must be logged in to upload study materials.' };
    }

    try {
      const extension = input.file.name.split('.').pop()?.toUpperCase() || 'PDF';
      let fileType: FileType = 'PDF';
      if (['PDF', 'PPT', 'PPTX', 'DOC', 'DOCX', 'ZIP'].includes(extension)) {
        fileType = extension as FileType;
      }

      const sizeFormatted = input.file.size > 1024 * 1024
        ? `${(input.file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(1, Math.round(input.file.size / 1024))} KB`;

      // Create an object URL so the uploaded file can be actually downloaded or viewed immediately!
      const objectUrl = URL.createObjectURL(input.file);

      const newMaterial: Material = {
        id: `mat-${Date.now()}`,
        title: input.title.trim(),
        description: input.description.trim(),
        subject: input.subject.trim(),
        course: input.course,
        semester: input.semester,
        material_type: input.material_type,
        file_type: fileType,
        file_size: sizeFormatted,
        file_name: input.file.name,
        file_url: objectUrl,
        uploader_id: user.id,
        uploader_name: user.full_name,
        uploader_avatar: user.avatar_url,
        uploader_college: user.college,
        views_count: 1,
        downloads_count: 0,
        tags: input.tags.filter(Boolean),
        created_at: new Date().toISOString()
      };

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('materials').insert([newMaterial]);
        } catch {
          // fallback locally
        }
      }

      setMaterials(prev => [newMaterial, ...prev]);

      // Add system notification for user
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: user.id,
        title: 'Material Published Successfully',
        message: `Your material "${input.title}" is now live and accessible to college peers.`,
        type: 'material',
        link: `/materials/${newMaterial.id}`,
        is_read: false,
        created_at: new Date().toISOString()
      };
      setNotifications(prev => [newNotif, ...prev]);

      return { success: true, material: newMaterial };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unable to upload file. Please try again.';
      return { success: false, error: errorMsg };
    }
  };

  const deleteMaterial = async (materialId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const mat = materials.find(m => m.id === materialId);
    if (!mat) return { success: false, error: 'Material not found' };

    if (mat.uploader_id !== user.id && user.role !== 'admin') {
      return { success: false, error: 'You do not have permission to delete this material.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('materials').delete().eq('id', materialId);
      } catch {
        // local delete
      }
    }

    setMaterials(prev => prev.filter(m => m.id !== materialId));
    setBookmarks(prev => prev.filter(b => !(b.target_type === 'material' && b.target_id === materialId)));
    return { success: true };
  };

  const recordMaterialView = (materialId: string) => {
    setMaterials(prev =>
      prev.map(m => (m.id === materialId ? { ...m, views_count: m.views_count + 1 } : m))
    );
  };

  const downloadMaterial = (material: Material) => {
    // Increment download count
    setMaterials(prev =>
      prev.map(m => (m.id === material.id ? { ...m, downloads_count: m.downloads_count + 1 } : m))
    );

    // Trigger real browser download
    if (material.file_url && material.file_url.startsWith('blob:')) {
      const link = document.createElement('a');
      link.href = material.file_url;
      link.download = material.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Create a real text/markdown simulated download if uploaded originally as mock
      const sampleContent = `=========================================================\nSTUDYHUB ACADEMIC MATERIAL REPOSITORY\n=========================================================\nTitle: ${material.title}\nSubject: ${material.subject}\nCourse: ${material.course} (${material.semester})\nUploaded by: ${material.uploader_name} (${material.uploader_college})\nFile: ${material.file_name} (${material.file_size})\nDate: ${new Date(material.created_at).toLocaleDateString()}\n\nDESCRIPTION:\n${material.description}\n\nTAGS:\n${material.tags.join(', ')}\n\n=========================================================\n[StudyHub Verified Academic Resource: Verified by College Peer Community]\n=========================================================`;
      const blob = new Blob([sampleContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = material.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Doubt Actions
  const postDoubt = async (input: PostDoubtInput): Promise<{ success: boolean; doubt?: Doubt; error?: string }> => {
    if (!user) {
      return { success: false, error: 'You must be logged in to ask a doubt.' };
    }

    let attachmentUrl: string | undefined;
    let attachmentName: string | undefined;

    if (input.attachment) {
      attachmentUrl = URL.createObjectURL(input.attachment);
      attachmentName = input.attachment.name;
    }

    const newDoubt: Doubt = {
      id: `doubt-${Date.now()}`,
      title: input.title.trim(),
      description: input.description.trim(),
      subject: input.subject.trim(),
      course: input.course,
      semester: input.semester,
      tags: input.tags.filter(Boolean),
      author_id: user.id,
      author_name: user.full_name,
      author_avatar: user.avatar_url,
      author_college: user.college,
      views_count: 1,
      upvotes_count: 0,
      status: 'Unanswered',
      attachment_url: attachmentUrl,
      attachment_name: attachmentName,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('doubts').insert([newDoubt]);
      } catch {
        // fallback local
      }
    }

    setDoubts(prev => [newDoubt, ...prev]);
    return { success: true, doubt: newDoubt };
  };

  const deleteDoubt = async (doubtId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const doubt = doubts.find(d => d.id === doubtId);
    if (!doubt) return { success: false, error: 'Doubt not found' };

    if (doubt.author_id !== user.id && user.role !== 'admin') {
      return { success: false, error: 'You do not have permission to delete this doubt.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('doubts').delete().eq('id', doubtId);
      } catch {
        // ignore
      }
    }

    setDoubts(prev => prev.filter(d => d.id !== doubtId));
    setAnswers(prev => prev.filter(a => a.doubt_id !== doubtId));
    setBookmarks(prev => prev.filter(b => !(b.target_type === 'doubt' && b.target_id === doubtId)));
    return { success: true };
  };

  const recordDoubtView = (doubtId: string) => {
    setDoubts(prev =>
      prev.map(d => (d.id === doubtId ? { ...d, views_count: d.views_count + 1 } : d))
    );
  };

  const toggleDoubtVote = (doubtId: string) => {
    if (!user) return;
    const existing = votes.find(v => v.user_id === user.id && v.target_id === doubtId && v.target_type === 'doubt');

    if (existing) {
      // Remove vote
      setVotes(prev => prev.filter(v => v.id !== existing.id));
      setDoubts(prev =>
        prev.map(d => (d.id === doubtId ? { ...d, upvotes_count: Math.max(0, d.upvotes_count - 1) } : d))
      );
    } else {
      // Add vote
      const newVote: VoteRecord = {
        id: `vt-${Date.now()}`,
        user_id: user.id,
        target_id: doubtId,
        target_type: 'doubt',
        created_at: new Date().toISOString()
      };
      setVotes(prev => [...prev, newVote]);
      setDoubts(prev =>
        prev.map(d => (d.id === doubtId ? { ...d, upvotes_count: d.upvotes_count + 1 } : d))
      );

      // Notify doubt author if it's someone else
      const doubt = doubts.find(d => d.id === doubtId);
      if (doubt && doubt.author_id !== user.id) {
        const notif: NotificationItem = {
          id: `notif-${Date.now()}`,
          user_id: doubt.author_id,
          title: 'Your Doubt Received an Upvote',
          message: `${user.full_name} upvoted your question: "${doubt.title.substring(0, 45)}..."`,
          type: 'upvote',
          link: `/doubts/${doubtId}`,
          is_read: false,
          created_at: new Date().toISOString()
        };
        setNotifications(prev => [notif, ...prev]);
      }
    }
  };

  const hasUserVotedDoubt = (doubtId: string): boolean => {
    if (!user) return false;
    return votes.some(v => v.user_id === user.id && v.target_id === doubtId && v.target_type === 'doubt');
  };

  // Answer Actions
  const postAnswer = async (doubtId: string, content: string): Promise<{ success: boolean; answer?: Answer; error?: string }> => {
    if (!user) {
      return { success: false, error: 'You must be logged in to answer.' };
    }

    if (!content.trim()) {
      return { success: false, error: 'Answer content cannot be empty.' };
    }

    const newAnswer: Answer = {
      id: `ans-${Date.now()}`,
      doubt_id: doubtId,
      author_id: user.id,
      author_name: user.full_name,
      author_avatar: user.avatar_url,
      author_college: user.college,
      content: content.trim(),
      upvotes_count: 0,
      is_accepted: false,
      created_at: new Date().toISOString(),
      replies: []
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('answers').insert([newAnswer]);
      } catch {
        // fallback local
      }
    }

    setAnswers(prev => [...prev, newAnswer]);

    // Mark doubt status as Answered
    setDoubts(prev =>
      prev.map(d => (d.id === doubtId ? { ...d, status: 'Answered' } : d))
    );

    // Notify question author
    const targetDoubt = doubts.find(d => d.id === doubtId);
    if (targetDoubt && targetDoubt.author_id !== user.id) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: targetDoubt.author_id,
        title: 'New Peer Answer Received',
        message: `${user.full_name} answered your doubt: "${targetDoubt.title.substring(0, 40)}..."`,
        type: 'answer',
        link: `/doubts/${doubtId}`,
        is_read: false,
        created_at: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }

    return { success: true, answer: newAnswer };
  };

  const editAnswer = async (answerId: string, newContent: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const ans = answers.find(a => a.id === answerId);
    if (!ans) return { success: false, error: 'Answer not found' };

    if (ans.author_id !== user.id && user.role !== 'admin') {
      return { success: false, error: 'You cannot edit another user answer.' };
    }

    setAnswers(prev =>
      prev.map(a => (a.id === answerId ? { ...a, content: newContent.trim() } : a))
    );
    return { success: true };
  };

  const deleteAnswer = async (answerId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const ans = answers.find(a => a.id === answerId);
    if (!ans) return { success: false, error: 'Answer not found' };

    if (ans.author_id !== user.id && user.role !== 'admin') {
      return { success: false, error: 'You cannot delete another user answer.' };
    }

    setAnswers(prev => prev.filter(a => a.id !== answerId));
    setBookmarks(prev => prev.filter(b => !(b.target_type === 'answer' && b.target_id === answerId)));
    return { success: true };
  };

  const toggleAnswerVote = (answerId: string) => {
    if (!user) return;
    const existing = votes.find(v => v.user_id === user.id && v.target_id === answerId && v.target_type === 'answer');

    if (existing) {
      // Remove vote
      setVotes(prev => prev.filter(v => v.id !== existing.id));
      setAnswers(prev =>
        prev.map(a => (a.id === answerId ? { ...a, upvotes_count: Math.max(0, a.upvotes_count - 1) } : a))
      );
    } else {
      // Add vote
      const newVote: VoteRecord = {
        id: `vt-${Date.now()}`,
        user_id: user.id,
        target_id: answerId,
        target_type: 'answer',
        created_at: new Date().toISOString()
      };
      setVotes(prev => [...prev, newVote]);
      setAnswers(prev =>
        prev.map(a => (a.id === answerId ? { ...a, upvotes_count: a.upvotes_count + 1 } : a))
      );

      const targetAns = answers.find(a => a.id === answerId);
      if (targetAns && targetAns.author_id !== user.id) {
        const notif: NotificationItem = {
          id: `notif-${Date.now()}`,
          user_id: targetAns.author_id,
          title: 'Your Answer Received an Upvote',
          message: `${user.full_name} found your explanation helpful!`,
          type: 'upvote',
          link: `/doubts/${targetAns.doubt_id}`,
          is_read: false,
          created_at: new Date().toISOString()
        };
        setNotifications(prev => [notif, ...prev]);
      }
    }
  };

  const hasUserVotedAnswer = (answerId: string): boolean => {
    if (!user) return false;
    return votes.some(v => v.user_id === user.id && v.target_id === answerId && v.target_type === 'answer');
  };

  const markBestAnswer = (doubtId: string, answerId: string) => {
    if (!user) return;
    const targetDoubt = doubts.find(d => d.id === doubtId);
    if (!targetDoubt || (targetDoubt.author_id !== user.id && user.role !== 'admin')) {
      return; // Only question author can mark accepted
    }

    setAnswers(prev =>
      prev.map(a => {
        if (a.doubt_id === doubtId) {
          return { ...a, is_accepted: a.id === answerId ? !a.is_accepted : false };
        }
        return a;
      })
    );

    const targetAns = answers.find(a => a.id === answerId);
    if (targetAns && targetAns.author_id !== user.id) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: targetAns.author_id,
        title: 'Your Answer was Accepted as Best Answer!',
        message: `${user.full_name} accepted your answer to their question. You gained top academic reputation!`,
        type: 'accepted',
        link: `/doubts/${doubtId}`,
        is_read: false,
        created_at: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const postReply = (answerId: string, content: string) => {
    if (!user || !content.trim()) return;
    const newReply = {
      id: `rep-${Date.now()}`,
      answer_id: answerId,
      author_id: user.id,
      author_name: user.full_name,
      author_avatar: user.avatar_url,
      content: content.trim(),
      created_at: new Date().toISOString()
    };

    setAnswers(prev =>
      prev.map(a => {
        if (a.id === answerId) {
          return { ...a, replies: [...(a.replies || []), newReply] };
        }
        return a;
      })
    );

    const ans = answers.find(a => a.id === answerId);
    if (ans && ans.author_id !== user.id) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: ans.author_id,
        title: 'New Reply on Your Answer',
        message: `${user.full_name} replied to your answer discussion.`,
        type: 'reply',
        link: `/doubts/${ans.doubt_id}`,
        is_read: false,
        created_at: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Bookmarks
  const toggleBookmark = (targetId: string, targetType: 'material' | 'doubt' | 'answer') => {
    if (!user) return;
    const existing = bookmarks.find(b => b.user_id === user.id && b.target_id === targetId && b.target_type === targetType);

    if (existing) {
      setBookmarks(prev => prev.filter(b => b.id !== existing.id));
    } else {
      const newBm: BookmarkRecord = {
        id: `bm-${Date.now()}`,
        user_id: user.id,
        target_id: targetId,
        target_type: targetType,
        created_at: new Date().toISOString()
      };
      setBookmarks(prev => [...prev, newBm]);
    }
  };

  const isBookmarked = (targetId: string): boolean => {
    if (!user) return false;
    return bookmarks.some(b => b.user_id === user.id && b.target_id === targetId);
  };

  // Notifications
  const unreadNotifsCount = user
    ? notifications.filter(n => n.user_id === user.id && !n.is_read).length
    : 0;

  const markNotificationAsRead = (notifId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    if (!user) return;
    setNotifications(prev =>
      prev.map(n => (n.user_id === user.id ? { ...n, is_read: true } : n))
    );
  };

  // Reports
  const submitReport = (
    targetId: string,
    targetType: 'material' | 'doubt' | 'answer',
    targetTitle: string,
    reason: string,
    details?: string
  ) => {
    if (!user) return;
    const newReport: ContentReport = {
      id: `rep-${Date.now()}`,
      reporter_id: user.id,
      reporter_name: user.full_name,
      target_id: targetId,
      target_type: targetType,
      target_title: targetTitle,
      reason,
      details,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setReports(prev => [newReport, ...prev]);
  };

  const resolveReport = (reportId: string, action: 'dismiss' | 'delete') => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    if (action === 'delete') {
      if (report.target_type === 'material') {
        setMaterials(prev => prev.filter(m => m.id !== report.target_id));
      } else if (report.target_type === 'doubt') {
        setDoubts(prev => prev.filter(d => d.id !== report.target_id));
      } else if (report.target_type === 'answer') {
        setAnswers(prev => prev.filter(a => a.id !== report.target_id));
      }
      setReports(prev =>
        prev.map(r => (r.id === reportId ? { ...r, status: 'resolved' } : r))
      );
    } else {
      setReports(prev =>
        prev.map(r => (r.id === reportId ? { ...r, status: 'dismissed' } : r))
      );
    }
  };

  return (
    <DataContext.Provider
      value={{
        materials,
        uploadMaterial,
        deleteMaterial,
        recordMaterialView,
        downloadMaterial,
        doubts,
        postDoubt,
        deleteDoubt,
        recordDoubtView,
        toggleDoubtVote,
        hasUserVotedDoubt,
        answers,
        postAnswer,
        editAnswer,
        deleteAnswer,
        toggleAnswerVote,
        hasUserVotedAnswer,
        markBestAnswer,
        postReply,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        reports,
        submitReport,
        resolveReport,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
