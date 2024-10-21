'use client'

import { useRouter } from "next/navigation";

function GoBackButton() {
    const router = useRouter();
    return (
        <button className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3" onClick={() => router.back()}>
            Volver
        </button>
    );
}

export default GoBackButton;