/**
 * Represents the interpreted state of the plant.
 *
 * This object contains semantic information about the plant condition.
 * It does not store raw sensor values.
 *
 * Example:
 *
 * {
 *   hydration: "healthy",
 *   temperature: "normal",
 *   light: "bright"
 * }
 *
 * Possible values:
 *
 * hydration:
 * - healthy
 * - dry
 * - overwatered
 *
 * temperature:
 * - cold
 * - normal
 * - hot
 *
 * light:
 * - dark
 * - normal
 * - bright
 *
 * Notes:
 * - This state is independent from the data source.
 * - It can be generated from sensors, simulations, or tests.
 */

/**
 * @typedef {Object} PlantState
 * @property {"healthy"|"dry"|"overwatered"} hydration
 * @property {"cold"|"normal"|"hot"} temperature
 * @property {"dark"|"normal"|"bright"} light
 */

/**
 * @type {PlantState}
 */
export const defaultPlantState = {
  hydration: "healthy",
  temperature: "normal",
  light: "normal",
};