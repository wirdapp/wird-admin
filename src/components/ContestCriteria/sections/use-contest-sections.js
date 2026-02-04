import { useContestCriteriaContext } from "../contest-criteria-context";
import {
  useAddSection,
  useUpdateSection,
  useDeleteSection,
  useUpdateSectionsOrder,
} from "../../../services/contest-criteria/queries";

export function useContestSections() {
  const { sections } = useContestCriteriaContext();
  const addSectionMutation = useAddSection();
  const updateSectionMutation = useUpdateSection();
  const deleteSectionMutation = useDeleteSection();
  const updateSectionsOrderMutation = useUpdateSectionsOrder();

  const add = async (section) => {
    await addSectionMutation.mutateAsync(section);
  };

  const update = async (id, section) => {
    await updateSectionMutation.mutateAsync({ id, section });
  };

  const remove = async (id) => {
    await deleteSectionMutation.mutateAsync(id);
  };

  const updateSectionsOrder = async (newSections) => {
    const newSectionsWithPositions = newSections.map((section, index) => ({
      ...section,
      position: index,
    }));
    return await updateSectionsOrderMutation.mutateAsync(newSectionsWithPositions);
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
