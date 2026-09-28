import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  Bell,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

interface NotificationsProps {
  navigate: (path: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ navigate }) => {
  const { user } = useAuth();
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotifsCount
  } = useData();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Sign in to View Notifications</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
        >
          Sign In
        </button>
      </div>
    );
  }

  const userNotifs = notifications.filter(n => n.user_id === user.id);

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'accepted':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'upvote':
        return <ThumbsUp className="w-4 h-4 text-amber-500" />;
      case 'answer':
      case 'reply':
        return <MessageSquare className="w-4 h-4 text-[#1557A6]" />;
      case 'material':
        return <BookOpen className="w-4 h-4 text-sky-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B2A5B]">
              Notifications
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Stay updated on peer solutions, upvotes, and new lecture notes.
            </p>
          </div>
        </div>

        {unreadNotifsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs font-semibold text-[#1557A6] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      {userNotifs.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="All caught up!"
          description="You don't have any notifications right now. Activity on your uploads and questions will appear here."
        />
      ) : (
        <div className="space-y-3">
          {userNotifs.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationAsRead(notif.id);
                if (notif.link) navigate(notif.link);
              }}
              className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3.5 ${
                !notif.is_read
                  ? 'bg-[#EAF4FF]/40 border-blue-200 hover:bg-[#EAF4FF]/70'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="p-2 rounded-lg bg-white shadow-2xs border border-slate-100 shrink-0">
                {getNotifIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {notif.title}
                  </h4>
                  {!notif.is_read && (
                    <span className="w-2 h-2 rounded-full bg-[#1557A6] shrink-0"></span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {notif.message}
                </p>

                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(notif.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
