import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" className="w-6 h-8 " referrerpolicy="no-referrer" />
        <span className="py-1 px-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
  </Layout>
}


export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: process.env.NEXT_APP_URL + '/Auth'

      }
    }
  }

  return {
    props: {
      data: "Authenticated"
    },
  };

}