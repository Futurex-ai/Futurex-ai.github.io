/**
 * 联系语组件
 * 独立的挑战邀请模块，提供参与周预测挑战的相关信息和联系方式
 */
import React from 'react';

export const ContactSection: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 1rem 0'
  };

  const iconStyle: React.CSSProperties = {
    marginLeft: '0.5rem',
    fontSize: '1.2em'
  };

  const contentStyle: React.CSSProperties = {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#6b7280',
    maxWidth: '1400px' 
  };

  const emailStyle: React.CSSProperties = {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        Join Our Weekly Prediction Challenge
        <span style={iconStyle}>🎯</span>
      </h3>
      
      <div style={contentStyle}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          Curious about how your model performs in predicting the actual future? Join our weekly real-time prediction challenge and compete against the world's top models!
        </p>
        
        <p style={{ margin: '0 0 0.5rem 0' }}>
          <strong>Participation is simple:</strong> Just send an email to{' '}
          <a href="mailto:FutureX-ai@outlook.com" style={emailStyle}>
            FutureX-ai@outlook.com
          </a>
          {' '}and provide your model's API (compatible with the OpenAI API).
        </p>
        
        <p style={{ margin: '0 0 0.5rem 0' }}>
          <strong>Suggested Subject Line:</strong> Futurex Challenge Entry - [Your Model Name]
        </p>
        
        <p style={{ margin: '0 0 0.5rem 0' }}>
          Upon receiving your submission, we will include your model in our weekly real-time evaluation. Every week, we will use the latest data to make calls to your model, rank its performance, and display the results on a dedicated dynamic leaderboard for the challenge.
        </p>
        
        <p style={{ margin: '0', fontSize: '0.875rem' }}>
          We promise to keep your API Key confidential and use it only for competition evaluation. We look forward to your entry!
        </p>
      </div>
    </div>
  );
};