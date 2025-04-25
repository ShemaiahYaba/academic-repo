import { useParams } from "react-router-dom";
import { journalData } from "../../constants/dataItems"; // Adjust the path to match your structure
import React from "react";

const JournalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
  const journal = journalData.find((item) => item.id === Number(id)); // Find the journal by `id`

  if (!journal) {
    return <div className="p-6">Journal not found.</div>; // Handle invalid `id`
  }

  return (
    <div className="font-montserrat p-6">
      <h1 className="text-3xl font-bold mb-4">{journal.title}</h1>
      <p className="font-montserrat text-sm text-gray-600 mb-4">
        By {journal.authors}
      </p>
      <p className="font-bold  text-lg">Abstract </p>
      <p className="font-medium text-lg">
        As the fossil fuels are depleting day by day, there is a need to find
        out an alternative fuel to fulfill the energy demand of the world.
        Biodiesel is one of the best available resources that have come to the
        forefront recently. In this paper, a detailed review has been conducted
        to highlight different related aspects to biodiesel industry. These
        aspects include, biodiesel feedstocks, extraction and production
        methods, properties and qualities of biodiesel, problems and potential
        solutions of using vegetable oil, advantages and disadvantages of
        biodiesel, the economical viability and finally the future of biodiesel.
        The literature reviewed was selective and critical. Highly rated
        journals in scientific indexes were the preferred choice, although other
        non-indexed publications, such as Scientific Research and Essays or some
        internal reports from highly reputed organizations such as International
        Energy Agency (IEA), Energy Information Administration (EIA) and British
        Petroleum (BP) have also been cited. Based on the overview presented, it
        is clear that the search for beneficial biodiesel sources should focus
        on feedstocks that do not compete with food crops, do not lead to
        land-clearing and provide greenhouse-gas reductions. These feedstocks
        include non-edible oils such as Jatropha curcas and Calophyllum
        inophyllum, and more recently microalgae and genetically engineered
        plants such as poplar and switchgrass have emerged to be very promising
        feedstocks for biodiesel production. It has been found that feedstock
        alone represents more than 75% of the overall biodiesel production cost.
        Therefore, selecting the best feedstock is vital to ensure low
        production cost. It has also been found that the continuity in
        transesterification process is another choice to minimize the production
        cost. Biodiesel is currently not economically feasible, and more
        research and technological development are needed. Thus supporting
        policies are important to promote biodiesel research and make their
        prices competitive with other conventional sources of energy. Currently,
        biodiesel can be more effective if used as a complement to other energy
        sources.
      </p>
      <p className="text-sm mt-4">
        <span className="font-bold">Keywords: </span>
        {journal.keywords}
      </p>
      <p className="text-sm mt-2">
        <span className="font-bold">Ratings: </span>
        {journal.ratings} ({journal.reviews} reviews)
      </p>
    </div>
  );
};

export default JournalDetail;
