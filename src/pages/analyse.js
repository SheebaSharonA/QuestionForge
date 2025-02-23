import React from 'react'

function Analysis({ analysis }) {
    if (!analysis) {
        return <div className="analysis">It will appear here</div>;
    }

    // Split the API response into sections
    const sections = analysis.split('**').filter(Boolean);

    return (
        <div className="analysis">
            {sections.map((section, index) => {
                // Check for labeled sections (like "Problem Summary:")
                if (section.includes(':')) {
                    const [title, content] = section.split(':', 2);
                    return (
                        <div key={index} className="section">
                            <h2>{title.trim()}</h2>
                            <p>{content.trim()}</p>
                        </div>
                    );
                }
                return <p key={index}>{section}</p>;
            })}
        </div>
    );
}

export default Analysis;