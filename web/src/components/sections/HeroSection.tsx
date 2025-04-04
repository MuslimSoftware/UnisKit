import React from 'react';
import styles from './HeroSection.module.css';
import Button from '@/components/shared/Button';
import { BRAND_NAME } from '@fullstack-template/shared';

const heroData = {
  headlineMain: `Build Fast. Launch Faster.`,
  headlineHighlight: "Launch Faster.",
  headlineSub: `No More Boilerplate.`,
  description: `${BRAND_NAME} provides a production-ready full-stack monorepo foundation.
   Launch your next business without wasting time writing boilerplate.`,
  cta: {
    text: "Get Started",
    href: "#value-props",
  },
};

const commandLines = [
  "# 1. Clone the repository",
  "git clone <your-repo-url>",
  "cd <repo-name>",
  "", // Empty line for spacing
  "# 2. Run the Backend (Python/FastAPI)",
  "cd backend",
  "./run.sh # Or python main.py",
  "",
  "# 3. Run the Mobile App (React Native/Expo)",
  "cd ../mobile",
  "npm install",
  "npm run start:dev",
  "",
  "# 4. Run the Web App (React/Vite)",
  "cd ../web",
  "npm install",
  "npm run dev",
];

const HeroSection = () => {
  const renderHeadline = () => {
    const parts = heroData.headlineMain.split(heroData.headlineHighlight);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}<span className={styles.headlineHighlight}>{heroData.headlineHighlight}</span>{parts[1]}
        </>
      );
    }
    return <>{heroData.headlineMain}</>;
  };

  const renderCodeSnippet = () => {
    const keywords = ["git", "cd", "npm", "./run.sh"];
    const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");

    return commandLines.map((line, index) => {
      if (line.trim().startsWith("#")) {
        const commentText = line.slice(line.indexOf('#'));
        return <React.Fragment key={index}><span className={styles.comment}>{commentText}</span><br /></React.Fragment>;
      } else if (line.trim() === "") {
        return <br key={index} />;
      } else {
        const parts = line.split(keywordRegex);
        return (
          <React.Fragment key={index}>
            {parts.map((part, partIndex) => 
              keywords.includes(part) ? (
                <span key={partIndex} className={styles.keyword}>{part}</span>
              ) : (
                part
              )
            )}
            <br />
          </React.Fragment>
        );
      }
    });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          {renderHeadline()}
          <span className={styles.headlineSub}>{heroData.headlineSub}</span>
        </h1>

        <p className={styles.description}>{heroData.description}</p>

        <div className={styles.ctaContainer}>
          <a href={heroData.cta.href} className={styles.ctaLink}>
            <Button
              variant="primary"
              className={styles.ctaButton}
            >
              {heroData.cta.text}
            </Button>
          </a>
        </div>

        <div className={styles.visualPlaceholder}>
          <div className={styles.codeSnippet}>
            <pre><code>
              {renderCodeSnippet()}
            </code></pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 