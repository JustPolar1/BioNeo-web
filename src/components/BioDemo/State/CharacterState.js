/**
 * Represents the visual and behavioral state of the character.
 *
 * This object acts as the contract between CharacterController
 * and the character rendering system.
 *
 * Input:
 * - An interpreted PlantState.
 *
 * Output:
 * - The information required to render and animate the character.
 *
 * Example:
 *
 * {
 *   emotion: "sad",
 *
 *   motions: {
 *     sprout: "droop",
 *     idle: "slow"
 *   },
 *
 *   effects: [
 *     "waterDrop"
 *   ]
 * }
 *
 * Notes:
 * - CharacterState must not know about Firebase or sensors.
 * - It only describes how the character should look and behave.
 */
export const defaultCharacterState = {
  emotion: "neutral",
  motions: {},
  effects: [],
};