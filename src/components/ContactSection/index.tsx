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

  const highlightStyle: React.CSSProperties = {
    margin: '0 0 0.75rem 0',
    padding: '0.875rem 1rem 0.875rem 1rem',
    background: 'rgba(59,130,246,0.06)',
    border: '1px solid rgba(59,130,246,0.20)',
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
    color: '#1d4ed8',
    fontWeight: 800 as const,
    marginRight: 6
  };

  const smallText: React.CSSProperties = {
    fontSize: '0.875rem',
    marginTop: '0.35rem'
  };

  const listStyle: React.CSSProperties = {
    margin: '0.25rem 0 0 1.25rem'
  };

  const deadlineHighlight: React.CSSProperties = {
    color: '#b91c1c',
    fontWeight: 700
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        Submission Guidelines — Join Our Weekly Prediction Challenge!
        <span style={iconStyle}>🎯</span>
      </h3>

      <div style={contentStyle}>
        <p style={{ margin: '0 0 0.75rem 0' }}>
          Curious about how your model performs in predicting the actual future? Join our weekly real-time prediction challenge and compete against the world's top models!
        </p>

        {/* RULES INTRO */}
        <div style={highlightStyle}>
          <span aria-hidden="true" style={highlightBarStyle} />
          <div>
            <strong style={highlightTitleStyle}>Weekly Rules:</strong>
            <span>
              We release a new set of tasks every week. If you choose <strong>Option A</strong>, we will automatically test your model on them. If you choose <strong>Option B</strong>, you must download the latest tasks, run your model, and send us your predictions <u>before Friday 24:00 (UTC+8)</u> each week. Submissions received after the deadline will not be counted.
            </span>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={deadlineHighlight}>⚠️ Next submission deadline: August 22nd at 24:00 (UTC+8, Beijing Time)</span>
            </div>
          </div>
        </div>

        {/* OPTION A */}
        <div style={highlightStyle}>
          <span aria-hidden="true" style={highlightBarStyle} />
          <div>
            <strong style={highlightTitleStyle}>Option A — Submit your API:</strong>
            <span>
              Email us at{' '}
              <a href="mailto:FutureX-ai@outlook.com" style={emailStyle}>FutureX-ai@outlook.com</a>
              {' '}with your model's API (OpenAI-compatible endpoint + key) so we can evaluate it weekly.
            </span>
            <div style={smallText}>
              <div><strong>Suggested subject:</strong> <em>FutureX Challenge Entry — [Your Model Name]</em></div>
              <ul style={listStyle}>
                <li>Include brief model details (base, params, safety settings).</li>
                <li>Share any required headers/rate limits.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* OPTION B */}
        <div style={highlightStyle}>
          <span aria-hidden="true" style={highlightBarStyle} />
          <div>
            <strong style={highlightTitleStyle}>Option B — Run locally & email predictions:</strong>
            <span>
              Each week, we update the tasks at{' '}
              <a href="https://huggingface.co/datasets/futurex-ai/Futurex-Online" target="_blank" rel="noreferrer" style={emailStyle}>FutureX-Online (Hugging Face)</a>.
              Download the latest round, run your model, and email us at{' '}
              <a href="mailto:FutureX-ai@outlook.com" style={emailStyle}>FutureX-ai@outlook.com</a>
              {' '} with your predictions before <u>every Friday 24:00 (UTC+8)</u>.
            </span>
            <div style={smallText}>
              <div><strong>Suggested subject:</strong> <em>FutureX Challenge Submission — [Your Model Name][Date]</em></div>
              <ul style={listStyle}>
                <li>Attach predictions (JSON) and cite the dataset commit/hash you used.</li>
                <li>Required columns/fields: <code>id</code>, <code>prediction</code>.</li>
              </ul>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={deadlineHighlight}>🔗 Weekly Tasks Link: <a href="https://huggingface.co/datasets/futurex-ai/Futurex-Online" target="_blank" rel="noreferrer" style={emailStyle}>https://huggingface.co/datasets/futurex-ai/Futurex-Online</a></span>
            </div>
          </div>
        </div>

        <p style={{ margin: '0.75rem 0 0.5rem 0' }}>
          Upon receiving your submission, we will include your model in our weekly real-time evaluation. When the number of tested events is above 200, we will include your model in our overall leaderboard. Every week, we will make calls or validate files against the latest data, rank performance, and display results on a dedicated dynamic leaderboard. Note that when your model does not enter the top 10, you can choose to keep it private or make it public.

          We promise to keep your API key and submission files confidential and use them only for competition evaluation. We look forward to your entry!
        </p>
      </div>
    </div>
  );
};
