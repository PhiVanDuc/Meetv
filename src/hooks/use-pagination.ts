import { usePathname, useRouter } from "next/navigation";

import parseInteger from "@/utils/parse-integer";
import generateQueryString from "@/utils/generate-query-string";

export default function usePagination({ page: paramPage, totalPages: paramTotalPages }: Omit<Pagination, "limit" | "totalItems">) {
    const router = useRouter();
    const pathname = usePathname();

    const page = parseInteger(paramPage);
    const totalPages = parseInteger(paramTotalPages);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        
        const queryString = generateQueryString({ page: newPage });
        router.push(`${pathname}${queryString}`);
    };

    return { page, totalPages, handlePageChange }
}
