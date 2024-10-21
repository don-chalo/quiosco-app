import Link from "next/link";

type ProductsPaginationProps = {
    currentPage: number,
    totalPages: number
}

function ProductsPagination({ currentPage, totalPages }: ProductsPaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i+1);
    return (
        <nav className="flex justify-center py-10">
            {
                currentPage > 1 && <Link
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    href={`/admin/products?page=${currentPage - 1}`}>&laquo;</Link>
            }
            {
                pages.map((page) => <Link
                    className={`${page === currentPage ? 'font-black' : '' } bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    key={page}
                    href={`/admin/products?page=${page}`}>{page}</Link>
                )
            }
            {
                currentPage < totalPages && <Link
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    href={`/admin/products?page=${currentPage + 1}`}>&raquo;</Link>
            }
        </nav>
    );
}

export default ProductsPagination;
