import usePageView from "@/hooks/usePageView";
import { useGetFaqQuery } from "@/Redux/faq/faq";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function FAQ() {
  usePageView("FAQ");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [toggleFAQ, setToggleFAQ] = useState(null);
  const { data } = useGetFaqQuery();
  const faqs = data?.data;

  const handelToggleFAQ = (i) => {
    if (toggleFAQ === i) {
      return setToggleFAQ(null);
    }
    setToggleFAQ(i);
  };

  return (
    <section>
      <div className="container">
        <div className="mx-auto mt-6 sm:w-2/3">
          {faqs?.map((faq, i) => (
            <div key={i} className="mb-2">
              <button
                onClick={() => handelToggleFAQ(i)}
                className="flex w-full items-center justify-between rounded bg-base-100 p-4 text-start text-sm font-semibold text-neutral shadow-lg sm:text-base"
              >
                <p>{faq?.qus}</p>
                <span>
                  {toggleFAQ === i && "activeFAQ" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </button>

              {/* Content/Ans */}
              <div
                className={`faq-content rounded border bg-base-100 text-justify text-neutral/90 duration-500 ${
                  toggleFAQ === i && "activeFAQ"
                }`}
              >
                <p className="p-3 pb-5 text-sm sm:text-base">{faq?.ans}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
