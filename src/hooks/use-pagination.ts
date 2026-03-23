import { usePathname, useRouter } from "next/navigation";

import generateQueryString from "@/utils/generate-query-string";

const parseSafeInt = (string: string) => {
    const parsed = parseInt(string, 10);
    return isNaN(parsed) ? 1 : parsed;
};

export default function usePagination({ page: paramPage, totalPages: paramTotalPages }: Omit<Pagination, "limit" | "totalItems">) {
    const router = useRouter();
    const pathname = usePathname();

    const page = parseSafeInt(paramPage);
    const totalPages = parseSafeInt(paramTotalPages);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        
        const queryString = generateQueryString({ page: newPage });
        router.push(`${pathname}?${queryString}`);
    };

    return { page, totalPages, handlePageChange }
}
