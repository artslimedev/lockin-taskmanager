# 📝 Lock In Task Manager

A full-stack task management application built with **Next.js** and **Supabase** (PostgreSQL). This project allows users to perform Create, Read, Update, and Delete (CRUD) operations on tasks, leveraging Supabase for backend services and Next.js for the frontend.

## 🚀 Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Real-time task updates using Supabase's Realtime capabilities
- CRUD operations for task management
- Responsive UI built with Tailwind CSS
- Server-side rendering with Next.js

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **Testing**: Jest, React-Testing-Library
- **Styling**: Tailwind CSS

## 📷 Screenshots

![Landing Page](<public/Landing Page.png>)

## 📦 Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/artslimedev/taskscrud.git
   cd taskscrud
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Supabase:**

   - Sign in to [Supabase](https://supabase.com/) and create a new project.
   - Navigate to the "SQL Editor" and run the following SQL to create the `tasks` table:

     ```sql
     create table tasks (
       id uuid primary key default uuid_generate_v4(),
       user_id uuid references auth.users not null,
       title text not null,
       is_complete boolean default false,
       inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
     );
     ```

   - Enable Row Level Security (RLS) and add the following policy:

     ```sql
     alter table tasks enable row level security;

     create policy "Individuals can view their own tasks." on tasks
       for select using (auth.uid() = user_id);

     create policy "Individuals can insert their own tasks." on tasks
       for insert with check (auth.uid() = user_id);

     create policy "Individuals can update their own tasks." on tasks
       for update using (auth.uid() = user_id);

     create policy "Individuals can delete their own tasks." on tasks
       for delete using (auth.uid() = user_id);
     ```

4. **Configure environment variables:**

   - Rename `.env.example` to `.env.local`:

     ```bash
     mv .env.example .env.local
     ```

   - Update `.env.local` with your Supabase project credentials:

     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

5. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```bash
├── components        # Reusable UI components
├── pages             # Next.js pages
│   ├── api           # API routes
│   └── index.tsx     # Main page
├── styles            # Global styles
├── utils             # Utility functions and Supabase client
├── .env.local        # Environment variables
├── tailwind.config.js# Tailwind CSS configuration
└── ...
```

## 🔐 Authentication

This application uses Supabase Auth for user authentication. Users can sign up and log in using email and password. Authentication state is managed on the client side, and protected routes ensure that only authenticated users can access certain pages.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
