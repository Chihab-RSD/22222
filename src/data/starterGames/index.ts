import { StarterGame } from '../../types/starterGames';
import { grade1StarterGames } from './grade1Games';
import { grade2StarterGames } from './grade2Games';
import { grade3StarterGames } from './grade3Games';
import { grade4StarterGames } from './grade4Games';
import { lessonConfigs, buildStarterGamesForLesson } from './starterGamesCatalog';

// Aggregate and ensure all 32 lessons have 10 interactive starter games
const allStarterGames: Record<string, StarterGame[]> = {
  // 1AM Lessons 1 to 4 from grade1Games
  ...grade1StarterGames,

  // 1AM Lessons 5 to 8 built from lessonConfigs
  'g1-l5': buildStarterGamesForLesson(lessonConfigs['g1-l5']),
  'g1-l6': buildStarterGamesForLesson(lessonConfigs['g1-l6']),
  'g1-l7': buildStarterGamesForLesson(lessonConfigs['g1-l7']),
  'g1-l8': buildStarterGamesForLesson(lessonConfigs['g1-l8']),

  // 2AM Lessons 1 to 8
  ...grade2StarterGames,

  // 3AM Lessons 1 to 8
  ...grade3StarterGames,

  // 4AM Lessons 1 to 8
  ...grade4StarterGames
};

/**
 * Get the 10 active learning starter games for a given lesson
 */
export const getStarterGamesForLesson = (lessonId: string): StarterGame[] => {
  return allStarterGames[lessonId] || [];
};

/**
 * Get total number of starter games across the entire curriculum (320 games)
 */
export const getTotalStarterGamesCount = (): number => {
  return Object.values(allStarterGames).reduce((sum, games) => sum + games.length, 0);
};

export { allStarterGames };
