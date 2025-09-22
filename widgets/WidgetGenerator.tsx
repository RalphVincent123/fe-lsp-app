import { auth } from "@/lib/auth";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

const componentPage: Record<
  string,
  { component: React.ComponentType<any>; roles: string[] }
> = {
  profile: {
    component: dynamic(() => import("@/widgets/ProfilePage")),
    roles: ["USER"],
  },
  accounts: {
    component: dynamic(() => import("@/widgets/adminPage/Accounts")),
    roles: ["ADMIN"],
  },
};

export default async function WidgetGenerator({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug?.[0] || "home";
  const entry = componentPage[slug];

  if (!entry) return <div>Widget not found: {slug}</div>;

  const session = await auth.api.getSession({ headers: await headers() });

  // const Component =
  //   componentPage[slug] || (() => <div>Widget not found: {slug}</div>);

  const Component = entry.component;

  return <Component />;
}
