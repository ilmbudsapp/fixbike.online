import { useState } from "react";
import { faqItems } from "../fixbikeConstants";

export default function FaqList() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="faq reveal">
      {faqItems.map((item, index) => {
        const open = openFaq === index;
        return (
          <div className={`faq__item ${open ? "is-open" : ""}`} key={item.q}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={open}
              onClick={() => setOpenFaq(open ? null : index)}
            >
              {item.q}
            </button>
            <div className="faq__panel">
              <p className="faq__a">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
