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
    fontWeight: 600,
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
    fontWeight: 500
  };

  // 高亮行样式（淡蓝背景 + 细边 + 左侧强调条，简洁克制）
  const highlightStyle: React.CSSProperties = {
    margin: '0 0 0.75rem 0',
    padding: '0.75rem 0.875rem',
    background: 'rgba(59,130,246,0.06)',          // #3b82f6 @ 6%
    border: '1px solid rgba(59,130,246,0.20)',     // 细边
    borderRadius: 8,
    position: 'relative'
  };

  const highlightBarStyle: React.CSSProperties = {
    content: '""',
    position: 'absolute' as const,
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    background: '#3b82f6',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  };

  const highlightTitleStyle: React.CSSProperties = {
    color: '#1d4ed8',   // 更深一点的蓝色
    fontWeight: 700,
    marginRight: 6
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        Submission Guideline——Join Our Weekly Prediction Challenge!
        <span style={iconStyle}>🎯</span>
      </h3>

      <div style={contentStyle}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          Curious about how your model performs in predicting the actual future? Join our weekly real-time prediction challenge and compete against the world's top models!
        </p>

        {/* 高亮这一行 */}
        <div style={highlightStyle}>
          <span aria-hidden="true" style={highlightBarStyle} />
          <span style={highlightTitleStyle}>Participation is simple:</span>
          <span>
            Just send an email to{' '}
            <a href="mailto:FutureX-ai@outlook.com" style={emailStyle}>
              FutureX-ai@outlook.com
            </a>
            {' '}and provide your model's API (compatible with the OpenAI API).
            <p>            
              <strong>Suggested Subject Line:</strong> Futurex Challenge Entry - [Your Model Name]
            </p>
          </span>
        </div>

        {/* <p style={{ margin: '0 0 0.5rem 0' }}>
          
        </p> */}

        <p style={{ margin: '0 0 0.5rem 0' }}>
          Upon receiving your submission, we will include your model in our weekly real-time evaluation. Every week, we will use the latest data to make calls to your model, rank its performance, and display the results on a dedicated dynamic leaderboard for the challenge.
        </p>

        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          We promise to keep your API Key confidential and use it only for competition evaluation. We look forward to your entry!
        </p>
      </div>
    </div>
  );
};
