import { GradeLevel, GradeLevelId, Lesson, Activity } from '../types';
import { grade1Data } from './grades/grade1';
import { grade2Data } from './grades/grade2';
import { grade3Data } from './grades/grade3';
import { grade4Data } from './grades/grade4';

export const allGrades: GradeLevel[] = [
  grade1Data,
  grade2Data,
  grade3Data,
  grade4Data
];

export const getGradeById = (id: GradeLevelId): GradeLevel => {
  const found = allGrades.find(g => g.id === id);
  return found || grade1Data;
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  for (const grade of allGrades) {
    const lesson = grade.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

export const getTotalActivitiesCount = (): number => {
  return allGrades.reduce((sum, grade) => {
    return sum + grade.lessons.reduce((lSum, lesson) => lSum + lesson.activities.length, 0);
  }, 0);
};

export const getTotalLessonsCount = (): number => {
  return allGrades.reduce((sum, grade) => sum + grade.lessons.length, 0);
};

export interface SearchResult {
  grade: GradeLevel;
  lesson: Lesson;
  activity?: Activity;
  matchType: 'lesson' | 'activity' | 'concept';
  title: string;
  snippet: string;
}

export const searchCurriculum = (query: string): SearchResult[] => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const results: SearchResult[] = [];

  for (const grade of allGrades) {
    for (const lesson of grade.lessons) {
      // Check lesson title and summary
      if (
        lesson.title.toLowerCase().includes(trimmed) ||
        lesson.summary.toLowerCase().includes(trimmed) ||
        lesson.domain.toLowerCase().includes(trimmed)
      ) {
        results.push({
          grade,
          lesson,
          matchType: 'lesson',
          title: lesson.title,
          snippet: `${grade.shortName} • ${lesson.domain} - ${lesson.summary}`
        });
      }

      // Check key concepts
      for (const concept of lesson.keyConcepts) {
        if (concept.toLowerCase().includes(trimmed)) {
          results.push({
            grade,
            lesson,
            matchType: 'concept',
            title: `مفهوم: ${concept}`,
            snippet: `${grade.shortName} • ${lesson.title}`
          });
          break;
        }
      }

      // Check activities
      for (const activity of lesson.activities) {
        if (
          activity.title.toLowerCase().includes(trimmed) ||
          activity.prompt.toLowerCase().includes(trimmed) ||
          activity.explanation.toLowerCase().includes(trimmed)
        ) {
          results.push({
            grade,
            lesson,
            activity,
            matchType: 'activity',
            title: `نشاط ${activity.number}: ${activity.title}`,
            snippet: `${grade.shortName} • ${lesson.title} - ${activity.prompt.substring(0, 90)}...`
          });
        }
      }
    }
  }

  return results.slice(0, 25);
};
