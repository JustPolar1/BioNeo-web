/**
 * Represents the interpreted state of the plant.
 *
 * This object does NOT contain raw sensor data.
 * Its purpose is to store semantic information that can be
 * understood by the rest of the system.
 *
 * Input:
 * - Data interpreted by PlantInterpreter.
 *
 * Output:
 * - An object describing the current plant conditions.
 *
 * Example:
 *
 * {
 *   hydration: "dry",
 *   temperature: "hot",
 *   light: "normal"
 * }
 *
 * Notes:
 * - This state must be independent from the data source.
 * - It can be generated from Firebase, ESP32, a simulator,
 *   or manual testing.
 */
export const defaultPlantState = {
  hydration: "normal",
  temperature: "normal",
  light: "normal",
};