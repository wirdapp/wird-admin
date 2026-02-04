import {
	useAddSection,
	useDeleteSection,
	useUpdateSection,
	useUpdateSectionsOrder,
} from "../../../services/contest-criteria/queries";
import type { Section, SectionCreateData, SectionUpdateData } from "../../../types";
import { useContestCriteriaContext } from "../contest-criteria-context";

interface UseContestSectionsReturn {
	sections: Section[];
	loading: boolean;
	actions: {
		add: (section: SectionCreateData) => Promise<void>;
		update: (id: string, section: SectionUpdateData) => Promise<void>;
		remove: (id: string) => Promise<void>;
		updateSectionsOrder: (newSections: Section[]) => Promise<Section[]>;
	};
}

export function useContestSections(): UseContestSectionsReturn {
	const { sections } = useContestCriteriaContext();
	const addSectionMutation = useAddSection();
	const updateSectionMutation = useUpdateSection();
	const deleteSectionMutation = useDeleteSection();
	const updateSectionsOrderMutation = useUpdateSectionsOrder();

	const add = async (section: SectionCreateData): Promise<void> => {
		await addSectionMutation.mutateAsync(section);
	};

	const update = async (id: string, section: SectionUpdateData): Promise<void> => {
		await updateSectionMutation.mutateAsync({ id, section });
	};

	const remove = async (id: string): Promise<void> => {
		await deleteSectionMutation.mutateAsync(id);
	};

	const updateSectionsOrder = async (newSections: Section[]): Promise<Section[]> => {
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
