// API route for single post (GET, PATCH, DELETE)
export async function GET() {
  return Response.json({ message: "Single post details" });
}

export async function PATCH() {
  return Response.json({ message: "Update post" });
}

export async function DELETE() {
  return Response.json({ message: "Delete post" });
}
