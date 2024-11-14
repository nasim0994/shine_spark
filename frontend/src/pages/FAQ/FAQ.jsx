import usePageView from "../../hooks/usePageView";

export default function FAQ() {
  usePageView("FAQ");
  return (
    <section>
      <div className="container">
        <div className="flex h-[85vh] items-center justify-center">
          <h2 className="text-4xl">Cooming Soon</h2>
        </div>
      </div>
    </section>
  );
}
