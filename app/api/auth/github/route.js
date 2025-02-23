import { signInWithGitHub } from '../../../../lib/auth';

export async function GET() {
  try {
    const data = await signInWithGitHub();
    if (data?.url) {
      // Redirect user to GitHub's OAuth flow
      return Response.redirect(data.url, 302);
    }
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}