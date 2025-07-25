import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';

const PostCard = ({ post, getCategoryColor }) => {
  return (
    <div 
      className="rounded-xl shadow-sm border overflow-hidden transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--color-white)', 
        borderColor: 'var(--color-gray-200)',
        boxShadow: 'var(--shadow-sm)'
      }}
      onMouseEnter={(e) => e.target.style.boxShadow = 'var(--shadow-lg)'}
      onMouseLeave={(e) => e.target.style.boxShadow = 'var(--shadow-sm)'}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={post.authorAvatar} 
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover border-2"
            style={{ borderColor: 'var(--color-gray-200)' }}
          />
          <div>
            <h4 
              className="font-semibold"
              style={{ color: 'var(--color-gray-900)' }}
            >
              {post.author}
            </h4>
            <div className="flex items-center space-x-2">
              <span 
                className="text-sm"
                style={{ color: 'var(--color-gray-500)' }}
              >
                {post.date}
              </span>
              <span 
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}
              >
                {post.category}
              </span>
            </div>
          </div>
        </div>
        <button 
          className="hover:text-gray-600"
          style={{ color: 'var(--color-gray-400)' }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4">
        <h3 
          className="text-lg font-semibold mb-2"
          style={{ color: 'var(--color-gray-900)' }}
        >
          {post.title}
        </h3>
        <p 
          className="leading-relaxed"
          style={{ color: 'var(--color-gray-700)' }}
        >
          {post.content}
        </p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="mt-3 mx-4">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Post Details */}
      <div className="px-4 mt-3 pb-2">
        <div 
          className="flex flex-wrap gap-4 text-sm"
          style={{ color: 'var(--color-gray-600)' }}
        >
          {post.time && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.time}</span>
            </div>
          )}
          {post.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{post.location}</span>
            </div>
          )}
          {post.participants && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{post.participants}</span>
            </div>
          )}
        </div>
      </div>

      {/* Social Actions */}
      <div 
        className="px-4 py-3 border-t"
        style={{ borderColor: 'var(--color-gray-100)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              className="flex items-center space-x-2 transition-colors"
              style={{ color: 'var(--color-gray-600)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-red-500)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-gray-600)'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button 
              className="flex items-center space-x-2 transition-colors"
              style={{ color: 'var(--color-gray-600)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-500)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-gray-600)'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            <button 
              className="flex items-center space-x-2 transition-colors"
              style={{ color: 'var(--color-gray-600)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-green-500)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-gray-600)'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          {post.category === 'Events' && (
            <button 
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--color-primary-600)', 
                color: 'var(--color-white)' 
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-primary-700)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-primary-600)'}
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;