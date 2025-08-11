import { Twitter, Play, FileText, Link, Share2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Content } from '../../services/api';

const formatDate = (dateString: string | undefined | null): string => {
  try {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return format(date, 'dd/MM/yyyy');
  } catch (error) {
    return 'Invalid date';
  }
};

interface ContentCardProps {
  content: Content;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'tweet':
      return Twitter;
    case 'video':
      return Play;
    case 'document':
      return FileText;
    case 'link':
      return Link;
    default:
      return FileText;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'tweet':
      return 'text-blue-500';
    case 'video':
      return 'text-red-500';
    case 'document':
      return 'text-green-500';
    case 'link':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

export const ContentCard = ({ content, onShare, onDelete }: ContentCardProps) => {
  const Icon = getTypeIcon(content.type);
  const iconColor = getTypeColor(content.type);
  const tags = content.tags.split(',').map(tag => tag.trim()).filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{content.title}</h3>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onShare(content._id)}
            className="p-2 text-gray-400 hover:text-[#5244df] transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(content._id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {content.type === 'video' ? (
          <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-gray-400">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Video content</p>
            </div>
          </div>
        ) : content.type === 'tweet' ? (
          <p className="text-gray-600 leading-relaxed">
            The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.
          </p>
        ) : content.type === 'document' ? (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">Future Projects</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Build a personal knowledge base</li>
              <li>• Create a habit tracker</li>
              <li>• Design a minimalist todo app</li>
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">{content.link}</p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-[#5244df]/10 text-[#5244df] text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Date */}
      <p className="text-xs text-gray-400">
        Added on {formatDate(content.createdAt)}
      </p>
    </div>
  );
}; 