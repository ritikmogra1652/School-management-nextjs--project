"use client";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    // children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Don't redirect during the loading state

        if (!session) {
            // Redirect to login page if not authenticated
            router.push("/auth/login");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    return (
        <div className="h-screen flex">
            {/*     LEFT  */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
                <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
                    <Image src="/logo.png" alt="logo" width={32} height={32} />
                    <span className="hidden lg:block" >SchoolDev</span>
                </Link>
                <Menu />
            </div>
            {/* RIGHT */}
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
                r
            </div>
        </div>
    );
}
