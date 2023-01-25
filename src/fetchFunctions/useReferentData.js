import { useQuery } from "@tanstack/react-query";
import { API, API_AUTH, PER_PAGE } from "../config";
import { getCurrentPage } from "../helpers/getCurrentPage";

export const loadReferentsData = async function (glossaryID, page, per_page) {
  if (!page)
    throw new Error(
      `That was the last page. Please, reload the page or explore another glossary.`
    );
  const data = await fetch(
    `${API}/referents?song_id=${glossaryID}&per_page=${per_page}&page=${page}&text_format=plain&${API_AUTH}`
  );
  const { response } = await data.json();

  return response;
};

export const useReferentData = (pageIndex, glossaryID) => {
  const page = getCurrentPage(pageIndex, PER_PAGE);
  const referentData = useQuery(
    [`RNA-${glossaryID}`, pageIndex],
    () => loadReferentsData(glossaryID, page, PER_PAGE),
    { retry: 1, keepPreviousData: true }
  );
  return referentData;
};
