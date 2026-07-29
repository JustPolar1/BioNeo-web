/**
 * Controls the character behavior based on the current plant state.
 *
 * Responsibility:
 * - Transform PlantState into CharacterState.
 *
 * Input:
 * - An interpreted PlantState.
 *
 * Example:
 *
 * {
 *   hydration: "dry",
 *   temperature: "hot"
 * }
 *
 * Output:
 *
 * {
 *   emotion: "sad",
 *
 *   motions: {
 *     sprout: "droop"
 *   },
 *
 *   effects: [
 *     "heat"
 *   ]
 * }
 *
 * This module should NOT:
 * - Read Firebase data.
 * - Manipulate SVG elements.
 * - Execute animations directly.
 *
 * Its only responsibility is deciding what should happen.
 * The execution belongs to Motion, Effects, and Character.
 */
export default class CharacterController {

}