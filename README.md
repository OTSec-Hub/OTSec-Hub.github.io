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
