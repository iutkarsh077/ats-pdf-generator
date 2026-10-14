/**
 * Resume Templates & Master Prompt Constants
 * Provides multiple reference HTML/CSS templates for ATS-optimized resume generation.
 */

// 1. Executive Navy (Classic ATS) - Exactly matches Image 1
export const templateExecutiveNavy = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 16mm 14mm 16mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #111827;
      background-color: #ffffff;
      font-size: 11px;
      line-height: 1.38;
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    a {
      color: inherit;
      text-decoration: none;
    }

    /* Centered Header */
    .header {
      text-align: center;
      margin-bottom: 6px;
    }
    .header-name {
      font-size: 20px;
      font-weight: 800;
      color: #000000;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .header-contact {
      font-size: 10.5px;
      color: #1a202c;
      line-height: 1.4;
      white-space: nowrap;
    }
    .header-contact span {
      display: inline;
    }
    .header-contact .sep {
      margin: 0 4px;
      color: #4a5568;
    }
    .header-divider {
      border-bottom: 1.2px solid #1a202c;
      margin-top: 6px;
      margin-bottom: 10px;
    }

    /* Section Headings */
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: #1e3a8a; /* Deep Navy Blue */
      letter-spacing: 0.4px;
      margin-top: 10px;
      margin-bottom: 4px;
      page-break-after: avoid;
      break-after: avoid;
    }
    .section-divider {
      border-bottom: 1px solid #4a5568;
      margin-top: 3px;
      margin-bottom: 6px;
    }

    /* Professional Summary */
    .summary-text {
      font-size: 11px;
      line-height: 1.42;
      color: #1f2937;
      margin-bottom: 8px;
      text-align: justify;
    }

    /* Technical Skills */
    .skills-block {
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .skill-line {
      font-size: 11px;
      line-height: 1.38;
      margin-bottom: 3.5px;
    }
    .skill-label {
      font-weight: 700;
      color: #111827;
    }
    .skill-desc {
      color: #1f2937;
    }

    /* Experience & Projects */
    .experience-item {
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .item-role-company {
      font-size: 11.5px;
    }
    .item-title {
      font-weight: 700;
      color: #111827;
    }
    .item-company {
      font-weight: 600;
      color: #374151;
    }
    .item-meta {
      font-size: 10.5px;
      color: #4b5563;
      text-align: right;
    }
    .bullet-list {
      margin: 2px 0 0 16px;
      padding: 0;
      list-style-type: disc;
    }
    .bullet-list li {
      font-size: 11px;
      line-height: 1.4;
      color: #1f2937;
      margin-bottom: 2px;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="header-name">MADHURAM KUMAR TRIVEDI</div>
    <div class="header-contact">
      <span>Bhubaneswar, India</span><span class="sep">|</span>
      <span>7978809919</span><span class="sep">|</span>
      <span>Madhuramtrivedi49@gmail.com</span><span class="sep">|</span>
      <span>linkedin.com/in/madhuram-kumar-trivedi-27254b230</span>
    </div>
    <div class="header-divider"></div>
  </div>

  <!-- Professional Summary -->
  <div class="section-title">PROFESSIONAL SUMMARY</div>
  <p class="summary-text">
    Data Engineering and Data Governance professional with 4 years of experience across GCP data platforms, production support, and IT service management. Hands-on experience building and supporting data processing workflows using SQL, PySpark, BigQuery, and Dataproc, integrating SAP source data into GCP via Aecorsoft, and running DataPlex-based data profiling and data quality checks. Experienced in ServiceNow ITSM incident management, SLA tracking, and production troubleshooting, with an additional background in QA and data validation testing using ALM and Jira. Comfortable working across data engineering, governance, and operations to keep production systems reliable and data trustworthy.
  </p>

  <!-- Technical Skills -->
  <div class="section-title">TECHNICAL SKILLS</div>
  <div class="section-divider"></div>
  <div class="skills-block">
    <div class="skill-line">
      <span class="skill-label">Cloud &amp; Data Engineering:</span>
      <span class="skill-desc">Google Cloud Platform (GCP), BigQuery, Dataproc, SQL, PySpark, REST APIs, Data Integration, ETL/ELT, Data Processing, Data Modeling</span>
    </div>
    <div class="skill-line">
      <span class="skill-label">Data Integration / ETL:</span>
      <span class="skill-desc">Talend, Automic, SAP, Aecorsoft</span>
    </div>
    <div class="skill-line">
      <span class="skill-label">Data Quality &amp; Governance:</span>
      <span class="skill-desc">Data Validation, Data Quality, Data Profiling, Data Governance, Metadata Management, DataPlex, Data Integrity</span>
    </div>
    <div class="skill-line">
      <span class="skill-label">ITSM &amp; Production Support:</span>
      <span class="skill-desc">ServiceNow, Incident Management, SLA Monitoring, SLA Tracking, Ticket Triage, Prioritization, Escalation, Root Cause Analysis, Runbook Validation</span>
    </div>
    <div class="skill-line">
      <span class="skill-label">Monitoring &amp; Scheduling:</span>
      <span class="skill-desc">Application Monitoring, Job Monitoring, Batch Monitoring, Talend, Automic</span>
    </div>
    <div class="skill-line">
      <span class="skill-label">Testing / QA:</span>
      <span class="skill-desc">ALM, Jira, Test Case Design and Execution, Defect Tracking, Release/Regression Validation</span>
    </div>
    <div class="skill-line">
      <span class="skill-label">Tools &amp; Platforms:</span>
      <span class="skill-desc">Power BI, Tableau, Git/GitHub, Jira, ALM</span>
    </div>
    <div class="skill-line">
      <span class="skill-label">Professional Skills:</span>
      <span class="skill-desc">Stakeholder Management, User Communication, Cross-functional Collaboration, Analytical Thinking, Documentation, Attention to Detail</span>
    </div>
  </div>

  <!-- Professional Experience -->
  <div class="section-title">PROFESSIONAL EXPERIENCE</div>
  <div class="section-divider"></div>
  <div class="experience-item">
    <div class="item-header">
      <div class="item-role-company">
        <span class="item-title">Senior Data Engineer</span> — <span class="item-company">Enterprise Data Corp</span>
      </div>
      <div class="item-meta">
        <span class="item-date">Jan 2022 – Present</span> | <span class="item-location">Bhubaneswar, India</span>
      </div>
    </div>
    <ul class="bullet-list">
      <li>Architected and optimized scalable ETL pipelines processing 5TB+ daily enterprise data on GCP BigQuery and Dataproc.</li>
      <li>Integrated SAP ERP source data into BigQuery utilizing Aecorsoft, reducing data ingestion latency by 40%.</li>
      <li>Configured DataPlex data quality profiling checks and automated incident alerting through ServiceNow ITSM.</li>
    </ul>
  </div>

  <div class="experience-item">
    <div class="item-header">
      <div class="item-role-company">
        <span class="item-title">Data Platform &amp; Support Engineer</span> — <span class="item-company">Global Cloud Systems</span>
      </div>
      <div class="item-meta">
        <span class="item-date">Aug 2020 – Dec 2021</span> | <span class="item-location">India</span>
      </div>
    </div>
    <ul class="bullet-list">
      <li>Monitored automated batch workflows using Automic and Talend, resolving over 250+ production job failures within SLA.</li>
      <li>Conducted comprehensive QA validation testing using ALM and Jira across multi-source data warehouses.</li>
    </ul>
  </div>

  <!-- Education -->
  <div class="section-title">EDUCATION &amp; CERTIFICATIONS</div>
  <div class="section-divider"></div>
  <div class="experience-item">
    <div class="item-header">
      <div class="item-role-company">
        <span class="item-title">Bachelor of Technology in Computer Science</span> — <span class="item-company">KIIT University</span>
      </div>
      <div class="item-meta">
        <span class="item-date">2016 – 2020</span> | <span class="item-location">Bhubaneswar, India</span>
      </div>
    </div>
  </div>
</body>
</html>`;

// 2. Modern Tech (3-Column Header)
export const templateModernTech = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 15mm 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      background-color: #ffffff;
      font-size: 11px;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    a {
      color: #336699;
      text-decoration: underline;
    }

    /* 3-Column Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }
    .header-left {
      text-align: left;
      font-size: 11px;
      color: #374151;
      line-height: 1.45;
      flex: 1;
    }
    .header-center {
      text-align: center;
      flex: 2;
    }
    .header-right {
      text-align: right;
      font-size: 11px;
      color: #374151;
      line-height: 1.45;
      flex: 1;
    }
    .name {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 2px;
      letter-spacing: -0.2px;
    }
    .role-title {
      font-size: 15px;
      font-weight: 500;
      color: #336699;
      margin-bottom: 2px;
    }
    .header-sublinks {
      font-size: 11px;
      color: #4b5563;
    }
    .header-sublinks a {
      color: #336699;
      text-decoration: underline;
    }

    /* Section Headings */
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: #336699;
      border-bottom: 1.5px solid #336699;
      padding-bottom: 2px;
      margin-top: 10px;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Profile Summary */
    .summary-text {
      font-size: 11px;
      line-height: 1.45;
      color: #1f2937;
      margin-bottom: 6px;
    }

    /* Skills */
    .skills-container {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-bottom: 6px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .skills-row {
      display: flex;
      font-size: 11px;
      line-height: 1.4;
    }
    .skill-label {
      width: 110px;
      font-weight: 600;
      color: #111827;
      flex-shrink: 0;
    }
    .skill-value {
      color: #374151;
      flex: 1;
    }

    /* Work Experience & Projects */
    .item-block {
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2px;
    }
    .item-title-company {
      font-size: 11.5px;
    }
    .item-title {
      font-weight: 700;
      color: #111827;
    }
    .item-company {
      color: #336699;
      text-decoration: underline;
      margin-top: 1px;
    }
    .item-meta {
      text-align: right;
      font-size: 11px;
      color: #111827;
      line-height: 1.35;
    }
    .item-date {
      font-weight: 500;
    }
    .item-location {
      color: #4b5563;
    }

    /* Bullets */
    .bullet-list {
      margin: 3px 0 0 16px;
      padding: 0;
      list-style-type: disc;
    }
    .bullet-list li {
      font-size: 11px;
      line-height: 1.42;
      color: #1f2937;
      margin-bottom: 2.5px;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="header-left">
      <div>(+91)98726-72649</div>
      <div>(Bengaluru)IN</div>
      <div><a href="mailto:candidate@example.com">candidate@example.com</a></div>
    </div>
    <div class="header-center">
      <h1 class="name">Utkarsh Singh</h1>
      <div class="role-title">Software Development Engineer</div>
      <div class="header-sublinks">
        <a href="https://auth.geeksforgeeks.org">GeekForGeeks</a>, <a href="https://leetcode.com">LeetCode</a>
      </div>
    </div>
    <div class="header-right">
      <div><a href="https://github.com">GitHub</a></div>
      <div><a href="https://linkedin.com">LinkedIn</a></div>
      <div><a href="https://portfolio.com">Portfolio</a></div>
    </div>
  </header>

  <!-- Profile Summary -->
  <div class="section-title">PROFILE SUMMARY</div>
  <p class="summary-text">
    Full-Stack AI Engineer with professional experience building scalable Web &amp; AI applications, real-time distributed microservices, and modern user interfaces. Proven track record leading product architecture, improving query efficiency by 40%, and designing production systems used by 10,000+ engineers.
  </p>

  <!-- Skills -->
  <div class="section-title">SKILLS</div>
  <div class="skills-container">
    <div class="skills-row">
      <span class="skill-label">Languages</span>
      <span class="skill-value">TypeScript, JavaScript, Python, C++, SQL</span>
    </div>
    <div class="skills-row">
      <span class="skill-label">Frontend</span>
      <span class="skill-value">React.js, Next.js, TailwindCSS, HTML5, CSS3, Vite</span>
    </div>
    <div class="skills-row">
      <span class="skill-label">Backend</span>
      <span class="skill-value">Node.js, Express.js, PostgreSQL, MongoDB, Prisma ORM, REST APIs</span>
    </div>
    <div class="skills-row">
      <span class="skill-label">Cloud &amp; DevOps</span>
      <span class="skill-value">AWS S3, Docker, Git/GitHub, CI/CD, Microservices</span>
    </div>
  </div>

  <!-- Work Experience -->
  <div class="section-title">WORK EXPERIENCE</div>
  <div class="item-block">
    <div class="item-header">
      <div class="item-title-company">
        <div class="item-title">Full Stack Engineer</div>
        <div class="item-company"><a href="https://example.com">Tech Innovations Inc</a></div>
      </div>
      <div class="item-meta">
        <div class="item-date">Oct 2024 — Present</div>
        <div class="item-location">Bengaluru, India</div>
      </div>
    </div>
    <ul class="bullet-list">
      <li>Architected applicant workflow automation in the core enterprise platform, accelerating candidate transitions across interview stages.</li>
      <li>Built asynchronous job processing modules with PDF generation and OpenAI integration, reducing manual overhead by 70%.</li>
      <li>Implemented low-latency search and vector indexing over 50,000+ records with PostgreSQL and Redis.</li>
    </ul>
  </div>

  <!-- Projects -->
  <div class="section-title">PROJECTS</div>
  <div class="item-block">
    <div class="item-header">
      <div class="item-title-company">
        <div class="item-title">AI Resume Tailoring Engine</div>
        <div class="item-company"><a href="https://github.com">Live Demo</a> • React, Node.js, Puppeteer, OpenAI</div>
      </div>
      <div class="item-meta">
        <div class="item-date">2025</div>
      </div>
    </div>
    <ul class="bullet-list">
      <li>Engineered an automated PDF rendering pipeline delivering sub-3-second generation with Puppeteer and OpenAI.</li>
      <li>Implemented an interactive web client with real-time in-browser PDF preview and customized export options.</li>
    </ul>
  </div>
</body>
</html>`;

// 3. Ivy League Classic (Monochrome Traditional ATS)
export const templateIvyLeague = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 18mm 15mm 18mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: "Georgia", "Times New Roman", Times, serif;
      color: #111827;
      background-color: #ffffff;
      font-size: 11px;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    a {
      color: inherit;
      text-decoration: none;
    }

    /* Centered Classic Header */
    .header {
      text-align: center;
      margin-bottom: 12px;
    }
    .header-name {
      font-size: 22px;
      font-weight: 700;
      color: #000000;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .header-contact {
      font-size: 10.5px;
      color: #374151;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .header-contact .sep {
      margin: 0 5px;
      color: #6b7280;
    }

    /* Section Headings */
    .section-title {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      color: #000000;
      letter-spacing: 0.8px;
      border-bottom: 1px solid #000000;
      padding-bottom: 2px;
      margin-top: 12px;
      margin-bottom: 6px;
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Summary */
    .summary-text {
      font-size: 11px;
      line-height: 1.45;
      color: #1f2937;
      margin-bottom: 8px;
      text-align: justify;
    }

    /* Skills */
    .skills-block {
      margin-bottom: 8px;
    }
    .skill-line {
      font-size: 11px;
      line-height: 1.4;
      margin-bottom: 3px;
    }
    .skill-label {
      font-weight: 700;
      color: #000000;
    }

    /* Experience */
    .experience-item {
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .item-title {
      font-weight: 700;
      color: #000000;
    }
    .item-company {
      font-style: italic;
      color: #374151;
    }
    .item-meta {
      font-size: 10.5px;
      color: #4b5563;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .bullet-list {
      margin: 2px 0 0 18px;
      padding: 0;
      list-style-type: disc;
    }
    .bullet-list li {
      font-size: 11px;
      line-height: 1.42;
      color: #1f2937;
      margin-bottom: 2px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-name">Candidate Name</div>
    <div class="header-contact">
      <span>Location, Country</span><span class="sep">•</span>
      <span>(+1) 555-0199</span><span class="sep">•</span>
      <span>candidate@example.com</span><span class="sep">•</span>
      <span>linkedin.com/in/candidate</span>
    </div>
  </div>

  <div class="section-title">Professional Summary</div>
  <p class="summary-text">
    Accomplished software engineer with extensive experience delivering robust enterprise systems, high-throughput microservices, and user-centric web applications. Proven leader in optimizing performance metrics and driving technological innovation.
  </p>

  <div class="section-title">Technical Competencies</div>
  <div class="skills-block">
    <div class="skill-line"><span class="skill-label">Languages &amp; Core:</span> TypeScript, Python, Java, SQL, Go</div>
    <div class="skill-line"><span class="skill-label">Frameworks &amp; Web:</span> React, Next.js, Node.js, Express, TailwindCSS</div>
    <div class="skill-line"><span class="skill-label">Data &amp; Cloud:</span> PostgreSQL, Redis, AWS, Docker, Kubernetes</div>
  </div>

  <div class="section-title">Experience</div>
  <div class="experience-item">
    <div class="item-header">
      <div><span class="item-title">Senior Software Engineer</span>, <span class="item-company">Enterprise Systems Corp</span></div>
      <div class="item-meta">2022 – Present | New York, NY</div>
    </div>
    <ul class="bullet-list">
      <li>Spearheaded core backend platform refactoring, reducing p99 latency by 35% across all endpoints.</li>
      <li>Mentored 6 junior engineers and instituted rigorous code review standards across the organization.</li>
    </ul>
  </div>
</body>
</html>`;

// 4. Silicon Valley Modern (Modern Slate Minimalist)
export const templateModernSlate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 16mm 14mm 16mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      font-size: 11px;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    a {
      color: #4338ca;
      text-decoration: none;
    }

    /* Left-Aligned Modern Header */
    .header {
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    .header-name {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.3px;
    }
    .header-role {
      font-size: 13px;
      font-weight: 600;
      color: #4338ca;
    }
    .header-contact {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 10.5px;
      color: #475569;
    }

    /* Section Headings with Indigo Accent Bar */
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: #0f172a;
      letter-spacing: 0.5px;
      border-left: 3.5px solid #4338ca;
      padding-left: 8px;
      margin-top: 10px;
      margin-bottom: 6px;
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Summary */
    .summary-text {
      font-size: 11px;
      line-height: 1.45;
      color: #334155;
      margin-bottom: 8px;
    }

    /* Skills */
    .skills-block {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-bottom: 8px;
    }
    .skill-line {
      font-size: 11px;
    }
    .skill-label {
      font-weight: 600;
      color: #0f172a;
    }
    .skill-desc {
      color: #334155;
    }

    /* Experience */
    .experience-item {
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .item-title {
      font-weight: 700;
      color: #0f172a;
    }
    .item-company {
      font-weight: 500;
      color: #4338ca;
    }
    .item-meta {
      font-size: 10.5px;
      color: #64748b;
    }
    .bullet-list {
      margin: 2px 0 0 16px;
      padding: 0;
      list-style-type: disc;
    }
    .bullet-list li {
      font-size: 11px;
      line-height: 1.4;
      color: #334155;
      margin-bottom: 2px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-top">
      <div class="header-name">Candidate Name</div>
      <div class="header-role">Senior Full-Stack Engineer</div>
    </div>
    <div class="header-contact">
      <span>San Francisco, CA</span>
      <span>(+1) 555-0142</span>
      <span>candidate@example.com</span>
      <span>github.com/candidate</span>
      <span>linkedin.com/in/candidate</span>
    </div>
  </div>

  <div class="section-title">Profile Summary</div>
  <p class="summary-text">
    High-impact software engineer specializing in scalable cloud applications, distributed systems, and real-time developer tooling. Passionate about clean architecture, high availability, and rapid feature execution.
  </p>

  <div class="section-title">Skills &amp; Tech Stack</div>
  <div class="skills-block">
    <div class="skill-line"><span class="skill-label">Languages:</span> TypeScript, JavaScript, Python, Go, Rust, SQL</div>
    <div class="skill-line"><span class="skill-label">Frontend:</span> React, Next.js, Tailwind CSS, GraphQL</div>
    <div class="skill-line"><span class="skill-label">Backend &amp; Cloud:</span> Node.js, Express, Docker, AWS (ECS, S3, RDS), Redis</div>
  </div>

  <div class="section-title">Work Experience</div>
  <div class="experience-item">
    <div class="item-header">
      <div><span class="item-title">Staff Software Engineer</span> — <span class="item-company">CloudScale AI</span></div>
      <div class="item-meta">2023 – Present | Remote</div>
    </div>
    <ul class="bullet-list">
      <li>Built distributed event streaming engine processing 100M+ events daily with 99.99% uptime.</li>
      <li>Reduced AWS infrastructure spend by 28% through intelligent query caching and connection pooling.</li>
    </ul>
  </div>
</body>
</html>`;

// All available templates
export const resumeTemplates = [
  {
    id: "executive-navy",
    name: "Executive Navy (Classic ATS)",
    description: "Centered header with navy blue titles and crisp divider rules. Matches Image 1 original resume.",
    badge: "Recommended",
    accentColor: "#1e3a8a",
    html: templateExecutiveNavy
  },
  {
    id: "modern-tech",
    name: "Modern Tech (3-Column)",
    description: "3-column header with GitHub/LinkedIn links, accent blue borders, and categorized skills table.",
    badge: "Tech & Dev",
    accentColor: "#336699",
    html: templateModernTech
  },
  {
    id: "ivy-league",
    name: "Ivy League Classic",
    description: "Monochrome layout with full-width section rules, clean traditional typography, and high ATS compatibility.",
    badge: "Traditional",
    accentColor: "#111827",
    html: templateIvyLeague
  },
  {
    id: "modern-slate",
    name: "Silicon Valley Minimalist",
    description: "Left-aligned header with indigo accent bars, modern typography, and compact bullet lists.",
    badge: "Modern",
    accentColor: "#4f46e5",
    html: templateModernSlate
  }
];

export function getTemplateById(id) {
  if (!id) return resumeTemplates[0];
  const found = resumeTemplates.find(t => t.id === id);
  return found || resumeTemplates[0];
}

// Backward compatibility export
export const referenceHtmlTemplate = templateExecutiveNavy;

// Master prompt generator that accepts candidate data, job description, and template HTML
export function buildMasterPrompt({ candidateResumeText, jobDescription, referenceTemplateHtml }) {
  return `# Master Prompt: Resume-to-HTML/CSS Tailored Alignment Generator

You are an expert executive resume architect, technical recruiter, ATS optimization specialist, and HTML/CSS document designer.

Your task is to transform the candidate's existing resume and align it with the target job requirements, generating an ATS-optimized, high-impact resume in **HTML and CSS**, strictly following the visual style, CSS classes, typography, and layout of the reference template below.

The generated HTML will be rendered into a PDF using Puppeteer. Therefore, the HTML must be self-contained, print-ready, and compatible with Chromium.

## 1. Candidate's Uploaded Resume (Source of Truth for Experience, Contact & Credentials)
${candidateResumeText || "No previous resume uploaded. Create layout using criteria."}

## 2. Target Job Description & Role Requirements (Alignment Target)
${jobDescription || ""}

## 3. Strict Transformation Rules:
1. **Preserve Authenticity**: Preserve the candidate's actual work history, employers, titles, graduation, metrics, and real skills from their uploaded resume. DO NOT fabricate nonexistent degrees, fictitious companies, or imaginary credentials.
2. **ATS & Keyword Alignment**: Re-order, tailor, and emphasize technical skills, summary statements, and experience bullet points that directly match the keywords and expectations of the Target Job Description.
3. **Hyperlinks & Header**: Keep contact info (phone, email, location, LinkedIn, GitHub) strictly on a single line or as structured in the reference template. DO NOT wrap links awkwardly. Never use bright blue underlines unless specified in the template.
4. **Strict Visual Design & No Heavy Borders**:
   - Follow the exact visual layout and CSS rules of the reference template below.
   - DO NOT introduce arbitrary thick black borders (e.g., \`border-bottom: 2px solid black\` is strictly forbidden unless present in the template).
   - Use the exact colors, margins, font sizes, and divider lines specified in the template's <style> block.
5. **Output Contract**: Return **ONLY the complete raw HTML document**, starting with <!DOCTYPE html> and ending with </html>. Do not return JSON, Markdown, explanations, or code fences.

## Reference Template:
\`\`\`html
${referenceTemplateHtml}
\`\`\`
`;
}

export const masterPrompt = buildMasterPrompt({
  candidateResumeText: "{{CANDIDATE_DATA}}",
  jobDescription: "{{JOB_DESCRIPTION}}",
  referenceTemplateHtml: templateExecutiveNavy
});