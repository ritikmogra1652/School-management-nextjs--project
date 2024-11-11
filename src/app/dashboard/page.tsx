// app/dashboard/page.tsx

"use client"; // Add this at the top to make it a Client Component

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/auth/login");
        }
    }, [session, router]);

    if (!session) return <p>Loading...</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {session.user?.name}</p>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
};

export default DashboardPage;
