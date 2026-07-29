/**
 * Converts raw plant data into a structured PlantState.
 *
 * Responsibility:
 * - Translate external values into meaningful plant conditions.
 *
 * This module should NOT:
 * - Control character animations.
 * - Modify React components.
 * - Know about visual representation.
 *
 * Input:
 * - Raw data from any external source.
 *
 * Example:
 *
 * {
 *   humidity: 20,
 *   temperature: 35,
 *   luminosity: 800
 * }
 *
 * Output:
 *
 * {
 *   hydration: "dry",
 *   temperature: "hot",
 *   light: "normal"
 * }
 *
 * Notes:
 * - The data source should not affect the rest of the system.
 * - Firebase, ESP32, simulators, and tests should produce
 *   compatible results.
 */
export default function PlantInterpreter(data) {

}