import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TagVM } from '@shared/vm-types/tag-vm';

/**
 * Tag is a reusable component for displaying individual tags.
 * It's a purely presentational component with color theming support.
 */
@Component({
  selector: 'app-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span 
      class="px-2 py-1 bg-transparent border text-xs font-medium rounded-full"
      [class]="getTagClasses()"
      [attr.aria-label]="'Tag: ' + tag().name"
    >
      {{ tag().name }}
    </span>
  `
})
export class Tag {
  /** The tag to display */
  readonly tag = input.required<TagVM>();

  /**
   * Returns the appropriate CSS classes for the tag based on its color
   */
  getTagClasses(): string {
    const color = this.tag().color;
    return `border-${color}-500 text-${color}-500`;
  }
}