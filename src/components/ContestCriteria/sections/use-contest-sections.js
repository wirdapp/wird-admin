import { ContestCriteriaApi } from "../../../services/contest-criteria/api";
import { useContestCriteriaContext } from "../contest-criteria-context";

export function useContestSections() {
  const { sections } = useContestCriteriaContext();

  const add = async (section) => {
    const sectionData = await ContestCriteriaApi.addSection({ section });
    sections.setItems([...sections.items, sectionData]);
  };

  const update = async (id, section) => {
    const sectionData = await ContestCriteriaApi.updateSection({ id, section });
    const index = sections.items.findIndex((section) => section.id === id);
    const newSections = [...sections.items];
    newSections[index] = sectionData;
    sections.setItems(newSections);
  };

  const remove = async (id) => {
    await ContestCriteriaApi.deleteSection({ id });
    const newSections = sections.items.filter((section) => section.id !== id);
    sections.setItems(newSections);
  };

  const updateSectionsOrder = async (newSections) => {
    const newSectionsWithPositions = newSections.map((section, index) => ({
      ...section,
      position: index,
    }));
    sections.setItems(newSectionsWithPositions);
    return await ContestCriteriaApi.updateSectionsOrder({
      newSections: newSectionsWithPositions,
    });
  };

  return {
    sections: sections.items,
    loading: sections.loading,
    actions: {
      add,
      update,
      remove,
      updateSectionsOrder,
    },
  };
}
