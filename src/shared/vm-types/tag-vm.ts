/**
 * TagVM represents the view model for a single tag.
 * Contains readonly properties to ensure immutability.
 */
export type TagVM = {
  readonly name: string;
  readonly color: string;
};