const CategoryPill = ({ category }) => {
  return (
    <div className={`text-[15px] font-medium whitespace-nowrap rounded-lg px-3 py-1 ${category === "All" ? 'bg-black text-white hover:bg-neutral-950 dark:bg-white dark:text-black' : 'bg-neutral-200 text-black hover:bg-neutral-300 dark:text-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'} cursor-pointer`}>{category}</div>
  )
}

export default CategoryPill