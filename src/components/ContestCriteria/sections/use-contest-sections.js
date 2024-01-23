import { useEffect, useState } from "react";
import { ContestCriteriaApi } from "../../../services/contest-criteria/api";

export function useContestSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSections = async () => {
    setLoading(true);
    try {
      const data = await ContestCriteriaApi.getSections();
      setSections(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const add = async (section) => {
    const sectionData = await ContestCriteriaApi.addSection({ section });
    setSections([...sections, sectionData]);
  };

  const update = async (id, section) => {
    const sectionData = await ContestCriteriaApi.updateSection({ id, section });
    const index = sections.findIndex((section) => section.id === id);
    const newSections = [...sections];
    newSections[index] = sectionData;
    setSections(newSections);
  };

  const remove = async (id) => {
    await ContestCriteriaApi.deleteSection({ id });
    const newSections = sections.filter((section) => section.id !== id);
    setSections(newSections);
  };

  const saveAll = async (newSections) => {
    setSections(newSections);
    return Promise.all(
      newSections.map((section) => update(section.id, section)),
    );
  };

  return {
    items: sections,
    setItems: setSections,
    loading,
    add,
    update,
    remove,
    saveAll,
  };
}
