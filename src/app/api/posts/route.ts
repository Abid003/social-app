// API route for posts (GET, POST)
export async function GET() {
  return Response.json({ message: "List of posts" });
}

export async function POST() {
  return Response.json({ message: "Create a post" });
}
