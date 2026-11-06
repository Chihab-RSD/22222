import { Activity } from '../types';
import { StarterGame } from '../types/starterGames';

const STORAGE_KEY_CUSTOM_ACTIVITIES = 'infomoyenne_custom_activities_v2';
const STORAGE_KEY_CUSTOM_GAMES = 'infomoyenne_custom_games_v2';

// In-memory cache
let customActivitiesCache: Record<string, Activity> | null = null;
let customGamesCache: Record<string, StarterGame> | null = null;

// Initialize cache from localStorage
function initCache() {
  if (customActivitiesCache === null) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_ACTIVITIES);
      customActivitiesCache = stored ? JSON.parse(stored) : {};
    } catch {
      customActivitiesCache = {};
    }
  }

  if (customGamesCache === null) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_GAMES);
      customGamesCache = stored ? JSON.parse(stored) : {};
    } catch {
      customGamesCache = {};
    }
  }
}

/**
 * Get customized version of an activity or fallback to original
 */
export function resolveActivity(originalActivity: Activity): Activity {
  initCache();
  if (customActivitiesCache && customActivitiesCache[originalActivity.id]) {
    return { ...originalActivity, ...customActivitiesCache[originalActivity.id] };
  }
  return originalActivity;
}

/**
 * Get customized version of a starter game or fallback to original
 */
export function resolveStarterGame(originalGame: StarterGame): StarterGame {
  initCache();
  if (customGamesCache && customGamesCache[originalGame.id]) {
    return { ...originalGame, ...customGamesCache[originalGame.id] };
  }
  return originalGame;
}

/**
 * Check if an activity has been customized
 */
export function isActivityCustomized(activityId: string): boolean {
  initCache();
  return !!customActivitiesCache?.[activityId];
}

/**
 * Check if a starter game has been customized
 */
export function isGameCustomized(gameId: string): boolean {
  initCache();
  return !!customGamesCache?.[gameId];
}

/**
 * Save customized activity
 */
export function saveCustomActivity(activity: Activity): void {
  initCache();
  if (!customActivitiesCache) customActivitiesCache = {};
  customActivitiesCache[activity.id] = activity;
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_ACTIVITIES, JSON.stringify(customActivitiesCache));
  } catch (err) {
    console.error('Failed to save custom activity:', err);
  }
}

/**
 * Reset activity back to official baseline
 */
export function resetCustomActivity(activityId: string): void {
  initCache();
  if (customActivitiesCache && customActivitiesCache[activityId]) {
    delete customActivitiesCache[activityId];
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_ACTIVITIES, JSON.stringify(customActivitiesCache));
    } catch (err) {
      console.error('Failed to reset custom activity:', err);
    }
  }
}

/**
 * Save customized starter game
 */
export function saveCustomStarterGame(game: StarterGame): void {
  initCache();
  if (!customGamesCache) customGamesCache = {};
  customGamesCache[game.id] = game;
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_GAMES, JSON.stringify(customGamesCache));
  } catch (err) {
    console.error('Failed to save custom starter game:', err);
  }
}

/**
 * Reset starter game back to official baseline
 */
export function resetCustomStarterGame(gameId: string): void {
  initCache();
  if (customGamesCache && customGamesCache[gameId]) {
    delete customGamesCache[gameId];
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_GAMES, JSON.stringify(customGamesCache));
    } catch (err) {
      console.error('Failed to reset custom starter game:', err);
    }
  }
}

/**
 * Get all customized activities count
 */
export function getCustomizedActivitiesCount(): number {
  initCache();
  return Object.keys(customActivitiesCache || {}).length;
}

/**
 * Get all customized games count
 */
export function getCustomizedGamesCount(): number {
  initCache();
  return Object.keys(customGamesCache || {}).length;
}

/**
 * Reset everything back to official Ministry baseline
 */
export function resetAllCustomizations(): void {
  customActivitiesCache = {};
  customGamesCache = {};
  try {
    localStorage.removeItem(STORAGE_KEY_CUSTOM_ACTIVITIES);
    localStorage.removeItem(STORAGE_KEY_CUSTOM_GAMES);
  } catch (err) {
    console.error('Failed to reset customizations:', err);
  }
}

/**
 * Export all customizations as JSON string
 */
export function exportAllCustomizationsJson(): string {
  initCache();
  return JSON.stringify({
    version: '1.0',
    exportDate: new Date().toISOString(),
    activities: customActivitiesCache || {},
    starterGames: customGamesCache || {}
  }, null, 2);
}

/**
 * Import customizations from JSON string
 */
export function importCustomizationsJson(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    initCache();
    if (data.activities && typeof data.activities === 'object') {
      customActivitiesCache = { ...customActivitiesCache, ...data.activities };
      localStorage.setItem(STORAGE_KEY_CUSTOM_ACTIVITIES, JSON.stringify(customActivitiesCache));
    }
    if (data.starterGames && typeof data.starterGames === 'object') {
      customGamesCache = { ...customGamesCache, ...data.starterGames };
      localStorage.setItem(STORAGE_KEY_CUSTOM_GAMES, JSON.stringify(customGamesCache));
    }
    return true;
  } catch (err) {
    console.error('Failed to import customizations:', err);
    return false;
  }
}
