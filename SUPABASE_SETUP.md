# Supabase Database Setup

To ensure that every user who signs up via Supabase Auth is automatically added to your public `users` table (which Prisma manages), you must run the following SQL in your Supabase Dashboard SQL Editor.

## 1. Create the Sync Function

This function will be called every time a new user is created in the `auth.users` table.

```sql
-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    COALESCE((new.raw_user_meta_data->>'role')::public."Role", 'CUSTOMER'::public."Role"),
    NOW(),
    NOW()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 2. Create the Trigger

This trigger activates the function above on every `INSERT` into `auth.users`.

```sql
-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 3. Environment Variables

Ensure your `.env` or `.env.local` contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-postgresql-connection-string
DIRECT_URL=your-postgresql-direct-connection-string
```
