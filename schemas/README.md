# Database Schemas

This folder contains SQL schema files for the Academic Repository application.

## Files

- `profiles.sql` - User profiles table schema with RLS policies and triggers

## Usage

### Setting up the database

1. **Copy the schema to Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy and paste the contents of the schema files
   - Execute the SQL

2. **Or use Supabase CLI**
   ```bash
   # If you have Supabase CLI installed
   supabase db push
   ```

### Profiles Table

The `profiles` table is linked to Supabase Auth and includes:

- **User Information**: Email, full name, avatar URL
- **Role Management**: admin, editor, user roles
- **Timestamps**: Created and updated timestamps
- **Security**: Row Level Security (RLS) policies
- **Automation**: Triggers for profile creation and timestamp updates

#### Key Features

- **Automatic Profile Creation**: When a user signs up, a profile is automatically created
- **Role-Based Access**: Different permissions based on user roles
- **Self-Service**: Users can update their own profiles
- **Admin Control**: Admins can manage all profiles

#### RLS Policies

- Users can only view and update their own profile
- Admins can view, update, and delete all profiles
- Automatic profile creation on user registration

#### Triggers

- `update_profiles_updated_at`: Automatically updates the `updated_at` timestamp
- `on_auth_user_created`: Creates a profile when a new user signs up

## Schema Structure

```sql
profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

## Role Hierarchy

1. **`user`** (Default)
   - Can read articles and journals
   - Can create their own posts
   - Can manage their own content

2. **`editor`**
   - All user permissions
   - Can upload journals
   - Can moderate content
   - Can edit and manage articles

3. **`admin`** (Highest)
   - All permissions
   - Can manage users
   - Can access admin panels
   - Full system control

## Indexes

The schema includes indexes for optimal performance:

- `idx_profiles_email`: For email lookups
- `idx_profiles_role`: For role-based queries
- `idx_profiles_created_at`: For date-based queries

## Security

- Row Level Security (RLS) is enabled
- All operations are protected by policies
- Automatic profile creation is secure
- Role validation is enforced at the database level 