# Resume assets

Resume files are managed through the private `/resume-admin` page and the FastAPI backend.

The backend validates PDF/DOCX uploads, stores them under fixed safe filenames, extracts approved text, and refreshes the live RAG index. Public buttons automatically expose PDF preview and the available download formats.

This directory remains available only for a manually managed static PDF fallback through `profileConfig.resumeUrl`.
