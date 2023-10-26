const Pagination = ({ currentPage, handleNextPage, handlePreviusPage, pagesInCurrentBlock, setCurrentPage, lastPage }) => {
  return (
    <div>
        <ul className="flex justify-center flex-wrap">
        {currentPage !== 1 && (
          <li className="px-1">
            <button
              className="px-5 py-3 font-semibold rounded-md bg-[#DD1A1A] dark:bg-[#ad1717] text-white"
              onClick={handlePreviusPage}
            >
              {"<"}
            </button>
          </li>
        )}
        {pagesInCurrentBlock.map((page) => (
          <li key={page}>
            <button
              className={`transition duration-200 px-5 py-3 rounded-md font-semibold ${
                currentPage === page ? "bg-[#DD1A1A] dark:bg-[#ad1717] text-white" : "dark:text-white"
              } `}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage !== lastPage && (
          <li className="px-1">
            <button
              className="px-5 py-3 font-semibold rounded-md bg-[#DD1A1A] dark:bg-[#ad1717] text-white"
              onClick={handleNextPage}
            >
              {">"}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
export default Pagination