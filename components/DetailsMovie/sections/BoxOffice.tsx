import { formatCurrency } from "@helpers/helpers";

const BoxOffice = ({details}: any) => {
  return (
    <div className="pt-16 max-sm:pt-12">
      <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
        Box Office
      </h3>

      <div className="pt-2 grid grid-cols-2">
        {/* MOVIE BUDGET */}
        <div className="py-3 text-main">
          <h3 className="text-lg max-md:text-base max-sm:text-sm font-semibold">
            Budget
          </h3>

          <p className={`font-normal ${!details.budget && "italic"} max-md:text-sm`}>
            {details.budget ? formatCurrency.format(details.budget) : "Unknown yet"}
          </p>
        </div>

        {/* MOVIE REVENUE */}
        <div className="py-3 text-main flex flex-col">
          <h3 className="text-lg max-md:text-base font-semibold">
            Revenue
          </h3>

          <p className={`font-normal ${!details.revenue && "italic"} max-md:text-sm max-sm:text-xs`}>
            {details.revenue ? formatCurrency.format(details.revenue) : "Unknown yet"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BoxOffice;