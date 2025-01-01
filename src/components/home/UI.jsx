import { atom, useAtom } from "jotai";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);

export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  return (
    <section className="bg-white flex flex-col items-center justify-between py-4">
      <div className="z-10 flex flex-col items-center">
        <a className="pointer-events-auto mb-4">
          <img
            className="w-20"
            src="/public/assets/images/logo.png"
            alt="Logo"
          />
        </a>
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4 max-w-full px-4">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={"btn round"}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={'btn round'}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
