import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const slug = searchParams.get("slug") || "home";

  const metaDataMap: Record<string, { title: string; description: string }> = {
  home: {
    title: `Home: ActivityGram`,
    description: "Welcome to ActivityGram, your hub for managing and monitoring tasks.",
  },
  profile: {
    title: "Your Profile",
    description: "Manage your account and personal information",
  },
};

  const data = metaDataMap[slug] || {
    title: "Not Found",
    description: "The page you are looking for does not exist",
  };

  return NextResponse.json(data);
}