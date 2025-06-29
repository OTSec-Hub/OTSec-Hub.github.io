## Backend Setup Instructions

### Prerequisites
- [PostgreSQL](https://postgresapp.com/)
- Python 3.7 or higher
- pip package manager

### 1. Database Configuration

1. Launch Postgres.app
2. Click "Create New Database"
3. Name your database (OTSec-Hub)
4. Note these connection details:
   - Username (postgres)
   - Password 
   - Host (localhost)

### 2. 🔐 Environment Setup

Create `.env` file in `/backend`:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>/<database_name>
REACT_DOT_SERVER=http://localhost:3000

# Email Configuration
MAIL_USERNAME=abdelrahmann.ramadann@gmail.com
MAIL_PASSWORD=wink wfus mhef apgo
MAIL_FROM=abdelrahmann.ramadann@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
MAIL_FROM_NAME="OTSec-Hub"
```
### 2. 🔐 Environment Setup

Create `.env` file in `/backend`:
```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_GITHUB_TOKEN=your-token
REACT_APP_GITHUB_USERNAME=your-username
```

# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv

# Activate environment
source venv/bin/activate # macOS

# Install Packages
pip install -r requirements.txt

# RunServer
uvicorn main:app --reload
