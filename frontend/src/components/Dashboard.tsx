import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Sidebar } from './Sidebar';
import { ContentCard } from './ContentCard';
import { AddContentModal } from './AddContentModal';
import { Button } from './button';
import { Share2, Plus } from 'lucide-react';
import { contentAPI } from '../services/api';
import { toast } from 'react-hot-toast';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  // Fetch content
  const { data: contentData, isLoading, error } = useQuery({
    queryKey: ['content'],
    queryFn: contentAPI.getAll,
  });

  // Create content mutation
  const createMutation = useMutation({
    mutationFn: contentAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      toast.success('Content added successfully!');
    },
    onError: () => {
      toast.error('Failed to add content');
    },
  });

  // Delete content mutation
  const deleteMutation = useMutation({
    mutationFn: contentAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      toast.success('Content deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete content');
    },
  });

  // Share content mutation
  const shareMutation = useMutation({
    mutationFn: contentAPI.share,
    onSuccess: (data) => {
      navigator.clipboard.writeText(data.data.shareableLink);
      toast.success('Shareable link copied to clipboard!');
    },
    onError: () => {
      toast.error('Failed to create shareable link');
    },
  });

  const handleAddContent = (data: { link: string; type: string; title: string; tags: string }) => {
    createMutation.mutate(data);
  };

  const handleDeleteContent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleShareContent = (id: string) => {
    shareMutation.mutate(id);
  };

  const filteredContent = contentData?.data.contents.filter((content) => {
    console.log('Filtering content:', content.type, 'activeTab:', activeTab);
    if (activeTab === 'all') return true;
    return content.type === activeTab;
  }) || [];

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">Error loading content</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
      
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">All Notes</h1>
            
            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="md"
                text="Share Brain"
                startIcon={<Share2 size={16} />}
                onClick={() => {
                  // TODO: Implement share brain functionality
                  toast('Share brain feature coming soon!');
                }}
              />
              
              <Button
                variant="primary"
                size="md"
                text="Add Content"
                startIcon={<Plus size={16} />}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          {/* Content Grid */}
          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No content yet</h3>
              <p className="text-gray-500">Start by adding your first piece of content</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((content) => (
                <ContentCard
                  key={content._id}
                  content={content}
                  onShare={handleShareContent}
                  onDelete={handleDeleteContent}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddContent}
      />
    </div>
  );
}; 